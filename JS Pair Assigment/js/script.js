window.addEventListener("load", function(event) {

    let rabbit1 = document.getElementById("rabbit1");
    let rabbit2 = document.getElementById("rabbit2");
    let rabbit3 = document.getElementById("rabbit3");
    let rabbit4 = document.getElementById("rabbit4");
    let message1 = document.getElementById("noeggs");
    let message2 = document.getElementById("slow");

    let count = 0;

    rabbit1.style.visibility = "visible";
    rabbit2.style.visibility = "hidden";
    rabbit3.style.visibility = "hidden";
    rabbit4.style.visibility = "hidden";
    message1.style.visibility = "hidden";
    message2.style.visibility = "hidden";

    rabbit1.addEventListener("mouseover", function(event) {
        rabbit1.style.visibility = "hidden";
        rabbit2.style.visibility = "visible";
        count++;

        if (count >= 4) {
            message1.style.visibility = "visible";
        }
        if (count >= 20) {
            message2.style.visibility = "visible";
        }
    });

    rabbit2.addEventListener("mouseover", function(event) {
        rabbit2.style.visibility = "hidden";
        rabbit3.style.visibility = "visible";
        count++;

        if (count >= 4) {
            message1.style.visibility = "visible";
        }
        if (count >= 20) {
            message2.style.visibility = "visible";
        }
    });

    rabbit3.addEventListener("mouseover", function(event) {
        rabbit3.style.visibility = "hidden";
        rabbit4.style.visibility = "visible";
        count++;

        if (count >= 4) {
            message1.style.visibility = "visible";
        }
        if (count >= 20) {
            message2.style.visibility = "visible";
        }
    });

    rabbit4.addEventListener("mouseover", function(event) {
        rabbit4.style.visibility = "hidden";
        rabbit1.style.visibility = "visible";
        count++;

        if (count >= 4) {
            message1.style.visibility = "visible";
        }
        if (count >= 20) {
            message2.style.visibility = "visible";
        }
    });

});
