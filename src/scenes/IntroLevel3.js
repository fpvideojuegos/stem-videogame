import BasicIntroScene from "./BasicIntroScene.js";
import GameConstants from '../services/GameConstants.js';


class IntroLevel3 extends BasicIntroScene {
    constructor() {
        super({key: 'IntroLevel3', 
              target:GameConstants.Levels.LEVEL3});
    }
    

    create() {
        //Create Music Background (Layer1 + Layer2)
        this.createBgSounds(GameConstants.Sound.LEVEL3.AMBIENCE, GameConstants.Sound.LEVEL3.PICKUP);       
        
        //Create BackgroundImg         
        this.createParallax2Background('bg3_back','bg3_middle',0.5);

        //Create Woman 
        this.createWoman(GameConstants.Sprites.Women.BERTA, 5000, GameConstants.Sound.LEVEL3.BERTA);

        //CreateTexts
        this.createTexts('LEVEL3.BERTA',500);

        //Create Transport
        this.createTransport(GameConstants.Sprites.Transport.PICKUP);

    }


}

export default IntroLevel3;