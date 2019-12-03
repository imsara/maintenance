let MyApp = (function() {

    let poiViewer = null;

    let routerItems = document.querySelectorAll(".routerItem");
    let meterClock;

    /* elements for säiliöntäyttö */
    let sailioCloseButton = document.querySelector(".routerSailio #btnCancel");
    let sailioSucceedButton = document.querySelector("#btnSucceed");
    let kaavioCloseButton = document.querySelector(".routerKaavio #btnClose")
    let video = document.querySelector("#video");
    let kaavioButton = document.querySelector("#btnKaavio");
    sailioSucceedButton.addEventListener("click" , () => {
        router(0);
    });
    sailioCloseButton.addEventListener("click", () => {
        router(0);
    });
    kaavioCloseButton.addEventListener("click", () => {
        router(0);
    });
    video.addEventListener("click", () => {
        link("https://esite.viar360.com/virtual/story/play/F9A6498E-181D-0B14-A285-E74CF38E954A?getiframedimensions=true&ui=false&video_cmd=false");
    });
    kaavioButton.addEventListener("click", () => {
        router(2);
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
        pumpCloseButton.addEventListener("click", closePoi);
        document.querySelector(".backDrop").addEventListener("click", closePoi);
        poiViewer = {
          dom: document.querySelector(selector)
        }
    };

    const poiSelected = function(poi) {
        let lang = IV.api.ui.languageService.getCurrentLanguage();  // Obtain current IndoorViewer language
        console.log(poiViewer);
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

    /* Opens a specified link in a new tab*/
    const link = function(link){
        window.open(link, "_blank");
    }

    return {
        initOverrides: function() {
          initPoiViewer(".routerPump");
          IV.api.poi.service.onPoiClick.connect(function(poi) { poiSelected(poi); });
        }
    };

})();

exports.MyApp = MyApp;