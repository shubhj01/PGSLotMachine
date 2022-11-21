//Dummy JSON responses
let data = [

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [2, 5, 2, 1]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 8,
                "symbolIDs": [5, 5, 5, 1]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [0, 3, 1, 4]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [5, 4, 1, 1]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 2,
                "symbolIDs": [1, 1, 5, 3]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 4,
                "symbolIDs": [2, 2, 2, 3]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 4,
                "symbolIDs": [5, 5, 2, 2]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 3,
                "symbolIDs": [2, 2, 3, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [4, 5, 3, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 8,
                "symbolIDs": [5, 5, 5, 3]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 9,
                "symbolIDs": [3, 3, 3, 3]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 6,
                "symbolIDs": [4, 4, 4, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 1,
                "symbolIDs": [0, 0, 3, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 5,
                "symbolIDs": [1, 1, 1, 2]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [2, 5, 2, 2]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 5,
                "symbolIDs": [2, 2, 2, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [4, 3, 0, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 6,
                "symbolIDs": [3, 3, 3, 0]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 8,
                "symbolIDs": [2, 2, 2, 2]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [0, 1, 5, 4]
            }
        }
    },

]

// simple application configuration
let config = { width: 1920, height: 1080 }


let app;



// wait for DOM before creating application
window.addEventListener('load', function () {
    //Create a Pixi Application
    app = new PIXI.Application(config);

    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view);

    // symbol assets paths
    const symbolAssets = [{ id: 'symbol0json', path: './assets/symbols/symbol_00.json' }, { id: 'symbol1json', path: './assets/symbols/symbol_01.json' },
    { id: 'symbol2json', path: './assets/symbols/symbol_02.json' }, { id: 'symbol3json', path: './assets/symbols/symbol_03.json' },
    { id: 'symbol4json', path: './assets/symbols/symbol_04.json' }, { id: 'symbol5json', path: './assets/symbols/symbol_05.json' }];


    // variables declaration and initializations
    const symbolObj = [];
    const loader = app.loader;
    let spinBtn, betIncBtn, betDecBtn;
    let normalTexture, disableTexture;
    let betDecNormalTexture, betIncNormalTexture, betDecDisableTexture, betIncDisableTexture;
    let balanceAmt, stakeAmt, winAmt;
    const stakeValues = [10, 20, 30];
    const symbolsPerReel = 24;
    let symbolContainer, symbolContainer0, symbolContainer1, symbolContainer2, symbolContainer3;
    startLoading();

    // to start assets , text, fonts and buttons loadings
    function startLoading() {
        symbolAssets.forEach((value) => {
            loader.add(value.id, value.path);
        }, this)
        loadText();
        loadFonts();
        loadButtons();
        loader.load(initalizeSymbols);
    }

    // to show static symbols
    function initalizeSymbols(loader, res) {

        initializeReelContainers();
        createReelMask();
        for (let i = 0; i < (symbolAssets.length * symbolsPerReel); i++) {
            const j = i % 6;
            symbolObj.push(new PIXI.spine.Spine(res[symbolAssets[j].id].spineData));
            if (Math.floor(i / symbolsPerReel) === 0) {
                let y = 50 + (70 * (i % symbolsPerReel));
                symbolObj[i].position.set(100, y);
                symbolContainer0.addChild(symbolObj[i]);
            } else if (Math.floor(i / symbolsPerReel) === 1) {
                let y = 50 + (70 * (i % symbolsPerReel));
                symbolObj[i].position.set(200, y);
                symbolContainer1.addChild(symbolObj[i]);
            } else if (Math.floor(i / symbolsPerReel) === 2) {
                let y = 50 + (70 * (i % symbolsPerReel));
                symbolObj[i].position.set(300, y);
                symbolContainer2.addChild(symbolObj[i]);
            } else if (Math.floor(i / symbolsPerReel) === 3) {
                let y = 50 + (70 * (i % symbolsPerReel));
                symbolObj[i].position.set(400, y);
                symbolContainer3.addChild(symbolObj[i]);
            }
            symbolObj[i].scale.set(0.5, 0.5);
            symbolObj[i].state.setAnimation(0, 'static', false);
        }
    }

    // to initialize symbols parents
    function initializeReelContainers() {
        symbolContainer = new PIXI.Container();
        symbolContainer0 = new PIXI.Container();
        symbolContainer1 = new PIXI.Container();
        symbolContainer2 = new PIXI.Container();
        symbolContainer3 = new PIXI.Container();
        symbolContainer0.y = -1260;
        symbolContainer1.y = -1260;
        symbolContainer2.y = -1260;
        symbolContainer3.y = -1260;
        app.stage.addChild(symbolContainer);
        symbolContainer.addChild(symbolContainer0);
        symbolContainer.addChild(symbolContainer1);
        symbolContainer.addChild(symbolContainer2);
        symbolContainer.addChild(symbolContainer3);
    }

    // to create reel mask for spinning
    function createReelMask() {
        const reelMask = new PIXI.Graphics();
        reelMask.beginFill(0xff0000);
        reelMask.drawRect(0, 0, 370, 415);
        reelMask.position.set(64, 14);
        reelMask.alpha = 0.5;
        app.stage.addChild(reelMask);
        symbolContainer.mask = reelMask;
    }

    // to initialize game static texts
    function loadText() {
        const balance = new PIXI.Text('Balance:', {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xff1010,
            align: 'center',
        });
        balance.y = 450;
        const stake = new PIXI.Text('Stakes:', {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xff1010,
            align: 'center',
        });
        stake.x = 300;
        stake.y = 450;
        const win = new PIXI.Text('Win:', {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xff1010,
            align: 'center',
        });
        win.x = 570;
        win.y = 450;
        app.stage.addChild(balance);
        app.stage.addChild(stake);
        app.stage.addChild(win);
    }

    // to initialize game amounts font files
    function loadFonts() {
        loader.add('amountFonts', './assets/bitmapFonts/desyrel.xml').load(() => {
            balanceAmt = new PIXI.BitmapText('1000', { fontName: 'Desyrel', fontSize: 50, align: 'center' });
            stakeAmt = new PIXI.BitmapText('10', { fontName: 'Desyrel', fontSize: 50, align: 'center' });
            winAmt = new PIXI.BitmapText('0', { fontName: 'Desyrel', fontSize: 50, align: 'center' });
            balanceAmt.position.set(90, 430);
            stakeAmt.position.set(440, 430);
            winAmt.position.set(615, 430);
            app.stage.addChild(balanceAmt);
            app.stage.addChild(stakeAmt);
            app.stage.addChild(winAmt);
        }
        );
    }

    // to initialize game buttons
    function loadButtons() {
        normalTexture = new PIXI.Texture.from('./assets/buttons/Ui_spin_normal-1.png');
        disableTexture = new PIXI.Texture.from('./assets/buttons/Ui_spin_disable-1.png');
        betIncNormalTexture = new PIXI.Texture.from('./assets/buttons/Ui_plus_btn_normal-1.png');
        betIncDisableTexture = new PIXI.Texture.from('./assets/buttons/Ui_plus_btn_diable-1.png');
        betDecNormalTexture = new PIXI.Texture.from('./assets/buttons/Ui_minus_btn_normal-1.png');
        betDecDisableTexture = new PIXI.Texture.from('./assets/buttons/Ui_minus_btn_disable-1.png');
        spinBtn = new PIXI.Sprite(normalTexture);
        betIncBtn = new PIXI.Sprite(betIncNormalTexture);
        betDecBtn = new PIXI.Sprite(betDecDisableTexture);
        spinBtn.interactive = true;
        spinBtn.cursor = 'pointer';
        spinBtn.position.set(200, 460);
        betIncBtn.interactive = true;
        betIncBtn.cursor = 'pointer';
        betIncBtn.position.set(475, 420);
        betDecBtn.interactive = true;
        betDecBtn.cursor = 'pointer';
        betDecBtn.position.set(366, 420);
        addButtonListeners();
        app.stage.addChild(spinBtn);
        app.stage.addChild(betIncBtn);
        app.stage.addChild(betDecBtn);
    }

    // to add pointer events listeners on buttons
    function addButtonListeners() {
        spinBtn.on('pointerdown', onButtonDown);
        betIncBtn.on('pointerdown', onStakeIncPress);
        betDecBtn.on('pointerdown', onStakeDecPress);
    }

    // to handle spin button pressup
    function onButtonDown() {
        this.isdown = true;
        this.texture = disableTexture;
        this.interactive = false;
        this.cursor = undefined;
        disableStakeDecBtn();
        disableStakeIncBtn();
        deductBet();
        resetWinAmt();
        startSpinning();
    }

    // to reset win amnt value to 0
    function resetWinAmt() {
        winAmt.text = "0";
    }

    // to make spin button clickable
    function enableSpinBtn() {
        spinBtn.isdown = false;
        spinBtn.texture = normalTexture;
        spinBtn.interactive = true;
        spinBtn.cursor = 'pointer';
    }

    // to deduct stake amount from balance
    function deductBet() {
        const updateBalance = Number(balanceAmt.text) - Number(stakeAmt.text);
        balanceAmt.text = updateBalance.toString();
    }

    // to play winning symbols animation as per response
    function playSymbolWin() {
        const responseIndex = Math.floor(Math.random() * data.length);
        const response = data[responseIndex];
        console.log(response);
        const winValue = response.response.results.win;
        if (winValue) {
            winAmt.text = winValue.toString();
            balanceAmt.text = (Number(balanceAmt.text) + winValue).toString();
            const winSymbols = response.response.results.symbolIDs;
            winSymbols.forEach((value, index) => {
                const symbolIndex = symbolsPerReel * index + (18 + value);
                symbolObj[symbolIndex].state.setAnimation(0, 'win', false);
                symbolObj[symbolIndex].state.onComplete = () => {
                    enableSpinBtn();
                    handleStakeBtnVisibilty();
                }
            }, this);
        } else {
            enableSpinBtn();
            handleStakeBtnVisibilty();
        }
    }

    // to make stake increment button unclickable
    function disableStakeIncBtn() {
        betIncBtn.texture = betIncDisableTexture;
        betIncBtn.isdown = true;
        betIncBtn.interactive = false;
        betIncBtn.cursor = undefined;
    }

    // to make stake decrement button unclickable
    function disableStakeDecBtn() {
        betDecBtn.texture = betDecDisableTexture;
        betDecBtn.isdown = true;
        betDecBtn.interactive = false;
        betDecBtn.cursor = undefined;
    }

    // to make stake increment button clickable
    function enableStakeIncBtn() {
        betIncBtn.texture = betIncNormalTexture;
        betIncBtn.isdown = false;
        betIncBtn.interactive = true;
        betIncBtn.cursor = 'pointer';
    }

    // to make stake decrement button clickable
    function enableStakeDecBtn() {
        betDecBtn.texture = betDecNormalTexture;
        betDecBtn.isdown = false;
        betDecBtn.interactive = true;
        betDecBtn.cursor = 'pointer';
    }

    // to handle stake increment button pressup
    function onStakeIncPress() {
        const stakeValue = Number(stakeAmt.text);
        let stakeIndex = stakeValues.indexOf(stakeValue);
        stakeAmt.text = stakeValues[++stakeIndex].toString();
        if (Number(stakeAmt.text) === stakeValues[stakeValues.length - 1]) {
            disableStakeIncBtn();
        } else {
            enableStakeDecBtn();
        }
    }

    // to handle stake decrement button pressup
    function onStakeDecPress() {
        const stakeValue = Number(stakeAmt.text);
        let stakeIndex = stakeValues.indexOf(stakeValue);
        stakeAmt.text = stakeValues[--stakeIndex].toString();
        if (Number(stakeAmt.text) === stakeValues[0]) {
            disableStakeDecBtn();
        } else {
            enableStakeIncBtn();
        }
    }

    // to handle stake buttons clickable functionality
    function handleStakeBtnVisibilty() {
        const stakeValue = Number(stakeAmt.text);
        const stakeIndex = stakeValues.indexOf(stakeValue);
        if (Number(stakeAmt.text) === stakeValues[0]) {
            disableStakeDecBtn();
            enableStakeIncBtn();
        } else if (Number(stakeAmt.text) === stakeValues[stakeValues.length - 1]) {
            disableStakeIncBtn();
            enableStakeDecBtn();
        } else {
            enableStakeDecBtn();
            enableStakeIncBtn();
        }
    }

    // to start reel spinning
    function startSpinning() {

        let spinReel0Tween = gsap.to(symbolContainer0, { y: 0, duration: 5, ease: "power3.inOut", onComplete: () => { symbolContainer0.y = -1260 } });
        spinReel0Tween.play();
        let spinReel1Tween = gsap.to(symbolContainer1, { y: 0, duration: 5, ease: "power3.inOut", delay: 0.5, onComplete: () => { symbolContainer1.y = -1260 } });
        spinReel1Tween.play();
        let spinReel2Tween = gsap.to(symbolContainer2, { y: 0, duration: 5, ease: "power3.inOut", delay: 1, onComplete: () => { symbolContainer2.y = -1260 } });
        spinReel2Tween.play();
        let spinReel3Tween = gsap.to(symbolContainer3, {
            y: 0, duration: 5, ease: "power3.inOut", delay: 1.5, onComplete: () => {
                symbolContainer3.y = -1260;
                playSymbolWin();
            }
        });
        spinReel3Tween.play();
    }

})