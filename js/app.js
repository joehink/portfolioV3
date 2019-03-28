const createSlideShow = (elem, urls) => {
    let index = 0;
    const next = (display) => {
        if (index === urls.length - 1) {
            index = 0;
            display.src = urls[index];
        } else {
            index += 1;
            display.src = urls[index];
        }
    }
    const back = (display) => {
        if (index === 0) {
            index = urls.length - 1;
            display.src = urls[index];
        } else {
            index -= 1;
            display.src = urls[index];
        }
    }
    const displayContainer = document.createElement('div');
    const display = document.createElement('img');
    display.src = urls[index];
    display.classList.add("display");
    displayContainer.append(display);

    const queue = document.createElement('div');
    queue.classList.add("queue");
    
    urls.forEach(url => {
        const image = document.createElement('img') ;
        image.src = url
        image.classList.add("in-queue")
        queue.append(image)
    })

    const backArrowContainer = document.createElement('div');
    backArrowContainer.classList.add("backArrow-container");
    backArrowContainer.innerHTML = '<i class="fas fa-chevron-left"></i>';
    backArrowContainer.addEventListener("click", () => back(display));

    const nextArrowContainer = document.createElement('div');
    nextArrowContainer.classList.add("nextArrow-container");
    nextArrowContainer.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextArrowContainer.addEventListener("click", () => next(display));

    displayContainer.append(backArrowContainer);
    displayContainer.append(nextArrowContainer);

    elem.append(displayContainer);
    elem.append(queue);
}


window.onload = function() {
    new Rellax('.rellax');

    const project = document.querySelector('.slider')
    createSlideShow(project, ["./images/circuitBreaker/1.png", "./images/circuitBreaker/2.png"])

    anime({
        targets: '#landing .container',
        translateY: [-1000, 0],
        opacity: [0, 1],
        duration: 1500,
        easing: 'cubicBezier(.54,0,.54,1.01)'
    })
    anime({
        targets: '#landing i',
        scale: [0, 1],
        duration: 500,
        delay: anime.stagger(200, { start: 1500 }), 
        easing: 'easeInOutQuad'
    })
}