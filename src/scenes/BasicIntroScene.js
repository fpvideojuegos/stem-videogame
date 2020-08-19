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


        //Global Variables
        this.run = false;
        this.skip = false;
        this.passthedoor = false;
        this.animWoman;
        this.animTransport;

        //TypeofBackground        
        this.parallaxBG = false;        
        //Screen Size
        this.height = this.cameras.main.height;
        this.width = this.cameras.main.width;        
        
        // SKIP Control
        const skipButton = this.add.dynamicBitmapText(this.width - 100, 20, 'pixel', this.TG.tr('LEVELINTRO.SKIP')).setTint(0x808489);
        skipButton.setPosition(this.width - skipButton.width - 30, 20);
        skipButton.setInteractive().setDepth(2);
        //skip with mouse click
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

        //click screen
        this.input.on('pointerup', ()=>{ this.skipIntro(); });
        
        
        //Hidden Time Door
        this.door = this.physics.add.sprite(700,300,'timedoor');
        this.door.body.setImmovable(true);
        this.door.body.setAllowGravity(false);
        this.door.setAlpha(0);
        this.door.setDepth(0);

        

    }

    update(time,delta) {
        if (this.gamepad && !this.skip){
            if (this.gamepad.A) this.skipIntro();
        }

        //Background moving
        
        if (!this.parallaxBG) this.backgroundimg.tilePositionX += 0.5;
        else{
            //PARALLAX Move 
            this.bgLayer1.tilePositionX +=  0.1 ;
            this.bgLayer2.tilePositionX +=  0.3 ;
            this.bgLayer3.tilePositionX +=  0.6 ;
            this.bgLayer4.tilePositionX += 0.07;

        }

        
        //Move transport
        if (this.run) {            
            this.transport.setVelocityX(150);            
        }

    }


    /**
     * Create Sounds Layer for Intro Scene
     * 
     * @param layer1 - Layer 1
     * @param layer2 - Layer 2
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
            this.animWoman.destroy();
            this.animTransport.destroy();         
            this.scene.start(this.target);
        });

    }

    /**
     * Create tilesprite Background
     * @param bgLevel - Background image key
     */
    createBackgroundImg(bgLevel){        
        this.parallaxBG = false;

        this.backgroundimg = this.add.tileSprite(0, 0, this.width, this.height, bgLevel).setOrigin(0).setInteractive();               
    }

    /**
     * Create Parallax Background 
     * @param bgLayer1Key - Background Layer 1 key
     * @param bgLayer2Key - Background Layer 2 key
     * @param bgLayer3Key - Background Layer 3 key
     * @param bgLayer4Key - Background Layer 4 key
     * @param layerScale - Scale for Layers
     */
    createParallaxBackground(bgLayer1Key,bgLayer2Key,bgLayer3Key,bgLayer4Key, layerScale){        
        this.parallaxBG = true;

        this.bgLayer1= this.add.tileSprite(0, 0, this.width, this.height, bgLayer1Key).setOrigin(0).setScale(layerScale);
        this.bgLayer2 = this.add.tileSprite(0, 0, this.width, this.height, bgLayer2Key).setOrigin(0).setScale(layerScale);
        this.bgLayer3 = this.add.tileSprite(0, 0, this.width, this.height, bgLayer3Key).setOrigin(0).setScale(layerScale);
        this.bgLayer4 = this.add.tileSprite(0,0, this.width, this.height, bgLayer4Key).setOrigin(0).setScale(layerScale).setDepth(3);

    }



    /**
     * 
     * @param womanKey - spritesheet Key for woman
     * @param delayWoman  - delay in miliseconds for woman start talking
     * @param womanVoiceKey - audio key for woman
     */
    createWoman(womanKey, delayWoman, womanVoiceKey){
        this.womanKey = womanKey;
        this.delayWoman = delayWoman;

        //women animation setting
        this.animWoman = this.anims.create({
            key: "talkWoman",
            frames: this.anims.generateFrameNumbers(womanKey, {
                start: 0,
                end: 1
            }),
            frameRate: 3,
            repeat: -1
        });



       // adding women Sprite hidden
       this.woman = this.physics.add.sprite(140,150, womanKey);
       this.woman.setDepth(2);       
       this.woman.body.setAllowGravity(false);

        //SOUNDS
        this.womanVoice = this.sound.add( this.TG.getActualLang() + "_" + womanVoiceKey, {volume: 2});

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


    /**
     * 
     * @param transportKey - spritesheet key for transport object          * 
     */
    createTransport(transportKey){
        //animation setting 
        this.animTransport = this.anims.create({
            key: "driveTransport",
            frames: this.anims.generateFrameNumbers(transportKey, {
                start: 0,
                end: 3
            }),
            frameRate: 4,
            repeat: -1
        });



       // adding bus Sprite
       this.transport = this.physics.add.sprite(140,365, transportKey);
       this.transport.setDepth(4);       
       this.transport.body.setAllowGravity(false);
       this.transport.anims.play("driveTransport");


        //Calculate when transport start moving
        //delay woman + duration woman voice
        //add 2 second after talking
        let delayRunTransport = this.delayWoman + (this.womanVoice.duration*1000) + 2000;
        
       //active move transport
       this.time.addEvent({
        delay: delayRunTransport,
        callback: () => {                         
            this.musicFalling.play();               
            this.run = true;
        },
        callbackScope: this
        });

        //Create Overlap between transport and hidden door
        this.createOverlap();

    }

    /**
     * 
     * @param textsPrefix - text
     * @param delayText - delayText added to delayWoman, silence time before start talking
     */
    createTexts(textsPrefix, delayText){                
        let textToWrite = this.TG.tr(textsPrefix);                
            this.time.addEvent({
                delay: this.delayWoman + delayText,
                callback: () => {                                        
                    this.typewriteBitmapText(textToWrite);                    
                }
              })        
    }



    /**
     *
     * @param {string} text
     */
    typewriteBitmapText(text){
        const length = text.length
        let i = 0
        
        let textInstructions = this.add.bitmapText(275, 50, 'pixel', '', 14)
                                                        .setScrollFactor(0)
                                                        .setDepth(3) 
                                                        .setAlpha(1);
        //Calculate speed of typewriting 
        //Duration of woice / (length + aprox number of lines*2 (\n\n))
        let speedText = (this.womanVoice.duration*1000) / (length + 18);       

        let lineLength = 0;

        //write text with typewriting effect 
        this.time.addEvent({
            callback: () => {                
                if (i==length-1){
                    this.woman.anims.stop();
                    this.woman.setTexture(this.womanKey);
                }
                lineLength++;                
                textInstructions.text += text[i]
                if (lineLength>32 && text[i]==" ") {
                    textInstructions.text +="\n\n";
                    lineLength=0;
                }
                ++i
                                
            },
            repeat: length - 1,
            delay: speedText  
        })
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
                    this.animWoman.destroy();
                    this.animTransport.destroy();                                           
                    this.scene.start(this.target);            
                });
            }
        });


    }


}

export default BasicIntroScene;