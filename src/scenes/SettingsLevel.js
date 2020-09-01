import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";
import DB from "../services/DB.js";

class SettingsLevel extends BasicScene {
    constructor() {
        super({key: 'SettingsLevel'});
    }
    
    preload(){
        this.muted=false;
    }

    create() {
        // background positions   
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        let x = width / 2 ;
        let y = height / 2 -50;
        
        // background         
        this.bg1 = this.add.image(0, 0, GameConstants.Textures.BG_MENU).setOrigin(0).setScale(1);        
                        
        const menuButton = this.add.dynamicBitmapText(width*0.10, y * 2, 'pixel', this.TG.tr('LEVELSELECT.MENU'), 24);
        menuButton.setInteractive();

        menuButton.on('pointerdown', () => { 
            this.changeScene(this, GameConstants.Levels.MENU,0);
        });

        this.languageLabel = this.add.dynamicBitmapText(width*0.10, height*0.34, 'pixel', this.TG.tr('SETTINGLEVEL.LANGUAGE'), 24).setTint(0x808489);              

        this.currentLanguage = this.TG.getActualLang();
       
        this.flag1 = this.add.image(width*0.10, height*0.415, GameConstants.Settings.FLAG_EN).setOrigin(0).setScale(2).setDepth(1);
        this.setFlagsSetting(this.flag1, "en");
        this.flag2 = this.add.image(width*0.15, height*0.415, GameConstants.Settings.FLAG_ES).setOrigin(0).setScale(2).setDepth(1);
        this.setFlagsSetting(this.flag2, "es");
        this.flag3 = this.add.image(width*0.20, height*0.415, GameConstants.Settings.FLAG_FR).setOrigin(0).setScale(2).setDepth(1);
        this.setFlagsSetting(this.flag3, "fr");
        this.flag4 = this.add.image(width*0.25, height*0.415, GameConstants.Settings.FLAG_RU).setOrigin(0).setScale(2).setDepth(1);
        this.setFlagsSetting(this.flag4, "ru");

        //Reset Scores and Levels DB Button
        this.resetDBLabel = this.add.dynamicBitmapText(width*0.10, height*0.49, 'pixel', this.TG.tr('SETTINGLEVEL.RESET'), 24).setTint(0x808489);
        this.resetDBLabel.setInteractive();
        this.resetDBLabel.on('pointerdown',() => {
            //Clear DB
            store.clearAll();  
            DB.createDB([{key: GameConstants.DB.DBNAME, value: DB.DB}]);          
            this.DoneLabel = this.add.dynamicBitmapText(width*0.10,height*0.56, 'pixel', this.TG.tr('SETTINGLEVEL.DONE'), 24).setTint(0x808489);

            store.each(function(key, value) {
                console.log(key, '->', value);               
            });
        });
        
        //Sounds, voices, SFX and intros confıg saved ın the DB
        this.soundLabeltxt = this.add.dynamicBitmapText(width*0.10, height*0.10, 'pixel', this.TG.tr('SETTINGLEVEL.SOUND'), 24).setTint(0x808489);
        this.voicesLabelTxt = this.add.dynamicBitmapText(width*0.35, height*0.10, 'pixel', 'VOCES', 24).setTint(0x808489);
        this.SFXLabelTxt = this.add.dynamicBitmapText(width*0.55, height*0.10, 'pixel', 'SFX', 24).setTint(0x808489);
        this.introsLabelTxt = this.add.dynamicBitmapText(width*0.70, height*0.10, 'pixel', 'INTROS', 24).setTint(0x808489);

        this.DB = store.get(GameConstants.DB.DBNAME);

        this.soundLabel = (this.DB.sound)? GameConstants.UI.VOLUMEON:GameConstants.UI.VOLUMEOFF;
        this.voicesLabel = (this.DB.voices)? GameConstants.UI.VOICESON:GameConstants.UI.VOICESOFF;
        this.SFXLabel = (this.DB.SFX)? GameConstants.UI.SFXON:GameConstants.UI.SFXOFF;
        this.introsLabel = (this.DB.intros)? GameConstants.UI.INTROSON:GameConstants.UI.INTROSOFF;

        this.musicOnOffBtn = this.add.image(width*0.115, height*0.19,this.soundLabel).setScale(0.5).setTint(0x0000FF);
        this.musicOnOffBtn.setInteractive();

        this.voicesOnOffBtn = this.add.image(width*0.365, height*0.19,this.voicesLabel).setScale(0.5).setTint(0x0000FF);
        this.voicesOnOffBtn.setInteractive();

        this.SFXOnOffBtn = this.add.image(width*0.565, height*0.19,this.SFXLabel).setScale(0.5).setTint(0x0000FF);
        this.SFXOnOffBtn.setInteractive();

        this.introsOnOffBtn = this.add.image(width*0.715, height*0.19,this.introsLabel).setScale(0.5).setTint(0x0000FF);
        this.introsOnOffBtn.setInteractive();
     
        this.musicOnOffBtn.on('pointerdown', () => { 
            this.DB.sound=!this.DB.sound;
            store.set(GameConstants.DB.DBNAME, this.DB);

            if (!this.DB.sound){
                this.sound.stopAll();
            } else {
                //Play again menu OST
                this.playMenuScenesOST();
            }
            
            this.soundLabel = (this.DB.sound)? GameConstants.UI.VOLUMEON:GameConstants.UI.VOLUMEOFF;
            this.musicOnOffBtn.setTexture(this.soundLabel);
        });

        this.voicesOnOffBtn.on('pointerdown', () => { 
            this.DB.voices=!this.DB.voices;
            store.set(GameConstants.DB.DBNAME, this.DB);
            
            this.voicesLabel = (this.DB.voices)? GameConstants.UI.VOICESON:GameConstants.UI.VOICESOFF;
            this.voicesOnOffBtn.setTexture(this.voicesLabel);
        });

        this.SFXOnOffBtn.on('pointerdown', () => { 
            this.DB.SFX=!this.DB.SFX;
            store.set(GameConstants.DB.DBNAME, this.DB);
            
            this.SFXLabel = (this.DB.SFX)? GameConstants.UI.SFXON:GameConstants.UI.SFXOFF;
            this.SFXOnOffBtn.setTexture(this.SFXLabel);
        });

        this.introsOnOffBtn.on('pointerdown', () => { 
            this.DB.intros=!this.DB.intros;
            store.set(GameConstants.DB.DBNAME, this.DB);
            
            this.introsLabel = (this.DB.intros)? GameConstants.UI.INTROSON:GameConstants.UI.INTROSOFF;
            this.introsOnOffBtn.setTexture(this.introsLabel);
        });

    } //End Create()

    update(time, delta) {
        
    }

    setFlagsSetting(flag, language) {
        flag.setInteractive();
        flag.on('pointerdown', () => {             
            this.TG.setLang(language);  
            this.scene.launch('AudioLoader');                                  
            this.changeScene(this, GameConstants.Levels.MENU,0);
        });
        if (this.currentLanguage === language) {
            this.add.rectangle(flag.x - 3, flag.y - 3, flag.width + 3, flag.height + 3, 0xff0000).setOrigin(0).setScale(2).setDepth(0);
        }
    }

}

export default SettingsLevel;
