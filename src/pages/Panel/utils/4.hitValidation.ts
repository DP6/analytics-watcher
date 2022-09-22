import * as RW from './3.hitParser';

/**
 * Allowed status values
 */
export type StatusInterface = 'SUCCESS' | 'WARNING' | 'ERROR';

interface ValidationResultInterface {
  status: StatusInterface | 'OK';
  message: string;
  dataLayerObject: any;
  objectName: any;
  keyName: any;
  partialError: any;
}

/**
 * Send message to sandbox and listen for response.
 *
 * @param  messageData  Data sent with message.
 */
function penguinValidation(
  messageData: Object
): Promise<Array<ValidationResultInterface>> {
  return new Promise((res, rej) => {
    // Setup communication channel
    const channel = new MessageChannel();

    // onMessage listener
    channel.port1.onmessage = ({ data }) => {
      // console.log('Watcher received a response!');
      channel.port1.close();
      if (data.error) {
        rej(data.error);
      } else {
        res(data.result);
      }
    };

    // Send hit to be validated to sandbox
    (
      document?.getElementById('theFrame') as HTMLIFrameElement
    ).contentWindow?.postMessage(messageData, '*', [channel.port2]);
  });
}

/**
 * Handles hit validation.
 *
 * @param  dataLayerSchema  JSON schema
 * @param  requiredParametersToCheck    Array with the required parameters classes (all, social, transaction, item or analytics4)
 * @param  parametersObj    Hit parameters.
 */
async function validateHit(
  dataLayerSchema: { [key: string]: any },
  requiredParametersToCheck: string[],
  parametersObj: { [key: string]: string }
) {
  let validationStatus: StatusInterface = 'ERROR';
  let validationResult: any[] = [];
  let validationMessage: string;

  // Validate based on dataLayerSchema if set. Otherwise validate based on required parameters
  if (Object.keys(dataLayerSchema).length > 0) {
    // Send message to sandbox (through an iframe) to validate the hit using pwnguin dataLayer
    let message = {
      schema: dataLayerSchema,
      parametersObj: parametersObj,
    };

    // Get penguin validation
    validationResult = await penguinValidation(message);

    // Retrieve status
    let statusArray = validationResult.map(obj => obj.status);
    if (statusArray.includes('ERROR')) {
      validationStatus = 'ERROR';
    } else if (statusArray.includes('WARNING')) {
      validationStatus = 'WARNING';
    } else {
      validationStatus = 'SUCCESS';
    }
  } else {
    // Identifies which required parameters are undefined, based on 'requiredParametersToCheck' values
    const missingRequiredParameters = requiredParametersToCheck
      .map(function (element) {
        return RW.identifyUndefinedRequiredParameters({
          type: element,
          params: parametersObj,
        });
      })
      .filter((error: string[]) => error.length > 0);

    // Set up validationStatus and validationResult
    if (missingRequiredParameters.length > 0) {
      validationStatus = 'ERROR' as unknown as StatusInterface;
      validationMessage = `The following required parameters are missing: ${missingRequiredParameters.toString()}`;
    } else {
      validationStatus = 'SUCCESS' as unknown as StatusInterface;
      validationMessage = 'Validated successfully';
    }
    validationResult = [
      {
        status: validationStatus,
        message: validationMessage,
      },
    ];
  }

  return [validationStatus, validationResult] as const;
}

export default validateHit;
