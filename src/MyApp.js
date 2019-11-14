let MyApp = (function() {

    let poiViewer = null;

    let initPoiViewer = function(selector) {
        /*let closeButton = document.querySelector(selector + " button");
            closeButton.onclick = closePoi;
        let title = document.querySelector(selector + " #myPOITitle");
        let description = document.querySelector(selector + " #myPOIDescription");*/
        let closeButton = document.querySelector(selector + " #btnCancel");
            closeButton.addEventListener("click", closePoi);
        let title = document.querySelector(selector + " .modalTitle");
        let description = document.querySelector(selector + " .modalSubTitle");
    
        poiViewer = {
          dom: document.querySelector(selector)
        }
    };

    let poiSelected = function(poi) {
        let lang = IV.api.ui.languageService.getCurrentLanguage();  // Obtain current IndoorViewer language
        console.log(poiViewer);
        //poiViewer.title.innerHTML = poi.titles[lang];
        //poiViewer.description.innerHTML = poi.descriptions[lang];
        poiViewer.dom.style.display = "flex";  // Display HTML template
    }

    let closePoi = function() {
        let poiService = IV.api.poi.service;
        poiService.closePOI();
        poiViewer.dom.style.display = "none";
    }

    return {
        initOverrides: function() {
          initPoiViewer(".modal");
          IV.api.poi.service.onPoiClick.connect(function(poi) { poiSelected(poi); });
        }
    };

})();

exports.MyApp = MyApp;