class Room {
    constructor(name, description){
        this._name = name;
        this._description = description;
        //this._requirement = requirement // item name for keys, defeat a certain enemy etc
        this._linkedRooms = {};        
    }

    get name(){
        return this._name;        
    }

    get description(){
        return this._description;
    }

    get requirement(){
        return this._requirement;
    }

    get failText(){
        return this._failText;
    }

    get item(){
        return this._item;
    }

    set name(value){
        if (value.length < 4) {
            console.log("name too short");
            return;
        }
        this._name = value;
    }

    describe(){
        return "You are currently in the " + this._name + ". " + this._description;
    }

    linkRoom(direction, room){
        this._linkedRooms[direction] = room;        
    }    

    move(direction){
            if (direction in this._linkedRooms) {
                return this._linkedRooms[direction];
            } else {
                alert("You can't go that way");
                return this;
            }
    }
           

}

class Hero {
    constructor(health, maxHealth, attack, inventory = [], weapon, gold){
        this._health = health
        this._maxHealth = maxHealth
        this._attack = attack
        this._inventory = inventory
        this._weapon = weapon
        this._gold = gold 
    }

    get health(){
        return this._health
    }

    get maxHealth(){
        return this._maxHealth
    }

    get attack(){
        return this._attack
    }

    get inventory(){
        return this._inventory
    }

    get weapon(){
        return this._weapon
    }

    set weapon(name){
        this._weapon = name
    }

    addItems(item){
        this._inventory = this._inventory.concat(item);
        return this._items;
    }
    
}

/* class Character {
    constructor(name, description, conversation) {
        this._name = name;
        this._description = description;
        this._conversation = conversation;
    }

    get name(){
        return this._name;
    }

    get description(){
        return this._description;        
    }

    get conversation(){
        return this._conversation;
    }

    set name(value) {
        if (value.length < 4) {
            console.log("name is too short")
            return;
        }
        this._name = value;       
    }

    talk() {
        return this._name + " says " + this._conversation
    }
    
    describe() {
        return "You can see " + this._name + " they are " + this._description;
    }

    

} */

class Enemy extends Hero{
    constructor(name, description, health, maxHealth, attack, goldgain){
        super(health, maxHealth, attack)
        this._name = name
        this._description = description
        this._goldgain = goldgain

    }

    get item(){
        return this._item
    }

    get physWeakness(){
        return this._physWeakness
    }

    get pwMultiplier(){
        return this._pwMultiplier
    }
    
    get health() {
        return this._health
    }

    get stamina() {
        return this._stamina
    }

    
    
}

/* class Weapon {
    constructor(name, description, attackType){
        this._name = name
        this._description = description
        // this._weaponClass = weaponClass // axes, light/heavy swords, fists
        this._attackType = attackType // slash, swing
        // this._baseDmg = baseDmg // base damage value that is manipulated based on enemy
    }

    describe(){
        return this._name + ". " + this._description;
    }
    
    
}  */

const heroIG = new Hero(100, 100, 20, [], null, 0 )
const Undead = new Enemy("Zombie", "Once a human, this undead creature must have succumbed to some kind of virus.", 50, 50, 10, 50)
const UndeadDog = new Enemy("Zombie Dog", "This dog is infected much like the zombies, but you wonder whether it was subjected to the virus on purpose.", 25, 25, 12, 40)
const PoisonUndead = new Enemy("Poison Zombie", "This zombie seems to have mutated beyond the infection, as it is spewing out a cloud of toxic gas.", 35, 35, 18, 60)
const Wendigo = new Enemy("Wendigo", "An evil spirit with a heart of ice. Good luck defeating this one.", 500, 500, 50, 1000)
// const BurningBoss = new Enemy ("Burning Zombie", "This zombie is engulfed in flames, although it seems to be able to survive the pain. Don't let it get too close! ", 20, 20, 15, 100)

