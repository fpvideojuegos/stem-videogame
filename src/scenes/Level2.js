import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";

class Level2 extends BasicScene {
    constructor() {
        super({
            key: GameConstants.Levels.LEVEL2
        });
        this.target = GameConstants.Levels.INTROLEVEL3;
    }

    create() {
        //Player Creation
        this.createPlayer();
       //Background color
        this.cameras.main.backgroundColor.setTo(85, 180, 255);         
        //Finding enemies in json map
        this.findAndLoadEnemiesFromMap(GameConstants.Enemies_Layers.Level2);
        //ExtraPoints        
        this.createCoins();
        //HealthText
        this.createHealthText();
        //Deactivate superPowers if were activated on previous levels
        this.offSuperPowers();
        //Create superPower
        this.createSuperPowers(GameConstants.Sprites.invencibility.KEY);
        //Tilemap
        //Cloud background layers 
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL2_TILESET, GameConstants.Layers.CLOUDS, false);
        //Cloud platform layers 
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL2_TILESET,undefined, undefined, undefined, false);

        //PRIVATE SCENE ELEMENTS
        //Landscape layers
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL2_TILESET, GameConstants.Layers.LANDSCAPE, false);        
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL2_TILESET, GameConstants.Layers.LANDSCAPEFRONT, false,4);
        
        //Hiden object for enemies limits
        this.findTransparentObjects(GameConstants.Layers.LIMITS, GameConstants.Sprites.Limit.KEY, false, true);

        //Objects to Collect and finnish level
        this.createCollectables(GameConstants.Sprites.EarStick.KEY, GameConstants.Sprites.EarStick.KEY );
        this.createCollectables(GameConstants.Sprites.CristalBottle.KEY, GameConstants.Sprites.CristalBottle.KEY, false);
        this.createCollectables(GameConstants.Sprites.WaterBottle.KEY, GameConstants.Sprites.WaterBottle.KEY, false);
        this.createCollectables(GameConstants.Sprites.PlasticGlass.KEY, GameConstants.Sprites.PlasticGlass.KEY, false);

        //Create Leaders and its funtions
        this.createLadders()
        
        //Sounds        
        this.musicbg = this.sound.add(GameConstants.Sound.LEVEL2.OST, {volume: 0.4});
        this.addEventForMusic(this.musicbg,true);
        //background ambiance effect
        this.ambiencebg = this.sound.add(GameConstants.Sound.LEVEL2.AMBIENCE, {volume: 1});
        this.addEventForMusic(this.ambiencebg,true);
        
        //Create End Object Hide
        this.createEndLevelObject(GameConstants.Sprites.Treasure.KEY, GameConstants.Anims.TREASURE);             
      

        //Create Enemy Areas for Water
        this.createTransparentObjects(GameConstants.Sprites.Water.OBJECT_NAME);
            


        
    
        }//create
    

    update(time, delta) {        

 

        this.player.update(time, delta);
         Object.keys(this.enemyGroups).forEach(enemy => {
            this.enemyGroups[enemy].update();
        });

        //If all objects collected then active End Level Object
        if (this.player.collectablesCollected === 0){
            this.playerFinalCollide.active=true;
            this.keylevel.setAlpha(1);            
        }
        

        



    }//update
}

export default Level2;