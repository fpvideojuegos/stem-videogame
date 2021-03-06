import BasicScene from "./BasicScene.js";
import Player from '../player/Player.js';
import GameConstants from "../services/GameConstants.js";
import UI from "./UI.js";


class LevelSelect extends BasicScene {
    constructor() {
        super({key: 'LevelSelect'});
    }

    init(data){
        //To Know where this scene comes from 
        //For stoping music or not
        if (data) this.levelFrom = data.from;
        
    }
    
    preload(){
        
    }

    create() {

        // background positions   
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        let x = width / 2 ;
        let y = height / 2 -50;
        
        // background        
        this.bg1 = this.add.image(0, 0, GameConstants.Textures.BG_MENU).setOrigin(0).setScale(1);        
      
     //bg sound
    //Only play BG MUSIC  if come from other levels different from Menu
     //For not stoping the music between menu scenes
        if (this.levelFrom!=GameConstants.Levels.MENU)  {
                this.playMenuScenesOST();
        }

                        
        const menuButton = this.add.dynamicBitmapText(80, y * 2, 'pixel', this.TG.tr('LEVELSELECT.MENU'), 24);        
        menuButton.setInteractive();

        menuButton.on('pointerdown', () => { 
            this.changeScene(this, GameConstants.Levels.MENU,0);
        });
        
        const levelsLabel = this.add.dynamicBitmapText(80, 20, 'pixel', this.TG.tr('LEVELSELECT.LEVELS'), 24);        
                
        this.DB = this.getDB();

        let numberLevel = 0;
        //LEVELS LOOP
        for (let i in this.DB.worlds) {
            numberLevel++;
            this.levelButton = this.add.dynamicBitmapText(80, 20 + (numberLevel * 50), 'pixel', 'Level ' + numberLevel + ': ' + this.getLevelScore(numberLevel) , 24);
            for (let i=0; i < this.getNumberOfStars(numberLevel); i++) {
                this.add.image(460 + (i*50), 15 + (numberLevel * 50) , GameConstants.Sprites.Star.KEY)
                .setScrollFactor(0).setDepth(10).setOrigin(0).setScale(0.25).setAlpha(1); 
            }
            if (this.DB.worlds[i].completed === false) {
                this.levelButton.setTint(0xFF0000);
                //if (i == "Level1" || this.DB.worlds["Level" + (numberLevel - 1)].completed === true) {
                    this.changePlayScene(this.levelButton, numberLevel);
                    this.playButton = this.add.image(600, 20 + (numberLevel * 50) , GameConstants.Sprites.Play.KEY)
                    .setScrollFactor(0).setDepth(10).setOrigin(0).setScale(1.25).setAlpha(1); 
                    this.changePlayScene(this.playButton, numberLevel);
                /*} else {
                    this.changePlayScene(this.levelButton, numberLevel);//TODO: Delete this line is for Testing all levels
                    this.levelButton.setTint(0x9e9e9e);
                    this.add.image(600, 20 + (numberLevel * 50) , GameConstants.Sprites.Lock.KEY)
                    .setScrollFactor(0).setDepth(10).setOrigin(0).setScale(1).setAlpha(1); 
                }*/
            } else if (this.DB.worlds[i].completed === true && this.DB.worlds[i].stars < 3) {
                this.levelButton.setTint(0xFFFF00);
                this.changePlayScene(this.levelButton, numberLevel);
                this.playButton = this.add.image(600, 20 + (numberLevel * 50) , GameConstants.Sprites.Play.KEY)
                    .setScrollFactor(0).setDepth(10).setOrigin(0).setScale(1.25).setAlpha(1); 
                    this.changePlayScene(this.playButton, numberLevel);
            } else if (this.DB.worlds[i].completed === true && this.DB.worlds[i].stars === 3) {
                this.levelButton.setTint(0x008000);
                this.changePlayScene(this.levelButton, numberLevel);
                this.playButton = this.add.image(600, 20 + (numberLevel * 50) , GameConstants.Sprites.Play2.KEY)
                    .setScrollFactor(0).setDepth(10).setOrigin(0).setScale(1.25).setAlpha(1); 
                    this.changePlayScene(this.playButton, numberLevel);
            }
        }

        let levelNotDone = this.add.dynamicBitmapText(80, 20, 'pixel', this.TG.tr('LEVELSELECT.LEVELNOTDONE') + ": ", 12)
        .setTint(0xFF0000);
        levelNotDone.setPosition(width - levelNotDone.width - 30, 400);
        let levelDone = this.add.dynamicBitmapText(80, 350, 'pixel', this.TG.tr('LEVELSELECT.LEVELDONE') + ": ", 12)
        .setTint(0xFFFF00);
        levelDone.setPosition(width - levelDone.width - 30, 425);
        let levelFinished = this.add.dynamicBitmapText(80, 20, 'pixel', this.TG.tr('LEVELSELECT.LEVELFINISHED') + ": ", 12)
        .setTint(0x008000);
        levelFinished.setPosition(width - levelFinished.width - 30, 450);
    }

    update(time, delta) {
        
    }

    changePlayScene(levelButton, level) {
        levelButton.setInteractive();
        levelButton.on('pointerdown', () => {
            switch (level) {
                case 1: 
                    this.changeScene(this, GameConstants.Levels.INTROLEVEL1, 0);
                    break;
                case 2: 
                    this.changeScene(this, GameConstants.Levels.INTROLEVEL2, 0);
                    break;
                case 3:
                    this.changeScene(this, GameConstants.Levels.INTROLEVEL3, 0);
                    break;
                case 4:
                    this.changeScene(this, GameConstants.Levels.INTROLEVEL4, 0);
                    break;
                case 5:
                    this.changeScene(this, GameConstants.Levels.INTROLEVEL5, 0);
                    break;
                case 6:
                    this.changeScene(this, GameConstants.Levels.LEVEL6, 0);
                    break;
            }
        });
    }

    getLevelScore(numberLevel) {
        switch (numberLevel) {
            case 1: 
                return this.DB.worlds.Level1.score
                break;
            case 2: 
                return this.DB.worlds.Level2.score
                break;
            case 3:
                return this.DB.worlds.Level3.score
                break;
            case 4:
                return this.DB.worlds.Level4.score
                break;
            case 5:
                return this.DB.worlds.Level5.score
                break;
            case 6:
                return this.DB.worlds.Level6.score
                break;
        }
    }

    getNumberOfStars(numberLevel) {
        switch (numberLevel) {
            case 1: 
                return this.DB.worlds.Level1.stars
                break;
            case 2: 
                return this.DB.worlds.Level2.stars
                break;
            case 3:
                return this.DB.worlds.Level3.stars
                break;
            case 4:
                return this.DB.worlds.Level4.stars
                break;
            case 5:
                return this.DB.worlds.Level5.stars
                break;
            case 6:
                return this.DB.worlds.Level6.stars
                break;
        }
    }

}

export default LevelSelect;