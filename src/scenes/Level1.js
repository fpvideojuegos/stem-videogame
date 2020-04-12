import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";

class Level1 extends BasicScene {
    constructor() {
        super({
            key: GameConstants.Levels.LEVEL1
        });
        this.target = GameConstants.Levels.LEVEL2;
    }

    create() {
        //Daniela Creation
        this.createDaniela(GameConstants.Sprites.Player3, false);
        //Background        
        this.createRepeatedBackground(GameConstants.Textures.BG_LEVEL1, defaultStatus, defaultStatus,{x:1.25,y:1.25});
        //Finding enemies in json map
        this.findAndLoadEnemiesFromMap(GameConstants.Enemies_Layers.Level1);
        //ExtraPoints        
        this.createCoins();
        //Objects to Collect
        this.createCollectables(GameConstants.Sprites.Loupe.KEY);
        //HealthText
        this.createHealthText();
        //Tilemap
        this.paintLayerAndCreateCollision(GameConstants.Tiles.CAVE_STONE);

        //PRIVATE SCENE ELEMENTS
        //Creacion de elementos decorativos
        this.paintLayerAndCreateCollision(GameConstants.Tiles.CAVE_STONE, GameConstants.Layers.LANDSCAPE, false);
        this.paintLayerAndCreateCollision(GameConstants.Tiles.CAVE_STONE, GameConstants.Layers.LANDSCAPEFRONT, false,4);
        //Creacion de objetos invisibles que dañaran a daniela
        this.findTransparentObjects(GameConstants.Layers.SPIKES, GameConstants.Sprites.Spike.KEY, true);

        
        this.textDialog = this.add.dynamicBitmapText(30, this.cameras.main.height - 75, GameConstants.Fonts.PIXEL, "",10 );
        this.textDialog.setScrollFactor(0);
        this.textDialog.setDepth(3);



        //Sounds        
        this.musicbg = this.sound.add(GameConstants.Sound.LEVEL1.BSO, {volume: 0.4});
        this.addEventForMusic(this.musicbg,true);
        //background ambiance effect
        this.ambiencebg = this.sound.add(GameConstants.Sound.LEVEL1.AMBIENCE, {volume: 1});
        this.addEventForMusic(this.ambiencebg,true);

        //this.soundLOLO_Bien_lo_hemos_conseguido = this.sound.add(this.TG.getActualLang() + "_" + GameConstants.Sound.LEVELALL.WEDIDIT);

        //Create Bracelet
        this.keys = this.createEndLevelObject(GameConstants.Sprites.Key.KEY);
        this.physics.world.enable(this.keys);
        this.keylevel = this.keys[0];
        this.keylevel.setScale(1.25);
        this.keylevel.body.setAllowGravity(false);
        this.keylevel.setAlpha(0);
        this.anims.play(GameConstants.Anims.KEY, this.keylevel);

        //Collider for Bracelet
        this.playercollide = this.physics.add.collider(this.daniela, this.keylevel, () => {
            this.musicbg.stop();
            this.ambiencebg.stop();
            this.keylevel.destroy();
            //this.addEventForMusic(this.soundLOLO_Bien_lo_hemos_conseguido);
            this.daniela.nextScene();
        });

        this.playercollide.active=false;
      
    }

    update(time, delta) {
        this.daniela.update(time, delta);
         Object.keys(this.enemyGroups).forEach(enemy => {
            this.enemyGroups[enemy].update();
        });

        if (this.daniela.collectablesCollected === 0){
            this.playercollide.active=true;
            this.keylevel.setAlpha(1);
        }
    }
}

export default Level1;