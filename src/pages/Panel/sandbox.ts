// import myValidation from './myValidation';
const penguin = require('@dp6/penguin-datalayer-core');


// Set up message event handler:
window.addEventListener('message', function (event: any) {

    if (event.origin.startsWith('chrome-extension')) {

        // console.log('Sandbox received a message!');
        // console.log({ event });
        // console.log();

        let schema = event.data.schema;

        let obj: any = {
            'event': 'update',
            'hit': event.data.parametersObj
        };

        let result: any[] = penguin.validate(schema, obj, () => { });

        event.ports[0].postMessage({ 'result': result }); // 2
    }
}, false);