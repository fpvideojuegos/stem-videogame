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
        
        this.textDialog = this.add.dynamicBitmapText(30, this.cameras.main.height - 75, GameConstants.Fonts.PIXEL, "",10 );
        this.textDialog.setScrollFactor(0);
        this.textDialog.setDepth(3);



        //Sounds        
        this.musicbg = this.sound.add(GameConstants.Sound.LEVEL2.OST, {volume: 0.4});
        this.addEventForMusic(this.musicbg,true);
        //background ambiance effect
        this.ambiencebg = this.sound.add(GameConstants.Sound.LEVEL2.AMBIENCE, {volume: 1});
        this.addEventForMusic(this.ambiencebg,true);
        

        //Create Treasure
        this.keys = this.createEndLevelObject(GameConstants.Sprites.Treasure.KEY);
        this.physics.world.enable(this.keys);
        this.keylevel = this.keys[0];
        this.keylevel.setScale(1.25);
        this.keylevel.body.setAllowGravity(false);
        this.keylevel.setAlpha(0);
        this.anims.play(GameConstants.Anims.TREASURE, this.keylevel);

        //Collider for Bracelet
        this.playercollide = this.physics.add.collider(this.player, this.keylevel, () => {
            this.musicbg.stop();
            this.ambiencebg.stop();
            this.keylevel.destroy();            
            this.player.nextScene();
        });

        this.playercollide.active=false;
      

        //PRIVATE SCENE ELEMENTS
        //Water overlap back to start
        this.hitWater = false;
        let water = this.findTransparentObjects('Water', 'Water', false);
        this.physics.add.overlap(this.player, water, (player, waterLayer) => {    
            if (!this.hitWater) {
                player.loseHealth();
                player.soundPlayerAuch.play();                           
                this.map.findObject(GameConstants.Sprites.Player.KEY, (d) => {
                    if (d.type === GameConstants.Sprites.Player.KEY) {                
                        let newX  =  d.x;
                        let newY = d.y;

                        this.cameras.main.fadeIn(1500);
                        this.player.body.setVelocity(0, 0);
                        this.player.x = newX;
                        this.player.y = newY;
                        if (this) {
                            this.time.addEvent({
                                delay: 600,
                                callback: () => {                            
                                    this.hitWater = false;
                                },
                                callbackScope: this
                            });
                        }

                    }
                });                        
            }
        });    
            


        
    
        }//create
    

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