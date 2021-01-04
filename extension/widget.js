function getWidget() {
    return `
    <style>
        .datepal-send:hover {
            background: linear-gradient(262deg, #aefd7c, #02C39A);
        }
        .datepal-wrapper{
            width: 100%;
            height: 60px;
            padding: 17px;
        }
    </style>
    

    <span class="datepal-name">Datepal:</span>
    <div style="margin-top: 5px;">
        <span class="datepal-suggestion">
            I would be intrested to know the real you.
        </span>
        <div class="loader-text"></div>
    </div>

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

    .datepal-suggestion{
        display: none;
    }

    .loader-text{
        display: inline-block;
    }
    
    .loader-text:after {
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
    
    <div class="CenterAlign Pos(r) W(100%) Fxs(0) Z(1) Fz($xs) Bgc($c-bg) Fw($semibold) Cur(p) BdT Bdc($c-divider) C($c-secondary)"
        style="height: 40px;position: absolute;right: 28px;bottom: 9px;width: 212px;"><button
            class="datepal-send H(72px) Tt(u) Lts($ls-m) StyledButton Bg($datepal-send-gradient):h::b C(#fff):h Fw($semibold) BdEnd Bdc($c-divider) W(50%) focus-button-style datepal-send"
            style="height: 40px;">Send</button>
            <button class="H(72px) W(50%) Tt(u) Lts($ls-m) StyledButton Bg($primary-gradient):h::b C(#fff):h Fw($semibold) focus-button-style"
            style="
    height: 40px;
">Regenerate</button></div>

`;
}