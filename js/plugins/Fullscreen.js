//=============================================================================
// Fullscreen.js
//=============================================================================
 
/*:
 * @plugindesc Starts the game in fullscreen
 * @author Billy
 *
 * @help
 */
 
(function() {
    function extend(obj, name, func) {
      var orig = obj.prototype[name]
      obj.prototype[name] = function() {
        orig.call(this)
        func.call(this)
      }
    }
   
    extend(Scene_Boot, 'start', function() {
          Graphics._switchFullScreen();        
    })
    
    
  //  var _Scene_Base_create = Scene_Base.prototype.create;
  
  //  Scene_Base.prototype.create = function() {
  //       _Scene_Base_create.call(this);
  //       Graphics.width = 1280;
  //       Graphics.height = 720; 
  //       Graphics.boxHeight = 720;
  //       Graphics.boxWidth = 1280; 
  //  };

    var _Window_Command_addCommand = Window_Command.prototype.addCommand;

    Window_Options.prototype.addGeneralOptions = function() {
        _Window_Command_addCommand.call(this, TextManager.alwaysDash, "alwaysDash");
        _Window_Command_addCommand.call(this, TextManager.commandRemember, "commandRemember");
        _Window_Command_addCommand.call(this, TextManager.touchUI, "touchUI");
        _Window_Command_addCommand.call(this, "Fullscreen", "fullscreen");
    };

    Scene_Options.prototype.maxCommands = function() {
        return 8;
    };

    var _ConfigManager_applyData = ConfigManager.applyData;
    var _ConfigManager_makeData = ConfigManager.makeData;
    var _ConfigManager_save = ConfigManager.save;
    ConfigManager.fullscreen = Graphics._isFullScreen();

    ConfigManager.applyData = function(config) {
      _ConfigManager_applyData.call(this, config);
      ConfigManager.fullscreen = ConfigManager.readFlag(config, "fullscreen", Graphics._isFullScreen());
    };

    ConfigManager.makeData = function() {
      const config = _ConfigManager_makeData.call(this);
      config.fullscreen = ConfigManager.fullscreen;
      return config;
    }

    ConfigManager.save = function() {
      _ConfigManager_save.call(this);
      if(ConfigManager.fullscreen){
        if(!Graphics._isFullScreen()){
          Graphics._switchFullScreen();
        }
      }
      else{
        Graphics._cancelFullScreen();
      }
    }
  })()