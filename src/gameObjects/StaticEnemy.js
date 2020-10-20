class StaticEnemy extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, children, spriteArray) {
        super(world, scene, children);
        // create our enemies from the sprite array
        this.createEnemies(scene, spriteArray);
        this.startEnemies();
    }

    createEnemies(scene, spriteArray) {
        spriteArray.map((sprite) => {
            this.add(sprite);            
        });
    }

    startEnemies() {                
        this.scene.physics.world.enable(this.children.entries);
        
        for (let i=0; i<this.children.entries.length; i++){            
            var  enemy = this.children.entries[i];             
            enemy.body.setAllowGravity(false);
            enemy.setScale(1.5);            
            enemy.body.setSize(16, 32);
            //enemy.setOrigin(0,0);
            enemy.setDepth(1);                        
        }        
    }

    update() {     
    }    

    
}

export default StaticEnemy;