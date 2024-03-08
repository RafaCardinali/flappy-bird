function createElement(tagName, className) {
    const element = document.createElement(tagName);
    element.className = className;
    return element;
}

function createBarrier(reverse = false) {
    const element = createElement('div', 'barrier');

    const barrelEnd = createElement('div', 'barrel-end');
    const barrel = createElement('div', 'barrel');
    element.appendChild(reverse ? barrel : barrelEnd);
    element.appendChild(reverse ? barrelEnd : barrel);

    const setHeight = height => barrel.style.height = `${height}px`;

    return { element, setHeight };
}

function pairOfBarriers(height, aperture, positionX) {
    const top = createBarrier(true);
    const bottom = createBarrier(false);

    const element = createElement('div', 'pair-of-barriers');
    element.appendChild(top.element);
    element.appendChild(bottom.element);

    const sortAperture = () => {
        const topHeight = Math.random() * (height - aperture);
        const bottomHeight = height - aperture - topHeight;
        top.setHeight(topHeight);
        bottom.setHeight(bottomHeight);
    };

    const getPositionX = () => parseInt(element.style.left.split('px')[0]);
    const setPositionX = positionX => element.style.left = `${positionX}px`;
    const getWidth = () => element.clientWidth;

    sortAperture();
    setPositionX(positionX);

    return { element, top, bottom, getPositionX, setPositionX, getWidth, sortAperture }; // Inclua top e bottom aqui
}


function movingBarriers(height, width, aperture, space, notifyScore) {
    const pairs = [
        pairOfBarriers(height, aperture, width),
        pairOfBarriers(height, aperture, width + space),
        pairOfBarriers(height, aperture, width + space * 2),
        pairOfBarriers(height, aperture, width + space * 3)
    ];

    const movement = 3;
    const animation = () => {
        pairs.forEach(par => {
            par.setPositionX(par.getPositionX() - movement);

            if (par.getPositionX() < -par.getWidth()) {
                par.setPositionX(par.getPositionX() + space * pairs.length);
                par.sortAperture();
            }

            const middle = width / 2;
            const crossedMiddle = par.getPositionX() + movement >= middle && par.getPositionX() < middle;
            if (crossedMiddle) notifyScore();
        });
    };

    return { pairs, animation };
}

function handleBird(gameHeight) {
    let fly = false;

    this.element = createElement('img', 'bird');
    this.element.src = '../image/passaro.png';

    this.getPositionY = () => parseInt(this.element.style.bottom.split('px')[0]);
    this.setPositionY = positionY => this.element.style.bottom = `${positionY}px`;

    window.onkeydown = e => fly = true;
    window.onkeyup = e => fly = false;

    this.animationBird = () => {
        const newPositionY = this.getPositionY() + (fly ? 8 : -5);
        const maxHeight = gameHeight - this.element.clientHeight;

        if(newPositionY <= 0) {
            this.setPositionY(0)
        } else if (newPositionY >= maxHeight) {
            this.setPositionY(maxHeight);
        } else {
            this.setPositionY(newPositionY)
        }
    }

    this.setPositionY(gameHeight / 2);
}

function handleScore() {
    this.element = createElement('span', 'score');
    this.updateScore = score => {
        this.element.innerHTML = score
    }
    this.updateScore(0);
}

function areOverlapping(elementA, elementB) {
    const a = elementA.getBoundingClientRect();
    const b = elementB.getBoundingClientRect();

    const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left;
    const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top;

    return horizontal && vertical;
}

function collision(bird, barriers) {
    let collided = false;
    barriers.pairs.forEach(pairOfBarriers => {
        if (!collided) {
            const top = pairOfBarriers.top.element;
            const bottom = pairOfBarriers.bottom.element;
            collided = areOverlapping(bird.element, top) || areOverlapping(bird.element, bottom);
        }
    });
    return collided; // Adicione esta linha
}


function flappyBird() {
    let score = 0;

    const gameArea = document.querySelector('[wm-flappy]');
    const height = gameArea.clientHeight;
    const width = gameArea.clientWidth;

    const progress = new handleScore();
    const barriers = new movingBarriers(height, width, 200, 400, 
        () => progress.updateScore(++score));
    const bird = new handleBird(height);

    gameArea.appendChild(progress.element);
    gameArea.appendChild(bird.element); 
    barriers.pairs.forEach(pair => gameArea.appendChild(pair.element));

    this.start = () => {
        const timer = setInterval(() => {
            barriers.animation();
            bird.animationBird();

            if(collision(bird, barriers)) {
                clearInterval(timer);
            }
        }, 20);
    };
}

new flappyBird().start();
