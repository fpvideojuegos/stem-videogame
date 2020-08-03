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
        //ExtraPoints        
        this.createCoins();
        //Objects to Collect
        //this.createCollectables(GameConstants.Sprites.Loupe.KEY);
        //HealthText
        this.createHealthText();

        //Tilemap
        this.platformlayer = this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL4_TILESET);

        //PRIVATE SCENE ELEMENTS
        //Creacion de elementos decorativos
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL4_TILESET, GameConstants.Layers.LANDSCAPE, false);        
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL4_TILESET, GameConstants.Layers.LANDSCAPEFRONT, false,4);
        this.paintLayerAndCreateCollision(GameConstants.Tiles.LEVEL4_TILESET, GameConstants.Layers.CLOUDS, false);
        
        //Hiden object for colling enemies
        this.findTransparentObjects(GameConstants.Layers.LIMITS, GameConstants.Sprites.Limit.KEY, false, true);

        //Objects to Collect and finnish level
        this.createCollectables(GameConstants.Sprites.EarStick.KEY, GameConstants.Sprites.EarStick.KEY );
        this.createCollectables(GameConstants.Sprites.CristalBottle.KEY, GameConstants.Sprites.CristalBottle.KEY);


        //Words to Guess (English, Spanish and French) Russian equal English
        this.words = ['FILOSOFIA','POESIA','ENSAYO','MALAGA','LITERATURA'];
        this.word = this.words[Math.floor(Math.random() * this.words.length)];
        this.wordArray = this.word.split('');
        console.log(this.word);
        this.textPosition = [];
        

        for (let i=0; i<this.wordArray.length; i++){
            this.textPosition[i] = this.add.dynamicBitmapText(150 + 20*(i+1), 20 , GameConstants.Fonts.PIXEL, "_");
            this.textPosition[i].setScrollFactor(0);
            this.textPosition[i].setDepth(5);
        }
        

        //paint word underline 
        
        this.letters = this.map.getObjectLayer('Collectables');
        console.log(this.letters.objects);
        

        this.interactiveLetters = this.physics.add.group();
        
        this.letters.objects.forEach(letter =>{
            let theLetter = this.add.dynamicBitmapText(letter.x, letter.y, GameConstants.Fonts.PIXEL, letter.name, 60);
            this.physics.world.enable(theLetter);            
            this.interactiveLetters.add(theLetter);
            theLetter.body.setAllowGravity(false);
        });        
        
        
        this.physics.add.overlap(this.player, this.interactiveLetters, function (player, object) {
            this.collectLetter(this.interactiveLetters, object);
        }, null, this);



        //Sounds        
        this.musicbg = this.sound.add(GameConstants.Sound.LEVEL1.OST, {volume: 0.4});
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
      
       


     


        
    
        }//create
    
        collectLetter(group, object){

            if (!this.hitLetter) {   
                
                console.log(object.text);

                //Check for letters coincidences
                for (const [position, letterToGuess] of this.wordArray.entries()) {
                    if (object.text == letterToGuess) {                                                
                        this.textPosition[position].setText(letterToGuess);
                        this.correctSound.play();
                    }
                }
                //If wrong one live less
                if (!this.wordArray.includes(object.text)) {
                    this.player.loseHealth();           
                    this.incorrectSound.play();
                }
                
                //this.coinpickup.play();
                this.hitLetter = true;
                //this.extraPoints*=10;   
    
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

        if (this.player.collectablesCollected === 0){
            this.playercollide.active=true;
            this.keylevel.setAlpha(1);
        }
        

        



    }//update
}

export default Level4;