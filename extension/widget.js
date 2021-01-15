function getWidget() {
    let widgetHtml = `
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/fontawesome.css">
    <span class="datepal-name">Datepal:</span>
  
    
    <style>
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
    min-width: 600px;
    border-radius: 8px;
}

</style>

    <div id="ideas-block" class="form-group">
        <select id="ideas-box">
            <option>Please click the new idea button..</option>
        </select>
        <i class="bar"></i>
    </div>

    <div id="loader-text"></div>

    <style>
    .datepal-name{
        background-color: #fd5068;
        margin-right: 6px;
        border-radius: 5px;
        color: #fff;
        padding:4px 12px;
        height: 28px;
        display:inline-block;
        text-transform: uppercase;
    }

    #datepal-suggestion{
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
        padding: .35em .65em;
        font-weight: 700;
        line-height: 1;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: .25rem;
        background-color: #3ca4ff;
        position: relative;
        height: 28px;
    }
    
    #loader-text:after {
        content: 'Thinking';
        animation: load 2s linear infinite;
    }
    @keyframes load {
        0% {
        content: 'Thinking';
        }
        33% {
        content: 'Thinking.';
        }
        67% {
        content: 'Thinking..';
        }
        100% {
        content: 'Thinking...';
        }
    }
    </style>
    
    <div class="CenterAlign Fxs(0) Fz($xs) datepal-button-right-wrapper">
        <button id="datepal-new-idea" class="datepal-buttons H(72px) Tt(u) Lts($ls-m) StyledButton Bg($primary-gradient):h::b C(#fff):h Fw($semibold) focus-button-style">{GENNERATE_BUTTON_TEXT}</button>
        <button id="datepal-send-button" class="datepal-buttons H(72px) Tt(u) Lts($ls-m) StyledButton Bg($datepal-send-gradient):h::b C(#fff):h Fw($semibold) BdEnd Bdc($c-divider) W(50%) focus-button-style">{SEND_BUTTON_TEXT}</button>
    </div>

    <style>
        .datepal-button-right-wrapper{
            position: absolute;right: 28px;bottom: 9px;
        }
        #datepal-send-button{
            //display: none;
            border-radius: 22px;
            background-color: #e0e4e9;
        }
        #datepal-new-idea{
            width: 114px;
            border-radius: 22px;
            background-color: #e0e4e9;
            margin-right: 12px;
        }
        #datepal-new-idea:hover{
          {GENNERATE_BUTTON_COLOR}
        }
        #datepal-send-button:hover {
          {SEND_BUTTON_COLOR}
        }
        .datepal-buttons{
            height: 40px;
        }
        .datepal-wrapper{
            width: 100%;
            height: 60px;
            padding: 12px;
        }
    </style>
`;

widgetHtml = widgetHtml.replace("{SEND_BUTTON_TEXT}", SEND_BUTTON_TEXT);
widgetHtml = widgetHtml.replace("{SEND_BUTTON_COLOR}", SEND_BUTTON_COLOR);
widgetHtml = widgetHtml.replace("{GENNERATE_BUTTON_TEXT}", GENNERATE_BUTTON_TEXT);
widgetHtml = widgetHtml.replace("{GENNERATE_BUTTON_COLOR}", GENNERATE_BUTTON_COLOR);

return widgetHtml;
}