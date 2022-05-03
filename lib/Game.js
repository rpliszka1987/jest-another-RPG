const inquirer = require('inquirer');
const Enemy = require('./Enemy.js');
const Player = require('./Player.js');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;

};

Game.prototype.initializeGame = function () {
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));

    this.currentEnemy = this.enemies[0];

    inquirer 
        .prompt({
            type: 'text',
            name: 'name',
            message: 'Whar is your name?'
        })
        // destructure name from the prompt object
        .then(({name}) => {
            this.player = new Player(name);

            // start the fight
            this.startNewBattle();
        });
};

Game.prototype.startNewBattle = function () {
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }

    console.log('Your ststs are as follows:');
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());

    // start the battle
    this.battle();

};

Game.prototype.battle = function() {
    if (this.isPlayerTurn) {
        inquirer
         .prompt({
             type: 'list',
             message: 'What would you like to do?',
             name: 'action',
             choices: ['Attack', 'Use potion']
         })
         .then(({action}) => {
            if (action === 'Use potion') {
                if (!this.player.getInventory()) {
                    console.log("You don't have any potions!");
                    return;
                }

                inquirer
                    .prompt({
                        type: 'list',
                        message: 'Which potion would you like to use?',
                        name: 'action',
                        // We add 1 to index so user doesnt see 0 as arrays are 0 based
                        choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                    })
                    .then(({action}) => {
                        const potionDetails = action.split(': ');
                        console.log(potionDetails);

                        // We subtract 1 to get the index value which we added before
                        this.player.usePotion(potionDetails[0] - 1);
                        console.log(`You used a ${potionDetails[1]} potion.`)
                    });
            } else {
                const damage = this.player.getAttackValue();
                this.currentEnemy.reduceHealth(damage);

                console.log(`You attacked the ${this.currentEnemy.name}`);
                console.log(this.currentEnemy.getHealth());
            }
         });
    } else {
        const damage = this.currentEnemy.getAttackValue();
        thid.player.reduceHealth(damage);

        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
    }
};

module.exports = Game;