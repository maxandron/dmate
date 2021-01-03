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
  } else {
    setTimeout(function() {
      waitForEl(callback);
    }, 1000);
  }
};

history.pushState = ( f => function pushState(){
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
})(history.pushState);

history.replaceState = ( f => function replaceState(){
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('replacestate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
})(history.replaceState);

window.addEventListener('popstate',()=>{
    window.dispatchEvent(new Event('locationchange'))
});

window.addEventListener('locationchange', function(){
    console.log('location changed');
    waitForEl(function() {
        console.log('before insert');
        var datapal = document.createElement("div");
        datapal.innerHTML = "test";
        let conversation_block = getElementByXpath(conversation_block_xpath);
        insertAfter(datapal, conversation_block);
        console.log("after insert");
    });
})


