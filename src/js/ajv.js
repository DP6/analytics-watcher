import parseToDataLayer from './schema_parser.js';
import './ajv.min.js';

// let Ajv = require("ajv");
let ajv = new Ajv({
    schemaId: 'auto',
    allErrors: true,
    verbose: true,
    ownProperties: true,
});

let validateObject = (schema, obj, filename) => {
    //let logsArray = [];
    //let items = schema.array.items;
    let objTreated = false;
    let items = window.penguinDataLayer.file.array.items;

    let isSchemaEmpty = items.length === 0;
    let isObjEmpty =
        Object.entries(obj).length === 0 && obj.constructor === Object;

    // let saveLog = (filename, status, message, dlObject) => {
    // console.log(`${status}, ${message}, ${dlObject}\n`);
    //logsArray.push(`${status}, ${message}, ${dlObject}\n`);
    // fs.appendFileSync(
    //   filename,
    //   `${status}, ${message}, ${dlObject}\n`,
    //   (err) => {
    //     if (err) throw err;
    //   }
    // );
    // };

    let checkValidEvent = (items) => {
        for (let index = 0; index < items.length; index++) {
            // console.log("schema: "+JSON.stringify(items[index],null,2));
            // console.log("datalayer: "+JSON.stringify(obj,null,2));
            let valid = ajv.validate(items[index], obj);
            if (valid) {
                // saveLog(filename, "OK", "Validated Successfully", JSON.stringify(obj));

                window.penguinDataLayer.result.push(
                    `OK;Validated Successfully;${JSON.stringify(obj)}`
                );
                window.penguinDataLayer.resultWithoutObject.push(
                    'OK, Validated Successfully'
                );

                //items.forEach((item)=>{console.log(item);})
                items.splice(index, 1);
                //items.forEach((item)=>{console.log(item);})
                //window.file.array.items.splice(index, 1);
                return true;
            }
        }
    };

    let revalidateSchema = (
        shadowSchema,
        errorMessage,
        obj,
        schemaIndex,
        schemaArray,
        dlObj
    ) => {
        let tempObj = JSON.parse(JSON.stringify(obj));
        const innerSchema = JSON.parse(JSON.stringify(shadowSchema)); //ajustei o innerSchema pra receber o objeto como uma nova instância, e não por referência
        let verify_required = Object.keys(innerSchema).indexOf('required'); //Verifica se existe required dentro do innerSchema
        //console.log(JSON.parse(JSON.stringify(shadowSchema)))

        //console.log(innerSchema)

        if (verify_required == -1) {
            let found = innerSchema.contains.required.indexOf(
                errorMessage.params.missingProperty
            );
            //console.log(found)
            if (found > -1) {
                //e caso o valor seja encontrado
                /* if (Object.keys(tempObj).length > 1) {
                           dlObjProperty = Object.keys(tempObj)[1];
                         } else {
                           dlObjProperty = Object.keys(tempObj)[0];
                         }*/
                dlObjProperty = errorMessage.params.missingProperty;

                innerSchema.contains.required = innerSchema.contains.required.filter(
                    (keyword) => keyword === dlObjProperty
                ); //Então agora ele passa a remover do required todas as propriedades que não são iguais à que está dentro do tempObj

                for (let prop in innerSchema.contains.properties) {
                    if (prop !== dlObjProperty) {
                        delete innerSchema.contains.properties[prop];
                    } //e faz o mesmo com as propriedades do schema pra igualar e deixar ele somente com o que precisa ser validado
                }

                let isInnerSchemaEmpty =
                    Object.entries(innerSchema.contains.properties).length === 0 &&
                    obj.constructor === Object; //um safe check pra garantir que o objeto não ficou vazio

                if (
                    innerSchema.contains.required.length > 0 &&
                    !isInnerSchemaEmpty &&
                    /*ajv.validate(innerSchema, tempObj) &&*/
                    Object.keys(
                        innerSchema.contains.properties
                    )[0] !== 'event'
                ) {
                    //essa validação tava cagada pq ele tava validando o event no nível de base e fodendo com a porra toda. Isso ainda pode ser um problema mais pra frente se alguém
                    // saveLog(
                    //     filename,
                    //     "ERROR",
                    //     `Hit sent without the following property: ${errorMessage.params.missingProperty}`,
                    //     JSON.stringify(dlObj)
                    // );

                    window.penguinDataLayer.result.push(
                        `ERROR;Hit "${
              errorMessage.dataPath
            }" sent without the following property: ${
              errorMessage.params.missingProperty
            };${JSON.stringify(dlObj)}`
                    );
                    window.penguinDataLayer.resultWithoutObject.push(
                        'ERROR, ' +
                        `Hit "${errorMessage.dataPath}" sent without the following property: ${errorMessage.params.missingProperty} `
                    );

                    try {
                        let schemaItemKeys = Object.keys(
                            schemaArray[schemaIndex].properties
                        );
                        if (errorMessage.dataPath.indexOf(schemaItemKeys[1]) > -1) {
                            if (errorMessage.dataPath.indexOf('[0]') > -1) {
                                schemaArray.splice(schemaIndex, 1);
                                objTreated = true;
                            }
                        }
                    } catch {
                        console.log(
                            'Objeto ' + errorMessage.dataPath + ' já teve seu erro tratado!!'
                        );
                    }
                }
            } else {
                for (prop in innerSchema.properties) {
                    if (
                        tempObj[prop] &&
                        typeof tempObj[prop] !== 'string' &&
                        typeof tempObj[prop] !== 'number' &&
                        typeof tempObj[prop] !== 'array'
                    ) {
                        let schemaProps = innerSchema.properties[prop];
                        revalidateSchema(
                            schemaProps,
                            errorMessage,
                            tempObj[prop],
                            schemaIndex,
                            schemaArray,
                            dlObj
                        );
                    }
                }
            }
        } else {
            //console.log(innerSchema);
            let found = innerSchema.required.indexOf(
                errorMessage.params.missingProperty
            ); //ainda mantive esse laço que checa se o schema interno tem a propriedade descrita na mensagem de erro filtrada
            //console.log(errorMessage.params.missingProperty);
            //console.log(found)
            if (found > -1) {
                //e caso o valor seja encontrado
                if (Object.keys(tempObj).length > 1) {
                    var dlObjProperty = Object.keys(tempObj)[1];
                } else {
                    dlObjProperty = Object.keys(tempObj)[0];
                }
                //console.log(dlObjProperty);
                //console.log(innerSchema.required);
                innerSchema.required = innerSchema.required.filter(
                    (keyword) => keyword === dlObjProperty
                ); //Então agora ele passa a remover do required todas as propriedades que não são iguais à que está dentro do tempObj
                //console.log(innerSchema);
                for (let prop in innerSchema.properties) {
                    if (prop !== dlObjProperty) {
                        delete innerSchema.properties[prop];
                    } //e faz o mesmo com as propriedades do schema pra igualar e deixar ele somente com o que precisa ser validado
                }
                let isInnerSchemaEmpty =
                    Object.entries(innerSchema.properties).length === 0 &&
                    obj.constructor === Object; //um safe check pra garantir que o objeto não ficou vazio

                if (
                    innerSchema.required.length > 0 &&
                    !isInnerSchemaEmpty &&
                    /*ajv.validate(innerSchema, tempObj) &&*/
                    Object.keys(
                        innerSchema.properties
                    )[0] !== 'event'
                ) {
                    //essa validação tava cagada pq ele tava validando o event no nível de base e fodendo com a porra toda. Isso ainda pode ser um problema mais pra frente se alguém
                    // saveLog(
                    //     filename,
                    //     "ERROR",
                    //     `Hit "${errorMessage.dataPath}" sent without the following property: ${errorMessage.params.missingProperty}`,
                    //     JSON.stringify(dlObj)
                    // );

                    window.penguinDataLayer.result.push(
                        `ERROR;Hit "${
              errorMessage.dataPath
            }" sent without the following property: ${
              errorMessage.params.missingProperty
            };${JSON.stringify(dlObj)}`
                    );
                    window.penguinDataLayer.resultWithoutObject.push(
                        'ERROR, ' +
                        `Hit "${errorMessage.dataPath}" sent without the following property: ${errorMessage.params.missingProperty} `
                    );

                    try {
                        let schemaItemKeys = Object.keys(
                            schemaArray[schemaIndex].properties
                        );
                        if (errorMessage.dataPath.indexOf(schemaItemKeys[1]) > -1) {
                            schemaArray.splice(schemaIndex, 1);
                            objTreated = true;
                        }
                    } catch {
                        console.log(
                            'Objeto ' + errorMessage.dataPath + ' já teve seu erro tratado!!'
                        );
                    }
                }
            } else {
                for (let prop in innerSchema.properties) {
                    if (
                        tempObj[prop] &&
                        typeof tempObj[prop] !== 'string' &&
                        typeof tempObj[prop] !== 'number' &&
                        typeof tempObj[prop] !== 'array'
                    ) {
                        let schemaProps = innerSchema.properties[prop];
                        revalidateSchema(
                            schemaProps,
                            errorMessage,
                            tempObj[prop],
                            schemaIndex,
                            schemaArray,
                            dlObj
                        );
                    }
                }
            }
        }
    };

    let checkMissingProperty = (items, obj) => {
        items.forEach((item, index, arr) => {
            let valid = ajv.validate(item, obj);
            let errors = ajv.errors;
            //console.log(item)
            if (!valid) {
                errors
                    .filter(
                        (error) =>
                        error.schema.constructor === Object &&
                        error.keyword === 'required'
                    )
                    .map((eachError) => {
                        let errorMessage = JSON.parse(JSON.stringify(eachError));
                        let shadowSchema = JSON.parse(JSON.stringify(item));
                        let isErrorDataEmpty =
                            Object.entries(errorMessage.data).length === 0 &&
                            errorMessage.data.constructor === Object;

                        if (isErrorDataEmpty) {
                            // saveLog(
                            //     filename,
                            //     "ERROR",
                            //     `Hit sent without the following property: ${errorMessage.params.missingProperty}`,
                            //     JSON.stringify(obj)
                            // );

                            window.penguinDataLayer.result.push(
                                `ERROR;Hit sent without the following property: ${
                  errorMessage.params.missingProperty
                };${JSON.stringify(obj)}`
                            );
                            window.penguinDataLayer.resultWithoutObject.push(
                                'ERROR, ' +
                                `Hit sent without the following property: ${errorMessage.params.missingProperty}, `
                            );
                        } else {
                            revalidateSchema(
                                shadowSchema,
                                errorMessage,
                                obj,
                                index,
                                arr,
                                obj
                            );
                        }
                    });
            }
        });
    };

    let checkErrorsPerSchema = (items, obj) => {
        let itemTreated = false;
        items.forEach((item, index) => {
            let valid = ajv.validate(item, obj);
            let errors = ajv.errors;
            if (itemTreated) return;
            if (!valid && item.required[1] == Object.keys(obj)[1]) {
                errors
                    .filter((error) => {
                        if (
                            error.keyword == 'enum' ||
                            error.keyword == 'pattern' ||
                            error.keyword == 'type'
                        )
                            return error;
                    })
                    .map((eachError) => {
                        switch (eachError.keyword) {
                            case 'pattern':
                                // saveLog(
                                //     filename,
                                //     "WARNING",
                                //     `"${eachError.dataPath.replace(/^\./g, "")}" ${eachError.message}, but Hit send: "${eachError.data}"`,
                                //     JSON.stringify(obj)
                                // );

                                window.penguinDataLayer.result.push(
                                    `WARNING;${eachError.dataPath.replace(/^\./g, '')}" ${
                    eachError.message
                  }, but Hit send: "${eachError.data}";${JSON.stringify(obj)}`
                                );
                                window.penguinDataLayer.resultWithoutObject.push(
                                    'WARNING, ' +
                                    `"${eachError.dataPath.replace(/^\./g, '')}" ${
                      eachError.message
                    }, but Hit send: "${eachError.data}" `
                                );
                                break;

                            case 'enum':
                                // saveLog(
                                //     filename,
                                //     "WARNING",
                                //     `"${eachError.dataPath.replace(/^\./g, "")}" ${eachError.message}: "${eachError.schema.length > 1 ? eachError.schema.join(", ") : eachError.schema[0]}", but Hit send: "${eachError.data}"`,
                                //     JSON.stringify(obj)
                                // );

                                window.penguinDataLayer.result.push(
                                    `WARNING;${eachError.dataPath.replace(/^\./g, '')}" ${
                    eachError.message
                  }: "${
                    eachError.schema.length > 1
                      ? eachError.schema.join(', ')
                      : eachError.schema[0]
                  }", but Hit send: "${eachError.data}";${JSON.stringify(obj)}`
                                );
                                window.penguinDataLayer.resultWithoutObject.push(
                                    'WARNING, ' +
                                    `"${eachError.dataPath.replace(/^\./g, '')}" ${
                      eachError.message
                    }: "${
                      eachError.schema.length > 1
                        ? eachError.schema.join(', ')
                        : eachError.schema[0]
                    }", but Hit send: "${eachError.data}" `
                                );

                                break;

                            case 'type':
                                // saveLog(
                                //     filename,
                                //     "WARNING",
                                //     `"${eachError.dataPath.replace(/^\./g, "")}" ${eachError.message}"`,
                                //     JSON.stringify(obj)
                                // );

                                window.penguinDataLayer.result.push(
                                    `WARNING;"${eachError.dataPath.replace(/^\./g, '')}" ${
                    eachError.message
                  }";${JSON.stringify(obj)}`
                                );
                                window.penguinDataLayer.resultWithoutObject.push(
                                    'WARNING, ' +
                                    `"${eachError.dataPath.replace(/^\./g, '')}" ${
                      eachError.message
                    }" `
                                );

                                break;

                            default:
                                break;
                        }
                    });
                items.splice(index, 1);
                itemTreated = true;
            }
        });
    };

    let checkMissingEvents = (items, obj) => {
        let missingEvents = parseToDataLayer(items);
        missingEvents.map((event) => {
            // saveLog(
            //     filename,
            //     "ERROR",
            //     `Hit not validated or missed during test`,
            //     JSON.stringify(event)
            // );

            window.penguinDataLayer.result.push(
                `ERROR;Hit not validated or missed during test;${JSON.stringify(event)}`
            );
            //window.penguinDataLayer.result.push("ERROR, " + `Hit not validated or missed during test ` + JSON.stringify(event));
            window.penguinDataLayer.resultWithoutObject.push(
                'ERROR, ' +
                `Hit not validated or missed during test, Event: ` +
                JSON.stringify(event.event)
            );
        });
    };

    if (isSchemaEmpty) {
        // saveLog(
        //     filename,
        //     "ERROR",
        //     `No more items to validate`,
        //     JSON.stringify(obj)
        // );
        window.penguinDataLayer.result.push(
            `ERROR;No more items to validate;${JSON.stringify(obj)}`
        );
        window.penguinDataLayer.resultWithoutObject.push(
            'ERROR, ' + `No more items to validate `
        );
    } else if (!checkValidEvent(items, obj) && !isObjEmpty) {
        checkMissingProperty(items, obj);
        if (!objTreated) {
            checkErrorsPerSchema(items, obj);
        }
    } else if (isObjEmpty) {
        checkMissingEvents(items, obj);
    }

    //window.penguinDataLayer.result.push(logsArray);
};

export default validateObject;