import validateObject from './ajv.js';
// import jsPDF from './jspdf.min.js';

window.bowserjr = {};
window.bowserjr.dataLayer = [];
window.bowserjr.result = [];
window.bowserjr.resultExport = [];
window.bowserjr.resultWithoutObject = [];
window.bowserjr.resultWithoutObjectExport = [];
window.bowserjr.count = {
    successful: 0,
    error: 0,
    warning: 0,
};
window.bowserjr.validateObject = validateObject;
// window.bowserjr.buttonExport ? console.log('Yay! BowserJR Loaded!') : console.log("BowserJR didn't load :'( ");

M.AutoInit();

var elems = document.querySelectorAll('.autocomplete');
var instances = M.Autocomplete.init(elems, {
    data: {
        dataLayer: null,
        'utag.data': null,
        // Google: null,
    },
});


window.bowserjr.file;
window.bowserjr.export = [];

const statusImg = {
    'label ok': 'check_circle',
    'label error': 'error',
    'label warn': 'warning',
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message == 'accepted') {
        window.bowserjr.validateObject(window.bowserjr.file, request.datalayer_object);
        window.bowserjr.dataLayer.push(request.datalayer_object);
        window.bowserjr.pageUrl = request.url;
    }
});

// Get DOM elements.
const inputJSONFile = document.getElementById('inputFile');
const inputJSONText = document.querySelector('.file-path-wrapper input');
const inputDataLayerName = document.getElementById('inputDataLayerName');
const btnStartBowser = document.getElementById('startTest');
const btnStopBowser = document.getElementById('stopTest');
const btnExportLogs = document.getElementById('export');
const btnLudwig = document.getElementById('ludwigBtn');
const btnClearReport = document.querySelector('.clear-report');
const urlToVerify = document.querySelector('#inputUrl');


const validationDate = document.querySelector('.date-info');
const successfulData = document.querySelector('#successful-data');
const warningData = document.querySelector('#warning-data');
const errorData = document.querySelector('#error-data');

const modalContent = document.getElementById('myModal');
const btnModalClose = document.getElementsByClassName('close')[0];

// pageURL.innerHTML = window.location.origin;
// browser.innerHTML = 'Chrome Version ' + navigator.appVersion.match(/.*Chrome\/([0-9\.]+)/)[1];

// var doc = new jsPDF();
var data = new Date();

// When a user uploads a file, the function handleFiles will be called.
inputJSONFile.addEventListener('change', handleFiles, false);
inputDataLayerName.addEventListener(
    'change',
    function() {
        if (inputJSONText.value !== '') {
            btnStartBowser.setAttribute('class', 'modal-close modal-trigger waves-effect orange-text text-darken-2 orange lighten-5 btn waves-orange');
        }
    },
    false,
);

// handleFiles will get the files, reader, and verify if the file is a .JSON file.
function handleFiles() {
    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onload = () => {
        try {
            if (inputDataLayerName.value !== '') {
                btnStartBowser.setAttribute('class', 'modal-close modal-trigger waves-effect orange-text text-darken-2 orange lighten-5 btn waves-orange');
            }
            window.bowserjr.file = JSON.parse(reader.result);
        } catch {
            // alert('Select a JSON file to proceed!');
            btnStartBowser.setAttribute('class', 'modal-close modal-trigger waves-effect orange-text text-darken-2 orange lighten-5 btn waves-orange disabled');
        }
    };
}


