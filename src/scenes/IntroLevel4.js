import BasicIntroScene from "./BasicIntroScene.js";
import GameConstants from '../services/GameConstants.js';


class IntroLevel4 extends BasicIntroScene {
    constructor() {
        super({key: 'IntroLevel4', 
              target:GameConstants.Levels.LEVEL4});
        
    }
    
 
    create() {        
        //Create Music Background (Layer1 + Layer2)
        this.createBgSounds(GameConstants.Sound.LEVEL4.AMBIENCE);       
        
        //Create BackgroundImg 
        this.createBackgroundImg(GameConstants.Textures.BG_LEVEL4);


        //Create Woman 
        this.createWoman(GameConstants.Sprites.Women.MARIA, 5000, GameConstants.Sound.LEVEL4.MARIA);

        //CreateTexts
        this.createTexts('LEVEL4.MARIA',500);

        //Create Transport
        this.createTransport(GameConstants.Sprites.Transport.BOOK);

    } 

}

export default IntroLevel4;