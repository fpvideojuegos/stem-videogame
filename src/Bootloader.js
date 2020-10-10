class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader');
    }

    preload() {
        console.log('Bootloader :D');

        //PLUGINS
        this.load.script('scrollbar', './libs/Scrollbars.js');

        this.load.path = './assets/';

        // Assets
        this.load.pack('assets_import', 'assets_import.json', 'assets');

        // Maps
        this.load.pack('maps', '../src/worlds/maps.json', 'maps');

        //INTROSTORY ASSETS         
        this.load.image("timedoor", "img/invisible/invisible64.png");
        
        //INTRO OBJECTS
        //LEVEL1 - AGATHA CHRISTIE
        this.load.spritesheet("agatha_intro", "img/intro/agathaChristie_spritesheet.png", {
            frameWidth: 254,
            frameHeight: 286
        });
        //LEVEL 1 - BUS
        this.load.spritesheet("bus_intro", "img/intro/bus.png", {
            frameWidth: 256,
            frameHeight: 149
        });

        //LEVEL2 - AMELIA EARHART        
        this.load.spritesheet("amelia_intro", "img/intro/ameliaEarhart_spritesheet.png", {
            frameWidth: 250,
            frameHeight: 304
        });
        //LEVEL 2 - PLANE
          this.load.spritesheet("plane_intro", "img/intro/plane.png", {
            frameWidth: 340,
            frameHeight: 135
        });
        //LEVEL3 - BERTA CACERES        
        this.load.spritesheet("berta_intro", "img/intro/bertaCaceres_spritesheet.png", {
            frameWidth: 250,
            frameHeight: 216
        });

        //LEVEL 3 - PICKUP
        this.load.spritesheet("pickup_intro", "img/intro/pickup.png", {
            frameWidth: 272,
            frameHeight: 160
        });

        //LEVEL4 - MARIA ZAMBRANO
        this.load.spritesheet("maria_intro", "img/intro/mariaZambrano_spritesheet.png", {
            frameWidth: 220,
            frameHeight: 330
        });

        
        //LEVEL 4 - FLYINGBOOK BIG
        this.load.spritesheet("flyingbook_intro", "img/intro/flyingbook.png", {
            frameWidth: 270,
            frameHeight: 135
        });

        //LEVEL5 - KATHERINE JONHSON
        this.load.spritesheet("katherine_intro", "img/intro/katherineJohnson_spritesheet.png", {
            frameWidth: 250,
            frameHeight: 314
        });


        //LEVEL 5 - SPACE SHIP
        this.load.spritesheet("ship_intro", "img/intro/nasarocket.png", {
            frameWidth: 300,
            frameHeight: 160
        });



        //Inventory objects //TO DO finish
        this.load.image("desertRose", "img/objects/rose.png");
        this.load.image("shell", "img/objects/shell.png");
        this.load.image("lysFlower", "img/objects/lysflower.png"); 
        this.load.image("pen", "img/objects/pencil.png"); 
        this.load.image("star", "img/objects/star.png");

        //Superpowers objects //TO DO finish
        this.load.image("lowGravity", "img/objects/feather.png");
        this.load.image("superSpeed", "img/objects/superSpeed.png");
        this.load.image("superJump", "img/objects/superJump.png"); 
        this.load.image("invencibility", "img/objects/invencibility.png");        

        //Heart Object
        this.load.image("heart", "img/objects/heart.png");

        //Sand Clock (for spent time)
        this.load.image("sandClock","img/objects/sandclock.png");


        //Level4
        this.load.tilemapTiledJSON('Level4', '../src/worlds/level4/level4.json');

        //Level5
        this.load.tilemapTiledJSON('Level5', '../src/worlds/level5/level5.json');


        //Level6
        this.load.tilemapTiledJSON("Level6", "../src/worlds/level6/level6.json");
        
        //BACKGROUNDS
        //Menu
        this.load.image('bg_Menu', 'img/backgrounds/bg_forest_purple.png');
        //Level1
        this.load.image('bg_Level1', 'img/backgrounds/desert_bg.png'); //freepik        
        
        //Level2
        this.load.image('bg_Level2', 'img/backgrounds/magic-cliffs.png');
        //https://ansimuz.itch.io/magic-cliffs-environment

        
        //PARALLAX BG Level 2 //https://ansimuz.itch.io/magic-cliffs-environment
        this.load.image('bg2-clouds', 'img/backgrounds/parallax_level2/clouds.png');
        this.load.image("bg2-far-grounds", 'img/backgrounds/parallax_level2/far-grounds.png');
        this.load.image("bg2-sea", 'img/backgrounds/parallax_level2/sea.png');
        this.load.image("bg2-sky", 'img/backgrounds/parallax_level2/sky.png');

        //PARALLAX BG Level 3 //bought
        this.load.image('bg3_back', 'img/backgrounds/parallax_level3/back.png');
        this.load.image("bg3_middle", 'img/backgrounds/parallax_level3/middle.png');
        
        //Level 4 //bought
        this.load.image("bg_Level4", "img/backgrounds/library_bg.png");
                
        //Level 5 
        this.load.image("bg_Level5", "img/backgrounds/bg_level5.png");
        //http://www.baltana.com/art/space-pixel-art-best-wallpaper-49627.html
        

        //Credits
        this.load.image('Credits', 'img/backgrounds/bamak_credits_en_1.png');        
        this.load.image('creditsPage2', 'img/backgrounds/bamak_credits_en_2.png');

        // Settings 
        this.load.image("es_flag", "img/settings/es.png");
        this.load.image("en_flag", "img/settings/gb.png");
        this.load.image("fr_flag", "img/settings/fr.png");
        this.load.image("ru_flag", "img/settings/ru.png");


        // ENEMIES
        
        //Vulture
        this.load.atlas('vulture', 'img/vulture/vulture.png', 'img/vulture/vulture_atlas.json');
        this.load.animation('vultureAnim', 'img/vulture/vulture_anim.json');

        //flyingbook
        this.load.atlas('flyingbook', 'img/flyingbook/flyingbook.png', 'img/flyingbook/flyingbook_atlas.json');
        this.load.animation('flyingbookAnim', 'img/flyingbook/flyingbook_anim.json');

        //alien
        this.load.atlas('alien', 'img/alien/alien.png', 'img/alien/alien_atlas.json');
        this.load.animation('alienAnim', 'img/alien/alien_anim.json');

        //meteorite
        this.load.atlas('meteorite', 'img/meteorite/meteorite.png', 'img/meteorite/meteorite_atlas.json');
        this.load.animation('meteoriteAnim', 'img/meteorite/meteorite_anim.json');

        //Seagulls
        this.load.atlas('seagull', 'img/seagull/seagull.png', 'img/seagull/seagull_atlas.json');
        this.load.animation('seagullAnim', 'img/seagull/seagull_anim.json');

        //Piranhas
        this.load.atlas('piranha', 'img/piranha/piranha.png', 'img/piranha/piranha_atlas.json');
        this.load.animation('piranhaAnim', 'img/piranha/piranha_anim.json');

    


        //key
        this.load.atlas('key', 'img/key/key.png', 'img/key/key_atlas.json');
        this.load.animation('keyAnim', 'img/key/key_anim.json');

        //Treasure
        this.load.atlas('treasure', 'img/treasure/treasure.png', 'img/treasure/treasure_atlas.json');
        this.load.animation('treasureAnim', 'img/treasure/treasure_anim.json');

        //Candle
        this.load.atlas('candle', 'img/objects/candle/candle.png', 'img/objects/candle/candle_atlas.json');
        this.load.animation('candleAnim', 'img/objects/candle/candle_anim.json');

        //Desert Ball
        this.load.atlas('desertball', 'img/desertball/desertball.png', 'img/desertball/desertball_atlas.json');
        this.load.animation('desertballAnim', 'img/desertball/desertball_anim.json');
        
        //Smoke
        this.load.atlas('smoke', 'img/smoke/smoke.png', 'img/smoke/smoke_atlas.json');
        this.load.animation('smokeAnim', 'img/smoke/smoke_anim.json');
        
        //Rino Beetle
        this.load.atlas('rinobeetle', 'img/rinobeetle/rinobeetle.png', 'img/rinobeetle/rinobeetle_atlas.json');
        this.load.animation('rinobeetleAnim', 'img/rinobeetle/rinobeetle_anim.json');
        
        //Carnivorous Plant
        this.load.atlas('carnivorous', 'img/carnivorous/carnivorous.png', 'img/carnivorous/carnivorous_atlas.json');
        this.load.animation('carnivorousAnim', 'img/carnivorous/carnivorous_anim.json');


        //Crab
        this.load.atlas('crab', 'img/crab/crab.png', 'img/crab/crab_atlas.json');
        this.load.animation('crabAnim', 'img/crab/crab_anim.json');

        //Monkey
        this.load.atlas('monkey', 'img/monkey/monkey.png', 'img/monkey/monkey_atlas.json');
        this.load.animation('monkeyAnim', 'img/monkey/monkey_anim.json');

        //Mouse
        this.load.atlas('mouse', 'img/mouse/mouse.png', 'img/mouse/mouse_atlas.json');
        this.load.animation('mouseAnim', 'img/mouse/mouse_anim.json');

        //Water
        this.load.image('water', 'img/objects/water-tile.png');

        // ExtraPoints        
        this.load.atlas('extrapoint', 'img/objects/extrapoint/extrapoint.png', 'img/objects/extrapoint/extrapoint_atlas.json');
        this.load.animation('extrapointAnim', 'img/objects/extrapoint/extrapoint_anim.json');

        //Enemy Death
        this.load.atlas('death', 'img/objects/death/death.png', 'img/objects/death/death_atlas.json');
        this.load.animation('deathAnim', 'img/objects/death/death_anim.json');

        //Collectables Objects
        this.load.image('loupe', "img/objects/loupe.png");        
        this.load.image('earstick', "img/objects/earstick.png");        
        this.load.image('cristalbottle', "img/objects/cristalbottle.png");
        this.load.image('waterbottle', "img/objects/waterbottle.png");
        this.load.image('plasticglass', "img/objects/plasticglass.png");
        this.load.image('axe', "img/objects/axe.png");
        this.load.image('matches', "img/objects/matches.png");
        this.load.image('oilbottle', "img/objects/oilbottle.png");
        this.load.image('clock', "img/objects/clock.png");
        this.load.image('button', "img/objects/button.png");
        this.load.image('wires', "img/objects/wires.png");
        this.load.image('screw', "img/objects/screw.png");
        this.load.image('solarpanel', "img/objects/solarpanel.png");

        //BAMAK
        this.load.image('bamak', "img/objects/bamak.png");
        this.load.image('red', "img/objects/red.png");


        //Star
        this.load.image("star", "img/objects/star.png");

        //play
        this.load.image("playagain", "img/objects/playagain.png");
        
        //play Again
        this.load.image("play", "img/objects/PlayButton.png");

        //play
        this.load.image("play2", "img/objects/PlayButton2.png");


        //lock
        this.load.image("lock", "img/objects/Lock.png");

        // the firecamp is a sprite sheet made by 32x58 pixels
        this.load.spritesheet("fire", "img/objects/fire.png", {
            frameWidth: 40,
            frameHeight: 70
        });
        
        //MapObject
        this.load.atlas("map","img/objects/map/map.png","img/objects/map/map_atlas.json");
        this.load.animation("mapAnim", "img/objects/map/map_anim.json");

        //UI
        this.load.image('volumeOn', 'img/ui/volumeON.png');
        this.load.image('volumeOff', 'img/ui/volumeOFF.png');
        this.load.image('inventoryBtn', 'img/objects/InventoryBtn.png');
        this.load.image('inventory', 'img/objects/inventory.png');
        this.load.image('superPowersBox', 'img/objects/superPowersBox.png');

        //Collectable icon
        this.load.image('collectable','img/objects/basket.png');

        //CONTROLS (For input Touch Versions)
        this.load.image('controlUp', 'img/ui/controlUp.png');
        this.load.image('controlDown', 'img/ui/controlDown.png');
        this.load.image('controlRight', 'img/ui/controlRight.png');
        this.load.image('controlLeft', 'img/ui/controlLeft.png');

        //FONTS
        this.load.json('fontJSON', 'font/font.json');
        this.load.image('font', 'font/font.png');

        
        //OST         
        this.load.audio("Level1_OST", "sounds/ost/level1_OST.ogg");                        
        this.load.audio("Level2_OST", "sounds/ost/level2_OST.ogg");
        this.load.audio("Level3_OST", "sounds/ost/level3_OST.ogg");
        this.load.audio("Level4_OST", "sounds/ost/level4_OST.ogg");
        this.load.audio("Level5_OST", "sounds/ost/level5_OST.ogg");
        this.load.audio("Main_OST","sounds/ost/menusong_v3.ogg");
        this.load.audio("BirdSinging","sounds/backgrounds/birds-singing.mp3");

        //Ambience
        this.load.audio("Desert", "sounds/effects/desert-simple.ogg");                
        this.load.audio("Seagulls", "sounds/effects/seagulls.ogg");
        this.load.audio("Rainforest", "sounds/effects/rainforest.ogg");

        this.load.audio("Bus", "sounds/effects/bus_engine.ogg");                
        this.load.audio("PlaneEngine", "sounds/effects/plane_engine.ogg");                
        this.load.audio("PickupEngine", "sounds/effects/pickup_engine.ogg");
        this.load.audio("WingsFlapping", "sounds/effects/wingsflapping.ogg");
        this.load.audio("Incorrect", "sounds/effects/incorrect.ogg");
        this.load.audio("Correct", "sounds/effects/correct.ogg");
        this.load.audio("SpaceShipAtmos", "sounds/effects/spac_ship_atmos.ogg");

        
        //Enemy Kill
        this.load.audio("enemy-death", "sounds/enemy-death.ogg");

        // Progress
        this.load.on('progress', (value) => {
            this.registry.events.emit('load_progress', value);
        });

        this.load.lang();

        this.scene.launch('AudioLoader');

        // When all the assests are load go to next Scene
        this.load.on("complete", () => {
            const fontJSON = this.cache.json.get('fontJSON');
            this.cache.bitmapFont.add('pixel', Phaser.GameObjects.RetroFont.Parse(this, fontJSON));

            this.scene.stop('Loader');
            this.scene.stop('AudioLoader');
            this.scene.stop('Bootloader');
            this.scene.start("Menu");
        });
    }
}
export default Bootloader;