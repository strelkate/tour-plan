$(document).ready(function () {
    new Swiper('.hotel-slider', {
        loop: true,

        navigation: {
            nextEl: '.hotel-slider__button--next',
            prevEl: '.hotel-slider__button--prev',
        },
        keyboard: {
            enabled: true,
        },
    });

    new Swiper('.reviews-slider', {
        loop: true,

        navigation: {
            nextEl: '.reviews-slider__button--next',
            prevEl: '.reviews-slider__button--prev',
        },
        keyboard: {
            enabled: true,
        },
    });

    // if (typeof ymaps !== 'undefined') {
    //     ymaps.ready(function () {
    //         const myMap = new ymaps.Map("map", {
    //             center: [7.890759, 98.294690],
    //             controls: ["zoomControl"],
    //             zoom: 15
    //         },);
    //
    //         const myPlacemark = new ymaps.Placemark([7.890759, 98.294690], {
    //             hintContent: 'DoubleTree by Hilton',
    //             balloonContent: 'DoubleTree by Hilton Phuket Banthai Resort '
    //         });
    //
    //         myMap.geoObjects.add(myPlacemark);
    //     });
    // }

    var menuButton = $(".menu-button");
    menuButton.on('click', function () {
        $('.navbar-bottom').toggleClass('navbar-bottom--visible')
    })

    var modalButton = $("[data-toggle=modal]");
    modalButton.on("click", openModal);
    var closeModalButton = $(".modal__close");
    closeModalButton.on("click", closeModalClick);
    var modalOverlay = $(".modal__overlay");
    modalOverlay.on("click", closeModalClick);

    function openModal() {
        var modalOverlay = $(".modal__overlay");
        var modalDialog = $(".modal__dialog");
        modalOverlay.addClass("modal__overlay--visible");
        modalDialog.addClass("modal__dialog--visible");
        document.body.style.overflowY = 'hidden'
    }

    function closeModalClick(event) {
        event.preventDefault();
        closeModal();
    }

    function closeModal() {
        var modalOverlay = $(".modal__overlay");
        var modalDialog = $(".modal__dialog");
        modalOverlay.removeClass("modal__overlay--visible");
        modalDialog.removeClass("modal__dialog--visible");
        document.body.style.overflowY = ''
    }

    $(document).keyup(function (e) {
        if (e.key === "Escape" || e.keyCode === 27) {
            closeModal();
        }
    });

    // Обработка форм
    $('.footer__form').validate({
        errorClass: "invalid",
        messages: {
            name: {
                required: "Please specify your name",
                minlength: "Name should be at least 2 characters"
            },
            phone: {
                required: "Please enter your phone number",
                minlength: "Phone should be at least 10 characters"
            }
        }
    });
    $('.modal__form').validate({
        errorClass: "invalid",
        messages: {
            name: {
                required: "Please specify your name",
                minlength: "Name should be at least 2 characters"
            },
            email: {
                required: "We need your email address to contact you",
                email: "Your email address must be in the format of name@domain.com"
            },
            phone: {
                required: "Please enter your phone number",
                minlength: "Phone should be at least 10 characters"
            }
        }
    });
    $('.newsletter__subscribe--form').validate({
        errorClass: "invalid",
        messages: {
            email: {
                required: "We need your email address to contact you",
                email: "Your email address must be in the format of name@domain.com"
            }
        }
    });

    $('.footer__input--phone').mask('+7 (999) 999-99-99');
    $('.modal__input--phone').mask('+7 (999) 999-99-99');

    AOS.init();

});

let script = document.createElement('script');
script.src = "https://api-maps.yandex.ru/2.1/?apikey=5abdd719-a013-41ff-9a12-30709fbf27f4&lang=ru_RU&load=package.full";
document.body.append(script);
script.onload = function () {
    //Переменная для включения/отключения индикатора загрузки
    var spinner = $('.ymap-container').children('.loader');
//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
    var check_if_load = false;

//Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
    function init () {
        var myMapTemp = new ymaps.Map("map-yandex", {
            center: [7.890759, 98.294690], // координаты центра на карте
            zoom: 15, // коэффициент приближения карты
            controls: ['zoomControl'] // выбираем только те функции, которые необходимы при использовании
        });

        var myPlacemarkTemp = new ymaps.Placemark([7.890759, 98.294690], {
            hintContent: 'DoubleTree by Hilton',
            balloonContent: 'DoubleTree by Hilton Phuket Banthai Resort'
        },);
        myMapTemp.geoObjects.add(myPlacemarkTemp); // помещаем флажок на карту

        // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
        var layer = myMapTemp.layers.get(0).get(0);

        // Решение по callback-у для определения полной загрузки карты
        waitForTilesLoad(layer).then(function() {
            // Скрываем индикатор загрузки после полной загрузки карты
            spinner.removeClass('is-active');
        });
    }

// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов)
    function waitForTilesLoad(layer) {
        return new ymaps.vow.Promise(function (resolve, reject) {
            var tc = getTileContainer(layer), readyAll = true;
            tc.tiles.each(function (tile, number) {
                if (!tile.isReady()) {
                    readyAll = false;
                }
            });
            if (readyAll) {
                resolve();
            } else {
                tc.events.once("ready", function() {
                    resolve();
                });
            }
        });
    }

    function getTileContainer(layer) {
        for (var k in layer) {
            if (layer.hasOwnProperty(k)) {
                if (
                    layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
                    || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
                ) {
                    return layer[k];
                }
            }
        }
        return null;
    }

// Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
    function loadScript(url, callback){
        var script = document.createElement("script");

        if (script.readyState){  // IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Другие браузеры
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

// Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
    var ymap = function() {
        $('.ymap-container').mouseenter(function(){
                if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

                    // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
                    check_if_load = true;

                    // Показываем индикатор загрузки до тех пор, пока карта не загрузится
                    spinner.addClass('is-active');

                    // Загружаем API Яндекс.Карт
                    loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){
                        // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
                        ymaps.load(init);
                    });
                }
            }
        );
    }

    //Запускаем основную функцию
    ymap();
};