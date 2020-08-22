/* Las constantes del juego */
const GameConstants = {
    DB: {
        DBNAME: 'gamedatav0_10'
    },
    GAMEJOLT:{        
        SCORES:{
            Level1:'532863',
            Level2:'532881',
            Level3:'532882',
            Level4:'532883',
            Level5:'532884'
        },
        TROPHIES:{
            Level1:'126767',
            Level2:'126768',
            Level3:'126769',
            Level4:'126770',
            Level5:'126771'       
        }
    },
    Levels: {
        MENU: 'Menu',
        SETTINGSLEVEL: 'SettingsLevel',
        LEVELSELECT: 'LevelSelect',
        SELECTCHARACTERLEVEL: 'SelectCharacterLevel',
        CREDITS: 'Credits',
        SCORES: 'Scores',
        BONUSLEVEL: 'BonusLevel',
        INTROLEVEL1: 'IntroLevel1',        
        INTROLEVEL2: 'IntroLevel2',        
        INTROLEVEL3: 'IntroLevel3',        
        INTROLEVEL4: 'IntroLevel4',        
        LEVEL1: 'Level1',
        LEVEL2: 'Level2',
        LEVEL3: 'Level3',
        LEVEL4:'Level4',
        LEVEL5:'Level5',
        LEVEL6: 'Level6',
        GAMEOVER: 'GameOver',
        UI: 'UI'
    },
    Sound: {                
        LEVEL1: {
            AGATHA: 'Level1_AGATHA',
            OST: 'Level1_OST',
            AMBIENCE: 'Desert',
            BUS: 'Bus'
        },
        LEVEL2: {
            AMELIA: 'Level2_AMELIA',
            OST: 'Level2_OST',
            AMBIENCE: 'Seagulls',
            PLANE: 'PlaneEngine'
        },
        LEVEL3: {
            BERTA: 'Level3_BERTA',
            OST: 'Level3_OST',
            AMBIENCE: 'Rainforest',
            PICKUP: 'PickupEngine'
        },
        LEVEL4: {
            MARIA: 'Level4_MARIA',
            OST: 'Level4_OST',
            AMBIENCE: 'WingsFlapping',
            INCORRECT: 'Incorrect',
            CORRECT: 'Correct'
        },
        LEVEL5: {
            OST: 'Level5_OST'
        },
        LEVEL6: {
            OST: 'Level6_OST'
        },                
        SOUNDS: {            
            PLAYER_JUMP: 'soundJump',
            PLAYER_AUCH: 'playerAuch',
            LEVELUP : 'levelUp',
            BIRD_SINGING : 'BirdSinging',
            COINPICKUP: 'coinpickup',
            COLLECTABLEPICKUP: 'collectablePickup',
            LIFEPICKUP: 'lifePickup',
            ALARM_ON : 'alarmOn', 
            ENEMY_DEATH: 'enemy-death',
            POWERUP: 'powerUp'
        },
        MAIN:{
            OST: 'Main_OST'
        }
    },
    Sprites: {
        Heart: {
            KEY: 'heart',
            ID: 'heart',
            OBJECT_NAME: 'Heart',
            OBJECT_ID: 'heart'
        },
        desertRose: {
            KEY: 'desertRose',
            ID: 'desertRose',
            OBJECT_NAME: 'desertRose',
            OBJECT_ID: 'desertRose'
        },
        shell: {
            KEY: 'shell',
            ID: 'shell',
            OBJECT_NAME: 'shell',
            OBJECT_ID: 'shell'
        },
        lysFlower: {
            KEY: 'lysFlower',
            ID: 'lysFlower',
            OBJECT_NAME: 'lysFlower',
            OBJECT_ID: 'lysFlower'
        },
        pen: {
            KEY: 'pen',
            ID: 'pen',
            OBJECT_NAME: 'pen',
            OBJECT_ID: 'pen'
        },
        star: {
            KEY: 'star',
            ID: 'star',
            OBJECT_NAME: 'star',
            OBJECT_ID: 'star'
        },
        lowGravity: {
            KEY: 'lowGravity',
            ID: 'lowGravity',
            OBJECT_NAME: 'lowGravity',
            OBJECT_ID: 'lowGravity'
        },
        superSpeed: {
            KEY: 'superSpeed',
            ID: 'superSpeed',
            OBJECT_NAME: 'superSpeed',
            OBJECT_ID: 'superSpeed'
        },
        superJump: {
            KEY: 'superJump',
            ID: 'superJump',
            OBJECT_NAME: 'superJump',
            OBJECT_ID: 'superJump'
        },
        invencibility: {
            KEY: 'invencibility',
            ID: 'invencibility',
            OBJECT_NAME: 'invencibility',
            OBJECT_ID: 'invencibility'
        },
        Bats: {
            KEY: 'vulture',
            ID: 'bat',
            OBJECT_NAME: 'Bats',
            OBJECT_ID: 'Bat'
            
        },
        Bees: {
            KEY: 'bee',
            ID: 'bee',
            OBJECT_NAME: 'Bees',
            OBJECT_ID: 'Bee'
        },
        Flyingbooks: {
            KEY: 'flyingbook',
            ID: 'flyingbook',
            OBJECT_NAME: 'Flyingbooks',
            OBJECT_ID: 'Flyingbook'
        },

        Seagulls: {
            KEY: 'seagull',
            ID: 'seagull',
            OBJECT_NAME: 'Seagulls',
            OBJECT_ID: 'Seagull'
        },
        Piranhas: {
            KEY: 'piranha',
            ID: 'piranha',
            OBJECT_NAME: 'Piranhas',
            OBJECT_ID: 'Piranha'
        },        
        Soda: {
            KEY: 'soda',
            ID: 'soda',
            OBJECT_NAME: 'Sodas',
            OBJECT_ID: 'Soda'
        },
        Snails: {
            KEY: 'snail',
            ID: 'snail',
            OBJECT_NAME: 'Snails',
            OBJECT_ID: 'Snail'
        },
        Spiders: {
            KEY: 'spider',
            ID: 'spider',
            OBJECT_NAME: 'Spiders',
            OBJECT_ID: 'Spider'
        },
        Stone: {
            KEY: 'stone',
            ID: 'stone',
            OBJECT_NAME: 'stone',
            OBJECT_ID: 'stone'
        },
        Stick: {
            KEY: 'stick',
            ID: 'stick',
            OBJECT_NAME: 'stick',
            OBJECT_ID: 'stick'
        },        
        Mosquitos: {
            KEY: 'mosquito',
            ID: 'mosquito',
            OBJECT_NAME: 'Mosquitos',
            OBJECT_ID: 'Mosquito'
        },
        Wheel: {
            KEY: 'desertball',
            ID: 'wheel',
            OBJECT_NAME: 'Wheels',
            OBJECT_ID: 'Wheel'
        },
        Smoke: {
            KEY: 'smoke',
            ID: 'smoke',
            OBJECT_NAME: 'Smokes',
            OBJECT_ID: 'Smoke'
        },
        Crab: {
            KEY: 'crab',
            ID: 'crab',
            OBJECT_NAME: 'Crabs',
            OBJECT_ID: 'Crab'
        },
        Monkey: {
            KEY: 'monkey',
            ID: 'monkey',
            OBJECT_NAME: 'Monkeys',
            OBJECT_ID: 'Monkey'
        },
        Mouse: {
            KEY: 'mouse',
            ID: 'mouse',
            OBJECT_NAME: 'Mice',
            OBJECT_ID: 'Mouse'
        },
        Donut: {
            KEY: 'donut',
            ID: 'donut',
            OBJECT_NAME: 'Donuts',
            OBJECT_ID: 'Donut'
        },
        Bracelet: {
            KEY: 'bracelet'        
        },
        Candle: {
            KEY: 'candle',
            ID: 'candle',
            OBJECT_NAME: 'Candles',
            OBJECT_ID: 'Candle'        
        },
        Key: {
            KEY: 'key'
        },
        Treasure: {
            KEY: 'treasure'
        },
        ExtraPoint: {
            KEY: 'extrapoint',
            ID: 'extrapoint',
            OBJECT_NAME: 'ExtraPoints', 
            OBJECT_ID: 'extrapoint'
        },
        Death:{
            KEY: 'death_0'
        },
        Collectables: {
            KEY: 'collectable',
            ID: 'collectable',
            OBJECT_NAME: 'Collectables',
            OBJECT_ID: 'collectable'
        },
        SuperPowers: {
            KEY: 'superPower',
            ID: 'superPower',
            OBJECT_NAME: 'superPowers',
            OBJECT_ID: 'superPower'
        },
        inventoryObjects: {
            KEY: 'inventoryObject',
            ID: 'inventoryObject',
            OBJECT_NAME: 'inventoryObjects',
            OBJECT_ID: 'inventoryObject'
        },
        Women:{
            AGATHA: 'agatha_intro',
            AMELIA: 'amelia_intro',
            BERTA: 'berta_intro',
            MARIA: 'maria_intro',
            KATHERINE: 'katherine_intro'
        },
        Transport:{
            BUS: 'bus_intro',
            PLANE: 'plane_intro',
            PICKUP: 'pickup_intro',
            BOOK: 'flyingbook_intro',
            SHIP: 'ship_intro'
        },        
        Star:{
            KEY: 'star'
        },
        SandClock:{
            KEY: 'sandClock'
        },
        Loupe:{
            KEY: 'loupe'
        },
        CristalBottle:{
            KEY: 'cristalbottle'
        },
        WaterBottle:{
            KEY: 'waterbottle'
        },
        PlasticGlass:{
            KEY: 'plasticglass'
        },
        EarStick:{
            KEY: 'earstick'
        },
        Axe:{
            KEY: 'axe'
        },
        Matches:{
            KEY: 'matches'
        },
        OilBottle:{
            KEY: 'oilbottle'
        },
        PlayAgain: {
            KEY: 'playagain'
        },
        Play:{
            KEY: 'play'
        },
        Play2:{
            KEY: 'play2'
        },
        Lock:{
            KEY: 'lock'
        },
        Cavemen_Clothes: {
            KEY: 'caveman_clothes'        
        },
        Mamut: {
            KEY: 'mamut'        
        },
        EndLevel: {            
            OBJECT_NAME: 'EndLevel',
            OBJECT_ID: 'positionEnd'
        },
        Player: {
            KEY: 'player'
        },        
        Level_Price:{
            KEY:'coin'
        },
        Fire:{
            KEY:'fire'
        },
        Joystick:{
            KEY: 'joystick'
        },
        Lianas: {
            KEY: 'liana',
            ID: 'liana',
            OBJECT_NAME: 'lianasPoints',
            OBJECT_ID: 'liana'
        },
        EndOfLianas: {
            KEY: 'endOfLiana',
            ID: 'endOfLiana',
            OBJECT_NAME: 'lianasPoints',
            OBJECT_ID: 'endOfLiana'
        },
        Crocodile: {
            KEY: 'crocodile',
            ID: 'crocodile',
            OBJECT_NAME: 'Crocodiles',
            OBJECT_ID: 'Crocodile'
        },
        Dinowater: {
            KEY: 'dinowater',
            ID: 'dinowater',
            OBJECT_NAME: 'Dinowaters',
            OBJECT_ID: 'Dinowater'
        },
        Rinobeetle:{
            KEY: 'rinobeetle',
            ID: 'rinobeetle',
            OBJECT_NAME: 'Rinobeetles',
            OBJECT_ID: 'Rinobeetle'
        },
        CarnivorousPlant:{
            KEY: 'carnivorous',
            ID: 'carnivorous',
            OBJECT_NAME: 'CarnivorousPlants',
            OBJECT_ID: 'CarnivorousPlant'
        },

        Dinobird: {
            KEY: 'dinobird',
            ID: 'dinobird',
            OBJECT_NAME: 'Dinobirds',
            OBJECT_ID: 'Dinobird'
        },
        Spike: {
            KEY: 'Spike',
        },
        Limit: {
            KEY: 'Limit'
        },
        INVISIBLE: 'invisible',
        PUZZLEPIECE: 'puzzlepiece'
    },
    Enemies_Layers:{
        Level1 : {
            BATS : 'Bats',
            WHEELS: 'Wheels',
            RINOBEETLE: 'Rinobeetles'
        },
        Level2: {
            SEAGULLS: 'Seagulls',            
            CRABS: 'Crabs'
        },
        Level3: {
            MONKEYS: 'Monkeys',            
            CARNIVOROUS: 'CarnivorousPlants',
            SMOKES: 'Smokes',
            PIRANHAS: 'Piranhas'              
        },       
        Level4: {
            FLYINGBOOKS: 'Flyingbooks',            
            MICE: 'Mice',
            CANDLES: 'Candles'
        },
        Level5:{
            Spiders: 'Spiders',
            Mosquitos: 'Mosquitos'
        },
        Level6: {
            DINOWATERS: 'Dinowaters',
            DINOBIRD: 'Dinobirds'
        }
    },
    Textures: {
        BG_MENU: 'bg_Menu',
        BG_LEVEL1: 'bg_Level1',
        BG_INTROLEVEL1: 'bg_IntroLevel1',
        BG_INTROLEVEL2: 'bg_IntroLevel2',
        BG_LEVEL2: 'bg_Level2',
        BG_LEVEL3: 'bg_Level3',
        BG_LEVEL4:  'bg_Level4',        
        BG_LEVEL5:  'bg_Level5',        
        BG_LEVEL6: 'bg_Level6',
        BG_CREDITS: 'Credits',        
        BG_CREDITS_PAGE2: 'creditsPage2',
        PLATFORM_FOREST: 'platform'
    },
    Anims: {
        DEATH: 'death_anim',
        BATS: 'vulture_move',
        BEES: 'bee_fly',
        FLYINGBOOKS: 'flyingbook_fly',
        SEAGULLS: 'seagull_fly',
        PIRANHAS: 'piranha_swim',
        SODAS: 'soda_fly',
        SNAILS: 'snail_move',
        SPIDERS: 'spider_move',
        STONE: 'stone_move',
        STICK: 'stick_move',                
        WHEEL: 'desertball_move',
        CRAB: 'crab_move',
        MONKEY: 'monkey_move',
        SMOKE: 'smoke_move',
        MOUSE: 'mouse_move',
        DONUT: 'donut_move',
        BRACELET: 'bracelet_move',
        CANDLE: 'candle_move',
        KEY: 'key_shine',
        TREASURE: 'treasure_shine',
        EXTRAPOINT: 'extrapoint_rotate',
        CAVEMAN_CLOTHES: 'caveman_clothes_move',
        JOYSTICK: 'joystick_move',
        CROCODILE:'swim',
        DINOWATER: 'dinowater_move',
        RINOBEETLE: 'rinobeetle_move',
        CARNIVOROUS: 'carnivorous_move',
        DINOBIRD: 'dinobird_move',
        MAMUT:{
            SLEEP: 'mamut_sleep',
            HAPPY: 'mamut_happy'
        },
        Direction: {
            RIGHT: 'right',
            LEFT: 'left',
            UP: 'up',
            DOWN: 'down',
            JUMP: 'jump',
            IDLE: 'idle',
        },
        MAP: 'map_shine',
        PUZZLEPIECE:'puzzlepiece_move'
    },
    UI:{
        VOLUMEON:'volumeOn',
        VOLUMEOFF:'volumeOff',
        INVENTORYBTN: 'inventoryBtn',
        INVENTORY: 'inventory',
        SUPERPOWERSBOX: 'superPowersBox'
    },
    Fonts:{
        PIXEL: 'pixel'  
    },    
    Tiles: {
        LEVEL1_TILESET: 'level1tileset',
        LEVEL2_TILESET: 'level2tileset',
        LEVEL3_TILESET: 'level3tileset',
        LEVEL4_TILESET: 'level4tileset',
        FOREST_PACK : 'forestPack_32x32',
        GRASS_TILES: 'grasstiles',        
        JUNGLE : 'jungle',
        WOODS: 'woods',
        VOLCANO: 'spritesheet'
    },
    Layers: {
        WORLD: 'World',
        LANDSCAPE: 'Landscape',
        CLOUDS: 'Clouds',
        LANDSCAPEFRONT: 'LandscapeFront',        
        SPIKES: 'Spikes',
        LIMITS: 'Limits'
    },
    Events: {
        GAME_OVER: 'GameOver',
        LEVEL_FINISHED: 'Win',
        MENU: 'Menu',
        PLAYAGAIN: 'PlayAgain',
        GETSUPERPOWER: 'GetSuperPower'
    },
    Settings: {
        FLAG_ES: 'es_flag',
        FLAG_EN: 'en_flag',
        FLAG_FR: 'fr_flag',
        FLAG_RU: 'ru_flag'
    }, 
    Players_Sprites:{        
        player3:{
            key: 'player3',
            name: 'Boy (by IFlags)',
            IDLE: 'player3_idle',
            WALK: 'player3_walk',
            DOWN: 'player3_down',
            CLIMB: 'player3_climb'
        },
        knight:{
            key: 'knight',
            name: 'Medieval Knight\n(by Leo)',
            IDLE: 'knight_idle',
            WALK: 'knight_walk',
            DOWN: 'knight_down',
            CLIMB: 'knight_climb'
        },
        dave:{
            key: 'dave',
            name: 'Dave (by Gael)',
            IDLE: 'dave_idle',
            WALK: 'dave_walk',
            DOWN: 'dave_down',
            CLIMB: 'dave_climb'
        },
        girlplayer:{
            key: 'girlplayer',
            name: 'Girl (by Moye)',
            IDLE: 'girlplayer_idle',
            WALK: 'girlplayer_walk',
            DOWN: 'girlplayer_down',
            CLIMB: 'girlplayer_climb'
        },
        girlretro:{
            key: 'girlretro',
            name: 'Amstrad Girl',
            IDLE: 'girlretro_idle',
            WALK: 'girlretro_walk',
            DOWN: 'girlretro_down',
            CLIMB: 'girlretro_climb'
        },
        harry:{
            key: 'harry',
            name: 'Harry (by Moye)',
            IDLE: 'harry_idle',
            WALK: 'harry_walk',
            DOWN: 'harry_down',
            CLIMB: 'harry_climb'
        },
        astronaut:{
            key: 'astronaut',
            name: 'Astronaut girl\n(by Moye)',
            IDLE: 'astronaut_idle',
            WALK: 'astronaut_walk',
            DOWN: 'astronaut_down',
            CLIMB: 'astronaut_climb'
        }
    }

};

export default GameConstants;