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
      const { schema, parametersObj }: PenguinMessage = event.data;

      // Penguin validation
      const result: ValidationResultInterface[] = penguin.validate(
        schema,
        { event: 'update', hit: parametersObj },
        () => {}
      );

      // Send result back
      event.ports[0].postMessage({ result: result });
    }
  },
  false
);
