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
});

