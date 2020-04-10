import GameConstants from '../services/GameConstants.js';


class IntroLevel1 extends Phaser.Scene {
    constructor() {
        super({key: 'IntroLevel1'});
    }
    
    preload() {
        console.log('Scene: Introlevel1');
        

    }

    create() {
        this.run = false;


        //Music Background
        this.musicBg = this.sound.add(GameConstants.Sound.LEVEL1.AMBIENCE, {volume: 0.6});
        this.musicBg.play();
        this.musicBg.setLoop(true);

        //Music Falling
        this.musicFalling = this.sound.add('falling');

        this.height = this.cameras.main.height;
        this.width = this.cameras.main.width;        
        
        //Opción de MENU en niveles
        const skipButton = this.add.dynamicBitmapText(this.width - 100, 20, 'pixel', this.TG.tr('LEVELINTRO.SKIP'));        
        skipButton.setPosition(this.width - skipButton.width - 30, 20);
        skipButton.setInteractive().setDepth(2);

        skipButton.on('pointerdown', () => { 
            this.cameras.main.fade(700, 0, 0, 0);
            this.cameras.main.on('camerafadeoutcomplete', () => {                        
                this.musicBg.stop();
                this.scene.start(GameConstants.Levels.LEVEL1);
            });
            
        });

        //Daniela Running
        //this.bg = this.add.tileSprite(0, 0, this.width, this.height, 'bg_park').setOrigin(0);

       //Background Parallax 
       /*this.bgparallax=[];
       for(let i=7;i>=1;i--){
        this.bgparallax[i]=this.add.tileSprite(0, 0, this.width, this.height, "layer_0"+i).setOrigin(0);

       }*/
       this.backgroundimg = this.add.tileSprite(0, 0, this.width, this.height, GameConstants.Textures.BG_INTROLEVEL1).setOrigin(0);
       
        // setting women animation
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("agatha_intro", {
                start: 0,
                end: 1
            }),
            frameRate: 3,
            repeat: -1
        });



       // adding women
       this.player = this.physics.add.sprite(200,150, "agatha_intro");
       this.player.setDepth(2);
       this.player.flipX = true;
       this.player.body.setAllowGravity(false);
       this.player.anims.play("run");


              
        // setting women animation
        this.anims.create({
            key: "drive",
            frames: this.anims.generateFrameNumbers("bus_intro", {
                start: 0,
                end: 3
            }),
            frameRate: 4,
            repeat: -1
        });



       // adding women
       this.bus = this.physics.add.sprite(200,365, "bus_intro");
       this.bus.setDepth(2);       
       this.bus.body.setAllowGravity(false);
       this.bus.anims.play("drive");




       //TEXTOS
        //Text Dialog
        this.textDialog = this.add.dynamicBitmapText(30, this.height-50, 'pixel', this.TG.tr('LEVELINTRO.DANIELA_MUM'));                
        this.textDialog.setScrollFactor(0);
        this.textDialog.setDepth(3);
        this.textDialog.setAlpha(0);

        //SOUNDS
        this.sound_AGATHA = this.sound.add( this.TG.getActualLang() + "_" + GameConstants.Sound.LEVEL1.AGATHA, {volume: 1.2});
        
        

        //Show texts
        this.time.addEvent({
            delay: 4000,
            callback: () => {
                this.textDialog.setAlpha(1);
                this.sound_AGATHA.play();
            },
            callbackScope: this
        });
        
        this.textDialog2 = this.add.dynamicBitmapText(30, this.height-50, 'pixel', this.TG.tr('LEVELINTRO.DANIELA_ANSWER'));                
        this.textDialog2.setScrollFactor(0);
        this.textDialog2.setDepth(3);
        this.textDialog2.setAlpha(0);

        this.time.addEvent({
            delay: 10000,
            callback: () => {
                this.textDialog.setAlpha(0);
                this.textDialog2.setAlpha(1);
                //this.sound_LEVELINTRO_I_ARRIVE_IN_5MINS.play();
            },
            callbackScope: this
        });

        //Time Door
        this.door = this.physics.add.sprite(700,300,'timedoor');
        this.door.body.setImmovable(true);
        this.door.body.setAllowGravity(false);
        this.door.setAlpha(0);
        

        this.time.addEvent({
            delay: 14000,
            callback: () => {                                
                this.textDialog2.setAlpha(0);
            },
            callbackScope: this
        });


        this.time.addEvent({
            delay: 17000,
            callback: () => {                 
                this.textDialog2.setAlpha(0);
                this.door.setAlpha(0);                                
            },
            callbackScope: this
        });

        this.time.addEvent({
            delay: 19000,
            callback: () => {                 
                this.musicFalling.play();               
                this.run = true;
            },
            callbackScope: this
        });

        this.passthedoor = false;
        //Atraviesa la puerta
        this.physics.add.overlap(this.bus, this.door, () => {
                if (!this.passthedoor){ 
                    this.passthedoor=true;
                    
                    this.cameras.main.shake(1000);  
                    this.cameras.main.fade(5000, 0, 0, 0);    
                    this.time.addEvent({
                        delay: 700,
                        callback: () => {                                        
                            /*for (let i=1;i<=7;i++){
                                this.bgparallax[i].setAlpha(0);
                             }*/ 
                        },
                        callbackScope: this
                    });
                   
                
                
                    this.cameras.main.on('camerafadeoutcomplete', () => {
                        this.musicBg.stop();                                               
                        this.scene.start(GameConstants.Levels.LEVEL1);            
                    });
                }
        });



    }

    update(time, delta) {        
        //this.bg.tilePositionX += 0.5;

        this.backgroundimg.tilePositionX += 0.5;

        
        //for(let i=this.bgparallax.length-1;i>=1;i--){
        /*for (let i=1;i<=7;i++){
            this.bgparallax[i].tilePositionX += (0.80 - (i*0.10));
         } 
        //}*/

        if (this.run) {
            this.bus.setVelocityX(150);            
        }
       
    }

    runToDoor(){


    }
}

export default IntroLevel1;
