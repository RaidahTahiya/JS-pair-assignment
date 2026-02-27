window.addEventListener("load",function(){
    let pizzaCount=0;
    let PizzaPerClick=1;
    let coins=0;

    let upgrades ={
        oven: {count:0, cost:1000, clickBoost:1},
        chef: {count:0, cost:2000, clickBoost:5},
        extracheese: {count:0, cost:500, clickBoost:10},
        specialsauce: {count:0, cost:200, autoclick:1000}
    };
    let atuoClickInterval=null;

    const pizzaImg= document.getElementById("pizza");
    const pizzaCountEl= document.getElementById("pizza-count");
    const coinsEl= document.querySelector("#coins h2");

    pizzaImg.addEventListener("click",()=>{
        pizzaCount+=PizzaPerClick;
        coins+=PizzaPerClick;
        updateDisplay();
        checkRewards();
    });
    function updateDisplay(){
        pizzaCountEl.innerText=pizzaCount;
        coinsEl.innerText=coins.toFixed(2);
    };
    
    const upgradeButtons = document.querySelectorAll(".updatebox input")

    for(let i = 0; i< upgradeButtons.length; i++){
        let button=upgradeButtons[i];

        button.addEventListener("click",() =>{
            const id = button.id;
            const upgrade = upgrades[id];

            if(coins>=upgrade.cost){
                coins-=upgrade.cost;
                upgrade.count+=1;
            
            if(upgrade.clickBoost){
                pizzaPerClick+=upgrade.clickBoost;
            }
            if(upgrade.autoClick){
                if(autoClickInterval) clearInterval(autoClickInterval);

                let intervalTime = Math.max(200, upgrade.autoClick - (upgrade.count -1) * 100);

                autoClickInterval= setInterval;(()=>{
                    pizzaCount+=pizzaPerClick;
                    coins+=pizzaPerClick;
                    updateDisplay();
                },intervalTime);
            }
            upgrade.cost=Math.floor(upgrade.cost * 1.5);

            button.nextElementSibling.querySelector("p").innerText='Cost:${upgrade.cost}';
            button.nextElementSibling.nextElementSibling.querySelector("h2").innerText=upgrade.count;

            updateDisplay();
            }
        });
    }

    let hatDone = false;
    let trophyDone = false;
    let bronzeDone = false;
    let silverDone = false;
    let restDone = false;

    function checkRewards() {
        if (!hatDone && pizzaCount >= 50) {
            hatDone = true;
            unlockReward("hat");
            message();
        }
        if (!trophyDone && pizzaCount >= 100) {
            trophyDone = true;
            unlockReward("trophy1");
            message();
        }
        if (!bronzeDone && pizzaCount >= 400) {
            bronzeDone = true;
            unlockReward("trophy2");
            message();
        }
        if (!silverDone && pizzaCount >= 1000) {
            silverDone = true;
            unlockReward("trophy3");
            message();
        }
        if (!restDone && pizzaCount >= 2000) {
            restDone = true;
            unlockReward("trophy4");
            message();
        }
    }

   function message() {

        const msg = document.getElementById("rewardmsg");
        msg.style.display = "flex";

        setTimeout(function () {
            msg.style.display = "none";
        }, 3000);

    }

    function unlockReward(imgId, text) {

        const img = document.getElementById(imgId);
        img.classList.add("unlocked");

    }

});
