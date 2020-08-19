import BasicIntroScene from "./BasicIntroScene.js";
import GameConstants from '../services/GameConstants.js';


class IntroLevel2 extends BasicIntroScene {
    constructor() {
        super({key: 'IntroLevel2', 
              target:GameConstants.Levels.LEVEL2});
    }
    

    create() {
        //Create Music Background (Layer1 + Layer2)
        this.createBgSounds(GameConstants.Sound.LEVEL2.AMBIENCE, GameConstants.Sound.LEVEL2.PLANE);       
        
        //Create BackgroundImg         
        this.createParallax4Background('bg2-sky','bg2-clouds','bg2-sea','bg2-far-grounds',1.25);

        //Create Woman 
        this.createWoman(GameConstants.Sprites.Women.AMELIA, 5000, GameConstants.Sound.LEVEL2.AMELIA);

        //CreateTexts
        this.createTexts('LEVEL2.AMELIA',500);

        //Create Transport
        this.createTransport(GameConstants.Sprites.Transport.PLANE);

    }


}

export default IntroLevel2;
