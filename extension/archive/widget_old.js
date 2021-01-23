function getWidget() {
    let widgetHtml = `
    <span class="dmate-name">DMate:</span>
    <div style="margin-top: 5px;">
        <span id="dmate-suggestion">
            You look very interesting...
        </span>
        <div id="loader-text"></div>
    </div>

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
    
    <div class="CenterAlign Pos(r) Fxs(0) Z(1) Fz($xs) Bgc($c-bg) Fw($semibold) Cur(p) BdT Bdc($c-divider) C($c-secondary)" style="height: 40px;position: absolute;right: 28px;bottom: 9px;width: 212px;">
        <button id="dmate-new-idea" class="dmate-buttons H(72px) Tt(u) Lts($ls-m) StyledButton Bg($primary-gradient):h::b C(#fff):h Fw($semibold) focus-button-style">{GENNERATE_BUTTON_TEXT}</button>
        <button id="dmate-send-button" class="dmate-buttons H(72px) Tt(u) Lts($ls-m) StyledButton Bg($dmate-send-gradient):h::b C(#fff):h Fw($semibold) BdEnd Bdc($c-divider) W(50%) focus-button-style">{SEND_BUTTON_TEXT}</button>
    </div>

    <style>
        #dmate-send-button{
            display: none;
        }
        #dmate-send-button:hover {
            {SEND_BUTTON_COLOR}
        }
        .dmate-buttons{
            height: 40px;
        }
        .dmate-wrapper{
            width: 100%;
            height: 60px;
            padding: 17px;
        }
    </style>
`;

widgetHtml = widgetHtml.replace("{SEND_BUTTON_TEXT}", SEND_BUTTON_TEXT);
widgetHtml = widgetHtml.replace("{SEND_BUTTON_COLOR}", SEND_BUTTON_COLOR);
widgetHtml = widgetHtml.replace("{GENNERATE_BUTTON_TEXT}", GENNERATE_BUTTON_TEXT);

return widgetHtml;
}