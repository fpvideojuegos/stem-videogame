import UI from './scenes/UI.js';
import Menu from './scenes/Menu.js';
import SettingsLevel from './scenes/SettingsLevel.js';
import SelectCharacterLevel from './scenes/SelectCharacterLevel.js';
import LevelSelect from './scenes/LevelSelect.js';
import Scores from './scenes/Scores.js';
import Credits from './scenes/Credits.js';
import Level2 from './scenes/Level2.js';
import Level3 from './scenes/Level3.js';
import Level4 from './scenes/Level4.js';
import Level5 from './scenes/Level5.js';
import Level6 from './scenes/Level6.js';
import Level1 from './scenes/Level1.js';
import IntroLevel1 from './scenes/IntroLevel1.js';
import IntroLevel2 from './scenes/IntroLevel2.js';
import IntroLevel3 from './scenes/IntroLevel3.js';
import IntroLevel4 from './scenes/IntroLevel4.js';
import Bootloader from './Bootloader.js';
import AudioLoader from './AudioLoader.js';
import Loader from './Loader.js';
import TG from './plugins/TG.js';

const config = {
    title: "BAMAK QUEST",
    url: "https://twitter.com/fpvideojuegos",
    version: '0.0.1',
    type: Phaser.AUTO,
    backgroundColor: "#19013E",
    pixelArt: true,
    zoom: 1,
    banner:{        
        text:"#000000",
        background:[
            "#3a0e85",
            "#501aac",
            "#683ab7",
            "#8259c8",
            "#a484dd"]
    },
    scale: {
        parent: "container",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 	854,
        height: 480,
    },
    input: {
        gamepad: true,
        queue: true,
    },
    plugins: {
        global: [{
            key: 'TG',
            plugin: TG,
            mapping: 'TG',
            data: {
                path: './src/i18n',
                disponibleLangs: ['es', 'en', "fr", "ru"],
                fallbackLang: 'en',
                spanishLangs: ['ca', 'gl', 'es', 'eu']
            }
        }]
    },
    physics: {
        default: "arcade",
        "arcade": {
            gravity: {
                y: 700,
            },
            debug: false
        },
    },
    scene: [Loader, Bootloader, AudioLoader, Menu, SettingsLevel, SelectCharacterLevel, 
        LevelSelect, Credits, IntroLevel1, IntroLevel2, IntroLevel3, IntroLevel4, Scores, Level1, Level2, Level3, Level4, Level5, Level6, UI]
};

const game = new Phaser.Game(config);