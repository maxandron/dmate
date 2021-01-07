chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({apikey: 'undefined'}, function () {
        console.log("api key set to nothing");
    });
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        console.log('got message');
        fetch(DATEPAL_BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: request.data
        })
            .then(response => response.json())
            .then(response => sendResponse(response))
            .catch(error => console.log('Error:', error));
        return true;
    });
});

