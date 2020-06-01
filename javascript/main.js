$(function () {

    TweenMax.to(".header h1", .5, { delay: .5, transform: "translateY(0)", opacity: 1 });
    TweenMax.to(".header h3", .5, { delay: 1, transform: "translateY(0)", opacity: 1 });
    TweenMax.to(".header .btns", .5, { delay: 1.5, transform: "translateY(0)", opacity: 1 });
    TweenMax.to(".header .play", .5, { delay: 2, transform: "translateY(0)", opacity: 1 });
    TweenMax.to(".header .header-img-2", .5, { delay: 2.5, transform: "translateX(90%)", opacity: 1 });
    TweenMax.to(".header .header-img-1", .5, { delay: 3, transform: "translateX(0)", opacity: 1 });


    var features = new Waypoint({
        element: document.getElementById('feature-banner'),
        handler: function (down) {
            TweenMax.staggerTo(".feature-banner .col-6", 1.2, { transform: "translateY(0)", opacity: 1 }, .3);
        },
        offset: '60%'
    });

    var playgamesbanner = new Waypoint({
        element: document.getElementById('play-games-banner'),
        handler: function (down) {
            TweenMax.to(".play-games-banner h1", .5, { transform: "translateY(0)", opacity: 1 });
            TweenMax.to(".play-games-banner p", .5, { delay: .5, transform: "translateY(0)", opacity: 1 });
        },
        offset: '60%'
    });

    var about = new Waypoint({
        element: document.getElementById('about'),
        handler: function (down) {
            TweenMax.to(".playing-device-banner img", .5, {  transform: "translateX(0)", opacity: 1 });
            TweenMax.to(".playing-device-banner h1", .5, { delay: .5,transform: "translateY(0)", opacity: 1 });
            TweenMax.staggerTo(".playing-device-banner li", .9, { delay: 1,transform: "translateY(0)", opacity: 1 }, .3);
        },
        offset: '60%'
    });

    var techused = new Waypoint({
        element: document.getElementById('tech-used'),
        handler: function (down) {
            TweenMax.to(".technologies-used-banner h2", .5, {  transform: "translateX(0)", opacity: 1 });
            TweenMax.staggerTo(".technologies-used-banner .col-md-6", .6, { delay: .5,transform: "translateY(0)", opacity: 1 }, .3);
        },
        offset: '60%'
    });

    var guide = new Waypoint({
        element: document.getElementById('guide'),
        handler: function (down) {
            TweenMax.to(".guide-banner h1", .5, {  transform: "translateX(0)", opacity: 1 });
            TweenMax.staggerTo(".guide-banner .col-sm-6", .6, { delay: .5,transform: "translateY(0)", opacity: 1 }, .3);
        },
        offset: '60%'
    });
});