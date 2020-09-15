import GameConstants from "../services/GameConstants.js";

class BasicIntroScene extends Phaser.Scene {
    constructor(config) {
        super(config.key);
        this.key = config.key;
        this.target = config.target;
    }

    preload(){   
        this.DB = store.get(GameConstants.DB.DBNAME);
        //Music Bus
        this.musicFalling = this.sound.add('falling');

        //Global Variables
        this.run = false;
        this.skip = (!this.DB.intros)? this.skipIntro():false;
        this.passthedoor = false;
        this.animWoman = null;
        this.animTransport = null;

        this.musicBg;
        this.musicBg2;

        //TypeofBackground        
        this.parallaxBG = 0;   

        //For Level6
        this.allLevels = true;
        this.allInventory= true;
        this.continueLevel = true;

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
        this.door = this.physics.add.sprite(800,300,'timedoor');
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
        
        if (this.parallaxBG === 0) this.backgroundimg.tilePositionX += 0.5;
        else if (this.parallaxBG == 4){
            //PARALLAX Move 
            this.bgLayer1.tilePositionX +=  0.1 ;
            this.bgLayer2.tilePositionX +=  0.3 ;            
            this.bgLayer3.tilePositionX +=  0.6 ;
            this.bgLayer4.tilePositionX += 0.07;
        }else{ //Layer 2
            this.bgLayer1.tilePositionX +=  0.3 ;
            this.bgLayer2.tilePositionX +=  0.5 ;            
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
    createBgSounds(layer1, layer2=undefined){

        this.musicBg = this.sound.add(layer1, {volume: 0.6});        
        this.musicBg.play();
        this.musicBg.setLoop(true);

        if ((layer2!== undefined) && (this.DB.SFX)){
            this.musicBg2 = this.sound.add(layer2, {volume: 0.4});
            this.musicBg2.play();
            this.musicBg2.setLoop(true);
        }
    }

    /**
     * Continue to next level
     */
    skipIntro(){
        this.skip = true;
        this.cameras.main.fade(700, 0, 0, 0);
        this.cameras.main.on('camerafadeoutcomplete', () => {                        
            this.musicBg.stop();
            if (this.musicBg2 !== undefined) this.musicBg2.stop();
            if (this.womanVoice !== undefined) this.womanVoice.stop();              
            if (this.continueLevel) this.scene.start(this.target);
            else this.scene.start(GameConstants.Levels.LEVELSELECT);
        });

    }

    /**
     * Create tilesprite Background
     * @param bgLevel - Background image key
     */
    createBackgroundImg(bgLevel){        
        this.parallaxBG = 0;

        this.backgroundimg = this.add.tileSprite(0, 0, this.width, this.height, bgLevel).setOrigin(0).setInteractive();               
    }

    /**
     * Create Parallax Background 4 Layers
     * @param bgLayer1Key - Background Layer 1 key
     * @param bgLayer2Key - Background Layer 2 key
     * @param bgLayer3Key - Background Layer 3 key
     * @param bgLayer4Key - Background Layer 4 key
     * @param layerScale - Scale for Layers
     */
    createParallax4Background(bgLayer1Key,bgLayer2Key,bgLayer3Key,bgLayer4Key, layerScale){        
        this.parallaxBG = 4;

        this.bgLayer1= this.add.tileSprite(0, 0, this.width, this.height, bgLayer1Key).setOrigin(0).setScale(layerScale);
        this.bgLayer2 = this.add.tileSprite(0, 0, this.width, this.height, bgLayer2Key).setOrigin(0).setScale(layerScale);
        this.bgLayer3 = this.add.tileSprite(0, 0, this.width, this.height, bgLayer3Key).setOrigin(0).setScale(layerScale);
        this.bgLayer4 = this.add.tileSprite(0,0, this.width, this.height, bgLayer4Key).setOrigin(0).setScale(layerScale);

    }

    /**
     * Create Parallax Background 2 Layers
     * @param bgLayer1Key - Background Layer 1 key
     * @param bgLayer2Key - Background Layer 2 key
     * @param layerScale - Scale for Layers
     */
    createParallax2Background(bgLayer1Key,bgLayer2Key,layerScale){        
        this.parallaxBG = 2;

        this.bgLayer1= this.add.tileSprite(0, 0, this.width *2 , this.height*2, bgLayer1Key).setOrigin(0).setScale(layerScale);
        this.bgLayer2 = this.add.tileSprite(0, 0, this.width *2, this.height*2, bgLayer2Key).setOrigin(0).setScale(layerScale);        

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
            key: "talkWoman" + womanKey,
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
                this.woman.anims.play("talkWoman"+ womanKey);
                if (this.DB.voices) {
                    this.womanVoice.play();
                }
                
            },
            callbackScope: this
        });
    }


    /**
     * 
     * @param transportKey - spritesheet key for transport object          * 
     * @param transportFramRate - anim speed
     */
    createTransport(transportKey, transportFramRate=4){
        //animation setting 
        this.animTransport = this.anims.create({
            key: "driveTransport"+transportKey,
            frames: this.anims.generateFrameNumbers(transportKey, {
                start: 0,
                end: 3
            }),
            frameRate: transportFramRate,
            repeat: -1
        });



       // adding bus Sprite
       this.transport = this.physics.add.sprite(140,365, transportKey);
       this.transport.setDepth(4);       
       this.transport.body.setAllowGravity(false);
       this.transport.anims.play("driveTransport"+transportKey);


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
    typewriteBitmapText(text, posX=275, posY=50){
        const length = text.length
        let i = 0
        
        let textInstructions = this.add.bitmapText(posX, posY, 'pixel', '', 14)
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
                    if (this.musicBg2!== undefined) this.musicBg2.stop();      
                    this.animWoman.destroy();
                    this.animTransport.destroy();                                           
                    this.scene.start(this.target);            
                });
            }
        });


    }

    checkAllLevels(){
        this.DB = this.getDB();
        
        let numberLevel = 0;
        let textLevel = "";
        //LEVELS LOOP
        for (let i in this.DB.worlds) {
            numberLevel++;
            
            if (numberLevel>=1 && numberLevel<=5){                
                textLevel += "Level " + numberLevel + ":";
                textLevel += (this.DB.worlds[i].completed) ? "OK": "KO";
                textLevel += "\n";                

                if (!this.DB.worlds[i].completed) this.allLevels = false;
            }
        }

        const levelsTitle = this.add.dynamicBitmapText(20, 20, 'pixel', 'LEVELS').setTint(0xffffff).setDepth(2);
        const levelsLabel = this.add.dynamicBitmapText(20, 40, 'pixel', textLevel).setTint(0xffffff).setDepth(2);

    }

    checkAllInventory(){
        this.DB = this.getDB();

        let textInventory = "";

        textInventory += "Desert Rose : " ;
        textInventory += (this.DB.inventory.desertRose) ? "OK": "KO";
        textInventory += "\n";                        
        if (!this.DB.inventory.desertRose) this.allInventory = false;
        
        textInventory += "Shell : " ;
        textInventory += (this.DB.inventory.shell) ? "OK": "KO";
        textInventory += "\n";
        if (!this.DB.inventory.shell) this.allInventory = false;                
       
        textInventory += "Lys Flower : " ;
        textInventory += (this.DB.inventory.lysFlower) ? "OK": "KO";
        textInventory += "\n";                
        if (!this.DB.inventory.lysFlower) this.allInventory = false;
    
        textInventory += "Pen : " ;
        textInventory += (this.DB.inventory.pen) ? "OK": "KO";
        textInventory += "\n";                
        if (!this.DB.inventory.pen) this.allInventory = false;
    
        textInventory += "Star : " ;
        textInventory += (this.DB.inventory.star) ? "OK": "KO";
        textInventory += "\n";                
        if (!this.DB.inventory.star) this.allInventory = false;

        const inventoryTitle = this.add.dynamicBitmapText(300, 20, 'pixel', "INVENTORY").setTint(0xffffff).setDepth(2);
        const inventoryLabel = this.add.dynamicBitmapText(300, 40, 'pixel', textInventory).setTint(0xffffff).setDepth(2);

    }


    checkContinueLevel(){
        this.continueLevel = this.allLevels && this.allInventory;
        if (!this.continueLevel){
            let textContinue ="YOU HAVE TO FINISH ALL LEVELS AND\n\nCOLLECT ALL THE INVENTORY OBJECTS TO CONTINUE"
            const ContinueLabel = this.add.dynamicBitmapText(20, 150, 'pixel', textContinue).setTint(0xffffff).setDepth(2);

        }

        return this.continueLevel;           
    }

    getDB(){
        if (GJAPI.bActive) {
            //Replace when possible with GameJolt functional code
            this.fullDB = store.get(GameConstants.DB.DBNAME);
        } else {
            this.fullDB = store.get(GameConstants.DB.DBNAME);
        }
        //this.DB = store.get(GameConstants.DB.DBNAME);     this.DB = this.getDB();
        return this.fullDB;
    }



}

export default BasicIntroScene;