let MyApp = (function () {

    let poiViewer = null;
    let modalPi = document.querySelector(".modalPi");
    let routerItems = document.querySelectorAll(".routerItem");
    let meterClock;
    localStorage.setItem("newestHistory", "");

    /* elements for säiliöntäyttö */
    let sailioCloseButton = document.querySelector(".routerSailio #btnCancel");
    let historyCloseButton = document.querySelector(".routerHistory .historyCloseButton");
    let sailioSucceedButton = document.querySelector("#btnSucceed");
    let kaavioCloseButton = document.querySelector(".closePi");
    let historyButton = document.querySelector("#historyBtn");
    let video = document.querySelector("#video");
    let kaavioButton = document.querySelector("#btnKaavio");
    console.log(kaavioButton);

    sailioCloseButton.addEventListener("click", () => {
        router(0);
    });
    kaavioCloseButton.addEventListener("click", () => {
        modalPi.style.display = "none";
        router(0);
    });
    historyButton.addEventListener("click", () => {
        router(3);
    });
    video.addEventListener("click", () => {
        link("https://esite.viar360.com/virtual/story/play/F9A6498E-181D-0B14-A285-E74CF38E954A?getiframedimensions=true&ui=false&video_cmd=false");
    });
    kaavioButton.addEventListener("click", () => {
        router(2);
    });
    historyCloseButton.addEventListener("click", () => {
        router(0);
    });


    /* elements for pumpoptions */
    let pumpSailioButton = document.querySelector("#fillBtn");
    pumpSailioButton.addEventListener("click", () => {
        router(1);
    });
    let pumpCloseButton = document.querySelector(".pumpCloseButton");


    /* pump meter functions */
    const setPumpMeterLevel = (level) => {
        localStorage.setItem("meterLevel", level);
    };
    const getPumpMeterLevel = () => {
        return parseInt(localStorage.getItem("meterLevel"));
    };
    setPumpMeterLevel(1000);
    const addPumpMeterLevel = (level) => {
        let newLevel = getPumpMeterLevel();
        newLevel += level;

        if (newLevel <= 0) {
            newLevel = 0;
        } else if (newLevel >= 1000) {
            newLevel = 1000;
        }
        localStorage.setItem("meterLevel", newLevel);
    };
    const setPumpMeterFillLevel = (level) => {
        localStorage.setItem("meterFillLevel", level);
    };
    const getPumpMeterFillLevel = () => {
        return parseInt(localStorage.getItem("meterFillLevel"));
    };
    const refreshMeterLevel = (levelEl, titleEl, fillLevelEl) => {
        let level = localStorage.getItem("meterLevel");
        if (level <= 10) {
            levelEl.style.height = "1%";
        } else {
            levelEl.style.height = level / 10 + "%";
        }
        if (level <= 50) {
            levelEl.style.backgroundColor = "#f91a00";
            fillLevelEl.style.backgroundColor = "#f91a00"

        } else if (level < 500) {
            levelEl.style.backgroundColor = "#FFC707";
            fillLevelEl.style.backgroundColor = "#FFC707";
        } else {
            levelEl.style.backgroundColor = "#40df00";
            fillLevelEl.style.backgroundColor = "#40df00";
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

        fillLevelEl.style.height = getPumpMeterFillLevel();
    };
    /* fill level */
    let refreshFillLevelButton = document.querySelector(".refreshFillLevelBtn");
    let pumpMeterFillLevel = document.querySelector(".pumpMeterFillLevel");
    let pumpRatioVesi = document.querySelector(".pumpRatioVesi");
    let pumpRatioFosf = document.querySelector(".pumpRatioFosf");
    let pumpRatioLipea = document.querySelector(".pumpRatioLipea");

    refreshFillLevelButton.addEventListener("click", () => {
        setPumpMeterFillLevel(1000 - getPumpMeterLevel());
        /* sets height of fill meter */
        pumpMeterFillLevel.style.backgroundColor = document.querySelector(".pumpMeterLevel").style.backgroundColor;
        pumpMeterFillLevel.style.height = getPumpMeterFillLevel() / 10 + "%";
        pumpRatioFosf.innerText = "Fosfaatti: " + parseFloat(getPumpMeterFillLevel() * 0.002).toFixed(2) + " kg";
        pumpRatioLipea.innerText = "Lipeä: " + parseFloat(getPumpMeterFillLevel() * 0.0004).toFixed(3) + " kg";
        pumpRatioVesi.innerText = "Vesi: " + getPumpMeterFillLevel() + " L";
    });
    sailioSucceedButton.addEventListener("click", () => {
        let d = new Date();
        let newLevel;
        let newestHistory = localStorage.getItem("newestHistory");

        if (getPumpMeterLevel() + getPumpMeterFillLevel() < 1000) {
            newLevel = getPumpMeterLevel() + getPumpMeterFillLevel();
        } else if (getPumpMeterLevel() + getPumpMeterFillLevel() >= 1000) {
            newLevel = 1000;
        }

        newestHistory += `<button class="historycontainer accordion">
                    <div class="fas fa-chevron-down align-right descdroparrow"></div>
                    <div class="maintdate">${d.getDate()}.${parseInt(d.getMonth() + 1)}.${d.getFullYear()}</div>
                    <div class="mainttitle">Säiliön täyttö</div>
                </button>
                <div class="maintdesc panel">
                    <h2>Vettä aluksi: ${getPumpMeterLevel()} L</h2>
                    </br>
                    <h2>Vettä lisätty: ${getPumpMeterFillLevel()} L</h2>
                    <h2>Fosfaattia lisätty: ${parseFloat(getPumpMeterFillLevel() * 0.002).toFixed(2)} kg</h2>
                    <h2>Lipeää lisätty ${parseFloat(getPumpMeterFillLevel() * 0.0004).toFixed(3)} kg</h2>
                    </br>
                    <h2>Vettä lopuksi: ${newLevel} L</h2>
            </div>`;

        setPumpMeterLevel(newLevel);
        setPumpMeterFillLevel(0);
        localStorage.setItem("newestHistory", newestHistory);
        router(0);
        refreshMeterLevel(document.querySelector(".pumpMeterLevel"),
            document.querySelector(".pumpMeterLevelCurrent"),
            document.querySelector(".pumpMeterFillLevel"));
    });


    const initPoiViewer = function (selector) {
        pumpCloseButton.addEventListener("click", closePoi);
        document.querySelector(".backDrop").addEventListener("click", closePoi);
        poiViewer = {
            dom: document.querySelector(selector)
        }
    };

    const poiSelected = function (poi) {
        let lang = IV.api.ui.languageService.getCurrentLanguage();  // Obtain current IndoorViewer language
        console.log(poiViewer);
        document.querySelector(".routerContainer").style.display = "flex";
        document.querySelector(".routerContainer .backDrop").style.display = "flex";
        poiViewer.dom.style.display = "flex";  // Display HTML template


        /* refreshes meter level when opened */
        refreshMeterLevel(document.querySelector(".pumpMeterLevel"),
            document.querySelector(".pumpMeterLevelCurrent"),
            document.querySelector(".pumpMeterFillLevel"));

        /* starts meter clock*/
        meterClock = setInterval(() => {
            addPumpMeterLevel(-10);
            refreshMeterLevel(document.querySelector(".pumpMeterLevel"),
                document.querySelector(".pumpMeterLevelCurrent"),
                document.querySelector(".pumpMeterFillLevel"));
        }, 1000);

    };

    const closePoi = function () {
        let poiService = IV.api.poi.service;
        poiService.closePoi();
        document.querySelector(".routerContainer").style.display = "none";
        document.querySelector(".routerContainer .backDrop").style.display = "none";
        for (routerItem of routerItems) {
            routerItem.style.display = "none";
        }
        poiViewer.dom.style.display = "none";
        clearInterval(meterClock);
    };


    /* shows the element given as parameter, hides other elements */
    const router = function (n) {
        for (routerItem of routerItems) {
            if (routerItem !== routerItems[n]) {
                routerItem.style.display = "none";
                console.log(routerItem)
            } else {
                routerItem.style.display = "flex";
            }
        }

        if (n === 0) {
            refreshMeterLevel(document.querySelector(".pumpMeterLevel"),
                document.querySelector(".pumpMeterLevelCurrent"),
                document.querySelector(".pumpMeterFillLevel"));
            meterClock = setInterval(() => {
                addPumpMeterLevel(-10);
                refreshMeterLevel(document.querySelector(".pumpMeterLevel"),
                    document.querySelector(".pumpMeterLevelCurrent"),
                    document.querySelector(".pumpMeterFillLevel"));
            }, 1000);
        } else if (n === 3) {
            document.querySelector(".routerHistory .modalContent").innerHTML += localStorage.getItem("newestHistory");
            localStorage.setItem("newestHistory", "");

            let acc = document.getElementsByClassName("accordion");
            let i;
            for (i = 0; i < acc.length; i++) {
                acc[i].addEventListener("click", function () {
                    this.classList.toggle("active");
                    let panel = this.nextElementSibling;
                    if (panel.style.maxHeight) {
                        panel.style.maxHeight = null;
                    } else {
                        panel.style.maxHeight = panel.scrollHeight + "px";
                    }
                });
            }
            clearInterval(meterClock);
        } else if (n === 2){
            let modalPi = document.querySelector(".modalPi");
            console.log(modalPi);
            modalPi.style.display = "block";
        } else {
            clearInterval(meterClock);
        }
    };

    /* Opens a specified link in a new tab*/
    const link = function (link) {
        window.open(link, "_blank");
    }

    return {
        initOverrides: function () {
            initPoiViewer(".routerPump");
            IV.api.poi.service.onPoiClick.connect(function (poi) {
                poiSelected(poi);
            });
        }
    };

})();

exports.MyApp = MyApp;