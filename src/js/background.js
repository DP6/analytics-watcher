chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.message) {
        case 'background_penguindatalayer_script':
            chrome.tabs.query({ active: true }, function(tabs) {
                chrome.tabs.sendMessage(
                    request.tabID, {
                        message: 'inject_penguindatalayer_script',
                        datalayer: request.dataLayerName,
                    },
                    function(response) {
                        if (response.message == 'script_injected_successfully') {}
                    }
                );
            });
            break;
        case 'script_injected_successfully':
            sendResponse({
                message: 'teste_ok',
            });
            break;
        default:
            break;
    }
});