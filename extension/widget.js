function getWidget() {
  let widgetHtml = `
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/fontawesome.css">
    <div id="logo-alert" class="tooltip" style="margin-right:8px;">
      <img style="width:34px;" src="https://i.imgur.com/Wm7b3yH.png" />
      <span class="tooltiptext"><b>Attention:</b> some of the results might be unsafe.</span>
    </div>
    <img id="logo-normal" style="width:38px;margin-right:8px;" src="https://i.imgur.com/VWV7Fk0.png" />

    <style>
    #logo-normal{
      display: inline-block;
    }
    #logo-alert{
      display: none;
    }
    /* Tooltip container */
    .tooltip {
      position: relative;
      display: inline-block;
    }

    /* Tooltip text */
    .tooltip .tooltiptext {
      visibility: hidden;
      width: 200px;
      background-color: #fe4f6cd1;
      color: #fff;
      text-align: center;
      padding: 5px 0;
      position: absolute;
      z-index: 9999;
      bottom: 48px;
      left: -12px;
    }

    /* Show the tooltip text when you mouse over the tooltip container */
    .tooltip:hover .tooltiptext {
      visibility: visible;
    }
    @import url(https://fonts.googleapis.com/css?family=Roboto);
.form-group select {
  width: 100%;
  font-size: 1rem;
  height: 1.6rem;
  padding: 0.125rem 0.125rem 0.0625rem;
  background: none;
  border: none;
  line-height: 1.6;
  box-shadow: none;
}
.form-group .control-label {
  position: absolute;
  top: 0.25rem;
  pointer-events: none;
  padding-left: 0.125rem;
  z-index: 1;
  color: #b3b3b3;
  font-size: 1rem;
  font-weight: normal;
  -webkit-transition: all 0.28s ease;
  transition: all 0.28s ease;
}
.form-group .bar {
  position: relative;
}
.form-group .bar::before {
  content: '';
  height: 0.125rem;
  width: 0;
  left: 50%;
  bottom: -0.0625rem;
  position: absolute;
  background: #337ab7;
  -webkit-transition: left 0.28s ease, width 0.28s ease;
  transition: left 0.28s ease, width 0.28s ease;
  z-index: 2;
}
.form-group input,
.form-group textarea {
  display: block;
  background: none;
  padding: 0.125rem 0.125rem 0.0625rem;
  font-size: 1rem;
  border-width: 0;
  border-color: transparent;
  line-height: 1.9;
  width: 100%;
  color: transparent;
  -webkit-transition: all 0.28s ease;
  transition: all 0.28s ease;
  box-shadow: none;
}
.form-group input[type="file"] {
  line-height: 1;
}
.form-group input[type="file"] ~ .bar {
  display: none;
}
.form-group select,
.form-group input:focus,
.form-group input:valid,
.form-group input.form-file,
.form-group input.has-value,
.form-group textarea:focus,
.form-group textarea:valid,
.form-group textarea.form-file,
.form-group textarea.has-value {
  color: #333;
}
.form-group select ~ .control-label,
.form-group input:focus ~ .control-label,
.form-group input:valid ~ .control-label,
.form-group input.form-file ~ .control-label,
.form-group input.has-value ~ .control-label,
.form-group textarea:focus ~ .control-label,
.form-group textarea:valid ~ .control-label,
.form-group textarea.form-file ~ .control-label,
.form-group textarea.has-value ~ .control-label {
  font-size: 0.8rem;
  color: gray;
  top: -1rem;
  left: 0;
}
.form-group select:focus,
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
}
.form-group select:focus ~ .control-label,
.form-group input:focus ~ .control-label,
.form-group textarea:focus ~ .control-label {
  color: #337ab7;
}
.form-group select:focus ~ .bar::before,
.form-group input:focus ~ .bar::before,
.form-group textarea:focus ~ .bar::before {
  width: 100%;
  left: 0;
}

#ideas-box{
    height: 100%;
    font-size: 14px;
}
#ideas-block{
    border: solid 1px #e0e4e9;
    border-radius: 8px;
    width: 32vw;
}
#ideas-block {
  select {
    width: 100%;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
}


@media(max-width:1700px) {
  #ideas-block{
    width: 30vw;
  }
}
@media(max-width:1600px) {
  #ideas-block{
    width: 28vw;
  }
}
@media(max-width:1500px) {
  #ideas-block{
    width: 26vw;
  }
}
@media(max-width:1400px) {
  #ideas-block{
    width: 24vw;
  }
}
@media(max-width:1300px) {
  #ideas-block{
    width: 22vw;
  }
}
@media(max-width:1200px) {
  #ideas-block{
    width: 19vw;
  }
}
@media(max-width:1100px) {
  #ideas-block{
    width: 17vw;
  }
}
@media(max-width:1010px) {
  #ideas-block{
    width: 32vw;
  }
}

</style>

    <div id="ideas-block" class="form-group">
        <select id="ideas-box">
            <option>Please click the new idea button..</option>
        </select>
    </div>

    <div id="loader-text"></div>
    <input type="hidden" id="thinking-sentencte" value="{THINKING_SENTENCE}" />

    <style>
    .dmate-name{
        background-color: #fd5068;
        margin-right: 6px;
        border-radius: 5px;
        color: #fff;
        padding:4px 12px;
        height: 28px;
        display:inline-block;
        text-transform: uppercase;
    }

    #dmate-suggestion{
        display: inline-block;
        padding: .35em .65em;
        font-weight: 700;
        line-height: 1;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: .25rem;
        background-color: #0d6efd;
        position: relative;
        bottom: 4px;
    }

    #loader-text{
        display: none;
        padding: 0.55em .65em;
        font-weight: 700;
        line-height: 1;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: 1rem;
        background-color: #3ca4ff;
        position: relative;
    }
    
    </style>

    <style id="loading_style">
      #loader-text:after {
          content: '{THINKING_SENTENCE}';
          animation: load 2s linear infinite;
      }
      @keyframes load {
          0% {
          content: '{THINKING_SENTENCE}';
          }
          33% {
          content: '{THINKING_SENTENCE}.';
          }
          67% {
          content: '{THINKING_SENTENCE}..';
          }
          100% {
          content: '{THINKING_SENTENCE}...';
          }
      }
    </style>

    <div class="CenterAlign Fxs(0) Fz($xs) dmate-button-right-wrapper">
        <button id="dmate-new-idea" class="dmate-buttons new-idea-active H(72px) Tt(u) Lts($ls-m) StyledButton Bg($primary-gradient):h::b C(#fff):h Fw($semibold) focus-button-style">{GENNERATE_BUTTON_TEXT}</button>
        <input type="hidden" name="recaptchaToken" id="recaptchaToken" value="none" />

        <button id="dmate-send-button" class="dmate-buttons H(72px) Tt(u) Lts($ls-m) StyledButton Bg($dmate-send-gradient):h::b C(#fff):h Fw($semibold) BdEnd Bdc($c-divider) W(50%) focus-button-style" disabled>{SEND_BUTTON_TEXT}</button>

        <a class="support_button" href="mailto:{SUPPORT_ADDRESS}?subject={SUPPORT_SUBJECT}" target="_blank" rel="nofollow noopener">
        <i class="fas fa-exclamation-triangle"></i>
        </a>
    </div>

    <style>
        .support_button {
          color: #ff7854;
          text-transform: uppercase;
          text-decoration: none;
          background: #e0e4e8;
          padding: 10px;
          border-radius: 100%;
          display: inline-block;
          border: none;
          transition: all 0.4s ease 0s;
          font-size: 14px;
          margin-left: 12px;
        }
        .dmate-button-right-wrapper{
            position: absolute;right: 28px;bottom: 9px;
        }
        #dmate-send-button{
            cursor: default;
            border-radius: 22px;
            background-color: #e0e4e9;
            color: white;
        }
        #dmate-new-idea{
            color: white;
            cursor: default;
            width: 130px;
            border-radius: 22px;
            background-color: #e0e4e9;
            margin-right: 12px;
        }
        .pick-active {
          color: black !important;
          cursor: pointer !important;
        }
        .pick-active:hover {
          {SEND_BUTTON_COLOR}
          color: white !important;
        }
        .new-idea-active{
          color: black !important;
          cursor: pointer !important;
        }
        .new-idea-active:hover{
          {GENNERATE_BUTTON_COLOR}
          color: white !important;
        }
        .dmate-buttons{
            height: 40px;
        }
        .dmate-wrapper{
            width: 100%;
            height: 60px;
            padding: 12px;
        }
    </style>
`;

  widgetHtml = widgetHtml.split("{SEND_BUTTON_TEXT}").join(SEND_BUTTON_TEXT);
  widgetHtml = widgetHtml.split("{SEND_BUTTON_COLOR}").join(SEND_BUTTON_COLOR);
  widgetHtml = widgetHtml.split("{GENNERATE_BUTTON_TEXT}").join(GENNERATE_BUTTON_TEXT);
  widgetHtml = widgetHtml.split("{GENNERATE_BUTTON_COLOR}").join(GENNERATE_BUTTON_COLOR);
  widgetHtml = widgetHtml.split("{SUPPORT_ADDRESS}").join(SUPPORT_ADDRESS);
  widgetHtml = widgetHtml.split("{SUPPORT_SUBJECT}").join(SUPPORT_SUBJECT);
  widgetHtml = widgetHtml.split("{RECAPTCHA_KEY}").join(RECAPTCHA_KEY);

  // Thinking Sentence
  let sentence = THIKNING_SENTENCES[Math.floor(Math.random() * THIKNING_SENTENCES.length)];
  widgetHtml = widgetHtml.split("{THINKING_SENTENCE}").join(sentence);

  return widgetHtml;
}