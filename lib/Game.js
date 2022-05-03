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
    this.Battle();

};

module.exports = Game;