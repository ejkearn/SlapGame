
// var health = 100;
// var charName = "Bald Bull";
// var hits = 0
var baldBull = {
    name: 'Bald Bull',
    health: 100,
    attacks: {
        jab: 1,
        hook: 5,
        special: 10,

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
    {   name: 'Hype Up',
        modifier: 2,
        description: 'you are getting Hyped',
        amount: 1,
    },
    {   name: 'Star',
        modifier: 3,
        description: 'Power up!',
        amount: 1,
    },
    {   name: 'brass Knuckles',
        modifier: 3,
        description: 'Very Illegal',
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
    updateBar(baldBull.health);
    if (baldBull.health <= 0){
        console.log('KOED')
        baldBull.ko = true
        document.getElementById('target').innerHTML = `<img src="assets/pictures/tko.jpg" alt="">`
    }
    if (baldBull.health > 0 && baldBull.ko){
        document.getElementById('target').innerHTML = `<img src="assets/pictures/baldbull.jpg" alt="">`
        baldBull.ko = false;
    }
}

function jab() {
    if (!baldBull.ko){
    baldBull.health -=(baldBull.attacks.jab * addMods()) ;
    baldBull.hits++;
    // updateBar(baldBull.health);
    update();
    koCheck()
}
};

function hook() {
    if (!baldBull.ko){
        console.log('checked ko')
    baldBull.health -=(baldBull.attacks.hook * addMods()) ;
    baldBull.hits++;
    // updateBar(baldBull.health);
    update();
    koCheck()
}
};

function special() {
    if (!baldBull.ko){
    baldBull.health -=(baldBull.attacks.special * addMods()) ;
    baldBull.hits++;
    // updateBar(baldBull.health);
    update();
    koCheck();
}
};


function update() {
    var elemName = document.getElementById('charName');
    var elemHits = document.getElementById('hits');
    var elemHealth = document.getElementById('health');

    elemName.innerText = baldBull.name;
    elemHits.innerText = baldBull.hits + '';
    if (baldBull.health > 0){
    elemHealth.innerText = baldBull.health + '';
}else {
    elemHealth.innerText = '0'
}

};

function drawItems(arr){
    var elemItem = document.getElementById('itemButtons')
   var template= ''
    for (var i=0; i< arr.length; i++){
        if(items[i].amount>0){
            template +=`<button class = "btn btn-warning" onclick="giveItem(${i})">${arr[i].name}</button>`
        }
    }
    elemItem.innerHTML = template

}

function updateBar (percent){
    var elemBar = document.getElementById('healthBar');
    if (percent>0){
    elemBar.style.width = percent + '%';
}
if (percent <= 0){
    elemBar.style.width ='0%';
}
}

function resetGame(){
    baldBull.health = 100;
    baldBull.hits = 0;
    baldBull.items = [];

    for (let i=0; i<items.length; i++)    {
        items[i].amount = 1;
    }
    drawItems(items);
    update();
    updateBar(baldBull.health);
    koCheck();
}

drawItems(items);
update();