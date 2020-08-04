import GameConstants from '../services/GameConstants.js';
import BasicIntroScene from "./BasicIntroScene.js";



class IntroLevel4 extends BasicIntroScene {
    constructor() {
        super({key: 'IntroLevel4'});
    }
    
    preload() {
        console.log('Scene: IntroLevel4');
        

    }

    create() {
        this.run = false;


        //Music Background
        this.musicBg4 = this.sound.add(GameConstants.Sound.LEVEL4.AMBIENCE, {volume: 0.6});
        this.musicBg4.play();
        this.musicBg4.setLoop(true);


        //Music Bus
        this.musicFalling = this.sound.add('falling');

        this.height = this.cameras.main.height;
        this.width = this.cameras.main.width;        
        
        

        //BG PARALLAX        
        this.backgroundimg4 = this.add.tileSprite(0, 0, this.width, this.height, GameConstants.Textures.BG_LEVEL4).setOrigin(0);       
    
       
        //women animation setting
        this.anims.create({
            key: "mariatalk",
            frames: this.anims.generateFrameNumbers("maria_intro", {
                start: 0,
                end: 1
            }),
            frameRate: 2,
            repeat: -1
        });



       // adding women Sprite
       this.woman4 = this.physics.add.sprite(50,15, "maria_intro").setAlpha(0).setOrigin(0);
       this.woman4.setDepth(2);       
       this.woman4.body.setAllowGravity(false);
       this.woman4.anims.play("mariatalk");


              
        // Bus animation setting 
        this.anims.create({
            key: "flyingbook_big_fly",
            frames: this.anims.generateFrameNumbers("flyingbook_intro", {
                start: 0,
                end: 7
            }),
            frameRate: 7,
            repeat: -1
        });



       // adding plane Sprite
       this.flyingbook = this.physics.add.sprite(30,this.height-150, "flyingbook_intro").setOrigin(0);
       this.flyingbook.setDepth(2);       
       this.flyingbook.body.setAllowGravity(false);
       this.flyingbook.anims.play("flyingbook_big_fly");



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
                this.woman4.setAlpha(1);
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
                this.woman4.setAlpha(0);
                this.musicFalling.play();               
                this.run = true;
            },
            callbackScope: this
        });

        this.passthedoor = false;
        //Atraviesa la puerta
        this.physics.add.overlap(this.flyingbook, this.door, () => {
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
                        this.musicBg4.stop();                        
                        this.scene.start(GameConstants.Levels.LEVEL4);            
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

        
        this.backgroundimg4.tilePositionX += 0.5;

        if (this.run) {
            this.flyingbook.setVelocityX(150);            
        }
       
    }

    skipIntro(){
        this.skip = true;
        this.cameras.main.fade(700, 0, 0, 0);
        this.cameras.main.on('camerafadeoutcomplete', () => {                        
            this.musicBg4.stop();            
            this.sound_AGATHA.stop();
            this.scene.start(GameConstants.Levels.LEVEL4);
        });

    }
}

export default IntroLevel4;
