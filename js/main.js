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

    if (typeof ymaps !== 'undefined') {
        ymaps.ready(function () {
            const myMap = new ymaps.Map("map", {
                center: [7.890759, 98.294690],
                controls: ["zoomControl"],
                zoom: 15
            },);

            const myPlacemark = new ymaps.Placemark([7.890759, 98.294690], {
                hintContent: 'DoubleTree by Hilton',
                balloonContent: 'DoubleTree by Hilton Phuket Banthai Resort '
            });

            myMap.geoObjects.add(myPlacemark);
        });
    }

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