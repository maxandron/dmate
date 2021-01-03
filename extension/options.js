let apikey_input = document.getElementById('apikey');

chrome.storage.sync.get('apikey', function(data) {
  apikey_input.value = data.apikey;
});

let savebtn = document.getElementById('savebtn');
savebtn.onclick = function(element) {
    chrome.storage.sync.set({apikey: apikey_input.value}, function() {
        console.log('api key changed');
        alert("Saved");
    });
}
