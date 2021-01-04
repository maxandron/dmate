// Constants
//  XPATHS
const CONV_BLOCK_XPATH      = "//div[@aria-label='Conversation history']";
const MATCH_MESSAGES_XPATH  = "//div[contains(@class, 'msgWrp') and contains(@class, 'Pstart(62px)')][divIndex]/div[1]";
const MY_MESSAGES_XPATH     = "//div[contains(@class, 'msgWrp') and contains(@class, 'Pstart(100px)')][divIndex]/div[1]";
const ALL_MESSAGES_XPATH    = "//div[contains(@class, 'msgWrp')][divIndex]/div[1]"
const MESSAGE_INPUT_XPATH   = "//*[@placeholder='Type a message ...']";

function isLoaded() {
    let conversation_block = getElementByXpath(CONV_BLOCK_XPATH);
    return conversation_block != 'undefined' && conversation_block != null;
}

function getMessages(whoSent){
  if(whoSent == 'match'){
    baseXpath = MATCH_MESSAGES_XPATH
  }
  if(whoSent == 'me'){
    baseXpath = MY_MESSAGES_XPATH
  }
  if(whoSent == 'all'){
    baseXpath = ALL_MESSAGES_XPATH
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

function injectDatepalWidget(){
  var datepal = document.createElement("div");
  datepal.id = "datepal";
  datepalClasses.forEach(element => datepal.classList.add(element));
  datepal.innerHTML = getWidget();
  let conversation_block = getElementByXpath(CONV_BLOCK_XPATH);
  insertAfter(datepal, conversation_block);
}

function getConversationMessage(){
  var myMessages = getMessages("me");
  var allMessages = getMessages("all");
  var orderedMessages = orderMessages(myMessages, allMessages);
  return orderedMessages;
}

function getNewIdeaClick(){
  document.getElementById('loader-text').style.display = "None";
  document.getElementById('datepal-suggestion').style.display = "inline-block";
}

function sendClick(){
  var selectedIdea = document.getElementById('datepal-suggestion').innerText;
  var inputField = getElementByXpath(MESSAGE_INPUT_XPATH);
  inputField.value = selectedIdea;
}

function mainFlow(){
  injectDatepalWidget();

  setTimeout(function() {
    var messages = getConversationMessage();
    console.log(messages);
  }, 2000);

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
      mainFlow();

      // Send button was clicked
      document.getElementById('datepal-send-button').onclick = function(){
        sendClick();
      };
      // New idea button was clicked
      document.getElementById('datepal-new-idea').onclick = function(){
        getNewIdeaClick();
      };

    }
});



