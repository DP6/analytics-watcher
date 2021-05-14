chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.message) {
        case "background_bowser_script":
            chrome.tabs.query({ active: true }, function(tabs) {
                chrome.tabs.sendMessage(request.tabID, {
                    message: "inject_bowser_script",
                    datalayer: request.dataLayerName
                }, function(response) {
                    if (response.message == "script_injected_successfully") {
                        // console.log("Foi");
                    }
                });
            });
            break;
        case "script_injected_successfully":
            sendResponse({
                message: "teste_ok"
            });
            break;
        default:
            break;
    }
});