
// var health = 100;
// var charName = "Bald Bull";
// var hits = 0

// See if you can convert this to use a constructor for a Target/Character/Player
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

// This could also be a dictionary of items(similar to the attacks objects on baldBull), but it will function just fine as is.
// This could be desirable as an array indexs may not stay the same while you manipulate data on them where as an object you 
// will know the associated index(property name).
var items = [
    {
        name: 'Hype Up',
        modifier: 2,
        description: 'you are getting Hyped',
        amount: 1,
    },
    {
        name: 'Star',
        modifier: 3,
        description: 'Power up!',
        amount: 1,
    },
    {
        name: 'brass Knuckles',
        modifier: 3,
        description: 'Very Illegal',
        amount: 1,
    }
]

// I like the amount property added to items that you utilize in this function to limit the items given.
function giveItem(num) {
    if (items[num].amount > 0) {
        baldBull.items.push(items[num]);
        items[num].amount--;
        drawItems(items);
        drawItemGui(items[num].name);
    }
}



function addMods() {
    var mod = 1
    for (var i = 0; i < baldBull.items.length; i++) {
        mod = mod * baldBull.items[i].modifier;
        console.log(mod);
    }
    return mod;
}


// Moving this functionality out of update is a good move to keep your functions cleaner
function koCheck() {
    updateBar(baldBull.health);
    if (baldBull.health <= 0) {
        console.log('KOED')
        baldBull.ko = true
        document.getElementById('target').innerHTML = `<img src="assets/pictures/tko.jpg" alt="">`
    }
    if (baldBull.health > 0 && baldBull.ko) {
        document.getElementById('target').innerHTML = `<img src="assets/pictures/baldbull.jpg" alt="">`
        baldBull.ko = false;
    }
}

//All of these functions are doing the same thing essentially except for which attack they are referencing. You could
// combine them into one function attack(attackName) EX: attack("jab") and then line 87 would use the name the 
// function takes in to reference the specific attack. Removes 2 functions that are the same.
function jab() {
// function attack(attackName) {
    if (!baldBull.ko) {
        // baldBull.health -= (baldBull.attacks[attackName] * addMods());        
        baldBull.health -= (baldBull.attacks.jab * addMods());
        baldBull.hits++;
        // updateBar(baldBull.health);
        update();
        koCheck()
    }
};

function hook() {
    if (!baldBull.ko) {
        console.log('checked ko')
        baldBull.health -= (baldBull.attacks.hook * addMods());
        baldBull.hits++;
        // updateBar(baldBull.health);
        update();
        koCheck()
    }
};

function special() {
    if (!baldBull.ko) {
        baldBull.health -= (baldBull.attacks.special * addMods());
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
    if (baldBull.health > 0) {
        elemHealth.innerText = baldBull.health + '';
    } else {
        elemHealth.innerText = '0'
    }

};

// Good ideato have visuals to let your player know what is equipped
function drawItemGui(x) {
    var template = ""
    var elemX = document.getElementById('itemgui');
    template += ` ${x},`;
    elemX.innerText += template;

}

function resetItemGui() {
    var template = "using:"
    var elemX = document.getElementById('itemgui');

    elemX.innerText = template;
}
function drawItems(arr) {
    var elemItem = document.getElementById('itemButtons')
    var template = ''
    for (var i = 0; i < arr.length; i++) {
        if (items[i].amount > 0) {
            template += `<button class = "btn btn-warning" onclick="giveItem(${i})">${arr[i].name} : 1</button>`
        }
    }
    elemItem.innerHTML = template

}

function updateBar(percent) {
    var elemBar = document.getElementById('healthBar');
    if (percent > 0) {
        elemBar.style.width = percent + '%';
    }
    if (percent <= 0) {
        elemBar.style.width = '0%';
    }
}

// Good use of multiple functions being utilized by a manager function.
function resetGame() {
    baldBull.health = 100;
    baldBull.hits = 0;
    baldBull.items = [];

    for (let i = 0; i < items.length; i++) {
        items[i].amount = 1;
    }
    resetItemGui();
    drawItems(items);
    update();
    updateBar(baldBull.health);
    koCheck();
}

drawItems(items);
update();
