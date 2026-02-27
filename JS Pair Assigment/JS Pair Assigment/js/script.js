window.addEventListener("load", function () {

    // MODEL
    let pizzaCount = 0;
    let pizzaPerClick = 1;
    let totalPizzaEver = 0;
    let coins = 0;

    let upgrades = {
        oven: { count: 0, cost: 100, clickBoost: 1 },
        chef: { count: 0, cost: 300, clickBoost: 5 },
        extracheese: { count: 0, cost: 150, clickBoost: 3 },
        specialsauce: { count: 0, cost: 200, autoclick: 800 }
    };

    let autoClickInterval = null;

    // VIEW ELEMENTS
    const pizzaImg = document.getElementById("pizza");
    const pizzaCountEl = document.getElementById("pizza-count");
    const coinsEl = document.querySelector("#coins h2");
    const clickValueEl = document.getElementById("click-value");
    const totalPizzaEl = document.getElementById("total-pizza");
    const rewardMsgEl = document.getElementById("rewardmsg");
    const helpPanel = document.getElementById("help-panel");
    const helpBtn = document.getElementById("help-btn");
    const helpClose = document.getElementById("help-close");

    // CLICK HANDLER
    pizzaImg.addEventListener("click", () => {
        pizzaCount += pizzaPerClick;
        coins += pizzaPerClick;
        totalPizzaEver += pizzaPerClick;
        updateDisplay();
        checkRewards();
    });

    // UPDATE DISPLAY
    function updateDisplay() {
        pizzaCountEl.innerText = pizzaCount;
        coinsEl.innerText = coins;
        clickValueEl.innerText = pizzaPerClick;
        totalPizzaEl.innerText = totalPizzaEver;

        for (let key in upgrades) {
            let upg = upgrades[key];
            let costEl = document.getElementById("cost-" + key);
            let countEl = document.getElementById("count-" + key);
            if (costEl) costEl.innerText = "Cost: " + upg.cost;
            if (countEl) countEl.innerText = upg.count;
        }
    }

    // UPGRADE BUTTONS
    const upgradeButtons = document.querySelectorAll(".updatebox input");
    for (let i = 0; i < upgradeButtons.length; i++) {
        let button = upgradeButtons[i];
        button.addEventListener("click", () => {
            const id = button.dataset.upgrade;
            const upgrade = upgrades[id];
            if (!upgrade) return;

            if (coins >= upgrade.cost) {
                coins -= upgrade.cost;
                upgrade.count += 1;

                if (upgrade.clickBoost) {
                    pizzaPerClick += upgrade.clickBoost;
                }

                if (upgrade.autoclick !== undefined) {
                    if (autoClickInterval) clearInterval(autoClickInterval);
                    let intervalTime = Math.max(100, upgrade.autoclick - (upgrade.count - 1) * 100);
                    autoClickInterval = setInterval(() => {
                        pizzaCount += pizzaPerClick;
                        coins += pizzaPerClick;
                        totalPizzaEver += pizzaPerClick;
                        updateDisplay();
                        checkRewards();
                    }, intervalTime);
                }

                upgrade.cost = Math.floor(upgrade.cost * 1.5);
                checkUpgradeReward();
                updateDisplay();
            } else {
                button.classList.add("cant-afford");
                setTimeout(() => button.classList.remove("cant-afford"), 500);
            }
        });
    }

    // REWARDS
    let rewards = {
        hat:          { done: false, threshold: 50,   id: "hat",          msg: "First Slice! 🍕 50 pizzas!" },
        trophy1:      { done: false, threshold: 100,  id: "trophy1",      msg: "Pizza Apprentice! 🏆 100 pizzas!" },
        trophy2:      { done: false, threshold: 400,  id: "trophy2",      msg: "Bronze Baker! 🥉 400 pizzas!" },
        trophy3:      { done: false, threshold: 1000, id: "trophy3",      msg: "Silver Chef! 🥈 1000 pizzas!" },
        trophy4:      { done: false, threshold: 2000, id: "trophy4",      msg: "Pizza Master! 🥇 2000 pizzas!" },
        firstupgrade: { done: false, threshold: null, id: "firstupgrade", msg: "First Upgrade! ⭐ Keep it up!" }
    };

    function checkRewards() {
        for (let key in rewards) {
            let r = rewards[key];
            if (!r.done && r.threshold !== null && totalPizzaEver >= r.threshold) {
                r.done = true;
                unlockReward(r.id, r.msg);
            }
        }
    }

    function checkUpgradeReward() {
        let r = rewards["firstupgrade"];
        if (!r.done) {
            r.done = true;
            unlockReward(r.id, r.msg);
        }
    }

    let msgTimeout = null;
    function unlockReward(imgId, text) {
        const img = document.getElementById(imgId);
        if (img) img.classList.add("unlocked");
        rewardMsgEl.querySelector("h2").innerText = text;
        rewardMsgEl.style.display = "flex";
        if (msgTimeout) clearTimeout(msgTimeout);
        msgTimeout = setTimeout(() => {
            rewardMsgEl.style.display = "none";
        }, 3000);
    }

    // HELP PANEL
    helpBtn.addEventListener("click", () => {
        helpPanel.style.display = helpPanel.style.display === "flex" ? "none" : "flex";
    });
    helpClose.addEventListener("click", () => {
        helpPanel.style.display = "none";
    });

    updateDisplay();
});
