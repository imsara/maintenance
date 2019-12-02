let MyApp = (function() {

    let poiViewer = null;
    let routerItems = document.querySelectorAll(".routerContainer .routerItem");
    let meterClock;

    /* elements for säiliöntäyttö */
    let sailioCloseButton = document.querySelector(".routerSailio #btnCancel");
    let title = document.querySelector("routerSailio .modalTitle");
    let description = document.querySelector("routerSailio .modalSubTitle");
    let sailioSucceedButton = document.querySelector("#btnSucceed");
    sailioSucceedButton.addEventListener("click" , () => {
        router(0);
    });
    sailioCloseButton.addEventListener("click", () => {
        router(0);
    });


    /* elements for pumpoptions */
    let pumpSailioButton = document.querySelector("#fillBtn");
    pumpSailioButton.addEventListener("click" , () => {
        router(1);
    });
    let pumpCloseButton = document.querySelector(".pumpCloseButton");


    /* pump meter functions */

    const setPumpMeterLevel = (level) => {
        localStorage.setItem("meterLevel", level);
    };

    setPumpMeterLevel(1000);

    const addPumpMeterLevel = (level) => {
        let newLevel = parseInt(localStorage.getItem("meterLevel"));
        newLevel += level;

        if (newLevel <= 0) {
            newLevel = 0;
        } else if (newLevel >= 1000) {
            newLevel = 1000;
        }
        localStorage.setItem("meterLevel", newLevel);
    };


    const refreshMeterLevel = (levelEl, titleEl) => {
        let level = localStorage.getItem("meterLevel");
        if (level <= 10) {
            levelEl.style.height = "1%";
        } else {
            levelEl.style.height = level / 10 + "%";

        }
        if (level <= 50){
            levelEl.style.backgroundColor = "#f91a00"

        } else if (level < 500) {
            levelEl.style.backgroundColor = "#FFC707"
        } else {
            levelEl.style.backgroundColor = "#40df00"
        }
        if (level <= 950) {
            titleEl.innerText = level + " L";
        } else {
            titleEl.innerText = "";
        }
        if (level === 1000) {
            levelEl.style.borderRadius = "3px"
        } else {
            levelEl.style.borderRadius = "0 0 3px 3px"
        }

    };


    const initPoiViewer = function(selector) {
        /*let closeButton = document.querySelector(selector + " button");
            closeButton.onclick = closePoi;
        let title = document.querySelector(selector + " #myPOITitle");
        let description = document.querySelector(selector + " #myPOIDescription");*/
        pumpCloseButton.addEventListener("click", closePoi);
        document.querySelector(".backDrop").addEventListener("click", closePoi);
        poiViewer = {
          dom: document.querySelector(selector)
        }
    };

    const poiSelected = function(poi) {
        let lang = IV.api.ui.languageService.getCurrentLanguage();  // Obtain current IndoorViewer language
        console.log(poiViewer);
        //poiViewer.title.innerHTML = poi.titles[lang];
        //poiViewer.description.innerHTML = poi.descriptions[lang];
        document.querySelector(".routerContainer").style.display = "flex";
        document.querySelector(".routerContainer .backDrop").style.display = "flex";
        poiViewer.dom.style.display = "flex";  // Display HTML template


       /* refreshes meter level when opened */
        refreshMeterLevel(  document.querySelector(".pumpMeterLevel"),
            document.querySelector(".pumpMeterLevelCurrent"));

        /* starts meter clock*/
        meterClock = setInterval( () => {
            addPumpMeterLevel(-10);
            refreshMeterLevel(  document.querySelector(".pumpMeterLevel"),
                document.querySelector(".pumpMeterLevelCurrent"));
        }, 1000);

    }

    const closePoi = function() {
        let poiService = IV.api.poi.service;
        poiService.closePoi();
        document.querySelector(".routerContainer").style.display = "none";
        document.querySelector(".routerContainer .backDrop").style.display = "none";
        for (routerItem of routerItems){
            routerItem.style.display = "none";
        }
        poiViewer.dom.style.display = "none";
        clearInterval(meterClock);
    }


    /* shows the element given as parameter, hides other elements */
    const router = function(n) {
        for (routerItem of routerItems){
            if (routerItem !== routerItems[n]) {
                routerItem.style.display = "none";
                console.log(routerItem)
            } else {
                routerItem.style.display = "flex";

            }
        }

        if (n === 0) {
            refreshMeterLevel( {levelCurrent: document.querySelector(".pumpMeterLevel"),
                levelCurrentTitle: document.querySelector(".pumpMeterLevelCurrent")
            });
        }
    }

    return {
        initOverrides: function() {
          initPoiViewer(".routerPump");
          IV.api.poi.service.onPoiClick.connect(function(poi) { poiSelected(poi); });
        }
    };

})();

exports.MyApp = MyApp;