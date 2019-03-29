const createSlideShow = (id, urls) => {
    const elem = document.getElementById(id)
    let index = 0;
    let animationInProgress = false;
    const next = (display, displayContainer, queue) => {
        if (index < urls.length - 1 && !animationInProgress) {
            animationInProgress = true;
            index += 1;
            display.classList.add("slide-left");

            [...queue.children].forEach(child => child.classList.remove("current"));

            queue.children[index].classList.add("current");

            queue.children[index].scrollIntoView({behavior: "smooth", block: "nearest"});


            const nextDisplay = document.createElement('img');
            nextDisplay.classList.add("slide-left");
            nextDisplay.src = urls[index];
            displayContainer.append(nextDisplay);
            setTimeout(() => {
                nextDisplay.remove();
                display.classList.remove("slide-left")
                display.src = urls[index];
                animationInProgress = false;
            }, 500)
        }
    }
    const back = (display, displayContainer, queue) => {
        if (index > 0 && !animationInProgress) {
            animationInProgress = true;
            index -= 1;
            display.classList.add("slide-right");

            [...queue.children].forEach(child => child.classList.remove("current"));

            queue.children[index].classList.add("current");

            queue.children[index].scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});

            const prevDisplay = document.createElement('img');
            prevDisplay.classList.add("slide-right");
            prevDisplay.src = urls[index];
            displayContainer.prepend(prevDisplay);
            setTimeout(() => {
                prevDisplay.remove();
                display.classList.remove("slide-right")
                display.src = urls[index];
                animationInProgress = false;
            }, 500)
        }
    }

    const displayContainer = document.createElement('div');
    displayContainer.classList.add("display-container");
    const display = document.createElement('img');
    display.src = urls[index];
    display.classList.add("display");
    displayContainer.append(display);

    const queue = document.createElement('div');
    queue.classList.add("queue");
    
    urls.forEach((url, urlIndex) => {
        const image = document.createElement('img') ;
        image.src = url
        image.classList.add("in-queue")
        if (urlIndex === index) {
            image.classList.add("current")
        }
        queue.append(image)
    })

    const backArrowContainer = document.createElement('div');
    backArrowContainer.classList.add("back", "arrow-container");
    backArrowContainer.innerHTML = '<i class="fas fa-chevron-left"></i>';
    backArrowContainer.addEventListener("click", () => back(display, displayContainer, queue));

    const nextArrowContainer = document.createElement('div');
    nextArrowContainer.classList.add("next", "arrow-container");
    nextArrowContainer.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextArrowContainer.addEventListener("click", () => next(display, displayContainer, queue));

    displayContainer.append(backArrowContainer);
    displayContainer.append(nextArrowContainer);

    elem.append(displayContainer);
    elem.append(queue);
}


window.onload = function() {
    new Rellax('.rellax');

    createSlideShow('circuit-breaker-slider', ["./images/circuitBreaker/1.png", "./images/circuitBreaker/2.png", "./images/circuitBreaker/1.png", "./images/circuitBreaker/2.png", "./images/circuitBreaker/1.png", "./images/circuitBreaker/2.png"])

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