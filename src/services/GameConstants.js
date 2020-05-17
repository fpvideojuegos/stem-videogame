/* Las constantes del juego */
const GameConstants = {
    DB: {
        DBNAME: 'gamedatav0_07'
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
        LEVEL0: {
            DANIELA_MUM: 'Level0_MOTHER_WhereAreYou_01',
            DANIELA_ANSWER: 'Level0_DANIELA_5Mins_02',
            BSO: 'LevelIntro_BSO'
        },
        LEVEL1: {
            AGATHA: 'Level1_AGATHA_01',
            BSO: 'Level1_BSO',
            AMBIENCE: 'Desert',
            BUS: 'Bus'
        },
        LEVEL2: {
            BSO: 'Level2_BSO'
        },
        Level3: {
            BSO: 'Level3_BSO'
        },
        Level4: {
            BSO: 'Level4_BSO'
        },
        LEVEL5: {
            BSO: 'Level5_BSO'
        },
        LEVEL6: {
            BSO: 'Level6_BSO'
        },
        LEVELALL: {
            WEDIDIT: 'LevelAll_DANIELA_WeDidIt_04',
            RECOVERONELIFE: 'LevelAll_LOLO_RecoverOnleLife_16'
        },
        BONUSLEVEL: {            
            FRUITPICKUP: 'fruitpickup',
            POWERUP: 'powerUp',
            LOLO_AUCH: 'lolo_auch',
            BSO: 'BonusLevel_BSO'            
        },
        SOUNDS: {
            CAVEBATS: 'CaveBats',
            DANIELA_JUMP: 'soundJump',
            DANIELA_AUCH: 'danielaAuch',
            LEVELUP : 'levelUp',
            BIRD_SINGING : 'BirdSinging',
            COINPICKUP: 'coinpickup',
            COLLECTABLEPICKUP: 'collectablePickup',
            LIFEPICKUP: 'lifePickup',
            ALARM_ON : 'alarmOn', 
            ENEMY_DEATH: 'enemy-death'
        },
        MAIN:{
            BSO: 'Main_BSO'
        }
    },
    Sprites: {
        Heart: {
            KEY: 'heart',
            ID: 'heart',
            OBJECT_NAME: 'Heart',
            OBJECT_ID: 'heart'
        },
        Obj1: {
            KEY: 'obj1',
            ID: 'obj1',
            OBJECT_NAME: 'obj1',
            OBJECT_ID: 'obj1'
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
        MagicFruit: {
            KEY: 'magicfruit',
            ID: 'magicfruit',
            OBJECT_NAME: 'magicfruit',
            OBJECT_ID: 'magicfruit'
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
        Donut: {
            KEY: 'donut',
            ID: 'donut',
            OBJECT_NAME: 'Donuts',
            OBJECT_ID: 'Donut'
        },
        Bracelet: {
            KEY: 'bracelet'        
        },
        Key: {
            KEY: 'key'
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
        Star:{
            KEY: 'star'
        },
        Loupe:{
            KEY: 'loupe'
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
            BEES: 'Bees',
            SNAILS: 'Snails'
        },
        Level3 : {
            SODAS: 'Sodas',
            DONUTS: 'Donuts'
        },
        
        Level4: {
            CROCODILES: 'Crocodiles',
            DINOWATERS: 'Dinowaters'
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
        SODAS: 'soda_fly',
        SNAILS: 'snail_move',
        SPIDERS: 'spider_move',
        STONE: 'stone_move',
        STICK: 'stick_move',
        MAGICFRUIT: 'magicfruit_shine',
        MOSQUITOS: 'mosquito_move',
        WHEEL: 'desertball_move',
        DONUT: 'donut_move',
        BRACELET: 'bracelet_move',
        KEY: 'key_shine',
        EXTRAPOINT: 'extrapoint_rotate',
        CAVEMAN_CLOTHES: 'caveman_clothes_move',
        JOYSTICK: 'joystick_move',
        CROCODILE:'swim',
        DINOWATER: 'dinowater_move',
        RINOBEETLE: 'rinobeetle_move',
        DINOBIRD: 'dinobird_move',
        MAMUT:{
            SLEEP: 'mamut_sleep',
            HAPPY: 'mamut_happy'
        }, 
        LOLO: {
            NORMAL_FLY: 'lolo_normal_fly',
            TROGLODITA_FLY: 'lolo_troglodita_fly'
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
        //Añadido 01/04/2020
        INVENTORYBTN: 'inventoryBtn',
        INVENTORY: 'inventory'
    },
    Fonts:{
        PIXEL: 'pixel'  
    },
    // TODO: Remover a su respectivo sitio cuando tengamos i18ln
    Texts: {
        BUSCAR_PULSERA: 'Daniela tienes que buscar la Pulsera magica',
        BUSCAR_ROPA_TROGLODITA: 'Daniela, tienes que buscar la ropa de Troglodita.',
        VIDAS: 'VIDAS ',
        CONSEGUIDO: 'Bien!! Lo hemos Conseguido!!'
    },
    Tiles: {
        LEVEL1_TILESET: 'level1tileset',
        LEVEL2_TILESET: 'level2tileset',
        FOREST_PACK : 'forestPack_32x32',
        GRASS_TILES: 'grasstiles',        
        JUNGLE : 'jungle',
        WOODS: 'woods',
        VOLCANO: 'spritesheet'
    },
    Layers: {
        WORLD: 'World',
        LANDSCAPE: 'Landscape',
        LANDSCAPEFRONT: 'LandscapeFront',        
        SPIKES: 'Spikes',
        LIMITS: 'Limits'
    },
    Events: {
        GAME_OVER: 'GameOver',
        LEVEL_FINISHED: 'Win',
        MENU: 'Menu',
        PLAYAGAIN: 'PlayAgain'
    },
    Settings: {
        FLAG_ES: 'es_flag',
        FLAG_EN: 'en_flag',
        FLAG_FR: 'fr_flag',
        FLAG_RU: 'ru_flag'
    }, 
    Players_Sprites:{
        player2:{
            key: 'player2',
            name: 'Nombre2',
            IDLE: 'player2_idle',
            WALK: 'player2_walk',
            DOWN: 'player2_down',
            CLIMB: 'player2_climb'
        },
        player3:{
            key: 'player3',
            name: 'Nombre3',
            IDLE: 'player3_idle',
            WALK: 'player3_walk',
            DOWN: 'player3_down',
            CLIMB: 'player3_climb'
        },
        knight:{
            key: 'knight',
            name: 'Medieval Knight',
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
        }
    }

};

export default GameConstants;