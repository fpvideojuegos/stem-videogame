import GameConstants from "../services/GameConstants.js";
import BackgroundMask from "../gameObjects/BackgroundMask.js";

/**
 * Escena que será usada como interfaz para Player.
 */
class UI extends Phaser.Scene {
    constructor() {
        super({
            key: 'UI'
        });        
    }

    init(data) {
        this.scenename = data.scene;
    }

    preload() {
        //console.log('Scene: UI');
    }

    create() {
        this.height = this.cameras.main.height;
        this.width = this.cameras.main.width;

        //if detects a touch screen and it is not the bonus scene
        if (this.sys.game.device.input.touch && this.scenename!=GameConstants.Levels.BONUSLEVEL) {
            this.createControls();
        }

        //Opción de MENU en niveles
        this.menuButton = this.add.dynamicBitmapText(this.width - 100, 20, 'pixel', this.TG.tr('LEVELSELECT.MENU'));        
        this.menuButton.setInteractive();

        this.menuButton.on('pointerdown', () => { 
            this.registry.events.emit(GameConstants.Events.MENU);
        });

        //Botón "Reiniciar el nivel"
        this.playAgainButton = this.add.image(this.width - 140, 15 , GameConstants.Sprites.PlayAgain.KEY)
            .setScrollFactor(0).setDepth(10).setOrigin(0).setAlpha(1).setScale(0.65); 
        this.playAgainButton.setInteractive();
        this.playAgainButton.on('pointerdown', () => { 
            this.registry.events.emit(GameConstants.Events.PLAYAGAIN);
        });        

        //******* SUPERPOWERS
        //White border box for superpowers
        this.superPowersBox = this.add.image(this.width/2 + 60, 8 , GameConstants.UI.SUPERPOWERSBOX).setScrollFactor(0).setDepth(10).setOrigin(0).setAlpha(1).setScale(0.75); 
        
        //SuperPowersButtons
        this.superSpeedBtn = this.add.image(this.width/2 + 73, 17 , GameConstants.Sprites.superSpeed.OBJECT_NAME).setScrollFactor(0).setDepth(10).setOrigin(0).setAlpha(0).setScale();
        this.lowGravityBtn = this.add.image(this.width/2 + 108, 17 , GameConstants.Sprites.lowGravity.OBJECT_NAME).setScrollFactor(0).setDepth(10).setOrigin(0).setAlpha(0).setScale();
        this.superJumpBtn = this.add.image(this.width/2 + 155, 17 , GameConstants.Sprites.superJump.OBJECT_NAME).setScrollFactor(0).setDepth(10).setOrigin(0).setAlpha(0).setScale();
        this.invencibilityBtn = this.add.image(this.width/2 + 180, 17 , GameConstants.Sprites.invencibility.OBJECT_NAME).setScrollFactor(0).setDepth(10).setOrigin(0).setAlpha(0).setScale();

        this.DB = store.get(GameConstants.DB.DBNAME);
        //this.DB = this.getDB();   //Non functional yet
        if (this.DB.superPowers.superSpeed.picked) {
            this.createSuperPowerImg('superSpeed');
        }

        if (this.DB.superPowers.lowGravity.picked) {
            this.createSuperPowerImg('lowGravity');
        }

        if (this.DB.superPowers.invencibility.picked) {
            this.createSuperPowerImg('invencibility');
        }

        if (this.DB.superPowers.superJump.picked) {
            this.createSuperPowerImg('superJump');
        }


        //Get Event from Basic Scene (To get SuperPower and create img)        
        this.registry.events.on(GameConstants.Events.GETSUPERPOWER, (superPowerKey) => {
            //console.log("UI SuperPower" + superPowerKey);
            this.createSuperPowerImg(superPowerKey);
        });
    
        this.superSpeedBtn.on('pointerdown', () => {
            this.DB = store.get(GameConstants.DB.DBNAME);
            if (this.DB.superPowers.superSpeed.status == "OFF") {
                this.superSpeedBtn.alpha = 1;
                this.DB.superPowers.superSpeed.status = "ON";
                console.log(this.DB.superPowers.superSpeed.status);
            } else if (this.DB.superPowers.superSpeed.status == "ON") {
                this.superSpeedBtn.alpha = 0.5;
                this.DB.superPowers.superSpeed.status = "OFF";
                console.log(this.DB.superPowers.superSpeed.status);
            }
            store.set(GameConstants.DB.DBNAME, this.DB);
        });

        this.lowGravityBtn.on('pointerdown', () => {
            this.DB = store.get(GameConstants.DB.DBNAME);
            if (this.DB.superPowers.lowGravity.status == "OFF") {
                this.lowGravityBtn.alpha = 1;
                this.DB.superPowers.lowGravity.status = "ON";
                console.log(this.DB.superPowers.lowGravity.status);
            } else if (this.DB.superPowers.lowGravity.status == "ON") {
                this.lowGravityBtn.alpha = 0.5;
                this.DB.superPowers.lowGravity.status = "OFF";
                console.log(this.DB.superPowers.lowGravity.status);
            }
            store.set(GameConstants.DB.DBNAME, this.DB);
        });

        this.superJumpBtn.on('pointerdown', () => {
            this.DB = store.get(GameConstants.DB.DBNAME);
            if (this.DB.superPowers.superJump.status == "OFF") {
                this.superJumpBtn.alpha = 1;
                this.DB.superPowers.superJump.status = "ON";
                console.log(this.DB.superPowers.superJump.status);
            } else if (this.DB.superPowers.superJump.status == "ON") {
                this.superJumpBtn.alpha = 0.5;
                this.DB.superPowers.superJump.status = "OFF";
                console.log(this.DB.superPowers.superJump.status);
            }
            store.set(GameConstants.DB.DBNAME, this.DB);
        });

        this.invencibilityBtn.on('pointerdown', () => {
            this.DB = store.get(GameConstants.DB.DBNAME);
            if (this.DB.superPowers.invencibility.status == "OFF") {
                this.invencibilityBtn.alpha = 1;
                this.DB.superPowers.invencibility.status = "ON";
                console.log(this.DB.superPowers.invencibility.status);
            } else if (this.DB.superPowers.invencibility.status == "ON") {
                this.invencibilityBtn.alpha = 0.5;
                this.DB.superPowers.invencibility.status = "OFF";
                console.log(this.DB.superPowers.invencibility.status);
            }
            store.set(GameConstants.DB.DBNAME, this.DB);
        });

        //** INVENTORY
        //Backpack 
        this.inventoryBtn = this.add.image(this.width - 190, 8 , GameConstants.UI.INVENTORYBTN)
                    .setScrollFactor(0).setDepth(10).setOrigin(0).setAlpha(1).setScale();
        this.inventoryBtn.setInteractive();

        //Ventana de inventario
        this.inventoryBtn.on('pointerdown', () => {
            //hide UI buttons
            this.playAgainButton.alpha = 0;
            this.inventoryBtn.alpha = 0;
            this.menuButton.alpha = 0;
            
            
            //hide SuperPowers
            this.superPowersBox.alpha = 0;
            this.superSpeedBtn.alpha = 0;
            this.lowGravityBtn.alpha = 0;
            this.superJumpBtn.alpha = 0;
            this.invencibilityBtn.alpha = 0;

            // Pausa la escena del level, sea cual sea
            this.backlevel = this.scene.get(this.scenename);
            this.backlevel.physics.pause();

            let mask = new BackgroundMask(this);
            mask.show();

            let inventoryBack = this.add.image(200, 100, GameConstants.UI.INVENTORY).setScrollFactor(0).setOrigin(0);
            inventoryBack.setInteractive();

            this.inventoryText = this.add.dynamicBitmapText(this.width * 0.4, this.height *0.26, 'pixel', this.TG.tr('LEVELSELECT.INVENTORY'));        
            this.DB = store.get(GameConstants.DB.DBNAME);

            //Print inventory objects the player has picked 
            if (this.DB.inventory.desertRose){
                this.desertRose = this.add.image(270, 160, "desertRose").setScale(1.25).setOrigin(0);
            }

            if (this.DB.inventory.shell){
                this.shell = this.add.image(335, 255, "shell").setScale(1.25).setOrigin(0);
            }

            if (this.DB.inventory.lysFlower){
                this.lysFlower = this.add.image(400, 160, "lysFlower").setScale(1.25).setOrigin(0);
            }

            if (this.DB.inventory.pen){
                this.pen = this.add.image(465, 255, "pen").setScale(1.25).setOrigin(0);
            }

            if (this.DB.inventory.star){
                this.star = this.add.image(530, 160, "star").setScale(1.25).setOrigin(0);
            }

            inventoryBack.on('pointerdown', () => {
                this.inventoryText.destroy();
                if (this.DB.inventory.desertRose){
                    this.desertRose.destroy();
                }
                if (this.DB.inventory.shell){
                    this.shell.destroy();
                }
                if (this.DB.inventory.lysFlower){
                    this.lysFlower.destroy();
                }
                if (this.DB.inventory.lysFlower){
                    this.lysFlower.destroy();
                }
                if (this.DB.inventory.star){
                    this.star.destroy();
                }

                this.closeInventory(mask, inventoryBack);                
            });
        });

  
    }//create

