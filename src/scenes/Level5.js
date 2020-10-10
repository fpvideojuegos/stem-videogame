import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";

class Level5 extends BasicScene {
    constructor() {
        super({
            key: GameConstants.Levels.LEVEL5
        });
        this.target = GameConstants.Levels.MENU;        
    }

    create() {
        this.onlyOnce=true;

        //Player Creation
        this.createPlayer(); 
        this.player.timeLeft=60;
        //Create Repeated Background
        this.createRepeatedBackground(GameConstants.Textures.BG_LEVEL5, defaultStatus, defaultStatus,{x:1.15,y:1.15});
        //Finding enemies in json map
        this.findAndLoadEnemiesFromMap(GameConstants.Enemies_Layers.Level5);
        //ExtraPoints        
        //this.createCoins();
        //Object Heart for Extralifes
        //this.createExtraLifes();
        //Deactivate superPowers if were activated on previous levels
        //this.offSuperPowers();
        //Create superPower
        //this.createSuperPowers(GameConstants.Sprites.superSpeed.KEY);
        //create key object (Inventory object)
        this.createInventoryObjects(GameConstants.Sprites.star.KEY);   
        //create key object (Inventory object)
        //this.createInventoryObjects(GameConstants.Sprites.desertRose.KEY);
        //Start score text
        this.showLevelScoreText();

        this.createClocks();

        //Objects to Collect and finnish level
        //this.createCollectables(GameConstants.Sprites.Loupe.KEY);
        //HealthText
        this.createHealthText();
        //Tilemap        
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL5_TILESET, GameConstants.Layers.CLOUDS, false);
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL5_TILESET,undefined,undefined,undefined,false);
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL5_TILESET, GameConstants.Layers.LANDSCAPE, false);
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL5_TILESET, GameConstants.Layers.LANDSCAPEFRONT, false,4);
        
        //Create Enemy Areas for Water
        this.createTransparentObjects(GameConstants.Sprites.Water.OBJECT_NAME);
        
        //Create Leaders and its funtions
        //this.createLadders();

        //Objects to Collect and finnish level
        this.createCollectables(GameConstants.Sprites.Wires.KEY, GameConstants.Sprites.Wires.KEY );
        this.createCollectables(GameConstants.Sprites.Button.KEY, GameConstants.Sprites.Button.KEY, false);
        this.createCollectables(GameConstants.Sprites.SolarPanel.KEY, GameConstants.Sprites.SolarPanel.KEY, false);
        this.createCollectables(GameConstants.Sprites.Screw.KEY, GameConstants.Sprites.Screw.KEY, false);

        //Hiden object for colling enemies
        this.findTransparentObjects(GameConstants.Layers.LIMITS, GameConstants.Sprites.Limit.KEY, false, true);
        //Creacion de objetos invisibles que dañaran a player 
        this.findTransparentObjects(GameConstants.Layers.SPIKES, GameConstants.Sprites.Spike.KEY, true);

        
        //Sounds **TODO ADD TO BasicScene        
        this.musicbg = this.sound.add(GameConstants.Sound.LEVEL5.OST, {volume: 0.4});
        this.addEventForMusic(this.musicbg,true);
        //background ambiance effect
        this.ambiencebg = this.sound.add(GameConstants.Sound.LEVEL5.AMBIENCE, {volume: 0.05});
        this.addEventForMusic(this.ambiencebg,true);
        
        //Create End Object Hide
        //this.createEndLevelObject(GameConstants.Sprites.Key.KEY, GameConstants.Anims.KEY);     

    
    }//create
    
   


    update(time, delta) {        

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

export default Level5;