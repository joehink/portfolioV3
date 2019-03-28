window.onload = function() {
    anime({
        targets: '#landing .container',
        translateY: [-1000, 0],
        opacity: [0, 1],
        duration: 1500,
        easing: 'cubicBezier(.54,0,.54,1.01)'
    })
    anime({
        targets: 'i',
        scale: [0, 1],
        duration: 500,
        delay: anime.stagger(200, { start: 1500 }), 
        easing: 'easeInOutQuad'
    })
}