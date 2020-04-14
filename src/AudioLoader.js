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
        this.loadAudio(currentLanguage + "_Level1_AGATHA_01");


        //Level 2
        

        //Level 3
        
        //Level 4

        //Level 5
        
        //Level 6
        
        //Level All
        this.loadAudio(currentLanguage + "_LevelAll_DANIELA_WeDidIt_04");
        
        this.load.path = './assets/';

        //BONUS LEVEL        
        this.load.audio("coinpickup", "sounds/coinpickup.mp3");
        
        this.load.audio("fruitpickup", "sounds/fruitPickUp.ogg");
        this.load.audio("powerUp", "sounds/Powerup.ogg");

        //Sfx sounds
        this.load.audio("collectablePickup","sounds/effects/cluepickup.ogg");
        this.load.audio("alarmOn","sounds/effects/sfx_lowhealth_alarmloop7.wav");

        

        //SOUNDS

        //https://freesound.org/people/DCPoke/sounds/387978/
        
        //https://freesound.org/people/ChrisButler99/sounds/367988/
        this.load.audio("falling", "sounds/backgrounds/falling.mp3");
        
        this.load.audio("soundJump", "sounds/jump.mp3");
        this.load.audio("danielaAuch", "sounds/ayyyyy.ogg");        
        this.load.audio("levelUp", "sounds/backgrounds/LevelUp.ogg");

    } 

    loadAudio(audioName) {

        this.load.path = './assets/';
        this.load.audio(audioName, "sounds/dialogs/" + audioName + ".ogg");
    }
}
export default AudioLoader;