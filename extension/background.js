chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({apikey: 'undefined'}, function() {
    console.log("api key set to nothing");
  });
});
