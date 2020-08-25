import BasicIntroScene from "./BasicIntroScene.js";
import GameConstants from '../services/GameConstants.js';


class IntroLevel5 extends BasicIntroScene {
    constructor() {
        super({key: 'IntroLevel5', 
              target:GameConstants.Levels.LEVEL5});
        
    }
    
 
    create() {        
        //Create Music Background (Layer1 + Layer2)
        this.createBgSounds(GameConstants.Sound.LEVEL5.AMBIENCE);       
        
        //Create BackgroundImg 
        this.createBackgroundImg(GameConstants.Textures.BG_LEVEL5);


        //Create Woman 
        this.createWoman(GameConstants.Sprites.Women.KATHERINE, 5000, GameConstants.Sound.LEVEL5.KATHERINE);

        //CreateTexts
        this.createTexts('LEVEL5.KATHERINE',500);

        //Create Transport
        this.createTransport(GameConstants.Sprites.Transport.SHIP,12);

    } 

}

export default IntroLevel5;