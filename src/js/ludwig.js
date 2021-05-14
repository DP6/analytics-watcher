// Get DOM elements.
const addEvent = document.getElementById("add-event");
const type = document.getElementById("type");
const keyName = document.getElementById("key-name");
const validation = document.getElementById("validation");
const condition = document.getElementById("condition");
const mode = document.getElementById("mode");
const confirm = document.getElementById("confirm");
const clear = document.getElementById("end");
const preview = document.getElementById("preview");
const divSchema = document.getElementById("schema");
const selectProperties = document.getElementById("properties");
const buttonUseJson = document.getElementById("use-in-page");
const uploadButton = document.getElementById("inputFileLabel");
const modal = document.getElementById("myModal");

// Schema.
let jsonSchema = [];
// Event Model.
let objAux = { type: "object", properties: {}, required: [] };

// Verify if the property type == string.
type.addEventListener("change", () => {

    if (type.value == "string") {

        validation.disabled = false;
        condition.disabled = false;

    } else {

        validation.disabled = true;
        condition.disabled = true;
        condition.value = "";
    }
});

// Create Event and Event properties.
function createProperty(obj, levelKeyName) {

    if (mode.value == "required") {
        obj.required.push(keyName.value);
    }

    obj.properties[keyName.value] = { type: type.value };

    switch (type.value) {
        case "string":
            if (validation.value == "equals") {
                obj.properties[keyName.value].enum = [condition.value];
            } else {
                obj.properties[keyName.value].pattern = condition.value;
            }
            break;
        case "object":
            obj.properties[keyName.value].properties = {};
            obj.properties[keyName.value].required = [];

            let optionPropertieObject = document.createElement("option");
            optionPropertieObject.setAttribute("value", levelKeyName + "." + keyName.value);
            optionPropertieObject.appendChild(document.createTextNode(levelKeyName + "." + keyName.value))

            selectProperties.appendChild(optionPropertieObject);
            break;
        case "array":
            obj.properties[keyName.value].contains = { type: "object", properties: {}, required: [] };
            let optionPropertieArray = document.createElement("option");
            optionPropertieArray.setAttribute("value", levelKeyName + "." + keyName.value + ".contains");
            optionPropertieArray.appendChild(document.createTextNode(levelKeyName + "." + keyName.value + ".contains"))

            selectProperties.appendChild(optionPropertieArray);
            break;
        case "number":
            break;
        case "boolean":
            break;
    }

    // console.log(jsonSchema)
    keyName.value = "";
    condition.value = "";

};

// Navigate into the event searching for the right object.
function searchObject(objectPath) {
    let objectFound = objAux;
    for (let i = 0; i < objectPath.length; i++) {

        if (objectPath[i] != "contains") {
            objectFound = objectFound.properties[objectPath[i]];
        } else {
            objectFound = objectFound[objectPath[i]];
        }
    }
    createProperty(objectFound, selectProperties.value);
};

// Verify the property level.
function verification() {
    if (selectProperties.value == "SelectObject") {
        createProperty(objAux, "");
    } else {
        let path = selectProperties.value;
        let objectPath = path.split(".");
        objectPath.shift();

        searchObject(objectPath);
    }
};

confirm.addEventListener("click", () => {
    // console.log(selectProperties.value)
    verification();
});

addEvent.addEventListener("click", () => {
    jsonSchema.push(objAux);
    objAux = { type: "object", properties: {}, required: [] };

    let fullResult

    fullResult = {
        "$schema": "",
        "title": "The Root Schema",
        "array": {
            "$id": "#/properties/schema",
            "type": "array",
            "items": [

            ]
        }
    }

    for (var prop of jsonSchema) {
        fullResult.array.items.push(prop);
    };

    window.bowserjr.jsonSchema = fullResult;

    while (selectProperties.length != 1) {
        selectProperties.remove(1);
    }
});


buttonExport.addEventListener("click", () => {
    if (!window.bowserjr.jsonSchema) {
        alert("É necessário primeiro criar um schema.");
    } else {
        let filename = `jsonSchema_${new Date().getTime()}.json`;

        let a = document.createElement("a");

        document.body.appendChild(a);

        a.style = "display: none";

        let blob = new Blob([JSON.stringify(window.bowserjr.jsonSchema, null, 2)], { contentType: "application/json" }),
            url = window.URL.createObjectURL(blob);

        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }
});

function useInPage() {
    window.bowserjr.file = window.bowserjr.jsonSchema;
    uploadButton.setAttribute("for", "");
    modal.style.display = "none";
};

buttonUseJson.addEventListener("click", () => {
    if (window.bowserjr.file && window.bowserjr.jsonSchema) {
        let input = window.confirm("Um schema já foi selecionado. Deseja substituí-lo?");
        if (input) {
            useInPage();
        }
    } else if (!window.bowserjr.jsonSchema) {
        alert("É necessário primeiro criar um schema.");
    } else {
        useInPage();
    };
});