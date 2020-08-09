import GameConstants from "../services/GameConstants.js";

class BasicIntroScene extends Phaser.Scene {
    constructor(config) {
        super(config.key);
        this.key = config.key;
        this.target = config.target;
        
    }

    preload(){
        console.log(this.key);
        console.log(this.target);
        //Music Bus
        this.musicFalling = this.sound.add('falling');

        

        //Press any key to Skip
        this.input.keyboard.on('keydown', () => { this.skipIntro(); });
        
        //Press A GamePad button to Skip
        this.gamepad = null;
        this.input.gamepad.once('down', (pad) => {
            this.gamepad = pad;            
        });      



    }
    /**
     *
     * @param {string} text
     */
    typewriteBitmapText(text, position){
        const length = text.length
        let i = 0
        
        let textInstructions = this.add.bitmapText(300, 25*(position+1), 'pixel', '')
                                                        .setScrollFactor(0)
                                                        .setDepth(3) 
                                                        .setAlpha(1);

        this.time.addEvent({
            callback: () => {
                textInstructions.text += text[i]
                ++i
            },
            repeat: length - 1,
            delay: 75
        })
    }

    /**
     * Create Sounds Layer for Intro Scene
     * 
     * @param layer1 
     * @param layer2 
     */
    createBgSounds(layer1, layer2){
        this.musicBg = this.sound.add(layer1, {volume: 0.6});
        this.musicBg.play();
        this.musicBg.setLoop(true);

        this.musicBg2 = this.sound.add(layer2, {volume: 0.4});
        this.musicBg2.play();
        this.musicBg2.setLoop(true);
    }

    /**
     * 
     */
    skipIntro(){
        this.skip = true;
        this.cameras.main.fade(700, 0, 0, 0);
        this.cameras.main.on('camerafadeoutcomplete', () => {                        
            this.musicBg.stop();
            this.musicBg2.stop();
            this.sound_AGATHA.stop();
            this.scene.start(this.target);
        });

    }


}

export default BasicIntroScene;