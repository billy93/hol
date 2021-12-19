//-----------------------------------------------------------------------------
//  RF Chapter Window MZ
//-----------------------------------------------------------------------------
//  For: RPGMAKER MZ
//  RF_CustomWindowMessage.js
//-----------------------------------------------------------------------------
//  2020-09-18 - Version 1.0 - plugin command to show chapter window
//-----------------------------------------------------------------------------
//  Terms can be found at:
//  google.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.RF_CustomWindowMessage = true;

var RF = RF || {};        // RF's main object
RF.CustomWindowMessage = RF.CustomWindowMessage || {};      // This plugin object
RF.CustomWindowMessage.pluginName = "RF_CustomWindowMessage";
//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.0) Create custom window. View documentation for plugin commands.
 * @url http://andreasbilly.com
 * @target MZ
 * @author Billy
 * 
 * 
 * @command createCustomWindowMessage
 * @text Create Custom Window Message
 * @desc Creates a custom window with specified settings
 * 
 * @arg name
 * @default 
 * @text Message
 * @desc Message value, for example : Test
 * 
 * @arg x
 * @desc X window position
 * @default 1100
 * 
 * @arg y
 * @desc y window position
 * @default 50
 * 
 * @arg width
 * @desc width window 
 * @default 50
 *
 * @arg height
 * @desc height window 
 * @default 50
 */

 // PLUGIN COMMANDS
//-----------------------------------------------------------------------------

PluginManager.registerCommand(RF.CustomWindowMessage.pluginName, "createCustomWindowMessage", args => {
    //Galv.LG.createLayer(Object.values(args));  // Send an array of the setting values
    RF.CustomWindowMessage.createCustomWindowMessage(Object.values(args));
});

RF.CustomWindowMessage.createCustomWindowMessage = function(args){
    var name = args[0];

    var currentScene = SceneManager._scene;

    const rect = this.CustomWindowMessageRect(currentScene, args);
    RF.CustomWindowMessage.CustomWindowMessage = new Window_CustomMessage(rect, name);
    currentScene.addWindow(RF.CustomWindowMessage.CustomWindowMessage);    

    RF.CustomWindowMessage.CustomWindowMessage.open();
};

RF.CustomWindowMessage.CustomWindowMessageRect = function(scene, args) {
    var x = eval(args[1]);
    var y = eval(args[2]);
    var width = eval(args[3]);
    var height = eval(args[4]);
    const wx = x;
    const wy = y;
    const ww = width;
    const wh = height;

    // const wh = scene.calcWindowHeight(1, false);
    return new Rectangle(wx, wy, ww, wh);
};
//-----------------------------------------------------------------------------
// Window_CustomMessage
//
// The window for displaying the chapter name on the map screen.

function Window_CustomMessage() {
    this.initialize(...arguments);
}

Window_CustomMessage.prototype = Object.create(Window_Base.prototype);
Window_CustomMessage.prototype.constructor = Window_CustomMessage;

Window_CustomMessage.prototype.initialize = function(rect, message) {
    Window_Base.prototype.initialize.call(this, rect);
    this.opacity = 0;
    this.contentsOpacity = 0;
    this._showCount = 0;
    this.message = message;
    this.refresh();
};

Window_CustomMessage.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (this._showCount > 0) {
        this.updateFadeIn();
        this._showCount--;
    } else {
        this.updateFadeOut();
    }
};

Window_CustomMessage.prototype.updateFadeIn = function() {
    this.contentsOpacity += 4;
};

Window_CustomMessage.prototype.updateFadeOut = function() {
    this.contentsOpacity -= 4;
};

Window_CustomMessage.prototype.open = function() {
    this.refresh();
    this._showCount = 100;
};

Window_CustomMessage.prototype.close = function() {
    this._showCount = 0;
};

Window_CustomMessage.prototype.refresh = function() {
    this.contents.clear();
    if (this.message) {
        const width = this.innerWidth;
        this.drawBackground(0, 0, width, this.lineHeight());
        this.drawText(this.message, 0, 0, width, "center");
    }
};

Window_CustomMessage.prototype.drawBackground = function(x, y, width, height) {
    const color1 = ColorManager.dimColor1();
    const color2 = ColorManager.dimColor2();
    const half = width / 2;
    this.contents.gradientFillRect(x, y, half, height, color2, color1);
    this.contents.gradientFillRect(x + half, y, half, height, color1, color2);
};
