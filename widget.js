function getWidget() {
return `<div class="D(f) W(100%) BdT Bdtc($c-divider) Bgc(#fff) Pos(r)" style="
    width: 100%;
    height: 60px;
    padding: 17px;
    ">
    <span class="" style="
    background-color: #fd5068;
    margin-right: 6px;
    border-radius: 5px;
    color: #fff;
    padding:4px 12px;
    height: 28px;
    display:inline-block;
    text-transform: uppercase;
">Datepal:</span>
    <span style="
    margin-top: 5px;
    display: none;
">I would be intrested to know the real you.
    </span>
    <div class="loading">
        <span>Loading</span>
    </div>
    <style>
        .loading span {

            z-index: 999;
            color: #fff;
            position: relative;
            left: 100px;
        }

        .loading:before {
            content: '';
            background: #61bdb6;
            width: 128px;
            height: 36px;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;

            animation: 2s loadingBefore infinite ease-in-out;
        }

        @keyframes loadingBefore {
            0% {
                transform: translateX(-14px);
            }

            50% {
                transform: translateX(14px);
            }

            100% {
                transform: translateX(-14px);
            }
        }


        .loading:after {
            content: '';
            background: #ff3600;
            width: 14px;
            height: 60px;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            opacity: .5;

            animation: 2s loadingAfter infinite ease-in-out;
        }

        @keyframes loadingAfter {
            0% {
                transform: translateX(-50px);
            }

            50% {
                transform: translateX(50px);
            }

            100% {
                transform: translateX(-50px);
            }
        }
    </style>

    <div class="CenterAlign Pos(r) W(100%) Fxs(0) Z(1) Fz($xs) Bgc($c-bg) Fw($semibold) Cur(p) BdT Bdc($c-divider) C($c-secondary)"
        style="height: 40px;position: absolute;right: 28px;bottom: 9px;width: 212px;"><button
            class="H(72px) Tt(u) Lts($ls-m) StyledButton Bg($datepal-send-gradient):h::b C(#fff):h Fw($semibold) BdEnd Bdc($c-divider) W(50%) focus-button-style datepal-send"
            style="
    width: 111px;
    height: 40px;
">Send</button><button
            class="H(72px) W(50%) Tt(u) Lts($ls-m) StyledButton Bg($primary-gradient):h::b C(#fff):h Fw($semibold) focus-button-style"
            style="
    height: 40px;
">Regenerate</button></div>

    <style>
        .Bg\(\$datepal-send-gradient\)\:h\:\:b:hover::before {
            background: linear-gradient(262deg, #aefd7c, #02C39A);
        }
    </style>
</div>`;
}
