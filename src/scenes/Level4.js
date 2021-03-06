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

        //Flag to hit letter once
        this.hitLetter = false;

        this.incorrectSound = this.sound.add(GameConstants.Sound.LEVEL4.INCORRECT, {volume: 0.4});
        this.correctSound = this.sound.add(GameConstants.Sound.LEVEL4.CORRECT, {volume: 0.4});
        
        //Player Creation
        this.createPlayer();
        //Background
        this.cameras.main.backgroundColor.setTo(0, 0, 0); 
        //Finding enemies in json map
        this.findAndLoadEnemiesFromMap(GameConstants.Enemies_Layers.Level4);
        //Deactivate superPowers if were activated on previous levels
        this.offSuperPowers();
        //create key object (Inventory object)
        this.createInventoryObjects(GameConstants.Sprites.pen.KEY);            
        //Start score text
        this.showLevelScoreText();
        //ExtraPoints        
        this.createCoins();
        //Create superPower
        this.createSuperPowers(GameConstants.Sprites.superJump.KEY);

        //Object Heart for Extralifes
        this.createExtraLifes();

        //Objects to Collect
        //this.createCollectables(GameConstants.Sprites.Loupe.KEY);
        //HealthText
        this.createHealthText();

        //Tilemap
        //this.platformlayer = this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL4_TILESET);

        //PRIVATE SCENE ELEMENTS
        //Creacion de elementos decorativos
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL4_TILESET, GameConstants.Layers.LANDSCAPE, false);        
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL4_TILESET,undefined,undefined,undefined,false);
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL4_TILESET, GameConstants.Layers.LANDSCAPEFRONT, false,4);
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL4_TILESET, GameConstants.Layers.CLOUDS, false);
        
        //Hiden object for colling enemies
        this.findTransparentObjects(GameConstants.Layers.LIMITS, GameConstants.Sprites.Limit.KEY, false, true);

        //Objects to Collect and finnish level
        this.createCollectables(GameConstants.Sprites.EarStick.KEY, GameConstants.Sprites.EarStick.KEY );
        this.createCollectables(GameConstants.Sprites.CristalBottle.KEY, GameConstants.Sprites.CristalBottle.KEY);


        //Words to Guess (English, Spanish and French) Russian equal English
        //TODO at language files
        this.wordsLanguage = this.TG.tr('LEVEL4.WORDS');
        this.words = this.wordsLanguage.split(',');
        

        //Choose one word randomly
        this.word = this.words[Math.floor(Math.random() * this.words.length)];        
        //Split word into chars 
        this.wordArray = this.word.split('');        
        
        //Paint Diplay of letter to Guess with underline simbol
        this.textPosition = [];        
        for (let i=0; i<this.wordArray.length; i++){
            this.textPosition[i] = this.add.dynamicBitmapText(150 + 20*(i+1), 55 , GameConstants.Fonts.PIXEL, "_");
            this.textPosition[i].setScrollFactor(0);
            this.textPosition[i].setDepth(5);
        }
        this.lettersGuessed = 0;

        this.textTIP = this.add.dynamicBitmapText(10, 455, GameConstants.Fonts.PIXEL, this.TG.tr('LEVEL4.TIP'))
                                .setScrollFactor(0)
                                .setDepth(5);

        //Get letters from TileMap        
        this.letters = this.map.getObjectLayer('Collectables');
        //Create letter group 
        this.interactiveLetters = this.physics.add.group();
        //For each letter Create an interactive BitmapText with physics and add to the group
        this.letters.objects.forEach(letter =>{            
            let theLetter = this.add.dynamicBitmapText(letter.x, letter.y, GameConstants.Fonts.PIXEL, letter.name, 60).setTint(0xca8330);
            this.physics.world.enable(theLetter);            
            this.interactiveLetters.add(theLetter);
            theLetter.body.setAllowGravity(false);
        });        
        
        //Create overlap player with letters 
        this.physics.add.overlap(this.player, this.interactiveLetters, function (player, object) {
            //Check if the letter is correct
            this.collectLetter(this.interactiveLetters, object);
        }, null, this);



        //Sounds        
        this.musicbg = this.sound.add(GameConstants.Sound.LEVEL4.OST, {volume: 0.4});
        this.addEventForMusic(this.musicbg,true);
        //background ambiance effect
        this.ambiencebg = this.sound.add(GameConstants.Sound.LEVEL4.AMBIENCE, {volume: 1});
        this.addEventForMusic(this.ambiencebg,true);
        

        
        
    
        }//create
    
        /**
         * 
         * @param group letterGroup
         * @param object object overlaped
         */

        collectLetter(group, object){

            //flag for doing only once
            if (!this.hitLetter) {   

                //Check for letters coincidences
                for (const [position, letterToGuess] of this.wordArray.entries()) {
                    if (object.text == letterToGuess) {                                                
                        this.textPosition[position].setText(letterToGuess);
                        this.correctSound.play();
                        this.lettersGuessed++;
                    }
                }
                //if the word is complete 
                if (this.lettersGuessed == this.textPosition.length){
                    this.musicbg.stop();
                    this.ambiencebg.stop();            
                    this.player.nextScene();
                }

                //If wrong one live less
                if (!this.wordArray.includes(object.text)) {
                    this.player.loseHealth();           
                    this.incorrectSound.play();
                }                
                
                this.hitLetter = true;
                    
                this.tweens.add({
                    targets: object,
                    y: object.y - 100,
                    alpha: 0,
                    duration: 800,
                    ease: "Cubic.easeOut",
                    callbackScope: this,
                    onComplete: function(){
                        group.killAndHide(object);
                        group.remove(object);   
                        object.destroy();             
                    }
                });
    
                this.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        this.hitLetter = false;
                    }
                });
            }
        }

    update(time, delta) {        



        this.player.update(time, delta);
         Object.keys(this.enemyGroups).forEach(enemy => {
            this.enemyGroups[enemy].update();
        });



    }//update
}

export default Level4;