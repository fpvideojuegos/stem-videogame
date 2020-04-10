import BasicScene from "./BasicScene.js";
import DB from "../services/DB.js";
import GameConstants from "../services/GameConstants.js";



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

        // Player frames for choosing player
        const player2 = this.add.image(80, 80 , GameConstants.Sprites.Player2.KEY, 'player2_2').setScale(1.5); 
        player2.setInteractive();
        player2.on('pointerdown', () => { 
            this.DB = store.get(GameConstants.DB.DBNAME);
            this.DB.player = 'player2';
            store.set(GameConstants.DB.DBNAME, this.DB);
            this.changeScene(this, GameConstants.Levels.MENU,0);
        });

        const player3 = this.add.image(80, 160 , GameConstants.Sprites.Player3.KEY, 'player3_2').setScale(1.5); 
        player3.setInteractive();
        player3.on('pointerdown', () => {
            this.DB = store.get(GameConstants.DB.DBNAME);
            this.DB.player = 'player3 ';
            store.set(GameConstants.DB.DBNAME, this.DB);
            this.changeScene(this, GameConstants.Levels.MENU,0);
        });
    }

    update(time, delta) {
        
    }
}

export default SelectCharacterLevel;
