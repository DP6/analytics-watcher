chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.message) {
        case 'background_penguinDataLayer_script':
            chrome.tabs.query({ active: true }, function(tabs) {
                chrome.tabs.sendMessage(
                    request.tabID, {
                        message: 'inject_penguinDataLayer_script',
                        datalayer: request.dataLayerName,
                    },
                    function(response) {}
                );
            });
            break;
        case 'script_injected_successfully':
            sendResponse({
                message: 'status ok',
            });
            break;
        default:
            break;
    }
});