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
        this.load.path = './assets/';

        //BONUS LEVEL        
        this.load.audio("coinpickup", "sounds/coinpickup.ogg");
        this.load.audio("lifePickup", "sounds/lifePickup.wav"); //https://opengameart.org/content/life-pickup-yo-frankie
        
        this.load.audio("fruitpickup", "sounds/fruitPickUp.ogg");
        this.load.audio("powerUp", "sounds/Powerup.ogg");

        //Sfx sounds
        this.load.audio("collectablePickup","sounds/effects/cluepickup.ogg");
        this.load.audio("alarmOn","sounds/effects/alarmOn.ogg");

        

        //SOUNDS

        //https://freesound.org/people/DCPoke/sounds/387978/
        
        //https://freesound.org/people/ChrisButler99/sounds/367988/
        this.load.audio("falling", "sounds/effects/falling.ogg");
        
        this.load.audio("soundJump", "sounds/jump.mp3");
        this.load.audio("playerAuch", "sounds/ayyyyy.ogg");        
        this.load.audio("levelUp", "sounds/backgrounds/LevelUp.ogg");

    } 

    loadAudio(audioName) {

        this.load.path = './assets/';
        this.load.audio(audioName, "sounds/dialogs/" + audioName + ".ogg");
    }
}
export default AudioLoader;