    createSuperPowerImg(superPowerKey){
        if (superPowerKey == 'superSpeed') {            
            this.superSpeedBtn.setAlpha(0.50);
            this.superSpeedBtn.setInteractive();
        } else if (superPowerKey == 'lowGravity') {
            this.lowGravityBtn.setAlpha(0.50);
            this.lowGravityBtn.setInteractive();
        } else if (superPowerKey == 'superJump') {
            this.superJumpBtn.setAlpha(0.50);
            this.superJumpBtn.setInteractive();
        } else if (superPowerKey == 'invencibility') {
            this.invencibilityBtn.setAlpha(0.50);
            this.invencibilityBtn.setInteractive();
        } 
    }


    closeInventory(mask, inventoryBack){
        //show ui buttons
        this.playAgainButton.alpha = 1;
        this.inventoryBtn.alpha = 1;
        this.menuButton.alpha = 1;

        //show SuperPowers
        this.superPowersBox.alpha = 1;
        this.DB = store.get(GameConstants.DB.DBNAME);
        if (this.DB.superPowers.superSpeed.picked) {
            this.createSuperPowerImg('superSpeed');
        }

        if (this.DB.superPowers.lowGravity.picked) {
            this.createSuperPowerImg('lowGravity');
        }

        if (this.DB.superPowers.invencibility.picked) {
            this.createSuperPowerImg('invencibility');
        }

        if (this.DB.superPowers.superJump.picked) {
            this.createSuperPowerImg('superJump');
        }

        

        mask.hide();
        inventoryBack.destroy();
        this.backlevel.physics.resume();
    }

