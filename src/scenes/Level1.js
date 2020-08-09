import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";

class Level1 extends BasicScene {
    constructor() {
        super({
            key: GameConstants.Levels.LEVEL1
        });
        this.target = GameConstants.Levels.LEVEL2;
    }

    create() {
        //Player Creation
        this.createPlayer(); 
        //Create Repeated Background
        this.createRepeatedBackground(GameConstants.Textures.BG_LEVEL1, defaultStatus, defaultStatus,{x:1.65,y:1.65});
        //Finding enemies in json map
        this.findAndLoadEnemiesFromMap(GameConstants.Enemies_Layers.Level1);
        //ExtraPoints        
        this.createCoins();
        //Object Heart for Extralifes
        this.createExtraLifes();

        //Deactivate superPowers if were activated on previous levels
        this.offSuperPowers();
        //Create superPower
        this.createSuperPowers(GameConstants.Sprites.superSpeed.KEY);
        //create key object (Inventory object)
        this.createInventoryObjects(GameConstants.Sprites.desertRose.KEY);

        //Objects to Collect and finnish level
        this.createCollectables(GameConstants.Sprites.Loupe.KEY);
        //HealthText
        this.createHealthText();
        //Tilemap        
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL1_TILESET,undefined,undefined,undefined,false);
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL1_TILESET, GameConstants.Layers.LANDSCAPE, false);
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL1_TILESET, GameConstants.Layers.LANDSCAPEFRONT, false,4);
        
        //Creacion de objetos invisibles que dañaran a player 
        this.findTransparentObjects(GameConstants.Layers.SPIKES, GameConstants.Sprites.Spike.KEY, true);
        
        //Create Leaders and its funtions
        this.createLadders()
        
        //Sounds ** ADD TO BasicScene
        //this.createMusicBg()
        //this.createAmbienceBg()
        this.musicbg = this.sound.add(GameConstants.Sound.LEVEL1.OST, {volume: 0.4});
        this.addEventForMusic(this.musicbg,true);
        //background ambiance effect
        this.ambiencebg = this.sound.add(GameConstants.Sound.LEVEL1.AMBIENCE, {volume: 1});
        this.addEventForMusic(this.ambiencebg,true);
        

        //Create End Object Hide
        this.keys = this.createEndLevelObject(GameConstants.Sprites.Key.KEY);
        this.physics.world.enable(this.keys);
        this.keylevel = this.keys[0];
        this.keylevel.setScale(1.25);
        this.keylevel.body.setAllowGravity(false);
        this.keylevel.setAlpha(0);
        this.anims.play(GameConstants.Anims.KEY, this.keylevel);

        //Final Object to next Level
        this.playerFinalCollide = this.physics.add.collider(this.player, this.keylevel, () => {
            this.musicbg.stop();
            this.ambiencebg.stop();
            this.keylevel.destroy();            
            this.player.nextScene();
        });

        this.playerFinalCollide.active=false;
      
     

    
    }//create
    
   


    update(time, delta) {        

        this.player.update(time, delta);
         Object.keys(this.enemyGroups).forEach(enemy => {
            this.enemyGroups[enemy].update();
        });

        if (this.player.collectablesCollected === 0){
            this.playerFinalCollide.active=true;
            this.keylevel.setAlpha(1);
            //add to DB magickey object at inventory            

        }
        


    }//update
}

export default Level1;