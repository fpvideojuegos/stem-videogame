import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";

class Level3 extends BasicScene {
    constructor() {
        super({
            key: GameConstants.Levels.LEVEL3
        });
        this.target = GameConstants.Levels.INTROLEVEL4;        
        
    }

    create() {        
        this.onlyOnce = true;

        //Player Creation
        this.createPlayer();
        
        //BG PARALLAX        
        this.bg3_back = this.add.tileSprite(0, 0, this.map.widthInPixels, this.map.heightInPixels, 'bg3_back').setOrigin(0);
        this.bg3_middle = this.add.tileSprite(0, 0, this.map.widthInPixels, this.map.heightInPixels, 'bg3_middle').setOrigin(0);
               
        //Finding enemies in json map
        this.findAndLoadEnemiesFromMap(GameConstants.Enemies_Layers.Level3);
        //ExtraPoints        
        this.createCoins();
        //Objects to Collect
        
        //HealthText
        this.createHealthText();
        //Start score text
        this.showLevelScoreText();
        //Deactivate superPowers if were activated on previous levels
        this.offSuperPowers();
        //Object Heart for Extralifes
        this.createExtraLifes();     
        //Create superPower
        this.createSuperPowers(GameConstants.Sprites.lowGravity.KEY);
        //create key object (Inventory object)
        this.createInventoryObjects(GameConstants.Sprites.lysFlower.KEY);        
        
        //Tilemap        
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL3_TILESET, GameConstants.Layers.CLOUDS, false);
        this.platformlayer = this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL3_TILESET,undefined,undefined,undefined,false);
        

        //PRIVATE SCENE ELEMENTS
        //Creacion de elementos decorativos        
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL3_TILESET, GameConstants.Layers.LANDSCAPE, false);                
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL3_TILESET, GameConstants.Layers.LANDSCAPEFRONT, false,4);
        
        
        //Creacion de objetos invisibles que dañaran a player
        //this.findTransparentObjects(GameConstants.Layers.SPIKES, GameConstants.Sprites.Spike.KEY, true);
        //Hiden object for colling enemies
        this.findTransparentObjects(GameConstants.Layers.LIMITS, GameConstants.Sprites.Limit.KEY, false, true);


        //Objects to Collect and finnish level
        this.createCollectables(GameConstants.Sprites.OilBottle.KEY, GameConstants.Sprites.OilBottle.KEY );
        this.createCollectables(GameConstants.Sprites.Matches.KEY, GameConstants.Sprites.Matches.KEY,false);
        this.createCollectables(GameConstants.Sprites.Axe.KEY, GameConstants.Sprites.Axe.KEY,false);


        
        //Sounds        
        this.musicbg = this.sound.add(GameConstants.Sound.LEVEL3.OST, {volume: 0.4});
        this.addEventForMusic(this.musicbg,true);
        //background ambiance effect
        this.ambiencebg = this.sound.add(GameConstants.Sound.LEVEL3.AMBIENCE, {volume: 1});
        this.addEventForMusic(this.ambiencebg,true);
        
      
        //Create Leaders and its funtions
        this.createLadders();

            
        //Create Enemy Areas for Water
        this.createTransparentObjects(GameConstants.Sprites.Water.OBJECT_NAME);

        
    
        }//create
    




    update(time, delta) {        


         //PARALLAX Move relative to cameras scroll move
         this.bg3_back.tilePositionX = this.cameras.main.scrollX * 0.01 ;
         this.bg3_middle.tilePositionX = this.cameras.main.scrollX * 0.03 ;
         
 

        this.player.update(time, delta);
         Object.keys(this.enemyGroups).forEach(enemy => {
            this.enemyGroups[enemy].update();
        });

        if (this.player.collectablesCollected === 0 && this.onlyOnce){
            this.onlyOnce=false;
            this.musicbg.stop();
            this.ambiencebg.stop();            
            this.player.nextScene();
        }
        

        



    }//update
}

export default Level3;