const mainHall = new Room("Main Hall", "This is a large but dingy entrance area with flickering lights and an ominous presence. There are many directions to go, but you wonder how easy it might be to get lost.")
const mainHallUpper = new Room("Main Hall Upper Area", "After going up the stairs, you are now on the landing of the 1st floor. There's not much to see up here, except a collection of abstract paintings and a door on each end.")
const diningRoom = new Room("Dining Room", "Plenty of candlelit dinners were eaten here.")
const Kitchen = new Room("Kitchen", "A large kitchen with many cupboards to hide in.")
const Bedroom = new Room("Master Bedroom", "A gigantic bedroom filled with luxurious decorations.")
const Bathroom = new Room("Bathroom", "A disgusting toilet, this hasn't been cleaned in years.")

mainHall.linkRoom("upstairs", mainHallUpper)
mainHall.linkRoom("west", diningRoom)
mainHall.linkRoom("east", Kitchen)
Kitchen.linkRoom("west", mainHall)
diningRoom.linkRoom("east", mainHall)
mainHallUpper.linkRoom("downstairs", mainHall)
mainHallUpper.linkRoom("west", Bedroom)
mainHallUpper.linkRoom("east", mainHallUpper)
Bedroom.linkRoom("east", mainHallUpper)
Bathroom.linkRoom("west", mainHallUpper)

/* const sword = new Weapon("Claymore","A Scottish two-handed medieval sword.","greatsword", "swing")
const battleaxe = new Weapon("Battle Axe", "A two-handed axe specifically designed for combat.", "swing")
const pike = new Weapon("Pike", "A long pole-like spear that is wielded two-handed", "thrust")
const daggers = new Weapon("Twin Daggers", "Two short daggers that aim for speed over damage.", "slash")
const weapons = [sword, battleaxe, pike, daggers] */

function display(room){
    const textContent = room.describe();
    document.getElementById("textArea").innerHTML = textContent
    document.getElementById("userInput").focus();
} // displays description of current room

function startGame(){
    document.getElementById("fightInput").style.display = "none"
    currentRoom = mainHall;
    display(currentRoom)   
    roomListener()
} // establishes start point

function roomListener(){
    document.addEventListener("keydown", function (event){
        if(event.key === "Enter"){
            const command = document.getElementById("userInput").value.toLowerCase();
            const direction = ["north", "east", "south", "west", "upstairs", "downstairs", "in", "out"]
            if(direction.includes(command)){
                currentRoom = currentRoom.move(command)
                console.log(currentRoom)
                display(currentRoom)
                preFight()
                document.getElementById("userInput").value = ""                
            } else {
                document.getElementById("userInput").value = ""
                alert("Not a valid command")
            }
        }
    })
} // listens for room change commands

function preFight(){
    const enemies = [
        {name: "null", pct: 45},
        {name: "Undead", const: Undead, pct: 25},
        {name: "UndeadDog", const: UndeadDog, pct: 15},
        {name: "PoisonUndead", const: PoisonUndead, pct: 10},
        {name: "Wendigo", const: Wendigo, pct: 5}
    ];
    const expanded = enemies.flatMap(enemy => Array(enemy.pct).fill(enemy))
    const winner = expanded[Math.floor(Math.random() * expanded.length)];
    console.log("Enemy Found: " + winner.name)
    // call fight function on const on winner    
    if (winner.name != "null" ){
        fight(winner.const)

    } 

} // randomly spawns enemy based on percentage chance

