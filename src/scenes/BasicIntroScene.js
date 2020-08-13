import GameConstants from "../services/GameConstants.js";

class BasicIntroScene extends Phaser.Scene {
    constructor(config) {
        super(config.key);
        this.key = config.key;
        this.target = config.target;
        
    }

    preload(){            
        //Music Bus
        this.musicFalling = this.sound.add('falling');


        //Running Vble
        this.run = false;

        this.skip = false;

        this.passthedoor = false;

        //TypeofBackground
        this.tileSpriteBG = true;
        this.parallaxBG = false;        
        
        this.height = this.cameras.main.height;
        this.width = this.cameras.main.width;        
        
        // SKIP Control
        const skipButton = this.add.dynamicBitmapText(this.width - 100, 20, 'pixel', this.TG.tr('LEVELINTRO.SKIP')).setTint(0x808489);        
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
        
        
        //Hidden Time Door
        this.door = this.physics.add.sprite(700,300,'timedoor');
        this.door.body.setImmovable(true);
        this.door.body.setAllowGravity(false);
        this.door.setAlpha(0);

        

    }

    update(time,delta) {
        if (this.gamepad && !this.skip){
            if (this.gamepad.A) this.skipIntro();
        }

        if (this.tileSpriteBG) this.backgroundimg.tilePositionX += 0.5;

        

        if (this.run) {            
            this.transport.setVelocityX(150);            
        }

    }


    /**
     * Create Sounds Layer for Intro Scene
     * 
     * @param layer1 
     * @param layer2 
     */
    createBgSounds(layer1, layer2){

        this.musicBg = this.sound.add(layer1, {volume: 0.6});
        this.musicBg.play();
        this.musicBg.setLoop(true);

        this.musicBg2 = this.sound.add(layer2, {volume: 0.4});
        this.musicBg2.play();
        this.musicBg2.setLoop(true);
    }

    /**
     * Continue to next level
     */
    skipIntro(){
        this.skip = true;
        this.cameras.main.fade(700, 0, 0, 0);
        this.cameras.main.on('camerafadeoutcomplete', () => {                        
            this.musicBg.stop();
            this.musicBg2.stop();
            this.womanVoice.stop();
            this.scene.start(this.target);
        });

    }

    /**
     * Create tilesprite Background
     * @param bgLevel 
     */
    createBackgroundImg(bgLevel){
        this.tileSpriteBG = true;
        this.parallaxBG = false;

        this.backgroundimg = this.add.tileSprite(0, 0, this.width, this.height, bgLevel).setOrigin(0).setInteractive();       
        this.backgroundimg.once('pointerup',() => { this.skipIntro(); });
    }


    createWoman(womanKey, delayWoman){
        this.womanKey = womanKey;
        this.delayWoman = delayWoman;
        //women animation setting
        this.anims.create({
            key: "talkWoman",
            frames: this.anims.generateFrameNumbers(womanKey, {
                start: 0,
                end: 1
            }),
            frameRate: 3,
            repeat: -1
        });



       // adding women Sprite hidden
       this.woman = this.physics.add.sprite(150,150, womanKey);
       this.woman.setDepth(2);       
       this.woman.body.setAllowGravity(false);
       

    }


    /**
     * 
     * @param transportKey 
     * @param delayRunTransport - miliseconds
     */
    createTransport(transportKey, delayRunTransport){
        //  animation setting 
        this.anims.create({
            key: "driveTransport",
            frames: this.anims.generateFrameNumbers(transportKey, {
                start: 0,
                end: 3
            }),
            frameRate: 4,
            repeat: -1
        });



       // adding bus Sprite
       this.transport = this.physics.add.sprite(150,365, transportKey);
       this.transport.setDepth(2);       
       this.transport.body.setAllowGravity(false);
       this.transport.anims.play("driveTransport");


       //active move transport
       this.time.addEvent({
        delay: delayRunTransport,
        callback: () => {                         
            this.musicFalling.play();               
            this.run = true;
        },
        callbackScope: this
    });




    }

    /**
     * 
     * @param textsPrefix 
     * @param delayText - delayText added to delayWoman
     * @param speedText - letter milisecond
     */
    createTexts(textsPrefix, delayText, speedText){               
        this.speedText = speedText;
        //Text Dialog        
        this.textInstructions = this.add.bitmapText(300, 50, 'pixel', '')
                                                        .setScrollFactor(0)
                                                        .setDepth(3) 
                                                        .setAlpha(1);

        
        //TODO COORDINATE TIMES IN EACH LANGUAGE
        let textie = '';                
            this.time.addEvent({
                delay: this.delayWoman + delayText,
                callback: () => {                    
                    textie=this.TG.tr(textsPrefix);
                    this.typewriteBitmapText(textie);                    
                }
              })        
    }

    createVoice(voicePrefix){
        //SOUNDS
        this.womanVoice = this.sound.add( this.TG.getActualLang() + "_" + voicePrefix, {volume: 2});
        

        

        //Show texts
        this.time.addEvent({
            delay: this.delayWoman,
            callback: () => {                                
                this.woman.anims.play("talkWoman");
                this.womanVoice.play();
            },
            callbackScope: this
        });
    }


    createOverlap(){
        this.physics.add.overlap(this.transport, this.door, () => {
            if (!this.passthedoor){ 
                this.passthedoor=true;
                
                this.cameras.main.shake(1000);  
                this.cameras.main.fade(5000, 0, 0, 0);    
                this.time.addEvent({
                    delay: 700,
                    callback: () => {                                        
                    },
                    callbackScope: this
                });
               
            
            
                this.cameras.main.on('camerafadeoutcomplete', () => {
                    this.musicBg.stop();
                    this.musicBg2.stop();                                               
                    this.scene.start(this.target);            
                });
            }
        });


    }

    /**
     *
     * @param {string} text
     */
    typewriteBitmapText(text){
        const length = text.length
        let i = 0
        
        let textInstructions = this.add.bitmapText(300, 25, 'pixel', '')
                                                        .setScrollFactor(0)
                                                        .setDepth(3) 
                                                        .setAlpha(1);

        this.time.addEvent({
            callback: () => {
                if (i==length-1){
                    this.woman.anims.stop();
                    this.woman.setTexture(this.womanKey);
                }
                textInstructions.text += text[i]
                ++i                
            },
            repeat: length - 1,
            delay: this.speedText  
        })
    }


}

export default BasicIntroScene;