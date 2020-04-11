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
        this.createBackground(GameConstants.Textures.BG_LEVEL1, defaultStatus,defaultStatus,defaultStatus,defaultStatus,{x:0.65, y:0.65});
        //Finding enemies in json map
        this.findAndLoadEnemiesFromMap(GameConstants.Enemies_Layers.Level1);
        //ExtraPoints        
        this.createCoins();
        //HealthText
        this.createHealthText();
        //Tilemap
        this.paintLayerAndCreateCollision(GameConstants.Tiles.CAVE_STONE);

        //PRIVATE SCENE ELEMENTS
        //Creacion de elementos decorativos
        this.paintLayerAndCreateCollision(GameConstants.Tiles.CAVE_STONE, GameConstants.Layers.LANDSCAPE, false);
        //Creacion de objetos invisibles que dañaran a daniela
        this.findTransparentObjects(GameConstants.Layers.SPIKES, GameConstants.Sprites.Spike.KEY, true);

        
        //Sounds        
        this.musicbg = this.sound.add(GameConstants.Sound.LEVEL1.BSO, {volume: 0.4});
        this.addEventForMusic(this.musicbg,true);
        //background ambiance effect
        this.ambiencebg = this.sound.add(GameConstants.Sound.LEVEL1.AMBIENCE, {volume: 1});
        this.addEventForMusic(this.ambiencebg,true);

        //this.soundLOLO_Bien_lo_hemos_conseguido = this.sound.add(this.TG.getActualLang() + "_" + GameConstants.Sound.LEVELALL.WEDIDIT);

        //Create Bracelet
        this.bracelets = this.createEndLevelObject(GameConstants.Sprites.Bracelet.KEY);
        this.physics.world.enable(this.bracelets);
        this.magicbracelet = this.bracelets[0];
        this.magicbracelet.setScale(0.75);
        this.magicbracelet.body.setAllowGravity(false);
        this.anims.play(GameConstants.Anims.BRACELET, this.magicbracelet);

        //Collider for Bracelet
        this.physics.add.collider(this.daniela, this.magicbracelet, () => {
            this.musicbg.stop();
            this.magicbracelet.destroy();
            //this.addEventForMusic(this.soundLOLO_Bien_lo_hemos_conseguido);
            this.daniela.nextScene();
        });
      
    }

    update(time, delta) {
        this.daniela.update(time, delta);
         Object.keys(this.enemyGroups).forEach(enemy => {
            this.enemyGroups[enemy].update();
        });
    }
}

export default Level1;