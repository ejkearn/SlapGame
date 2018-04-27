
// var health = 100;
// var charName = "Bald Bull";
// var hits = 0
var baldBull = {
    name: 'Bald Bull',
    health: 100,
    attacks: {
        slap: 1,
        punch: 5,
        kick: 10,

    },
    mobility: 50,
    hits: 0,
    items: [],
    ko: false,
}

// var item = function (name, modifier, description) {
//     this.name = name;
//     this.modifier = modifier;
//     this, description = description;

// }

// var items = {
//     shield: new item('shield', .5, 'Great Blocker!'),
//     sword: new item('sword', 2, 'sharp sword'),
//     nuke: new item('nuke', 500, 'please dont use...')
// }

var items = [
    {   name: 'shield',
        modifier: .5,
        description: 'Great Blocker',
        amount: 1,
    },
    {   name: 'sword',
        modifier: 2,
        description: 'sharp sword',
        amount: 1,
    },
    {   name: 'hammer',
        modifier: 3,
        description: 'like mario had.',
        amount: 1,
    }
]

function giveItem(num) {
    if(items[num].amount>0){
    baldBull.items.push(items[num]);
    items[num].amount--;
    drawItems(items);
    }
}

// function giveShield() {
//     baldBull.items.push(items.shield);
// }

// function giveSword() {
//     baldBull.items.push(items.sword);
// }

// function giveNuke() {
//     baldBull.items.push(items.nuke);
// }

function addMods(){
    var mod = 1
    for (var i=0; i<baldBull.items.length; i++){
mod = mod * baldBull.items[i].modifier;
console.log(mod);
    }
    return mod;
}

function koCheck(){
    if (baldBull.health <= 0){
        console.log('KOED')
        baldBull.ko = true
        document.getElementById('target').innerHTML = `<img src="assets/pictures/tko.jpg" alt="">`
    }
}

function slap() {
    if (!baldBull.ko){
    baldBull.health -=(baldBull.attacks.slap * addMods()) ;
    baldBull.hits++;
    update();
    koCheck()
}
};

function punch() {
    if (!baldBull.ko){
        console.log('checked ko')
    baldBull.health -=(baldBull.attacks.punch * addMods()) ;
    baldBull.hits++;
    update();
    koCheck()
}
};

function kick() {
    if (!baldBull.ko){
    baldBull.health -=(baldBull.attacks.kick * addMods()) ;
    baldBull.hits++;
    update();
    koCheck()
}
};


function update() {
    var elemName = document.getElementById('charName');
    var elemHits = document.getElementById('hits');
    var elemHealth = document.getElementById('health');

    elemName.innerText = baldBull.name;
    elemHits.innerText = baldBull.hits + '';
    elemHealth.innerText = baldBull.health + '';


};

function drawItems(arr){
    var elemItem = document.getElementById('itemButtons')
   var template= ''
    for (var i=0; i< arr.length; i++){
        if(items[i].amount>0){
            template +=`<button onclick="giveItem(${i})">${arr[i].name}</button>`
        }
    }
    elemItem.innerHTML = template

}

drawItems(items);
update();