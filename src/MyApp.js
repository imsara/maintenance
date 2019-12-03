let MyApp = (function() {

    let poiViewer = null;
    let routerItems = document.querySelectorAll(".routerItem");
    console.log(routerItems);

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
    let pumpSailioButton = document.querySelector(".taytto button");
    pumpSailioButton.addEventListener("click" , () => {
        router(1);
    });
    let pumpCloseButton = document.querySelector(".v");



    const initPoiViewer = function(selector) {
        pumpCloseButton.addEventListener("click", closePoi);
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