btnStartBowser.onclick = () => {
    // Verify if the file exist.

    if (window.bowserjr.file) {
        //Chrome runtime methods
        let tabId;
        chrome.tabs.query({ active: true }, function(tabs) {
            console.log(tabs);

            tabs.forEach(tab => {
                if (tab.url.includes(urlToVerify.value)) {
                    tabId = tab.id;
                    console.log(tab);
                }
            });

            chrome.tabs.executeScript(tabId, {
                file: 'js/bowserContentScript.js',
            });
            // console.log('Executed contentScript');
        });
        setTimeout(function() {
            // console.log(tabId);
            chrome.runtime.sendMessage({
                    message: 'background_bowser_script',
                    dataLayerName: inputDataLayerName.value,
                    tabID: tabId,
                },
                function(response) {
                    if (response.message == 'teste_ok') {
                        var data = new Date();
                        validationDate.innerHTML = data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
                    }
                },
            );
        }, 1000)


        btnStartBowser.disabled = true;
        btnStopBowser.disabled = false;
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

btnStopBowser.onclick = () => {
    /* Set domain. */
    // pageURL.innerHTML = window.bowserjr.pageUrl;
    validateObject(window.file, {});
    btnStopBowser.disabled = true;
    window.bowserjr.resultExport = window.bowserjr.resultExport.concat(window.bowserjr.result);
    window.bowserjr.resultWithoutObjectExport = window.bowserjr.resultWithoutObjectExport.concat(window.bowserjr.resultWithoutObject);

    const divLogs = document.getElementById('logs');

    let divTrackHistory = document.createElement('ul');
    divTrackHistory.setAttribute('class', 'collapsible expandable track history-change');

    let urlList = document.createElement('li');
    urlList.setAttribute('class', 'active');

    let collapsibleHeader = document.createElement('div');
    collapsibleHeader.setAttribute('class', 'collapsible-header valign-wrapper historyChange');

    let paragraphyHeader = document.createElement('p');
    paragraphyHeader.setAttribute('class', 'truncate');
    paragraphyHeader.textContent = window.bowserjr.pageUrl;

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

    for (let i = 0; i < window.bowserjr.result.length; i++) {
        let message = window.bowserjr.result[i];
        let messageWithoutObject = window.bowserjr.resultWithoutObject[i];

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
            divTrack.setAttribute('class', 'collapsible expandable track ' + type)
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
            window.bowserjr.count.successful++;
            creatingLabels('ok', 'label ok', 'track pageview', sectionSucessfuly);
        } else if (message.includes('ERROR')) {
            window.bowserjr.count.error++;
            creatingLabels('error', 'label error', 'track erro', sectionErro);
        } else {
            window.bowserjr.count.warning++;
            creatingLabels('warn', 'label warn', 'track exception', sectionErro);
        }

        function treatment(event, objName, index) {
            //console.log('entrou no treatment')
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
                    if (message.includes(`"${key}":${event[key]},`) || message.includes(`"${key}":${event[key]}}`)) {
                        valueCount++;
                    }
                } else if (message.includes(`"${key}":"${event[key]}",`) || message.includes(`"${key}":"${event[key]}"}`)) {
                    valueCount++;
                }
            });

            /* Verify if all event keys and event values are included in the message. */
            if (eventKeys.length == keyCount && eventKeys.length == valueCount) {
                eventKeys.forEach((key) => {
                    let tableLine = document.createElement('tr');
                    if (message.includes('WARNING') && messageWithoutObject.includes(key)) {
                        /* Paint the property that has the incorrect value. */
                        tableLine.setAttribute('id', 'warning');
                    }

                    let tableKey = document.createElement('td');
                    tableKey.setAttribute('class', 'key');
                    let keyText = index || index === 0 ? `${objName}[${index}].${key}` : `${objName}.${key}`;
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
        for (let index in window.bowserjr.dataLayer) {
            /* If the message matches an event, the function treatment returns true and gets out the for. */
            if (treatment(window.bowserjr.dataLayer[index], '')) break;
        }
    }

    window.bowserjr.file = false;
    inputJSONFile.value = '';

    successfulData.innerHTML = window.bowserjr.count.successful;
    warningData.innerHTML = window.bowserjr.count.warning;
    errorData.innerHTML = window.bowserjr.count.error;

    window.bowserjr.dataLayer = [];
    window.bowserjr.result = [];
    window.bowserjr.resultWithoutObject = [];

    var elem = document.querySelectorAll('.collapsible.expandable');
    var instance = M.Collapsible.init(elem, {
        accordion: false,
        inDuration: 1500,
        outDuration: 1000,
    });

    inputDataLayerName.value = '';
    inputJSONText.value = '';

    btnStartBowser.setAttribute('class', 'modal-close modal-trigger waves-effect orange-text text-darken-2 orange lighten-5 btn waves-orange disabled');
    document.querySelector('#export').setAttribute('class', '');
};

let fullResult = [];

btnExportLogs.addEventListener("click", () => {
    let filename = `results_${new Date().getTime()}.xlsx`;

    fullResult.push([`Contador: ${JSON.stringify(window.bowserjr.count).split(",").join(" ")}\n\n`]);

    window.bowserjr.resultExport.forEach((line) => {
        let lineExport = line.split(";");
        let lineObject = lineExport[2].split(",").join(" ");
        fullResult.push(lineExport[0], lineExport[1], lineObject, "\n");
        console.log("fullResult: ", fullResult);
    });

    let a = document.createElement("a");

    document.body.appendChild(a);

    a.style = "display: none";

    let blob = new Blob([fullResult], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;" }),
        url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);

});

// btnExportLogs.onclick = async() => {
//     var arrayURLImg = [];
//     var header;
//     const tracks = $('.track');
//     const contentTracks = $('.qsWrapper');

//     for (var i = 0; i < contentTracks.length; i++) {
//         contentTracks[i].style = 'display: inline';
//     }

//     await html2canvas(headerDOM).then(function(canvas) {
//         header = canvas.toDataURL('image/png');
//     });

//     for (var i = 0; i < tracks.length; i++) {
//         await html2canvas(tracks[i]).then(function(canvas) {
//             arrayURLImg.push(canvas.toDataURL('image/png'));
//         });
//     }

//     createPDF(arrayURLImg, header, tracks);

//     doc = new jsPDF();

//     for (var i = 0; i < contentTracks.length; i++) {
//         contentTracks[i].style = 'display: none';
//     }
// };

// const createPDF = (arrayURLImgTracks, headerURLImg, tracks) => {
//     var pageSize = 267;

//     for (var i = 0; i < tracks.length; i++) {
//         var currImageSize = tracks[i].offsetHeight * 0.25;
//         var currImage = arrayURLImgTracks[i];

//         if (i === 0 && currImageSize <= pageSize) {
//             addImageJSPDF(headerURLImg, 5, 40);
//             addImageJSPDF(currImage, 50, currImageSize);
//         } else if (accSizeContent + currImageSize < pageSize) {
//             addImageJSPDF(currImage, accSizeContent + 5, currImageSize);
//         } else {
//             doc.addPage();
//             addImageJSPDF(currImage, 5, currImageSize);
//             accSizeContent = currImageSize;
//         }
//     }

//     doc.save('BowserJR. - ' + today + '.pdf');
// };

// const addImageJSPDF = (img, verticalPosition, height) => {
//     doc.addImage(img, 'JPEG', 5, verticalPosition, 300, height, null, 'FAST', 180);
//     accSizeContent += height;
// };

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
    if (event.target == modalContent) {
        modalContent.style.display = 'none';
    }
};