function fight(enemyPresent){
    document.getElementById("fightInfo").innerHTML = "Upon entering this room you have encountered a " + enemyPresent._name + ". " + enemyPresent._description
    document.getElementById("fightStatus").innerHTML = "Your Health: " + heroIG._health + "/" + heroIG._maxHealth + " Enemy Health: " + enemyPresent._health + "/" + enemyPresent._maxHealth
    document.getElementById("fightOptions").innerHTML = "Your options: <br> 1: Attack for an average of " + heroIG._attack + " damage. <br> 2: Run"
    document.getElementById("userInput").style.display = "none"
    document.getElementById("fightInput").style.display = "block"
    document.addEventListener("keydown", function (event){
        if (event.key === "Enter"){
            const command = parseInt(document.getElementById("fightInput").value)            
            if(command === 1){
                attack(enemyPresent)
            } else if (command === 2){
                document.getElementById("userInput").style.display = "block"
                document.getElementById("fightInput").style.display = "none"
                document.getElementById("fightInfo").innerHTML = "You chose to run, type the direction you want to run."

            }
        }
    })



} // begins confrontation with enemy, option to run or attack

function attack(enemyPresent){
    const pAttack = [
        {name: "normal attack", attack: heroIG._attack, pct: 70},
        {name: "missed attack", attack: heroIG._attack / 2, pct: 25},
        {name: "critical attack", attack: heroIG._attack * 1.5, pct: 5}        
    ]
    const expanded = pAttack.flatMap(user => Array(user.pct).fill(user))
    const winner = expanded[Math.floor(Math.random() * expanded.length)]
    const pAttackRandom = winner.attack
    console.log(enemyPresent._health)

    enemyPresent._health -= pAttackRandom
    heroIG._health -= enemyPresent._attack    
    
    document.getElementById("fightDamage").innerHTML = "You did " + winner.attack + " damage to the " + enemyPresent._name + "! In return the enemy has done " + enemyPresent._attack + " damage to you."
    document.getElementById("fightStatus").innerHTML = "Your Health: " + heroIG._health + "/" + heroIG._maxHealth + " Enemy Health: " + enemyPresent._health + "/" + enemyPresent._maxHealth

    if (enemyPresent._health <= 0){
        heroIG._gold += enemyPresent._goldgain;
        document.getElementById("fightDamage").innerHTML = "You killed the " + enemyPresent._name + "! As a result you got " + enemyPresent._goldgain + " gold!" + " Now you can move to another room safely."
        document.getElementById("fightInput").style.display = "none"
        document.getElementById("userInput").style.display = "block"
        if(heroIG._gold >= 200){
            gameWon()
        }


        
    }    
    if (heroIG._health <= 0){
        gameOver()
    }
} // combat system with varying damage

function gameOver(){
    document.getElementById("fightDamage").innerHTML = "You have been defeated by the enemy! You must refresh to try again."
}

function gameWon(){
    document.getElementById("fightDamage").innerHTML = "You have successfully gained over 200 gold after defeating the enemy. You win!"
}

/* function weaponChoice(){
    document.getElementById("textArea").innerHTML = "You wake up outside an ominous mansion with no civilisation around. You see a bundle of weapons on the ground, you will need one if you are to enter this house. Your options are:"
    document.getElementById("weaponChoice1").innerHTML = "1: " + claymore.describe()
    document.getElementById("weaponChoice2").innerHTML = "2: " + battleaxe.describe()
    document.getElementById("weaponChoice3").innerHTML = "3: " + pike.describe()
    document.getElementById("weaponChoice4").innerHTML = "4: " + twindaggers.describe()
       

    document.addEventListener("keydown", function (event){
        if(event.key === "Enter"){
            const command = parseInt(document.getElementById("userInput").value);
            const values = [0,1,2,3]
            if(values.includes(command)){
                heroIG.weapon = weapons[command - 1]
                console.log(heroIG.weapon)
                document.getElementById("userInput").value = ""
                document.getElementById("weaponChoice1").style.display = "none";
                document.getElementById("weaponChoice2").style.display = "none";
                document.getElementById("weaponChoice3").style.display = "none";
                document.getElementById("weaponChoice4").style.display = "none";                
                startGame()
                return;
            } else {
                document.getElementById("userInput").value = ""
                alert("Not a valid choice.")

            }
            return;
        }
    }, {once: true})

    



}

initDisplay() */
// gave user a choice of weapons


startGame()




