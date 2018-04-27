
var health = 100;
var charName = "Bald Bull";
var hits = 0


function slap(){
    health = health - 1;
    hits ++;
    update();
};

function punch(){
    health = health - 5;
    hits ++;
    update();
};

function kick(){
    health = health - 10;
    hits++;
    update();
};


function update(){
var elemName = document.getElementById('charName');
var elemHits = document.getElementById('hits');
var elemHealth = document.getElementById('health');

elemName.innerText = charName;
elemHits.innerText = hits;
elemHealth.innerText = health;


};

update();