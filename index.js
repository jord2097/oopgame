class Room {
    constructor(name, description, requirement, failText, item){
        this._name = name;
        this._description = description;
        this._requirement = requirement // item name for keys, defeat a certain enemy etc
        this._linkedRooms = {};
        this._failText = failText;
        this._item = item
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
    constructor(health, stamina, strength, inventory = [], weapon){
        this._health = health
        this._stamina = stamina
        this._strength = strength
        this._inventory = inventory
        this.weapon = weapon
    }

    get health(){
        return this._health
    }

    get stamina(){
        return this._stamina
    }

    get strength(){
        return this._strength
    }

    get inventory(){
        return this._inventory
    }

    addItems(item){
        this._inventory = this._inventory.concat(item);
        return this._items;
    }
}

class Character {
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

    

}

class Enemy extends Character{
    constructor(name, description, conversation, item, physWeakness, pwMultiplier, health, stamina){
        super(name, description, conversation)
        this._item = item
        this._physWeakness = physWeakness
        this._pwMultiplier = pwMultiplier // how much damage increases if enemy is weak to attack
        this._health = health
        this._stamina = stamina
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

class Weapon {
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
    
    // function to attack using weapon

} // choice of weapon at start

const mainHall = new Room("Main Hall", "This is a large but dingy entrance area with flickering lights and an ominous presence. There are many directions to go, but you wonder how easy it might be to get lost.", null, null, "Blue Key")
const mainHallUpper = new Room("Main Hall Upper Area", "After going up the stairs, you are now on the landing of the 1st floor. There's not much to see up here, except a collection of abstract paintings and a door on each end.", null, null, )
const diningRoom = new Room("Dining Room", "Plenty of scran was eaten here.")

mainHall.linkRoom("upstairs", mainHallUpper)
mainHall.linkRoom("west", diningRoom)
diningRoom.linkRoom("east", mainHall)
mainHallUpper.linkRoom("downstairs", mainHall)

const claymore = new Weapon("Claymore","A Scottish two-handed medieval sword.","greatsword", "swing")
const battleaxe = new Weapon("Battle Axe", "A two-handed axe specifically designed for combat.", "swing")
const pike = new Weapon("Pike", "A long pole-like spear that is wielded two-handed", "thrust")
const twindaggers = new Weapon("Twin Daggers", "Two short daggers that aim for speed over damage.", "slash")
const weapons = [claymore, battleaxe, pike, twindaggers]

function display(room){
    const textContent = room.describe();
    document.getElementById("textArea").innerHTML = textContent
    document.getElementById("userInput").focus();
}

function startGame(){
    currentRoom = mainHall;
    display(currentRoom)
    let currWeapon = 0

      
    

    document.addEventListener("keydown", function (event){
        if(event.key === "Enter"){
            const command = document.getElementById("userInput").value.toLowerCase();
            const direction = ["north", "east", "south", "west", "upstairs", "downstairs", "in", "out"]
            if(direction.includes(command)){
                currentRoom = currentRoom.move(command)
                console.log(currentRoom)
                display(currentRoom)
                document.getElementById("userInput").value = ""                
            } else {
                document.getElementById("userInput").value = ""
                alert("Not a valid command")
            }
        }
    })
}

function initDisplay(){
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
                Hero.weapon = weapons[command - 1]
                console.log(Hero.weapon)
                document.getElementById("userInput").value = ""
                document.getElementById("weaponChoice1").style.display = "none";
                document.getElementById("weaponChoice2").style.display = "none";
                document.getElementById("weaponChoice3").style.display = "none";
                document.getElementById("weaponChoice4").style.display = "none";
                startGame()
            } else {
                document.getElementById("userInput").value = ""
                alert("Not a valid choice.")

            }
        }
    })

    



}

initDisplay()