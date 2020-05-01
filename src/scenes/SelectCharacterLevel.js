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


        //loop the players_sprites
        let posX = 150;
        let posY = 80;
        this.players = GameConstants.Players_Sprites;           
        Object.entries(this.players).forEach(([key, player]) => {            
            let thePlayer = this.add.image(posX, posY, player.key, player.key + "_2").setScale(1.5).setDepth(1);            
            this.setCurrentPlayer(thePlayer, player);            
            posX += 150;
            if(posX % 750 == 0){                
                posX = 150;
                posY += 150;
            }
        });
    }

    update(time, delta) {
        
    }

    /**
     * Give the image interactive properties and also round in red if selected
     * 
     * @param thePlayer image object
     * @param playerInfo json properties
     * 
     */
    setCurrentPlayer(thePlayer, playerInfo) {
        thePlayer.setInteractive();
        thePlayer.on('pointerdown', () => {             
            this.selectPlayer(playerInfo.key);
        });
        if (this.DB.player === playerInfo.key) { /* Si el player es el seleccionado, aparece con un background rojo + nombre en rojo */
            this.add.rectangle(thePlayer.x - 14, thePlayer.y - 24, thePlayer.width - 2, thePlayer.height - 2, 0xff0000).setOrigin(0).setScale(1.5).setDepth(0);
            const nameTxt = this.add.dynamicBitmapText(thePlayer.x - 14, thePlayer.y + 40, 'pixel', playerInfo.name, 8).setTint(0xff0000);
            nameTxt.setInteractive();
            nameTxt.on('pointerdown', () => {             
                this.selectPlayer(playerInfo.key);
            });
        } else {
            const nameTxt = this.add.dynamicBitmapText(thePlayer.x - 14, thePlayer.y + 40, 'pixel', playerInfo.name, 8);
            nameTxt.setInteractive();
            nameTxt.on('pointerdown', () => {             
                this.selectPlayer(playerInfo.key);
            });
        }
        
    }

    /**
     * Change player selected DataBase value
     * @param key player KEY value
     * 
     */
    selectPlayer(key){
        this.DB = store.get(GameConstants.DB.DBNAME);
        this.DB.player = key;
        store.set(GameConstants.DB.DBNAME, this.DB);
        this.changeScene(this, GameConstants.Levels.MENU,0);

    }

}

export default SelectCharacterLevel;
