import GameConstants from '../services/GameConstants.js';
import BasicIntroScene from "./BasicIntroScene.js";

class Level6 extends BasicIntroScene  {
    constructor() {
        super({key: 'Level6', 
              target:GameConstants.Levels.MENU});
        
    }
    
 
    create() {        
        //check if all levels , if all superpowers, if all inventory objects
        this.checkAllLevels();
        this.checkAllInventory();

        
        //this.scene.start(this.target); 

        //Create Music Background (Layer1 + Layer2)
        this.createBgSounds(GameConstants.Sound.LEVEL5.AMBIENCE);       
        
        //Create BackgroundImg 
        this.createBackgroundImg(GameConstants.Textures.BG_LEVEL5);


        if (this.checkContinueLevel()){
            console.log("OK");
        }

        //Create Woman 
        //this.createAllWoman(5000);

        //CreateTexts
        //this.createTexts('LEVEL6.ALLWOMEN',500);

        //Create BAMAK show BAMAKS
        //this.createBAMAK();

    } 

}

export default Level6;