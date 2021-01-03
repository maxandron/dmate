function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

let conversation_block_xpath = '//div[@aria-label="Conversation history"]'

function isLoaded() {
    let conversation_block = getElementByXpath(conversation_block_xpath);
    return conversation_block != 'undefined' && conversation_block != null;
}

var waitForEl = function(callback) {
  if (isLoaded()) {
    console.log('loaded!');
    callback();
  }
  setTimeout(function() {
    waitForEl(callback);
  }, 500);
};

var datepalClasses = ["datepal-wrapper", "D(f)", "W(100%)", "BdT", "Bdtc($c-divider)", "Bgc(#fff)", "Pos(r)"];

waitForEl(function() {
    if(!document.getElementById("datepal")) {
        var datepal = document.createElement("div");
        datepal.id = "datepal";
        datepalClasses.forEach(element => datepal.classList.add(element));
        datepal.innerHTML = getWidget();
        let conversation_block = getElementByXpath(conversation_block_xpath);
        insertAfter(datepal, conversation_block);
    }
});
