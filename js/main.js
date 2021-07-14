const hotelSwiper = new Swiper('.hotel-slider', {
    loop: true,

    navigation: {
        nextEl: '.hotel-slider__button--next',
        prevEl: '.hotel-slider__button--prev',
    },
    keyboard: {
        enabled: true,
    },
});

ymaps.ready(function(){
    const myMap = new ymaps.Map ("map", {
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

const reviewsSwiper = new Swiper('.reviews-slider', {
    loop: true,

    navigation: {
        nextEl: '.reviews-slider__button--next',
        prevEl: '.reviews-slider__button--prev',
    },
    keyboard: {
        enabled: true,
    },
});
