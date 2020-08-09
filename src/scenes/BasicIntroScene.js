
class BasicIntroScene extends Phaser.Scene {
    constructor(key) {
        super(key);
        this.key = key.key;
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



}

export default BasicIntroScene;