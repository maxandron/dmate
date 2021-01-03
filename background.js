chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({apikey: 'undefined'}, function() {
    console.log("api key set to nothing");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'tinder.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
