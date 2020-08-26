class AudioLoader extends Phaser.Scene {
    constructor() {
        super('AudioLoader');
    }

    preload() {
        console.log('AudioLoader :D');

        let currentLanguage = this.TG.getActualLang();

        console.log(currentLanguage);
        
        
        
        //Level 0/Intro
        
        //Level 1
        this.loadAudio(currentLanguage + "_Level1_AGATHA");

        //Level 2
        this.loadAudio(currentLanguage + "_Level2_AMELIA");
        
        //Level 3
        this.loadAudio(currentLanguage + "_Level3_BERTA");
        
        //Level 4
        this.loadAudio(currentLanguage + "_Level4_MARIA");

        //Level 5
        this.loadAudio(currentLanguage + "_Level5_KATHERINE");
        
        //Level 6
        this.loadAudio(currentLanguage + "_Level6_ALLWOMEN");
        
        //Level All
        this.load.path = './assets/';

        //BONUS LEVEL        
        this.load.audio("coinpickup", "sounds/coinpickup.ogg");
        this.load.audio("lifePickup", "sounds/lifePickup.wav"); //https://opengameart.org/content/life-pickup-yo-frankie
        
        this.load.audio("powerUp", "sounds/Powerup.ogg");

        //Sfx sounds
        this.load.audio("collectablePickup","sounds/effects/cluepickup.ogg");
        this.load.audio("alarmOn","sounds/effects/alarmOn.ogg");
        this.load.audio("timePickup", "sounds/effects/timeAlarm.ogg")

        

        //SOUNDS

        //https://freesound.org/people/DCPoke/sounds/387978/
        
        //https://freesound.org/people/ChrisButler99/sounds/367988/
        this.load.audio("falling", "sounds/effects/falling.ogg");
        
        this.load.audio("soundJump", "sounds/jump.ogg");
        this.load.audio("playerAuch", "sounds/ayyyyy.ogg");        
        this.load.audio("levelUp", "sounds/backgrounds/LevelUp.ogg");
        

    } 

    loadAudio(audioName) {

        this.load.path = './assets/';
        this.load.audio(audioName, "sounds/dialogs/" + audioName + ".ogg");
    }
}
export default AudioLoader;