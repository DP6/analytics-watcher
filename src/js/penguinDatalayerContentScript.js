chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message == 'inject_penguindatalayer_script') {
        var script = document.createElement('script');
        script.innerHTML = ` 
        if (!window["${request.datalayer}"].push_c) {
            window["${request.datalayer}"].forEach((elem, index, array) => {
                try {
                    window.postMessage({
                        dataLayer: "dispatch_datalayer_object_from_window",
                        datalayer_object: JSON.parse(JSON.stringify(elem)),
                        url: window.location.href
                    }, "*");
                } catch (error) {
                    console.error(\`PenguinDataLayer
ERROR, event not validated: \${array[index].event}
Event index: \${index}
Error: \${error}
                    \`)
                }
            });
            window["${request.datalayer}"].push_c = window["${request.datalayer}"].push;
            window["${request.datalayer}"].push = function (obj) {
                window["${request.datalayer}"].push_c(obj);
                window.postMessage({
                    dataLayer: "dispatch_datalayer_object_from_window",
                    datalayer_object: obj,
                    url: window.location.href
                }, "*");
            }
        };`;
        document.head.appendChild(script);
    }
    sendResponse({
        message: 'script_injected_successfully',
    });
});

window.addEventListener('message', function (event) {
    if (
        event.data.dataLayer &&
        event.data.dataLayer == 'dispatch_datalayer_object_from_window'
    ) {
        chrome.runtime.sendMessage(
            'aonbjkefnlgopjecdlhdllklkoppcjkn', {
                message: 'accepted',
                datalayer_object: event.data.datalayer_object,
                url: event.data.url,
            },
            function (response) { }
        );
    }
});