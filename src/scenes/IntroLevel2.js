import GameConstants from '../services/GameConstants.js';


class IntroLevel2 extends Phaser.Scene {
    constructor() {
        super({key: 'IntroLevel2'});
    }
    
    preload() {
        console.log('Scene: Introlevel2');
        

    }

    create() {
        this.run = false;


        //Music Background
        this.musicBg = this.sound.add(GameConstants.Sound.LEVEL2.AMBIENCE, {volume: 0.6});
        this.musicBg.play();
        this.musicBg.setLoop(true);

        //Plane
        this.musicBg2 = this.sound.add(GameConstants.Sound.LEVEL2.PLANE, {volume: 0.4});
        this.musicBg2.play();
        this.musicBg2.setLoop(true);

        //Music Bus
        this.musicFalling = this.sound.add('falling');

        this.height = this.cameras.main.height;
        this.width = this.cameras.main.width;        
        
        

       //this.backgroundimg = this.add.tileSprite(0, 0, this.width, this.height, GameConstants.Textures.BG_LEVEL2).setOrigin(0);       

        this.bg2_sky= this.add.tileSprite(0, 0, this.width, this.height, 'bg2-sky').setOrigin(0).setScale(1.25);
        this.bg2_clouds = this.add.tileSprite(0, 0, this.width, this.height, 'bg2-clouds').setOrigin(0).setScale(1.25);
        this.bg2_sea = this.add.tileSprite(0, 0, this.width, this.height, 'bg2-sea').setOrigin(0).setScale(1.25);
        this.bg2_far_grounds = this.add.image(this.width/2, 0, 'bg2-far-grounds').setOrigin(0).setScale(1.25);


       
        //women animation setting
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("amelia_intro", {
                start: 0,
                end: 1
            }),
            frameRate: 3,
            repeat: -1
        });



       // adding women Sprite
       this.woman = this.physics.add.sprite(200,150, "amelia_intro").setAlpha(0);
       this.woman.setDepth(2);       
       this.woman.body.setAllowGravity(false);
       this.woman.anims.play("run");


              
        // Bus animation setting 
        this.anims.create({
            key: "fly",
            frames: this.anims.generateFrameNumbers("plane_intro", {
                start: 0,
                end: 3
            }),
            frameRate: 4,
            repeat: -1
        });



       // adding plane Sprite
       this.plane = this.physics.add.sprite(200,365, "plane_intro");
       this.plane.setDepth(2);       
       this.plane.body.setAllowGravity(false);
       this.plane.anims.play("fly");



       //TEXTS
        //Text Dialog        
        this.textInstructions = this.add.dynamicBitmapText(30, this.height-50, 'pixel', '')
                                                        .setScrollFactor(0)
                                                        .setDepth(3) 
                                                        .setAlpha(1);

        
        //TODO COORDINATE TIMES IN EACH LANGUAGE
        let textie = '';        
        for (let i = 1; i <= 7; i++) {
            this.time.addEvent({
                delay: 3500 + (i*2600),
                callback: () => {                    
                    textie+=this.TG.tr('LEVEL1.AGATHA_' + i) + "\n\n";
                    this.textInstructions.setText(textie);
                    if(i % 2 == 0) textie='';
                }
              })
        }

        //SOUNDS
        this.sound_AGATHA = this.sound.add( this.TG.getActualLang() + "_" + GameConstants.Sound.LEVEL1.AGATHA, {volume: 2});
        

        

        //Show texts
        this.time.addEvent({
            delay: 4500,
            callback: () => {                
                this.woman.setAlpha(1);
                this.sound_AGATHA.play();
            },
            callbackScope: this
        });
        
        

        //Time Door
        this.door = this.physics.add.sprite(700,300,'timedoor');
        this.door.body.setImmovable(true);
        this.door.body.setAllowGravity(false);
        this.door.setAlpha(0);
        
        
        this.time.addEvent({
            delay: 27000,
            callback: () => { 
                this.textInstructions.setAlpha(0);
                this.woman.setAlpha(0);
                this.musicFalling.play();               
                this.run = true;
            },
            callbackScope: this
        });

        this.passthedoor = false;
        //Atraviesa la puerta
        this.physics.add.overlap(this.plane, this.door, () => {
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
                        this.musicBg2.stop();                                               
                        this.scene.start(GameConstants.Levels.LEVEL2);            
                    });
                }
        });

        
        this.skip = false;

        //Skip to Level 
        const skipButton = this.add.dynamicBitmapText(this.width - 100, 20, 'pixel', this.TG.tr('LEVELINTRO.SKIP'));        
        skipButton.setPosition(this.width - skipButton.width - 30, 20);
        skipButton.setInteractive().setDepth(2);
        skipButton.on('pointerdown', () => { 
            this.skipIntro();
        });

        //Press any key to Skip
        this.input.keyboard.on('keydown', () => { this.skipIntro(); });
        
        //Press A GamePad button to Skip
        this.gamepad = null;
        this.input.gamepad.once('down', (pad) => {
            this.gamepad = pad;            
        });


        



    }

    update(time, delta) {                

        if (this.gamepad && !this.skip){
            if (this.gamepad.A) this.skipIntro();
        }

        
        //PARALLAX Move 
        this.bg2_sky.tilePositionX +=  0.1 ;
        this.bg2_clouds.tilePositionX +=  0.3 ;
        this.bg2_sea.tilePositionX +=  0.6 ;

        if (this.run) {
            this.plane.setVelocityX(150);            
        }
       
    }

    skipIntro(){
        this.skip = true;
        this.cameras.main.fade(700, 0, 0, 0);
        this.cameras.main.on('camerafadeoutcomplete', () => {                        
            this.musicBg.stop();
            this.musicBg2.stop();
            this.sound_AGATHA.stop();
            this.scene.start(GameConstants.Levels.LEVEL2);
        });

    }
}

export default IntroLevel2;
