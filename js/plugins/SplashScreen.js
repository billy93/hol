
(() => {
    


    // SceneManager_goto = SceneManager.goto;
    // SceneManager.goto = function(sceneClass) {
    //     SceneManager_goto.call(this, Scene_SplashScreens);
    // };

    Scene_Boot.prototype.startNormalGame = function() {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(Scene_SplashScreens);
        Window_TitleCommand.initCommandPosition();
    };

    function Scene_SplashScreens() {
        this.initialize(...arguments);
    }
    
    Scene_SplashScreens.prototype = Object.create(Scene_Base.prototype);
    Scene_SplashScreens.prototype.constructor = Scene_SplashScreens;
    
    Scene_SplashScreens.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);
    };
    
    Scene_SplashScreens.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        // this.createBackground();
        this.createForeground();
        this.createWindowLayer();
        // this.createCommandWindow();
    };
    
    Scene_SplashScreens.prototype.start = function() {
        Scene_Base.prototype.start.call(this);
        SceneManager.clearStack();
        // this.adjustBackground();
        // this.playTitleMusic();
        this.startFadeIn(this.fadeSpeed(), false);
        // $gameMessage.setFaceImage("Evil", 7);
        // $gameMessage.add("Hello");

        
        // $gameMessage.add("Hello")
        // Game_Interpreter.prototype.command101.call(["Evil", 7, 0, 2, "Mysterious Dev"])
    };
    
    Scene_SplashScreens.prototype.update = function(){
        if(TouchInput.isClicked() && !this.videoPlaying){
            Graphics._switchFullScreen();
            this.videoPlaying = true;
            
            this.bitmapMsg1.destroy();
            this.bitmapMsg2.destroy();

            if(!Video.isPlaying()){
                Video.play("movies/opening.mp4");        
            }
        }

        if(this.videoPlaying){
            if(!Video.isPlaying()){
                SceneManager.goto(Scene_Title);
            }
        }
        Scene_Base.prototype.update.call(this);
    }   
    
    Scene_SplashScreens.prototype.terminate = function() {
        Scene_Base.prototype.terminate.call(this);
        SceneManager.snapForBackground();
        if (this._gameTitleSprite) {
            this._gameTitleSprite.bitmap.destroy();
        }
    };
    
    Scene_SplashScreens.prototype.createBackground = function() {
        this._backSprite1 = new Sprite(
            ImageManager.loadTitle1($dataSystem.title1Name)
        );
        this._backSprite2 = new Sprite(
            ImageManager.loadTitle2($dataSystem.title2Name)
        );
        this.addChild(this._backSprite1);
        this.addChild(this._backSprite2);
    };
    
    Scene_SplashScreens.prototype.createForeground = function() {
        this._gameTitleSprite = new Sprite(
            new Bitmap(Graphics.width, Graphics.height)
        );
        this.addChild(this._gameTitleSprite);
        this.drawMessage1();
        this.drawMessage2();
    };
    
    Scene_SplashScreens.prototype.drawMessage1 = function() {
        const x = 20;
        const y = Graphics.height / 4;
        const maxWidth = Graphics.width - x * 2;
        const text = "Press A to continue";
        this.bitmapMsg1 = this._gameTitleSprite.bitmap;
        this.bitmapMsg1.fontFace = $gameSystem.mainFontFace();
        this.bitmapMsg1.outlineColor = "black";
        this.bitmapMsg1.outlineWidth = 8;
        this.bitmapMsg1.fontSize = 36;
        this.bitmapMsg1.drawText(text, x, y, maxWidth, 48, "center");
    };

    Scene_SplashScreens.prototype.drawMessage2 = function() {
        const x = 20;
        const y = Graphics.height / 4;
        const maxWidth = Graphics.width - x * 2;
        const text = "For better gaming experience, please rotate your phone.";
        this.bitmapMsg2 = this._gameTitleSprite.bitmap;
        this.bitmapMsg2.fontFace = $gameSystem.mainFontFace();
        this.bitmapMsg2.outlineColor = "black";
        this.bitmapMsg2.outlineWidth = 8;
        this.bitmapMsg2.fontSize = 36;
        this.bitmapMsg2.drawText(text, x, y+100, maxWidth, 48, "center");
    };
    
    // Scene_SplashScreens.prototype.adjustBackground = function() {
    //     this.scaleSprite(this._backSprite1);
    //     this.scaleSprite(this._backSprite2);
    //     this.centerSprite(this._backSprite1);
    //     this.centerSprite(this._backSprite2);
    // };
    
    // Scene_SplashScreens.prototype.createCommandWindow = function() {
    //     const background = $dataSystem.titleCommandWindow.background;
    //     const rect = this.commandWindowRect();
    //     this._commandWindow = new Window_TitleCommand(rect);
    //     this._commandWindow.setBackgroundType(background);
    //     this._commandWindow.setHandler("newGame", this.commandNewGame.bind(this));
    //     this._commandWindow.setHandler("continue", this.commandContinue.bind(this));
    //     this._commandWindow.setHandler("options", this.commandOptions.bind(this));
    //     this.addWindow(this._commandWindow);
    // };
    
    // Scene_SplashScreens.prototype.commandWindowRect = function() {
    //     const offsetX = $dataSystem.titleCommandWindow.offsetX;
    //     const offsetY = $dataSystem.titleCommandWindow.offsetY;
    //     const ww = this.mainCommandWidth();
    //     const wh = this.calcWindowHeight(3, true);
    //     const wx = (Graphics.boxWidth - ww) / 2 + offsetX;
    //     const wy = Graphics.boxHeight - wh - 96 + offsetY;
    //     return new Rectangle(wx, wy, ww, wh);
    // };
    
    // Scene_SplashScreens.prototype.commandNewGame = function() {
    //     DataManager.setupNewGame();
    //     this._commandWindow.close();
    //     this.fadeOutAll();
    //     SceneManager.goto(Scene_Map);
    // };
    
    // Scene_SplashScreens.prototype.commandContinue = function() {
    //     this._commandWindow.close();
    //     SceneManager.push(Scene_Load);
    // };
    
    // Scene_SplashScreens.prototype.commandOptions = function() {
    //     this._commandWindow.close();
    //     SceneManager.push(Scene_Options);
    // };
    
    // Scene_SplashScreens.prototype.playTitleMusic = function() {
    //     AudioManager.playBgm($dataSystem.titleBgm);
    //     AudioManager.stopBgs();
    //     AudioManager.stopMe();
    // };
     
    /*
    Scene_Boot.prototype.startNormalGame = function() {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        // SceneManager.goto(Scene_Title);
    };
    
    
    */

    /*
    function Scene_SplashScreens() {
        this.initialize(...arguments);
    }

    Scene_SplashScreens.prototype = Object.create(Stage.prototype);
    Scene_SplashScreens.prototype.constructor = Scene_SplashScreens;

    Scene_SplashScreens.prototype.initialize = function() {
        Stage.prototype.initialize.call(this);
    }

    Scene_SplashScreens.prototype.videoPlaying = false;
    
    Scene_SplashScreens.prototype.start = function() {
        Scene_Base.prototype.start.call(this);
        this.startNormalGame();
    }
    
    Scene_SplashScreens.prototype.startNormalGame = function() {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        Window_TitleCommand.initCommandPosition();
    
        // this.createMessageWindow();
        // Game_Interpreter.prototype.command101.call(this, ["Evil", 7, 0, 2, "Mysterious Dev"]);
    };
    
    Scene_SplashScreens.prototype.update = function(){
        if(TouchInput.isClicked()){
            this.videoPlaying = true;
            if(!Video.isPlaying()){
                Video.play("movies/opening.webm");        
            }
        }

        if(this.videoPlaying){
            if(!Video.isPlaying()){
                SceneManager.goto(Scene_Title);
            }
        }
    }    
    */

    // Scene_Boot.prototype.createMessageWindow = function() {
    //     const rect = this.messageWindowRect();
    //     this._messageWindow = new Window_Message(rect);
    //     $gameMessage.add("Hello");
    //     this.addWindow(this, this._messageWindow);
    // };
    
    // Scene_Boot.prototype.messageWindowRect = function() {
    //     const ww = Graphics.boxWidth;
    //     const wh = this.calcWindowHeight(4, false) + 8;
    //     const wx = (Graphics.boxWidth - ww) / 2;
    //     const wy = 0;
    //     return new Rectangle(wx, wy, ww, wh);
    // };
})();
