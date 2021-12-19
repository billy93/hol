//=============================================================================
// Fullscreen.js
//=============================================================================
 
/*:
 * @plugindesc Custom Script
 * @author Billy
 *
 * @help
 */
 
(function() {
    Sprite_Button.prototype.buttonData = function() {
        const buttonTable = {
            cancel: { x: 0, w: 2 },
            pageup: { x: 2, w: 1 },
            pagedown: { x: 3, w: 1 },
            down: { x: 4, w: 1 },
            up: { x: 5, w: 1 },
            down2: { x: 6, w: 1 },
            up2: { x: 7, w: 1 },
            ok: { x: 8, w: 2 },
            menu: { x: 10, w: 1 },
            chat: { x:10, w:1 }
        };
        return buttonTable[this._buttonType];
    };
    
    Scene_Map.prototype.createButtons = function() {
        this.createChatButton();

        if (ConfigManager.touchUI) {
            this.createMenuButton();
        }
    };

    Scene_Map.prototype.createChatButton = function() {
        this._chatButton = new Sprite_Button("chat");
        this._chatButton.x = 0;
        this._chatButton.y = this.buttonY();
        this._chatButton.visible = true;
        this.addWindow(this._chatButton);
    };

    Scene_Map.prototype.updateScene = function() {
        this.checkGameover();
        if (!SceneManager.isSceneChanging()) {
            this.updateTransferPlayer();
        }
        if (!SceneManager.isSceneChanging()) {
            this.updateEncounter();
        }
        if (!SceneManager.isSceneChanging()) {
            this.updateCallMenu();
        }
        if (!SceneManager.isSceneChanging()) {
            this.updateCallDebug();
        }
        if (!SceneManager.isSceneChanging()) {
            this.updateCallChat();
        }
    };

    Scene_Map.prototype.updateCallChat = function() {
        if (this.isChatCalled()) {
            var openChatButton, sayInChatButton;
                //     //TODO: Можно оптимизировать, в initMembers
                openChatButton = ANET.PP.getChatOpenCloseKey();
                sayInChatButton = ANET.PP.getChatSayKey();
            
                if (ANET.UI.isChatOpen()) {
                    // * Если кнопка открыть чат и кнопка сказать в чат одинаковые
                    if (openChatButton === sayInChatButton) {
                        ANET.UI.showChatInputSafe(); // * то не закрываем, а сцена ввода текста
                        Input.clear(); // * иначе закрываем
                    } else {
                        ANET.UI.closeChat();
                    }
                } else {
                    ANET.UI.showChat();
                }
        }
    };
    
    Scene_Map.prototype.isChatCalled = function() {
        return Input.isTriggered("chat") || TouchInput.isCancelled();
    };
    
    // Scene_Map.prototype.processMapTouch = function() {
    //     if (TouchInput.isTriggered() || this._touchCount > 0) {
    //         if (TouchInput.isPressed() && !this.isAnyButtonPressed()) {
    //             if (this._touchCount === 0 || this._touchCount >= 15) {
    //                 this.onMapTouch();
    //             }
    //             // if (this._touchCount >= 3){
    //             //     var openChatButton, sayInChatButton;
    //             //     //TODO: Можно оптимизировать, в initMembers
    //             //     openChatButton = ANET.PP.getChatOpenCloseKey();
    //             //     sayInChatButton = ANET.PP.getChatSayKey();
                
    //             //     if (ANET.UI.isChatOpen()) {
    //             //         // * Если кнопка открыть чат и кнопка сказать в чат одинаковые
    //             //         if (openChatButton === sayInChatButton) {
    //             //             ANET.UI.showChatInputSafe(); // * то не закрываем, а сцена ввода текста
    //             //             Input.clear(); // * иначе закрываем
    //             //         } else {
    //             //             ANET.UI.closeChat();
    //             //         }
    //             //     } else {
    //             //     ANET.UI.showChat();
    //             //     }
    //             // }
    //             this._touchCount++;
    //         } else {
    //             this._touchCount = 0;
    //         }
    //     }
    // };
})()