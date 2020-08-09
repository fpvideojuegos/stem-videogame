import BasicIntroScene from "./BasicIntroScene.js";
import GameConstants from '../services/GameConstants.js';


class IntroLevel1 extends BasicIntroScene {
    constructor() {
        super({key: 'IntroLevel1', 
              target:GameConstants.Levels.LEVEL1});
        
    }
    
 
    create() {
        
        //Running Vble
        this.run = false;

        //Create Music Background (Layer1 + Layer2)
        this.createBgSounds(GameConstants.Sound.LEVEL1.AMBIENCE, GameConstants.Sound.LEVEL1.BUS);

        this.height = this.cameras.main.height;
        this.width = this.cameras.main.width;        
        
        // SKIP Control
        const skipButton = this.add.dynamicBitmapText(this.width - 100, 20, 'pixel', this.TG.tr('LEVELINTRO.SKIP'));        
        skipButton.setPosition(this.width - skipButton.width - 30, 20);
        skipButton.setInteractive().setDepth(2);
        skipButton.on('pointerdown', () => { 
            this.skipIntro();
        });


        this.backgroundimg = this.add.tileSprite(0, 0, this.width, this.height, GameConstants.Textures.BG_LEVEL1).setOrigin(0).setInteractive();       
        this.backgroundimg.once('pointerup',() => { this.skipIntro(); });

        //women animation setting
        this.anims.create({
            key: "runAgatha",
            frames: this.anims.generateFrameNumbers("agatha_intro", {
                start: 0,
                end: 1
            }),
            frameRate: 3,
            repeat: -1
        });



       // adding women Sprite
       this.woman = this.physics.add.sprite(150,150, "agatha_intro").setAlpha(0);
       this.woman.setDepth(2);       
       this.woman.body.setAllowGravity(false);
       this.woman.anims.play("runAgatha");


              
        // Bus animation setting 
        this.anims.create({
            key: "drive",
            frames: this.anims.generateFrameNumbers("bus_intro", {
                start: 0,
                end: 3
            }),
            frameRate: 4,
            repeat: -1
        });



       // adding bus Sprite
       this.bus = this.physics.add.sprite(150,365, "bus_intro");
       this.bus.setDepth(2);       
       this.bus.body.setAllowGravity(false);
       this.bus.anims.play("drive");



       //TEXTS
        //Text Dialog        
        this.textInstructions = this.add.bitmapText(300, 50, 'pixel', '')
                                                        .setScrollFactor(0)
                                                        .setDepth(3) 
                                                        .setAlpha(1);

        
        //TODO COORDINATE TIMES IN EACH LANGUAGE
        let textie = '';        
        for (let i = 1; i <= 8; i++) {
            this.time.addEvent({
                delay: 3500 + (i*2600),
                callback: () => {                    
                    textie=this.TG.tr('LEVEL1.AGATHA_' + i);
                    this.typewriteBitmapText(textie,i);                    
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
                //this.textInstructions.setAlpha(0);
                this.woman.setAlpha(0);
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
                        this.musicBg2.stop();                                               
                        this.scene.start(GameConstants.Levels.LEVEL1);            
                    });
                }
        });

        
        this.skip = false;


    }

    update(time, delta) {        
        //this.bg.tilePositionX += 0.5;

        if (this.gamepad && !this.skip){
            if (this.gamepad.A) this.skipIntro();
        }

        this.backgroundimg.tilePositionX += 0.5;

        

        if (this.run) {
            this.bus.setVelocityX(150);            
        }
       
    }


}

export default IntroLevel1;
