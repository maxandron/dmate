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
            orderedMessages.push(["User", entry]);
        } else {
            orderedMessages.push(["Match", entry]);
        }
    });

    return orderedMessages;
}

function injectDMateWidget() {
    var dmate = document.createElement("div");
    dmate.id = "dmate";
    dmateClasses.forEach(element => dmate.classList.add(element));
    dmate.innerHTML = getWidget();
    let conversation_block = getElementByXpath(CONV_BLOCK_XPATH);
    insertAfter(dmate, conversation_block);
}

function getConversationMessage() {
    var myMessages = getMessages("user");
    var allMessages = getMessages("all");
    var orderedMessages = orderMessages(myMessages, allMessages);
    return orderedMessages;
}

function changeThinkingSentece(){
    // Get current sentence and style
    let currentSentenceElement = document.getElementById("thinking-sentencte");
    let currentSentence = currentSentenceElement.value;
    let currentStyle = document.getElementById("loading_style");
    
    // Generate new sentence
    let newSentence = THIKNING_SENTENCES[Math.floor(Math.random() * THIKNING_SENTENCES.length)];
    let newStyle = currentStyle.innerHTML.split(currentSentence).join(newSentence);

    // Set them on the page
    currentSentenceElement.value = newSentence;
    currentStyle.innerHTML = newStyle;
}

function getNewIdeaClick() {

    // Show loading
    document.getElementById('loader-text').style.display = "inline-block";
    document.getElementById('ideas-block').style.display = "none";

    // Change pick button
    let sendButon = document.getElementById('dmate-send-button')
    sendButon.disabled = true;
    sendButon.classList.remove("pick-active");

    // Change new idea button
    let newIdeaButon = document.getElementById('dmate-new-idea')
    newIdeaButon.disabled = true;
    newIdeaButon.classList.remove("new-idea-active");

    getRecaptchaToken(function(token) {
        // Get data
        // console.log(JSON.parse(localStorage.getItem('currentMatchInterests')))
        let payload = {
            'messages': getConversationMessage(),
            'match_name': localStorage.getItem('currentMatchName'),
            'match_interests': JSON.parse(localStorage.getItem('currentMatchInterests')),
            'version': chrome.runtime.getManifest()['version'],
            'recaptcha_token': token
        };
        // TODO: give real token in prod, It's for debugging to save OpenAI Credits

        console.log(payload);

        chrome.runtime.sendMessage(
            {
                contentScriptQuery: 'dmateGenerate',
                data: JSON.stringify(payload),
            }, function (response) {
                console.log(response);
                changeThinkingSentece();
                setIdeas(response);
            });
    });

}

function getRecaptchaToken(callback){
    let token = "none";
    token = document.getElementById('recaptchaToken').value;
    if (token != "none") {
        document.getElementById('recaptchaToken').value = "none";
        callback(token);
    } else {
        // todo: check that getRecaptchaToken was not called more that X times
        setTimeout(getRecaptchaToken, 100, callback);
    }
}

function setIdeas(ideas) {

    // Remove current option
    var ideasBox = document.getElementById('ideas-box');
    var length = ideasBox.options.length;
    for (i = length - 1; i >= 0; i--) {
        ideasBox.options[i] = null;
    }

    // Add new options
    ideas.forEach(function (idea) {
        var option = document.createElement("option");
        option.text = idea;
        option.value = idea;
        ideasBox.add(option);
    });

    // Disaply selectbox
    document.getElementById('loader-text').style.display = "none";
    document.getElementById('ideas-block').style.display = "inline-block";

    // Change pick button
    var sendButon = document.getElementById('dmate-send-button')
    sendButon.disabled = false;
    sendButon.classList.add("pick-active");

    // Change new idea button
    var newIdeaButon = document.getElementById('dmate-new-idea')
    newIdeaButon.disabled = false;
    newIdeaButon.classList.add("new-idea-active");
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

function getInterests() {
    var index = 1;
    var interests = [];

    while (true) {
        var currentXpath = getElementByXpath(MATCH_INERESTS_XPATH.replace("interestIdex", index));

        if (currentXpath) {
            interests.push(currentXpath.innerHTML);
            // console.log(currentXpath.innerHTML);
        } else {
            // console.log(interests);
            return interests;
        }

        index += 1
    }
}

function getInitialData() {
    localStorage.setItem('currentMatchName', getElementByXpath(MATCH_NAME_XPATH).innerHTML);
    localStorage.setItem('currentMatchInterests', JSON.stringify(getInterests()));

    // consoleLogMessage(getConversationMessage());
}

function mainFlow() {
    injectDMateWidget();

    setTimeout(function () {
        try {
            getInitialData()
        }
        catch (err) {
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

var dmateClasses = ["dmate-wrapper", "D(f)", "W(100%)", "BdT", "Bdtc($c-divider)", "Bgc(#fff)", "Pos(r)"];

waitForEl(function () {
    if (!document.getElementById("dmate")) {
        mainFlow();

        // Send button was clicked
        document.getElementById('dmate-send-button').onclick = function () {
            sendClick();
        };

        // New idea button was clicked
        document.getElementById('dmate-new-idea').onclick = function () {

            var reCaptchaLoad = document.createElement('script');
            reCaptchaLoad.type = 'text/javascript';
            reCaptchaLoad.text = "grecaptcha.ready(function(){grecaptcha.execute('" + RECAPTCHA_KEY + "', {action: 'submit'}).then(function(token) {document.getElementById('recaptchaToken').value = token;});});";
            reCaptchaLoad.onload = function() {
                this.parentNode.removeChild(this);
            };
            (document.head || document.documentElement).appendChild(reCaptchaLoad);
            
            getNewIdeaClick();
        };

    }
});



