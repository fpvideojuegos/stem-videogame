import BasicIntroScene from "./BasicIntroScene.js";
import GameConstants from '../services/GameConstants.js';


class IntroLevel1 extends BasicIntroScene {
    constructor() {
        super({key: 'IntroLevel1', 
              target:GameConstants.Levels.LEVEL1});
        
    }
    
 
    create() {        
        //Create Music Background (Layer1 + Layer2)
        this.createBgSounds(GameConstants.Sound.LEVEL1.AMBIENCE, GameConstants.Sound.LEVEL1.BUS);       
        
        //Create BackgroundImg 
        this.createBackgroundImg(GameConstants.Textures.BG_LEVEL1);


        //Create Woman 
        this.createWoman(GameConstants.Sprites.Women.AGATHA, 5000, GameConstants.Sound.LEVEL1.AGATHA);

        //CreateTexts
        this.createTexts('LEVEL1.AGATHA',500);

        //Create Transport
        this.createTransport(GameConstants.Sprites.Transport.BUS);

    } 

}

export default IntroLevel1;
