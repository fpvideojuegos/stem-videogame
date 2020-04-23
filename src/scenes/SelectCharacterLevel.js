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
        this.bg1 = this.add.image(0, 0, GameConstants.Textures.BG_MENU).setOrigin(0).setScale(1);        

        this.DB = store.get(GameConstants.DB.DBNAME);
                        
        const menuButton = this.add.dynamicBitmapText(80, y * 2 + 20, 'pixel', this.TG.tr('LEVELSELECT.MENU'), 24);
        menuButton.setInteractive();

        menuButton.on('pointerdown', () => { 
            this.changeScene(this, GameConstants.Levels.MENU,0);
        });

        /*this.currentPlayer = this.TG.getActualLang();*/

        // Player frames for choosing player //TODO -> Make it as array + foreach
        this.player2 = this.add.image(80, 80, GameConstants.Sprites.Player2.KEY, 'player2_2').setScale(1.5).setDepth(1);
        this.setCurrentPlayer(this.player2, 'player2');

        this.player3 = this.add.image(160, 80, GameConstants.Sprites.Player3.KEY, 'player3_2').setScale(1.5).setDepth(1);
        this.setCurrentPlayer(this.player3, 'player3');

    }

    update(time, delta) {
        
    }

    /* */
    setCurrentPlayer(player, key) {
        player.setInteractive();
        player.on('pointerdown', () => {             
            this.DB = store.get(GameConstants.DB.DBNAME);
            this.DB.player = key;
            store.set(GameConstants.DB.DBNAME, this.DB);
            this.changeScene(this, GameConstants.Levels.MENU,0);
        });
        if (this.DB.player === key) { /* Si el player es el seleccionado, aparece con un background rojo + nombre en rojo */
            this.add.rectangle(player.x - 14, player.y - 24, player.width - 2, player.height - 2, 0xff0000).setOrigin(0).setScale(1.5).setDepth(0);
            const nombre = this.add.dynamicBitmapText(player.x - 14, player.y + 40, 'pixel', key, 8).setTint(0xff0000);
            nombre.setInteractive();
            nombre.on('pointerdown', () => {             
                this.DB = store.get(GameConstants.DB.DBNAME);
                this.DB.player = key;
                store.set(GameConstants.DB.DBNAME, this.DB);
                this.changeScene(this, GameConstants.Levels.MENU,0);
            });
        } else {
            const nombre = this.add.dynamicBitmapText(player.x - 14, player.y + 40, 'pixel', key, 8);
            nombre.setInteractive();
            nombre.on('pointerdown', () => {             
                this.DB = store.get(GameConstants.DB.DBNAME);
                this.DB.player = key;
                store.set(GameConstants.DB.DBNAME, this.DB);
                this.changeScene(this, GameConstants.Levels.MENU,0);
            });
        }
        
    }
}

export default SelectCharacterLevel;
