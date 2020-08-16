import BasicScene from "./BasicScene.js";
import Player from '../player/Player.js';
import GameConstants from "../services/GameConstants.js";
import UI from "./UI.js";


class Scores extends BasicScene {
    constructor() {
        super({key: 'Scores'});
    }
    
    preload(){
        
    }

    create() {

        // background positions   
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        let x = width / 2 ;
        let y = height / 2 -50;

        // background        
        this.bg1 = this.add.image(0, 0, GameConstants.Textures.BG_MENU).setOrigin(0).setScale(1);        
        //this.bg = this.add.image(x, y, GameConstants.Textures.BG_MENU).setScale(0.25);

        //bg sound        
        /*this.bgmusic = this.sound.add(GameConstants.Sound.BONUSLEVEL.OST);
        this.addEventForMusic(this.bgmusic,true,200);*/

        const menuButton = this.add.dynamicBitmapText(80, y * 2 + 20, 'pixel', this.TG.tr('LEVELSELECT.MENU'), 24);        
            menuButton.setInteractive();
            menuButton.on('pointerdown', () => { 
                this.changeScene(this, GameConstants.Levels.MENU,0);
            });
            
        //Condition for: Local mobile/GameJolt
        if (GJAPI.bActive) {

            //TODO: Change text "Score" for "best world score" or similar
            const levelsLabel = this.add.dynamicBitmapText(80, 50, 'pixel', this.TG.tr('MENU.SCORES'), 24).setTint(0x808489);
                        
            GJAPI.ScoreFetch(532863, GJAPI.SCORE_ALL, 1, (pResponse)=>{ //Level 1 Score
                if(!pResponse.scores) return;
                
                this.paintScoreGameJolt(1,pResponse.scores[0]);
                
            });

            GJAPI.ScoreFetch(532881, GJAPI.SCORE_ALL, 1, (pResponse)=>{ //Level 2 Score
                if(!pResponse.scores) return;                
                
                this.paintScoreGameJolt(2,pResponse.scores[0]);
                
            });

            GJAPI.ScoreFetch(532882, GJAPI.SCORE_ALL, 1, (pResponse)=>{ //Level 3 Score
                if(!pResponse.scores) return;
                
                this.paintScoreGameJolt(3,pResponse.scores[0]);                               
            });

            GJAPI.ScoreFetch(532883, GJAPI.SCORE_ALL, 1,(pResponse)=>{ //Level 4 Score
                if(!pResponse.scores) return;
                
                this.paintScoreGameJolt(4,pResponse.scores[0]);                               
            });

            GJAPI.ScoreFetch(532884, GJAPI.SCORE_ALL, 1, (pResponse)=>{//Level 5 Score
                if(!pResponse.scores) return;
                
                this.paintScoreGameJolt(5,pResponse.scores[0]);                               
            });
        } else {
            this.DB = store.get(GameConstants.DB.DBNAME);
            
            const levelsLabel = this.add.dynamicBitmapText(80, 50, 'pixel', this.TG.tr('MENU.SCORES'), 24).setTint(0x808489);
            
            let levelLabel = this.add.dynamicBitmapText(80, 100, 'pixel', this.TG.tr('LEVELSELECT.LEVEL') + ' 1 : ' + this.DB.worlds.Level1.score , 24).setTint(0x808489);
            let level2Label = this.add.dynamicBitmapText(80, 150, 'pixel', this.TG.tr('LEVELSELECT.LEVEL') + ' 2 : ' + this.DB.worlds.Level2.score , 24).setTint(0x808489);
            let level3Label = this.add.dynamicBitmapText(80, 200, 'pixel', this.TG.tr('LEVELSELECT.LEVEL') + ' 3 : ' + this.DB.worlds.Level3.score , 24).setTint(0x808489);
            let level4Label = this.add.dynamicBitmapText(80, 250, 'pixel', this.TG.tr('LEVELSELECT.LEVEL') + ' 4 : ' + this.DB.worlds.Level4.score , 24).setTint(0x808489);
            let level5Label = this.add.dynamicBitmapText(80, 300, 'pixel', this.TG.tr('LEVELSELECT.LEVEL') + ' 5 : ' + this.DB.worlds.Level5.score , 24).setTint(0x808489);
            
        }

    }

    paintScoreGameJolt(levelNum, pScore){        
        let txtScore = this.TG.tr('LEVELSELECT.LEVEL') + levelNum + ":" + Phaser.Utils.String.Pad(pScore.sort, 6, '0', 1) + " " + pScore.user ; 
        this.add.dynamicBitmapText(80, 150 + (50*(levelNum-1)), 'pixel', txtScore , 20).setTint(0x808489);                               
    }

    update(time, delta) {
        
    }

}
export default Scores;