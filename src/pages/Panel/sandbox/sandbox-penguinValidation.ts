// import myValidation from './myValidation';
const penguin = require('@dp6/penguin-datalayer-core');

// Set up message event handler:
window.addEventListener(
  'message',
  function (event: any) {
    if (event.origin.startsWith('chrome-extension')) {
      // console.log('Sandbox received a message!');
      // console.log({ event });
      // console.log();

      // JSON schema
      let schema = event.data.schema;

      // TODO
      let obj: any = {
        event: 'update',
        hit: event.data.parametersObj,
      };

      // Penguin validation
      let result: any[] = penguin.validate(schema, obj, () => {});

      // Send result back
      event.ports[0].postMessage({ result: result });
    }
  },
  false
);
