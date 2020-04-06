import BasicScene from "./BasicScene.js";
import Daniela from '../player/Daniela.js';
import GameConstants from "../services/GameConstants.js";
import UI from "./UI.js";


class SelectCharacterLevel extends BasicScene {
    constructor() {
        super({key: 'SelectCharacterLevel'});
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
        this.bg1 = this.add.image(0, 0, GameConstants.Textures.BG_LEVEL2).setOrigin(0).setScale(1);        

        this.DB = store.get(GameConstants.DB.DBNAME);
                        
        const menuButton = this.add.dynamicBitmapText(80, y * 2 + 20, 'pixel', this.TG.tr('LEVELSELECT.MENU'), 24);        
        menuButton.setInteractive();

        menuButton.on('pointerdown', () => { 
            this.changeScene(this, GameConstants.Levels.MENU,0);
        });
    }

    update(time, delta) {
        
    }

}

export default SelectCharacterLevel;
