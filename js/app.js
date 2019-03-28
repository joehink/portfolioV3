window.onload = function() {
    anime({
        targets: 'i',
        translateX: [-1000,0],
        autoplay: true,
        delay: anime.stagger(100), 
        easing: 'easeInOutQuad'
    })
}