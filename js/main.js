const swiper = new Swiper('.swiper-container', {
    loop: true,

    navigation: {
        nextEl: '.slider-button--next',
        prevEl: '.slider-button--prev',
    },
    keyboard: {
        enabled: true,
    },
});

ymaps.ready(function(){
    const myMap = new ymaps.Map ("map", {
        center: [7.890759, 98.294690],
        zoom: 15
    });

    const myPlacemark = new ymaps.Placemark([7.890759, 98.294690], {
        hintContent: 'DoubleTree by Hilton',
        balloonContent: 'DoubleTree by Hilton Phuket Banthai Resort '
    });

    myMap.geoObjects.add(myPlacemark);

    myMap.controls.add('zoomControl', {
        size: "small"
    });
});
