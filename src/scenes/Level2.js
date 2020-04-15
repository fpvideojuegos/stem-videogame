import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";

class Level2 extends BasicScene {
    constructor() {
        super({
            key: GameConstants.Levels.LEVEL2
        });
        this.target = GameConstants.Levels.LEVEL3;
    }

    create() {
        //Daniela Creation
        this.createPlayer();
        //Background        
        this.createRepeatedBackground(GameConstants.Textures.BG_LEVEL2, defaultStatus, defaultStatus,{x:2.7,y:2.7});
        //Finding enemies in json map
        //this.findAndLoadEnemiesFromMap(GameConstants.Enemies_Layers.Level1);
        //ExtraPoints        
        this.createCoins();
        //Objects to Collect
        //this.createCollectables(GameConstants.Sprites.Loupe.KEY);
        //HealthText
        this.createHealthText();
        //Tilemap
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL2_TILESET);

        //PRIVATE SCENE ELEMENTS
        //Creacion de elementos decorativos
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL2_TILESET, GameConstants.Layers.LANDSCAPE, false);
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL2_TILESET, GameConstants.Layers.LANDSCAPEFRONT, false,4);
        //Creacion de objetos invisibles que dañaran a daniela
        this.findTransparentObjects(GameConstants.Layers.SPIKES, GameConstants.Sprites.Spike.KEY, true);

        
        this.textDialog = this.add.dynamicBitmapText(30, this.cameras.main.height - 75, GameConstants.Fonts.PIXEL, "",10 );
        this.textDialog.setScrollFactor(0);
        this.textDialog.setDepth(3);



        //Sounds        
        this.musicbg = this.sound.add(GameConstants.Sound.LEVEL1.BSO, {volume: 0.4});
        this.addEventForMusic(this.musicbg,true);
        //background ambiance effect
        this.ambiencebg = this.sound.add(GameConstants.Sound.LEVEL1.AMBIENCE, {volume: 1});
        this.addEventForMusic(this.ambiencebg,true);
        

        //Create Bracelet
        this.keys = this.createEndLevelObject(GameConstants.Sprites.Key.KEY);
        this.physics.world.enable(this.keys);
        this.keylevel = this.keys[0];
        this.keylevel.setScale(1.25);
        this.keylevel.body.setAllowGravity(false);
        this.keylevel.setAlpha(0);
        this.anims.play(GameConstants.Anims.KEY, this.keylevel);

        //Collider for Bracelet
        this.playercollide = this.physics.add.collider(this.player, this.keylevel, () => {
            this.musicbg.stop();
            this.ambiencebg.stop();
            this.keylevel.destroy();            
            this.player.nextScene();
        });

        this.playercollide.active=false;
      
        this.climb = this.findTransparentObjects('Climb', 'Climb');        
        this.climbout = this.findTransparentObjects('Climb', 'ClimbOut');        
        
            
        this.physics.add.overlap(this.player, this.climb, this.climbArea, null, this);
        this.physics.add.overlap(this.player, this.climbout, this.climbAreaOut, null, this);
        
    
        }//create
    
        //**TODO Ladder climbing To BASICSCENE
        climbArea(daniela, area){                 
                daniela.x = area.x;
                daniela.body.setAllowGravity(false);
                daniela.isInLiana = true;
                daniela.body.velocity.x = 0;
                daniela.body.velocity.y = 0;            
        }
        
        climbAreaOut(daniela, area){                
            console.log("OUT");
            this.player.body.setAllowGravity(true);
            this.player.isInLiana = false;
            
        }



    update(time, delta) {        

        this.player.update(time, delta);
         Object.keys(this.enemyGroups).forEach(enemy => {
            this.enemyGroups[enemy].update();
        });

        if (this.player.collectablesCollected === 0){
            this.playercollide.active=true;
            this.keylevel.setAlpha(1);
        }
        

        



    }//update
}

export default Level2;