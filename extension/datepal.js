function isLoaded() {
    let conversation_block = getElementByXpath(CONV_BLOCK_XPATH);
    return conversation_block != 'undefined' && conversation_block != null;
}

function getMessages(whoSent) {
    if (whoSent == 'match') {
        baseXpath = MATCH_MESSAGES_XPATH
    }
    if (whoSent == 'user') {
        baseXpath = USER_MESSAGES_XPATH
    }
    if (whoSent == 'all') {
        baseXpath = ALL_MESSAGES_XPATH
    }

    var currentMessageBlock = true;
    var index = 1;
    var matchMessages = [];

    while (currentMessageBlock) {
        currentXpath = baseXpath.replace("divIndex", index)
        currentMessageBlock = getElementByXpath(currentXpath);
        if (currentMessageBlock) {
            currentMessage = getElementByXpath(currentXpath + "/div[3]/span[1]");
            if (currentMessage) {
                matchMessages.push(currentMessage.innerHTML);
            }
        }
        index += 1
    }

    return matchMessages;
}

function orderMessages(myMessages, allMessages) {
    var orderedMessages = []

    allMessages.forEach(function (entry) {

        if (myMessages.includes(entry)) {
            orderedMessages.push({"User": entry});
        } else {
            orderedMessages.push({"Match": entry});
        }
    });

    return orderedMessages;
}

function injectDatepalWidget() {
    var datepal = document.createElement("div");
    datepal.id = "datepal";
    datepalClasses.forEach(element => datepal.classList.add(element));
    datepal.innerHTML = getWidget();
    let conversation_block = getElementByXpath(CONV_BLOCK_XPATH);
    insertAfter(datepal, conversation_block);
}

function getConversationMessage() {
    var myMessages = getMessages("user");
    var allMessages = getMessages("all");
    var orderedMessages = orderMessages(myMessages, allMessages);
    return orderedMessages;
}

function getNewIdeaClick() {

    // Show loading
    document.getElementById('loader-text').style.display = "inline-block";
    document.getElementById('ideas-block').style.display = "none";

    // Get data
    var messages = {
        'input': getConversationMessage(),
        'match_name': localStorage.getItem('currentMatchName'),
        'match_description': localStorage.getItem('currentMatchDescription'),
        'match_interests': localStorage.getItem('currentMatchInterests')
    };

    console.log(messages);

    chrome.runtime.sendMessage(
        {
            contentScriptQuery: 'datepalGenerate',
            data: JSON.stringify(messages),
        }, function (response) {
            console.log(response);
            setIdeas(response);
        });
}

function setIdeas(ideas){

    // Remove current option
    var ideasBox = document.getElementById('ideas-box');
    var length = ideasBox.options.length;
    for (i = length-1; i >= 0; i--) {
        ideasBox.options[i] = null;
    }

    // Add new options
    ideas.forEach(function (idea) {
        var option = document.createElement("option");
        option.text = idea;
        option.value = idea;
        ideasBox.add(option);
    });

    document.getElementById('loader-text').style.display = "none";
    document.getElementById('ideas-block').style.display = "inline-block";
}

function sendClick() {
    var selectedIdea = document.getElementById('ideas-box').value;
    var inputField = getElementByXpath(MESSAGE_INPUT_XPATH);
    inputField.value = selectedIdea;
}

function consoleLogMessage(messages) {
    var messagesString = '';
    messages.forEach(function (entry) {
        var entry = Object.entries(entry);
        messagesString += entry[0][0] + ': ' + entry[0][1] + '\n';
    });
    console.log(messagesString);
}

function getInterests(){
    var index = 1;
    var interests = "";

    while (true) {
        var currentXpath = getElementByXpath(MATCH_INERESTS_XPATH.replace("interestIdex", index));
        
        if(currentXpath){
            interests += currentXpath.innerHTML + ", ";
        } else{
            return interests.slice(0, -2);
        }
        
        index += 1
    }
}

function getInitialData(){
    localStorage.setItem('currentMatchName', getElementByXpath(MATCH_NAME_XPATH).innerHTML);
    localStorage.setItem('currentMatchInterests', getInterests());
    try{
        localStorage.setItem('currentMatchDescription', getElementByXpath(MATCH_DESCRIPTION_XPATH).innerHTML);
    } catch(e){
        localStorage.setItem('currentMatchDescription', '');
        console.log(e);
    }
        
    // console.log("Match name: " + localStorage.getItem('currentMatchName'));
    // console.log("Match description: " + localStorage.getItem('currentMatchName'));
    consoleLogMessage(getConversationMessage());
}

function mainFlow() {
    injectDatepalWidget();

    setTimeout(function () {
        try {
            getInitialData()
        }
        catch(err) {
            console.log(err)
            setTimeout(function () {
                getInitialData()
            }, 1000);
        }
    }, 1000);

}

var waitForEl = function (callback) {
    if (isLoaded()) {
        callback();
    }
    setTimeout(function () {
        waitForEl(callback);
    }, 500);
};

var datepalClasses = ["datepal-wrapper", "D(f)", "W(100%)", "BdT", "Bdtc($c-divider)", "Bgc(#fff)", "Pos(r)"];

waitForEl(function () {
    if (!document.getElementById("datepal")) {
        mainFlow();

        // Send button was clicked
        document.getElementById('datepal-send-button').onclick = function () {
            sendClick();
        };
        // New idea button was clicked
        document.getElementById('datepal-new-idea').onclick = function () {
            getNewIdeaClick();
        };

    }
});



