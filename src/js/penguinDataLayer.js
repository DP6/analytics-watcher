import validateObject from './ajv.js';
// import jsPDF from './jspdf.min.js';

window.penguinDataLayer = {};
window.penguinDataLayer.dataLayer = [];
window.penguinDataLayer.result = [];
window.penguinDataLayer.resultExport = [];
window.penguinDataLayer.resultWithoutObject = [];
window.penguinDataLayer.resultWithoutObjectExport = [];
window.penguinDataLayer.count = {
    successful: 0,
    error: 0,
    warning: 0,
};
window.penguinDataLayer.validateObject = validateObject;

M.AutoInit();

var elems = document.querySelectorAll('.autocomplete');
var instances = M.Autocomplete.init(elems, {
    data: {
        dataLayer: null,
        'utag.data': null,
        // Google: null,
    },
});

window.penguinDataLayer.file;
window.penguinDataLayer.export = [];

const statusImg = {
    'label ok': 'check_circle',
    'label error': 'error',
    'label warn': 'warning',
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message == 'accepted') {
        window.penguinDataLayer.validateObject(
            window.penguinDataLayer.file,
            request.datalayer_object
        );
        window.penguinDataLayer.dataLayer.push(request.datalayer_object);
        window.penguinDataLayer.pageUrl = request.url;
    }
});

// Get DOM elements.
const inputJSONFile = document.getElementById('inputFile');
const inputJSONText = document.querySelector('.file-path-wrapper input');
const inputDataLayerName = document.getElementById('inputDataLayerName');
const btnStartPenguinDataLayer = document.getElementById('startTest');
const btnStopPenguinDataLayer = document.getElementById('stopTest');
const btnExportLogs = document.getElementById('export');
const btnClearReport = document.querySelector('.clear-report');
const urlToVerify = document.querySelector('#inputUrl');

const validationDate = document.querySelector('.date-info');
const successfulData = document.querySelector('#successful-data');
const warningData = document.querySelector('#warning-data');
const errorData = document.querySelector('#error-data');

const modalContent = document.getElementById('myModal');

// When a user uploads a file, the function handleFiles will be called.
inputJSONFile.addEventListener('change', handleFiles, false);
inputDataLayerName.addEventListener(
    'change',
    function() {
        if (inputJSONText.value !== '') {
            btnStartPenguinDataLayer.setAttribute(
                'class',
                'modal-close modal-trigger waves-effect orange-text text-darken-2 orange lighten-5 btn waves-orange'
            );
        }
    },
    false
);

// handleFiles will get the files, reader, and verify if the file is a .JSON file.
function handleFiles() {
    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onload = () => {
        try {
            if (inputDataLayerName.value !== '') {
                btnStartPenguinDataLayer.setAttribute(
                    'class',
                    'modal-close modal-trigger waves-effect orange-text text-darken-2 orange lighten-5 btn waves-orange'
                );
            }
            window.penguinDataLayer.file = JSON.parse(reader.result);
        } catch {
            btnStartPenguinDataLayer.setAttribute(
                'class',
                'modal-close modal-trigger waves-effect orange-text text-darken-2 orange lighten-5 btn waves-orange disabled'
            );
        }
    };
}

btnStartPenguinDataLayer.onclick = () => {
    // Verify if the file exist.

    if (window.penguinDataLayer.file) {
        //Chrome runtime methods
        let tabId;
        chrome.tabs.query({ active: true }, function(tabs) {
            tabs.forEach((tab) => {
                if (tab.url.includes(urlToVerify.value)) {
                    tabId = tab.id;
                }
            });

            chrome.tabs.executeScript(tabId, {
                file: 'js/penguinDataLayerContentScript.js',
            });
        });
        setTimeout(function() {
            chrome.runtime.sendMessage({
                    message: 'background_penguindatalayer_script',
                    dataLayerName: inputDataLayerName.value,
                    tabID: tabId,
                },
                function(response) {
                    if (response.message == 'teste_ok') {
                        var data = new Date();
                        validationDate.innerHTML =
                            data.getDate() +
                            '/' +
                            (data.getMonth() + 1) +
                            '/' +
                            data.getFullYear();
                    }
                }
            );
        }, 1000);

        btnStartPenguinDataLayer.disabled = true;
        btnStopPenguinDataLayer.disabled = false;
    } else {
        alert('Carregue o schema antes de iniciar a validação.');
    }
};

btnClearReport.onclick = () => {
    successfulData.innerHTML = 0;
    warningData.innerHTML = 0;
    errorData.innerHTML = 0;
    jQuery('.historyChange').remove();
    document.querySelector('#export').setAttribute('class', 'hide');
};

