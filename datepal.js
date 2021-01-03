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

function getMessages(whoSent){
  if(whoSent == 'match'){
    baseXpath = "//div[contains(@class, 'msgWrp') and contains(@class, 'Pstart(62px)')][divIndex]/div[1]"
  }
  if(whoSent == 'me'){
    baseXpath = "//div[contains(@class, 'msgWrp') and contains(@class, 'Pstart(100px)')][divIndex]/div[1]"
  }
  if(whoSent == 'all'){
    baseXpath = "//div[contains(@class, 'msgWrp')][divIndex]/div[1]"
  }
  
  var currentMessageBlock = true;
  var index = 1;
  var matchMessages = [];

  while(currentMessageBlock){
    currentXpath = baseXpath.replace("divIndex", index)
    currentMessageBlock = getElementByXpath(currentXpath);
    if(currentMessageBlock){
      currentMessage = getElementByXpath(currentXpath + "/div[3]/span[1]");
      if(currentMessage){
        matchMessages.push(currentMessage.innerHTML);
      }
    }
    index += 1
  }

  return matchMessages;
}

function orderMessages(myMessages, allMessages){
  var orderedMessages = []

  allMessages.forEach(function(entry) {
    
    if(myMessages.includes(entry)){
      orderedMessages.push({"Me": entry});
    } else{
      orderedMessages.push({"Match": entry});
    }
  });
  
  return orderedMessages;
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

        setTimeout(function() {
          var myMessages = getMessages("me");
          // var matchMessages = getMessages("match");
          var allMessages = getMessages("all");
          var orderedMessages = orderMessages(myMessages, allMessages);
          console.log(orderedMessages);
        }, 2000);
        
    }
});

