import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";
import UI from "./UI.js";

class Menu extends BasicScene {
    constructor() {
        super({key: 'Menu'});
    }
    
    init(data){
        //To Know where this scene comes from 
        //For stoping music or not
        if (data) this.levelFrom = data.from;
        
    }

    preload(){        
        
    }

    create() {            

        // background positions   
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        let x = width / 2 ;
        let y = height / 2 -50;
        
        // background        
        this.bg1 = this.add.image(0, 0, GameConstants.Textures.BG_MENU).setOrigin(0).setScale(1);        
        //this.bg = this.add.image(x, y, GameConstants.Textures.BG_MENU).setScale(0.25);        
        const videogameTitle = this.add.dynamicBitmapText(x-250, y, 'pixel', this.TG.tr('MENU.TITLE'), 30).setTint(0x000000).setOrigin(0);        
        const videogameSubTitle = this.add.dynamicBitmapText(x-150, y+60, 'pixel', this.TG.tr('MENU.SUBTITLE'), 20).setTint(0x000000).setOrigin(0);        
        

        //bg sound
        //Only play BG MUSIC  if come from other levels than the main scenes
        //For not stoping the music between menu scenes
        if (this.levelFrom!=GameConstants.Levels.CREDITS &&
            this.levelFrom!=GameConstants.Levels.LEVELSELECT &&
            this.levelFrom!=GameConstants.Levels.SCORES &&
            this.levelFrom!=GameConstants.Levels.SETTINGSLEVEL &&
            this.levelFrom!=GameConstants.Levels.SELECTCHARACTERLEVEL) {
                this.playMenuScenesOST();
        }
        
        this.selectCharacterButton = this.add.dynamicBitmapText(100, 50, 'pixel', this.TG.tr('MENU.SELECTCHARACTER')).setTint(0x808489).setInteractive();        
        this.changeSceneFromButton(this.selectCharacterButton, GameConstants.Levels.SELECTCHARACTERLEVEL);

        this.settingsButton = this.add.dynamicBitmapText(width, 50, 'pixel', this.TG.tr('MENU.SETTINGS')).setTint(0x808489).setInteractive();
        this.settingsButton.setPosition(350, 50);
        this.changeSceneFromButton(this.settingsButton, GameConstants.Levels.SETTINGSLEVEL);

        //Check if logged at GameJolt
        let gamejoltLogged = (GJAPI.bActive)?"user:\n" + GJAPI.sUserName : "not logged";
        this.gamejoltLabel = this.add.dynamicBitmapText(width, 50, 'pixel', 'GAMEJOLT\n' + gamejoltLogged).setTint(0x808489).setInteractive();
        this.gamejoltLabel.setPosition(600, 50);

        const startButton = this.add.dynamicBitmapText(80, y * 2, 'pixel', this.TG.tr('MENU.PLAY'), 24);        
        startButton.setInteractive();
        this.changeSceneFromButton(startButton, GameConstants.Levels.LEVELSELECT);


        const scoresButton = this.add.dynamicBitmapText(400, y * 2, 'pixel', this.TG.tr('MENU.SCORES'), 24);                        
        scoresButton.setInteractive();
        this.changeSceneFromButton(scoresButton, GameConstants.Levels.SCORES);

        const creditsButton = this.add.dynamicBitmapText(600, y * 2, 'pixel', this.TG.tr('MENU.CREDITS'), 24);        
        creditsButton.setInteractive();
        this.changeSceneFromButton(creditsButton, GameConstants.Levels.CREDITS);

        // change the position of the buttons
        let buttons = [
            startButton,            
            scoresButton,
            creditsButton
        ];

        let freeSpace = width;
        buttons.forEach(function(button) {
            freeSpace = freeSpace - button.width;
        });
        
        let distance = freeSpace / (buttons.length + 1);
        
        for(let i = 0; i < buttons.length; i++) {
            let xPositionButton = distance * (i + 1);
            for (let j = 0; j < i; j++) {
                xPositionButton = xPositionButton + buttons[j].width;
            }
            buttons[i].setPosition(xPositionButton, buttons[i].y);
        }
    }

    update(time, delta) {
        
    }

    changeSceneFromButton(pressedButon, newScene){
        pressedButon.on('pointerdown', () => {             
            this.changeScene(this, newScene, 0); 
        });
    }

}
   
export default Menu;