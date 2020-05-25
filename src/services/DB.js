 /**
  *  https://github.com/nbubna/store
  *  Permite crear una base de datos por defecto con una semilla inicial.
  *  @param {[{key: String, value: String | Object}, ...]} dbs
  *  @return void
  */
 const createDB = (dbs) =>
     dbs.map((db) =>
         (store.get(db.key) === null) ?
         store.set(db.key, db.value) :
         void 0);

const DB = {
    player: 'player2',
    currentLevel: 'Level1',
    maxLevel: 'Level1', //Last Level achieved
    extralifes : 0,
    sound: true,
    inventory : {//Inventory objects //TO DO
        desertRose: false,
        shell: false,
        //objectName: false,
        //objectName: false, 
        //objectName: false
    },
    superPowers : {//Superpowers inventory objects //TO DO
        lowGravity : {
            picked : false,
            status : "OFF"
        },
        superSpeed : {
            picked : false,
            status : "OFF"
        },
        /*superPower3 : {
            picked : false,
            status : "OFF"
        },
        superPower4 : {
            picked : false,
            status : "OFF"
        },
        superPower5 : {
            picked : false,
            status : "OFF"
        }*/
    },
    //Probably this could be deleted soon
    /*currentPlayer: {
        player: {
            player2: {
                name: 'nombre2',
                key: 'player2'
            },
            player3: {
                name: 'nombre3',
                key: 'player3'
            }
        }
    },*/
    worlds: {
        Level1: {            
            completed: false,
            score : '000000',
            stars: 0
        },
        Level2: {            
            completed: false,
            score : '000000',
            stars: 0
        },
        Level3: {            
            completed: false,
            score : '000000',
            stars: 0
        },
        Level4: {            
            completed: false,
            score : '000000',
            stars: 0
        },
        Level5: {            
            completed: false,
            score : '000000',
            stars: 0
        },
        Level6: {            
            completed: false,
            score : '000000',
            stars: 0
        }
    },
    
    skipIntro: true,
}

 export default {
     createDB,
     DB
 };