btnStopPenguinDataLayer.onclick = () => {
    /* Set domain. */
    validateObject(window.file, {});
    btnStopPenguinDataLayer.disabled = true;
    window.penguinDataLayer.resultExport = window.penguinDataLayer.resultExport.concat(
        window.penguinDataLayer.result
    );
    window.penguinDataLayer.resultWithoutObjectExport = window.penguinDataLayer.resultWithoutObjectExport.concat(
        window.penguinDataLayer.resultWithoutObject
    );

    const divLogs = document.getElementById('logs');

    let divTrackHistory = document.createElement('ul');
    divTrackHistory.setAttribute(
        'class',
        'collapsible expandable track history-change'
    );

    let urlList = document.createElement('li');
    urlList.setAttribute('class', 'active');

    let collapsibleHeader = document.createElement('div');
    collapsibleHeader.setAttribute(
        'class',
        'collapsible-header valign-wrapper historyChange'
    );

    let paragraphyHeader = document.createElement('p');
    paragraphyHeader.setAttribute('class', 'truncate');
    paragraphyHeader.textContent = window.penguinDataLayer.pageUrl;

    let iconWeb = document.createElement('i');
    iconWeb.setAttribute('class', 'web-icon material-icons');
    iconWeb.textContent = 'web';

    let collapsibleBody = document.createElement('div');
    collapsibleBody.setAttribute('class', 'collapsible-body');

    divLogs.appendChild(divTrackHistory);
    divTrackHistory.appendChild(urlList);
    urlList.appendChild(collapsibleHeader);
    collapsibleHeader.appendChild(iconWeb);
    urlList.appendChild(collapsibleBody);

    for (let i = 0; i < window.penguinDataLayer.result.length; i++) {
        let message = window.penguinDataLayer.result[i];
        let messageWithoutObject = window.penguinDataLayer.resultWithoutObject[i];

        let paragraphy = document.createElement('div');
        paragraphy.setAttribute('class', 'content');

        let divTrack = document.createElement('ul');
        divTrack.setAttribute('class', 'collapsible expandable track');

        let divList = document.createElement('li');

        let divQsWrapper = document.createElement('div');
        divQsWrapper.setAttribute('class', 'qsWrapper collapsible-header');

        let divCollapseBody = document.createElement('div');
        divCollapseBody.setAttribute('class', 'collapsible-body');

        let tableQueryString = document.createElement('table');
        tableQueryString.setAttribute('class', 'queryString striped tracktable');

        let hitType = document.createElement('i');
        hitType.setAttribute('class', 'material-icons hit-type');
        hitType.textContent = 'imagem';

        let iconDelete = document.createElement('i');
        iconDelete.setAttribute('class', 'material-icons delete');
        iconDelete.textContent = 'close';

        let sectionSucessfuly = document.createElement('section');
        sectionSucessfuly.setAttribute('class', 'sucessfuly');

        let sectionErro = document.createElement('section');
        sectionErro.setAttribute('class', 'erro');

        collapsibleHeader.appendChild(paragraphyHeader);

        paragraphy.appendChild(document.createTextNode(messageWithoutObject));

        function creatingLabels(type, labelType, trackType, section) {
            let label = document.createElement('hr');
            label.setAttribute('class', 'label');
            hitType.textContent = statusImg[labelType];
            label.setAttribute('class', labelType);
            collapsibleBody.appendChild(divTrack);
            divTrack.setAttribute('class', 'collapsible expandable track ' + type);
            divTrack.appendChild(label);
            divTrack.appendChild(divList);
            divList.appendChild(divQsWrapper);
            divQsWrapper.appendChild(hitType);
            divQsWrapper.appendChild(iconDelete);
            divQsWrapper.appendChild(paragraphy);
            divList.appendChild(divCollapseBody);
            divCollapseBody.appendChild(tableQueryString);
        }

        if (message.includes('Validated Successfully')) {
            window.penguinDataLayer.count.successful++;
            creatingLabels('ok', 'label ok', 'track pageview', sectionSucessfuly);
        } else if (message.includes('ERROR')) {
            window.penguinDataLayer.count.error++;
            creatingLabels('error', 'label error', 'track erro', sectionErro);
        } else {
            window.penguinDataLayer.count.warning++;
            creatingLabels('warn', 'label warn', 'track exception', sectionErro);
        }

        function treatment(event, objName, index) {
            let eventKeys = Object.keys(event); // Get the eventKeys in the object.
            let keyCount = 0;
            let valueCount = 0;
            let booleanAux = true;

            eventKeys.forEach((key) => {
                /* Verify if the event key is in the message.  */
                if (message.includes(`"${key}"`)) keyCount++;

                /* Verify if the event value is in the message with the respective key. */
                if (Array.isArray(event[key]) || typeof event[key] == 'object') {
                    valueCount++;
                } else if (typeof event[key] == 'number') {
                    if (
                        message.includes(`"${key}":${event[key]},`) ||
                        message.includes(`"${key}":${event[key]}}`)
                    ) {
                        valueCount++;
                    }
                } else if (
                    message.includes(`"${key}":"${event[key]}",`) ||
                    message.includes(`"${key}":"${event[key]}"}`)
                ) {
                    valueCount++;
                }
            });

            /* Verify if all event keys and event values are included in the message. */
            if (eventKeys.length == keyCount && eventKeys.length == valueCount) {
                eventKeys.forEach((key) => {
                    let tableLine = document.createElement('tr');
                    if (
                        message.includes('WARNING') &&
                        messageWithoutObject.includes(key)
                    ) {
                        /* Paint the property that has the incorrect value. */
                        tableLine.setAttribute('id', 'warning');
                    }

                    let tableKey = document.createElement('td');
                    tableKey.setAttribute('class', 'key');
                    let keyText =
                        index || index === 0 ?
                        `${objName}[${index}].${key}` :
                        `${objName}.${key}`;
                    tableKey.appendChild(document.createTextNode(keyText));
                    tableLine.appendChild(tableKey); // Write the Key in the line

                    let tableValue = document.createElement('td');
                    tableValue.setAttribute('class', 'value');

                    if (Array.isArray(event[key])) {
                        tableValue.appendChild(document.createTextNode('Array[ ]'));
                        tableLine.appendChild(tableValue); // Write the Value in the line.
                        tableQueryString.appendChild(tableLine); // Write the Line in the table.
                        for (let i = 0; i < event[key].length; i++) {
                            if (!treatment(event[key][i], keyText, i)) {
                                booleanAux = false;
                                for (let index = 0; index < eventKeys.length; index++) {
                                    tableQueryString.deleteRow(0);
                                }
                            }
                        }
                    } else if (event[key] != null && typeof event[key] == 'object') {
                        tableValue.appendChild(document.createTextNode('Object{ }'));
                        tableLine.appendChild(tableValue); // Write the Value in the line.
                        tableQueryString.appendChild(tableLine); // Write the Line in the table.
                        if (!treatment(event[key], keyText)) {
                            booleanAux = false;
                            for (let index = 0; index < eventKeys.length; index++) {
                                tableQueryString.deleteRow(0);
                            }
                        }
                    } else if (typeof event[key] == 'string') {
                        tableValue.appendChild(document.createTextNode(`"${event[key]}"`));
                        tableLine.appendChild(tableValue); // Write the Value in the line.
                        tableQueryString.appendChild(tableLine); // Write the Line in the table.
                    } else {
                        tableValue.appendChild(document.createTextNode(event[key]));
                        tableLine.appendChild(tableValue); // Write the Value in the line.
                        tableQueryString.appendChild(tableLine); // Write the Line in the table.
                    }
                });
                return booleanAux;
            }
            return false;
        }

        /* For each message generated by ajv.js, we will make a verify with the events in dataLayer. */
        for (let index in window.penguinDataLayer.dataLayer) {
            /* If the message matches an event, the function treatment returns true and gets out the for. */
            if (treatment(window.penguinDataLayer.dataLayer[index], '')) break;
        }
    }

    window.penguinDataLayer.file = false;
    inputJSONFile.value = '';

    successfulData.innerHTML = window.penguinDataLayer.count.successful;
    warningData.innerHTML = window.penguinDataLayer.count.warning;
    errorData.innerHTML = window.penguinDataLayer.count.error;

    window.penguinDataLayer.dataLayer = [];
    window.penguinDataLayer.result = [];
    window.penguinDataLayer.resultWithoutObject = [];

    var elem = document.querySelectorAll('.collapsible.expandable');
    var instance = M.Collapsible.init(elem, {
        accordion: false,
        inDuration: 1500,
        outDuration: 1000,
    });

    inputDataLayerName.value = '';
    inputJSONText.value = '';

    btnStartPenguinDataLayer.setAttribute(
        'class',
        'modal-close modal-trigger waves-effect orange-text text-darken-2 orange lighten-5 btn waves-orange disabled'
    );
    document.querySelector('#export').setAttribute('class', '');
};

let fullResult = [];

btnExportLogs.addEventListener('click', () => {
    let filename = `results_${new Date().getTime()}.xlsx`;

    fullResult.push([
        `Contador: ${JSON.stringify(window.penguinDataLayer.count)
      .split(',')
      .join(' ')}\n\n`,
    ]);

    window.penguinDataLayer.resultExport.forEach((line) => {
        let lineExport = line.split(';');
        let lineObject = lineExport[2].split(',').join(' ');
        fullResult.push(lineExport[0], lineExport[1], lineObject, '\n');
    });

    let a = document.createElement('a');

    document.body.appendChild(a);

    a.style = 'display: none';

    let blob = new Blob([fullResult], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;',
        }),
        url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
    if (event.target == modalContent) {
        modalContent.style.display = 'none';
    }
};