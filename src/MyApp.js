let MyApp = (function() {

    let poiViewer = null;
    let routerItems = document.querySelectorAll(".routerItem");
    console.log(routerItems);

    /* elements for säiliöntäyttö */
    let sailioCloseButton = document.querySelector(".routerSailio #btnCancel");
    let title = document.querySelector("routerSailio .modalTitle");
    let description = document.querySelector("routerSailio .modalSubTitle");
    let sailioSucceedButton = document.querySelector("#btnSucceed");
    let video = document.querySelector("#video");
    sailioSucceedButton.addEventListener("click" , () => {
        router(0);
    });
    sailioCloseButton.addEventListener("click", () => {
        router(0);
    });
    video.addEventListener("click", () => {
        link();
    });


    /* elements for pumpoptions */
    let pumpSailioButton = document.querySelector(".taytto button");
    pumpSailioButton.addEventListener("click" , () => {
        router(1);
    });
    let pumpCloseButton = document.querySelector(".v");



    const initPoiViewer = function(selector) {
        /*let closeButton = document.querySelector(selector + " button");
            closeButton.onclick = closePoi;
        let title = document.querySelector(selector + " #myPOITitle");
        let description = document.querySelector(selector + " #myPOIDescription");*/
        pumpCloseButton.addEventListener("click", closePoi);
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

    /* Opens a link to the 360 video*/
    const link = function(){
        window.open("https://esite.viar360.com/virtual/story/play/F9A6498E-181D-0B14-A285-E74CF38E954A?getiframedimensions=true&ui=false&video_cmd=false", "_blank");
    }

    return {
        initOverrides: function() {
          initPoiViewer(".routerPump");
          IV.api.poi.service.onPoiClick.connect(function(poi) { poiSelected(poi); });
        }
    };

})();

exports.MyApp = MyApp;