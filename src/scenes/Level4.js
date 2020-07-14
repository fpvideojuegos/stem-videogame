import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";

class Level4 extends BasicScene {
    constructor() {
        super({
            key: GameConstants.Levels.LEVEL4
        });
        this.target = GameConstants.Levels.MENU;
    }

    create() {
        //Player Creation
        this.createPlayer();
        //Background        
        //this.createRepeatedBackground(GameConstants.Textures.BG_LEVEL2, defaultStatus, defaultStatus,{x:2.7,y:2.7});
        //BG PARALLAX        
        /*this.bg3_back = this.add.tileSprite(0, 0, this.map.widthInPixels, this.map.heightInPixels, 'bg3_back').setOrigin(0);
        this.bg3_middle = this.add.tileSprite(0, 0, this.map.widthInPixels, this.map.heightInPixels, 'bg3_middle').setOrigin(0);
        */

        this.cameras.main.backgroundColor.setTo(0, 0, 0); 
        //Finding enemies in json map
        this.findAndLoadEnemiesFromMap(GameConstants.Enemies_Layers.Level4);
        //ExtraPoints        
        this.createCoins();
        //Objects to Collect
        //this.createCollectables(GameConstants.Sprites.Loupe.KEY);
        //HealthText
        this.createHealthText();
        //Tilemap
        this.platformlayer = this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL4_TILESET);
        
        //To make collidable only when comes from up the tile 1 and 2 from this Layer
        let x, y, tile;
        for (x = 0; x < this.platformlayer.width; x++) {
            for (y = 1; y < this.platformlayer.height; y++) {                
            tile = this.platformlayer.getTileAt(x, y);                
            if (tile !== null) {                                
                tile.setCollision(false, false, true, false); //right,left,up,down                            
                }
            }
        }

        //PRIVATE SCENE ELEMENTS
        //Creacion de elementos decorativos
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL4_TILESET, GameConstants.Layers.LANDSCAPE, false);        
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL4_TILESET, GameConstants.Layers.LANDSCAPEFRONT, false,4);
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL4_TILESET, GameConstants.Layers.CLOUDS, false);
        
        //Creacion de objetos invisibles que dañaran a player
        //this.findTransparentObjects(GameConstants.Layers.SPIKES, GameConstants.Sprites.Spike.KEY, true);
        //Hiden object for colling enemies
        this.findTransparentObjects(GameConstants.Layers.LIMITS, GameConstants.Sprites.Limit.KEY, false, true);


        //Objects to Collect and finnish level
        this.createCollectables(GameConstants.Sprites.EarStick.KEY, GameConstants.Sprites.EarStick.KEY );
        this.createCollectables(GameConstants.Sprites.CristalBottle.KEY, GameConstants.Sprites.CristalBottle.KEY);


        
        this.textDialog = this.add.dynamicBitmapText(30, this.cameras.main.height - 75, GameConstants.Fonts.PIXEL, "",10 );
        this.textDialog.setScrollFactor(0);
        this.textDialog.setDepth(3);



        //Sounds        
        this.musicbg = this.sound.add(GameConstants.Sound.LEVEL1.BSO, {volume: 0.4});
        this.addEventForMusic(this.musicbg,true);
        //background ambiance effect
        this.ambiencebg = this.sound.add(GameConstants.Sound.LEVEL1.AMBIENCE, {volume: 1});
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
      
        this.climb = this.findTransparentObjects('Climb', 'Climb');        
        this.climbout = this.findTransparentObjects('Climb', 'ClimbOut');        
        
            
        this.physics.add.overlap(this.player, this.climb, this.climbArea, null, this);
        this.physics.add.overlap(this.player, this.climbout, this.climbAreaOut, null, this);


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
    
        //**TODO Ladder climbing To BASICSCENE
        climbArea(player, area){                 
                player.x = area.x;
                player.body.setAllowGravity(false);
                player.isInLiana = true;
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;            
        }
        
        climbAreaOut(player, area){                            
            this.player.body.setAllowGravity(true);
            this.player.isInLiana = false;
            
        }



    update(time, delta) {        


         //PARALLAX Move relative to cameras scroll move
        /* this.bg3_back.tilePositionX = this.cameras.main.scrollX * 0.01 ;
         this.bg3_middle.tilePositionX = this.cameras.main.scrollX * 0.03 ;
         */
 

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

export default Level4;