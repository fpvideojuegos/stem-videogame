/**
 * GameObject Player
 * @since 0.0.0
 */
import GameConstants from "../services/GameConstants.js";

class Player extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        this.key = config.key;
        // Health
        //Check for extra Lifes
        this.DB = store.get(GameConstants.DB.DBNAME);
        let currentExtraLifes = parseInt(this.DB.extralifes);
        this.health = 5 + currentExtraLifes;

        //Starting score
        this.levelScore = 0;

        //Boolean to stop time counting (Only use when level finished)
        this.timeStop = false;

        //boolean to avoid multiple overlap in hit with enamies
        this.hitDelay = false;

        //boolean to avoid multiple overlap when collecting coins
        this.hitCoin = false;
        this.hitObj = false;
        this.hitHeart = false;
        this.hitSuperPower = false;
        this.hitInventoryObject = false;
        this.hitTime = false;

        //for alarm music        
        this.healthAlarm = this.scene.sound.add(GameConstants.Sound.SOUNDS.ALARM_ON);
        this.healthAlarm.setVolume(0.5);
        this.healthAlarm.setLoop(true);
        this.alarmON = false;

        //Time
        this.seconds = 1;        
        this.secondsLevel = 0;
        this.timeLeft = 300; //5min        

        //Extra point recogidas
        this.extraPoints = 0;
        
        //Collected objects
        this. collectablesCollected = 0;

        //Animaciones en funcion del Sprite Player               
        this.animIDLE = GameConstants.Players_Sprites[this.key].IDLE;
        this.animDOWN = GameConstants.Players_Sprites[this.key].DOWN;
        this.animWALK = GameConstants.Players_Sprites[this.key].WALK;
        this.animCLIMB = GameConstants.Players_Sprites[this.key].CLIMB;
        

        // Configuración del GameObject
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        this.bounce = 0.5;
        this.acceleration = 300;
        
        if(this.DB.superPowers.superSpeed.status == "OFF"){ //If superSpeed is not "OFF" can run a lot more 
            this.body.maxVelocity.x = 150;
        } else { //Watch out! It runs a LOT more!!
            this.body.maxVelocity.x = 450;
        }

        this.body.maxVelocity.y = 500;

        //Para evitar que salga del mundo            
        this.body.setCollideWorldBounds(true);

        // Configuraciones extras para el movimiento
        // this.jumpForce = 150;
        this.jumpForce = 350;
        this.jumpTimer = 0;
        this.jumping = false;

        // Se usa para desacelerar el personaje cuando se sueltan los botones.
        this.deceleration = 0.5;
        // Se usa para cuando el personaje tiene que devolverse.
        this.friction = 0.5;

        // Animación inicial
        this.anims.play(this.animIDLE);        

        this.prevAnim = 'idle';

        this.body.setSize(20, 25);
        this.body.setOffset(0, 15);

        this.setDepth(3);

        //Just for level 4 it let us know how Player controls are going to work
        this.isInLiana = false;
        /**
         * Controles externos, se puede usar para animar a Player en algún momento.
         * @since 0.0.1
         */
        this.animControl = {
            left: false,
            right: false,
            jump: false,
            down: false
        };

        // Control
        this.cursor = this.scene.input.keyboard.createCursorKeys();
        this.WASDKeys = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D
        }); 
        this.spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.gamepad = null;
        this.scene.input.gamepad.once('down', (pad) => {
            this.gamepad = pad;            
        });

        //Sounds create
        this.soundJump = this.scene.sound.add(GameConstants.Sound.SOUNDS.PLAYER_JUMP);
        this.soundPlayerAuch = this.scene.sound.add(GameConstants.Sound.SOUNDS.PLAYER_AUCH);
        this.coinpickup = this.scene.sound.add(GameConstants.Sound.SOUNDS.COINPICKUP);
        this.collectablepickup = this.scene.sound.add(GameConstants.Sound.SOUNDS.COLLECTABLEPICKUP);
        this.lifePickup = this.scene.sound.add(GameConstants.Sound.SOUNDS.LIFEPICKUP);
        this.superPowerPickup = this.scene.sound.add(GameConstants.Sound.SOUNDS.POWERUP);
        this.timePickup = this.scene.sound.add(GameConstants.Sound.SOUNDS.TIMEPICKUP);
        
    }

    update(time,delta) {

        //Resta segundos empleados por Player en cada Level
        if ((this.seconds != parseInt(Math.abs(time / 1000)) && !this.timeStop)) {
            this.seconds = parseInt(Math.abs(time / 1000));            
            this.secondsLevel++;                   
            this.timeLeft--;                     

            let minutes = Math.floor(this.timeLeft / 60);                
            let seconds = Math.floor(this.timeLeft - (minutes * 60));                

            let textTimeLeft = Phaser.Utils.String.Pad(minutes,2,'0',1) + ":" + Phaser.Utils.String.Pad(seconds,2,'0',1);
            if (this.timeLeft>60){
                this.scene.textTime.setText(textTimeLeft).setTint(0xffffff);
                this.alarmON = false;
                this.DB = store.get(GameConstants.DB.DBNAME);
                if (this.DB.SFX) {
                    this.healthAlarm.stop();
                }
            }else{
                if (!this.gameOver) this.scene.textTime.setText(textTimeLeft).setTint(0xff0000);
                if (!this.alarmON){                    
                    this.alarmON = true;
                    this.DB = store.get(GameConstants.DB.DBNAME);
                    if (this.DB.SFX) {
                        this.healthAlarm.play();
                    }
                }

                if (this.timeLeft == 0){ //If times up gameover
                    this.alarmON = false; 
                    this.healthAlarm.stop();
                    this.gameOver = true;
                    this.scene.gameOverText('timeOver');
                    this.emit(GameConstants.Events.GAME_OVER);            
                }
            }
        }
        
        let control = {
            left: this.cursor.left.isDown || this.WASDKeys.left.isDown  || this.animControl.left || ((this.gamepad !== null) ? this.gamepad.left : false),
            right: this.cursor.right.isDown || this.WASDKeys.right.isDown  || this.animControl.right || ((this.gamepad !== null) ? this.gamepad.right : false),
            jump: this.cursor.up.isDown || this.WASDKeys.up.isDown  || this.spacebar.isDown ||this.animControl.jump || ((this.gamepad !== null) ? this.gamepad.A : false),
            down: this.cursor.down.isDown || this.WASDKeys.down.isDown  || this.animControl.down || ((this.gamepad !== null) ? this.gamepad.down : false)
        }


        // Lógica de movimiento de Player
        // Nos permite hacer el salto con peso
        this.jumpTimer -= delta;

        //Call it if Player is not in the liana
        if (!this.isInLiana) {            
            if (control.down) {
                this.animation(GameConstants.Anims.Direction.DOWN, this.animDOWN);
                if (!this.jumping || this.body.blocked.down) {
                    this.run(((this.body.velocity.x > 0) ? -1 : 1) * this.acceleration + this.deceleration);
                    // this.run(0);
                } else {
                    this.run(0);
                }
            } else {
                if (control.left) {
                    this.moverLeftRight(GameConstants.Anims.Direction.LEFT);
                } else if (control.right) {
                    this.moverLeftRight(GameConstants.Anims.Direction.RIGHT);
                } else if (this.body.blocked.down) {
                    // Fricción con el suelo 

                    // Anima cuando player cae al suelo cuando cae Player
                    if (this.body.velocity.x > 5 && !this.jumping) {
                        this.animation(GameConstants.Anims.Direction.RIGHT, this.animWALK);
                    } else if (this.body.velocity.x < -5 && !this.jumping) {
                        this.animation(GameConstants.Anims.Direction.LEFT, this.animWALK);
                    }
                    if (Math.abs(this.body.velocity.x) < 140) {
                        // Detener por completo cuando la velocidad es menor de 10
                        this.animation(GameConstants.Anims.Direction.IDLE, this.animIDLE);
                        this.body.setVelocityX(0);
                        this.run(0);
                    } else {
                        this.run(((this.body.velocity.x > 0) ? -1 : 1) * this.acceleration + this.deceleration);
                    }
                } else if (!this.body.blocked.down) {
                    // Si está en el aire no se acelera más 
                    this.run(0);
                }

                if (control.jump && (!this.jumping || this.jumpTimer > 0)) {
                    this.jump();
                } else if (!control.jump) {
                    // Esto previene los saltos cuando se mantiene presionado
                    this.jumpTimer = -1;
                    if (this.body.blocked.down) {
                        this.jumping = false;
                    }
                }
            }

        } else {
            this.animation(GameConstants.Anims.Direction.CLIMB, this.animCLIMB);
            //Determines how Player is going to move in the liana
            
            /*Temp Disabled jumping betweens ladders

            if (control.jump && control.left) {
                this.x -= 20;
                this.body.setAllowGravity(true);
                this.body.setVelocityY(-this.jumpForce);
                this.jumping = true;
                this.body.velocity.x = -200;
                this.isInLiana = false;
            } else {
                if (control.jump && control.right) {
                    this.x += 20;
                    this.body.setAllowGravity(true);
                    this.body.setVelocityY(-this.jumpForce);
                    this.jumpTimer = 300;
                    this.jumping = true;
                    this.body.velocity.x = 200;
                    this.isInLiana = false;
                }
            }*/
            if (control.left) {
                this.x -= 20;
                this.body.setAllowGravity(true);                                                
                this.isInLiana = false;
            }
            if (control.right) {
                this.x += 20;
                this.body.setAllowGravity(true);                                                
                this.isInLiana = false;
            }
            if (control.jump) {
                this.body.velocity.y = -100;
            }
            if (control.down) {
                this.body.velocity.y = 100;
            }

        }
    }//update

    // Métodos usados en la lógica, están separado para mejor orden    
    moverLeftRight(dir) {
        let acceleration = ((dir === GameConstants.Anims.Direction.RIGHT) ? 1 : -1) * this.acceleration;
     
        this.run(acceleration);
        if (this.body.velocity.y === 0) {
            this.animation(dir, this.animWALK);
        }
        
        this.flipX = (dir === GameConstants.Anims.Direction.RIGHT);                        
    }

    jump() {
        this.DB = store.get(GameConstants.DB.DBNAME);
        if (!this.body.blocked.down && !this.jumping) {
            return void 0;
        }
        if (this.body.velocity.y < 0 || this.body.blocked.down) {
            this.body.setVelocityY(-this.jumpForce);
            if(this.DB.superPowers.lowGravity.status == "ON"){ //If lowGravity is "ON" jumps are slower (low gravity effect)
                this.body.setGravity(0, -400); //Lower values than -690 will disable gravity (Player never falls)
            } else {
                this.body.setGravity(0, 100);
            }
        }
        if (!this.jumping) {
            if(this.DB.superPowers.superJump.status == "OFF"){
                this.jumpTimer = 300;
            } else { //If superJump is "ON" jumps LOT higher
                this.jumpTimer = 600;
            }
            
        }
        this.jumping = true;

        // Animación de salto
        this.animation(GameConstants.Anims.Direction.JUMP, this.animIDLE);
    }

    run(velocity) {
        this.DB = store.get(GameConstants.DB.DBNAME);
        if(this.DB.superPowers.superSpeed.status == "OFF"){ //If superSpeed is not "OFF" can run a lot more 
            this.body.maxVelocity.x = 150;
        } else { //Watch out! It runs a LOT more!!
            this.body.maxVelocity.x = 450;
        }

        this.body.setAccelerationX(velocity);
    }

    animation(direction, animation) {
        if (direction === GameConstants.Anims.Direction.DOWN) {
                this.body.setSize(20, 25);
                this.body.setOffset(0, 15);
        } else {
                this.body.setSize(10, 40);
                this.body.setOffset(4, 0);                

        }
        
        if (this.prevAnimJump !== direction) {            
            this.anims.play(animation);
            if ((direction === GameConstants.Anims.Direction.JUMP) && (this.DB.SFX)){
                this.soundJump.play();
            }
        }
        this.prevAnimJump = direction;
    }

    /**
     * Decrease health when touch enemies
     */
    loseHealth() {
        this.DB = store.get(GameConstants.DB.DBNAME);
        //delete extra lifes if exists
        if (this.health>5){            
            let currentExtraLifes = parseInt(this.DB.extralifes);
            if (this.DB.extralifes>0){
                this.DB.extralifes = currentExtraLifes - 1;             
                store.set(GameConstants.DB.DBNAME, this.DB);
            }
        }
        this.health--;
        this.scene.textHealth.setText(this.scene.TG.tr('COMMONTEXT.LIVES') + this.health);
        if (this.health === 0) {
            //Turn alarm music off
            this.alarmON = false;
            this.healthAlarm.stop();            
            //gameOver
            this.scene.gameOverText('gameOver');
            this.gameOver = true;
            this.emit(GameConstants.Events.GAME_OVER);
        }else if (this.health == 1){
            //Turn alarm music on
            this.alarmON = true;
            if (this.DB.SFX) {
                this.healthAlarm.play();
            }
        }else{
            this.alarmON = false;
            this.healthAlarm.stop();   
        }

    }

    /**
     * Increase health when touch a Heart Object
     * 
     * Due to each time that happens, health will be higher than 1,
     * low-health warning music will always be forced to off
     */
    recoverHealth(group, object){

        this.DB = store.get(GameConstants.DB.DBNAME);
        //Make disapear the heart with Tween efect
        if (!this.hitHeart) {            

            //Increase player's score
            this.increaseScore(250);

            //update Player Health and TEXT
            this.health++;
            this.scene.textHealth.setText(this.scene.TG.tr('COMMONTEXT.LIVES') + this.health);      

            //Turn music low-health warning off
            if (this.alarmON){
                this.alarmON = false;
                this.healthAlarm.stop(); 
            }

            //Extralife sound
            if (this.DB.SFX) {
                this.lifePickup.play();
            }
            this.hitHeart = true;            

            this.scene.tweens.add({
                targets: object,
                y: object.y - 100,
                alpha: 0,
                duration: 800,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function(){
                    group.killAndHide(object);
                    group.remove(object);   
                    object.destroy();             
                }
            });

            this.scene.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.hitHeart = false;
                }
            });
        }
    }

    getSuperPower(group, object, superPowerKey) {
        //Make disapear the SuperPower with Tween efect
        if (!this.hitSuperPower) {

            //update DB data            
            this.DB = store.get(GameConstants.DB.DBNAME);
            this.DB.superPowers[superPowerKey].picked = true;
            store.set(GameConstants.DB.DBNAME, this.DB);

            //Emit event  Player --> BasicScene        
            //this.emit(GameConstants.Events.GETSUPERSPEED);
            this.emit(GameConstants.Events.GETSUPERPOWER, superPowerKey);

            
            //SuperPower sound
            if (this.DB.SFX) {
                this.superPowerPickup.play();
            }
            
            this.hitSuperPower = true;

            this.scene.tweens.add({
                targets: object,
                y: object.y - 100,
                alpha: 0,
                duration: 800,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function(){
                    group.killAndHide(object);
                    group.remove(object);   
                    object.destroy();             
                }
            });

            this.scene.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.hitSuperPower = false;                    
                }
            });
        }
    }

    getInventoryObject(group, object, objectKey) {
        //Make disapear the SuperPower with Tween efect
        if (!this.hitInventoryObject) {

            //update DB data
            this.DB = store.get(GameConstants.DB.DBNAME);
            this.DB.inventory[objectKey] = true;
            store.set(GameConstants.DB.DBNAME, this.DB);

            //SuperPower sound
            if (this.DB.SFX) {
                this.superPowerPickup.play();
            }
            
            this.hitInventoryObject = true;

            this.scene.tweens.add({
                targets: object,
                y: object.y - 100,
                alpha: 0,
                duration: 800,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function(){
                    //group.killAndHide(object);
                    //group.remove(object);   
                    object.destroy();             
                }
            });

            this.scene.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.hitInventoryObject = false;                    
                }
            });
        }
    }

    enemyCollision() { //If "invincibility" is ON, no function code executed (the player doesn't recive damage and no damage animation happens)
        this.DB = store.get(GameConstants.DB.DBNAME);
        if ((!this.hitDelay) && (this.DB.superPowers.invencibility.status == "OFF")) { 
            this.loseHealth();
            this.hitDelay = true;
            this.tint = 0xff9900;
            if (this.DB.SFX) {
                this.soundPlayerAuch.play();
            }
            if (this.scene) {
                this.scene.time.addEvent({
                    delay: 600,
                    callback: () => {
                        this.hitDelay = false;
                        this.tint = 0xffffff;
                    },
                    callbackScope: this
                });
            }
        }
    }    

    /**
     * Increase "levelScore" and update "levelScoreText" (From BasicScene)
     * @param {*} points = Points to increase
     */
    increaseScore(points){
        this.levelScore += points;
        this.scene.levelScoreText.setText(Phaser.Utils.String.Pad(this.levelScore, 6, '0', 1));
    }

    nextScene() {
        this.emit(GameConstants.Events.LEVEL_FINISHED);
    }


    collectTime(group, object){

        if (!this.hitTime) {            
            if (this.DB.SFX) {
                this.timePickup.play();
            }

            this.hitTime = true;
            this.timeLeft+=30;               
            
            this.scene.tweens.add({
                targets: object,
                y: object.y - 100,
                alpha: 0,
                duration: 800,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function(){
                    group.killAndHide(object);
                    group.remove(object);   
                    object.destroy();             
                }
            });

            this.scene.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.hitTime = false;
                }
            });
        }
    }

    collectExtraPoints(group, object){

        if (!this.hitCoin) {            
            if (this.DB.SFX) {
                this.coinpickup.play(); 
            }
            
            this.hitCoin = true;
            this.extraPoints+=50;   
            this.increaseScore(50);
            
            this.scene.tweens.add({
                targets: object,
                y: object.y - 100,
                alpha: 0,
                duration: 800,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function(){
                    group.killAndHide(object);
                    group.remove(object);   
                    object.destroy();             
                }
            });

            this.scene.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.hitCoin = false;
                }
            });
        }
    }

    collectCollectables(group, object){

        if (!this.hitCollectable) {
            if (this.DB.SFX) {
                this.collectablepickup.play();
            }

            this.hitCollectable = true;                       
            this.collectablesCollected--;    
            this.scene.collectablesCounterText.setText(this.collectablesCollected);

            this.scene.tweens.add({
                targets: object,
                y: object.y - 100,
                alpha: 0,
                duration: 800,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function(){
                    group.killAndHide(object);
                    group.remove(object);   
                    object.destroy();             
                }
            });

            this.scene.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.hitCollectable = false;                    
                }
            });
        }
    }

}
export default Player;