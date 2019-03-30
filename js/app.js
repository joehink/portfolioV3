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

    preload.loadFile(urls[index]);
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
        image.addEventListener("click", () => { 
            index = urlIndex;
            display.src = urls[index];
            [...queue.children].forEach(child => child.classList.remove("current"));
            image.classList.add("current");
        })
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


const preload = new createjs.LoadQueue();

window.onload = function() {
    const downArrow = document.querySelector(".bounce");
    downArrow.addEventListener("click", () => { 
        document
            .getElementById("projects")
            .scrollIntoView({behavior: "smooth", block: "nearest"})
    })

    const wrapper = document.getElementById("wrapper");
    wrapper.onscroll = () => {
        if (wrapper.scrollTop > 5) {
            downArrow.style.opacity = 0;
        } else {
            downArrow.style.opacity = 1;
        }
    }


    preload.loadFile("../images/profile.jpg");
    createSlideShow('circuit-breaker-slider', ["./images/circuitBreaker/1.png", "./images/circuitBreaker/2.png", "./images/circuitBreaker/3.png"])
    createSlideShow('tubeless-slider', ["./images/tubeless/1.png", "./images/tubeless/2.png", "./images/tubeless/3.png", "./images/tubeless/4.png", "./images/tubeless/5.png"])
    createSlideShow('color-saver-slider', ["./images/colorSaver/1.png", "./images/colorSaver/2.png", "./images/colorSaver/3.png", "./images/colorSaver/4.png", "./images/colorSaver/5.png"])
    createSlideShow('messenger-slider', ["./images/messenger/1.png", "./images/messenger/2.png"])
    createSlideShow('memory-board-slider', ["./images/memoryBoard/1.png", "./images/memoryBoard/2.png", "./images/memoryBoard/3.png", "./images/memoryBoard/4.png"])
    createSlideShow('go-hike-slider', ["./images/goHike/1.jpg"])
    createSlideShow('youtube-search-slider', ["./images/youtubeSearch/1.png", "./images/youtubeSearch/2.png", "./images/youtubeSearch/3.png"])
    createSlideShow('trivia-quiz-slider', ["./images/triviaQuiz/1.png", "./images/triviaQuiz/2.png", "./images/triviaQuiz/3.png", "./images/triviaQuiz/4.png"])
    createSlideShow('football-collection-slider', ["./images/footballCollection/1.png", "./images/footballCollection/2.png"])

    preload.on("complete", () => {
        new Rellax('.rellax', {
            wrapper: "#wrapper"
        });

        new Waypoint({
            element: document.getElementById('projects'),
            handler: function() {
                anime({
                    targets: document.querySelectorAll('.display-container'),
                    scale: [0, 1],
                    duration: 500,
                    delay: anime.stagger(200),
                    easing: 'easeInOutQuad'
                })
                anime({
                    targets: document.querySelectorAll('hr'),
                    scaleX: [0, 1],
                    duration: 2000,
                    delay: anime.stagger(200),
                    easing: 'easeInOutQuad'
                })
                this.destroy()
            },
            offset: "60%",
            context: document.getElementById('wrapper')
        })

        new Waypoint({
            element: document.getElementById('thanks'),
            handler: function() {
                anime({
                    targets: 'svg path',
                    strokeDashoffset: [anime.setDashoffset, 0],
                    easing: 'easeInOutSine',
                    duration: 1000,
                    delay: function(el, i) { return i * 175 },
                    direction: 'forwards'
                });
                this.destroy()
            },
            offset: "100%",
            context: document.getElementById('wrapper')
        })


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

        const loading = document.getElementById("loading");
        loading.style.opacity = 0;
        setTimeout(() => {
            loading.style.display = "none";
        }, 1000)
    })
}