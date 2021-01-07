// Listen for requests to forward to backend
chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
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

