import * as RW from './3.hitParser';

/**
 * Allowed status values
 */
//export type StatusInterface = 'SUCCESS' | 'WARNING' | 'ERROR' | 'OK';

interface IValidationResult {
  status: StatusInterface;
  message: string;
}

/**
 * Send message to sandbox and listen for response.
 *
 * @param  messageData  Data sent with message.
 */
function penguinValidation(
  messageData: Object
): Promise<ValidationResultInterface[]> {
  return new Promise((resolve, reject) => {
    // Setup communication channel
    const channel = new MessageChannel();

    // onMessage listener
    channel.port1.onmessage = ({ data }) => {
      // console.log('Watcher received a response!');
      channel.port1.close();
      if (data.error) {
        const error: ValidationResultInterface[] = data.error;
        reject(error);
      } else {
        const result: ValidationResultInterface[] = data.result;
        resolve(result);
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
): Promise<IValidationResult> {
  let validationStatus: StatusInterface = 'error';
  let validationMessage: string;
  const message = {
    schema: dataLayerSchema,
    parametersObj: parametersObj,
  };
  // Validate based on dataLayerSchema if set. Otherwise validate based on required parameters
  if (Object.keys(dataLayerSchema).length > 0) {
    // Send message to sandbox (through an iframe) to validate the hit using pwnguin dataLayer

    // Get penguin validation
    const validationResult = await penguinValidation(message);

    // Retrieve status
    const statusArray = validationResult.map(obj => obj.status);
    if (statusArray.includes('error')) {
      validationStatus = 'error';
    } else if (statusArray.includes('warning')) {
      validationStatus = 'warning';
    } else {
      validationStatus = 'success';
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
      validationStatus = 'error' as unknown as StatusInterface;
      validationMessage = `The following required parameters are missing: ${missingRequiredParameters.toString()}`;
    } else {
      validationStatus = 'success' as unknown as StatusInterface;
      validationMessage = 'Validated successfully';
    }
    return {
      status: validationStatus,
      message: validationMessage,
    };
  }

  return {
    status: 'success',
    message: 'validationMessage',
  };
}

export default validateHit;