    createControls() {
        //Para que admita usar dos controles a la vez    
        this.input.addPointer(2);
        
        // Controles
        this.leftBtn = this.add.sprite(100, 0, 'controlLeft')
            .setInteractive();
        this.rightBtn = this.add.sprite(350, 0, 'controlRight')
            .setInteractive();
        this.jumpBtn = this.add.sprite(this.width + 300, -225, 'controlUp')
            .setInteractive();
        this.downBtn = this.add.sprite(this.width + 300, 0, 'controlDown')
            .setInteractive();


        // Eventos de los controles
        this.leftBtn.on('pointerdown', () => {
            this.registry.events.emit('controlLeftON');
        });
        this.leftBtn.on('pointerup', () => {
            this.registry.events.emit('controlLeftOFF');
        });

        this.leftBtn.on('pointerout', () => {
            this.registry.events.emit('controlLeftOFF');
        });

        this.rightBtn.on('pointerdown', () => {
            this.registry.events.emit('controlRightON');
        });
        this.rightBtn.on('pointerup', () => {
            this.registry.events.emit('controlRightOFF');
        });

        this.rightBtn.on('pointerout', () => {
            this.registry.events.emit('controlRightOFF');
        });

        this.jumpBtn.on('pointerdown', () => {
            this.registry.events.emit('controlJumpON');
        });
        this.jumpBtn.on('pointerup', () => {
            this.registry.events.emit('controlJumpOFF');
        });
        this.jumpBtn.on('pointerout', () => {
            this.registry.events.emit('controlJumpOFF');
        });

        this.downBtn.on('pointerdown', () => {
            this.registry.events.emit('controlDownON');
        });
        this.downBtn.on('pointerup', () => {
            this.registry.events.emit('controlDownOFF');
        });
        this.downBtn.on('pointerout', () => {
            this.registry.events.emit('controlDownOFF');
        });

        // Posicionando los controles
        const controlContainer = this.add.container(
            50, 
            this.height - 90);
        controlContainer.add([
            this.leftBtn,
            this.rightBtn,
            this.jumpBtn,
            this.downBtn
        ]);
        controlContainer
            .setScale(.6)
            .setAlpha(0.8)
            .setScrollFactor(0)
            .setDepth(5);
    }

}

export default UI;