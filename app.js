// Portal SVG Letters Animation
const logo = document.querySelectorAll('#logo-portal path');

for (let i = 0; i < logo.length; i++) {
    const path = logo[i];
    const length = path.getTotalLength();
}


// Portal digital clock
function digitalClock() {
    var timeHTML = document.getElementById('time');
    var d = new Date();
    var date = d.getDate();
    date = addZero(date);
    var hours = d.getHours();
    hours = addZero(hours);
    var minutes = d.getMinutes();
    minutes = addZero(minutes);
    var seconds = d.getSeconds();
    seconds = addZero(seconds);
    timeHTML.innerHTML = hours + ' : ' + minutes + ' : ' + seconds;
}

function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

setInterval(digitalClock, 1000);


// Triangle Hover Animation
const hoverThis = document.querySelector(".triangle_left");

hoverThis.addEventListener("mousemove", mouseMoveAnim);

function mouseMoveAnim(e) {
    var xPos = e.clientX / window.innerWidth - 0.5;
    var yPos = e.clientY / window.innerHeight - 0.5;

    gsap.to(".move-me", {
        duration: 0.1,
        rotationY: function(index, target) {
            return target.dataset.intensity ?
                target.dataset.intensity * xPos :
                5 * xPos;
        },
        rotationX: function(index, target) {
            return target.dataset.intensity ?
                -target.dataset.intensity * yPos :
                -5 * yPos;
        },
        x: function(index, target) {
            return target.dataset.intensity ?
                target.dataset.intensity * -8 * xPos :
                -100 * xPos;
        },
        y: function(index, target) {
            return target.dataset.intensity ?
                target.dataset.intensity * -3 * yPos * 3 :
                -100 * yPos;
        },
        ease: "power2.inOut",
        transformPerspective: 900,
        transformOrigin: "center"
    });
}

hoverThis.onmouseenter = function() {
    hoverThis.addEventListener("mousemove", mouseMoveAnim);
};

hoverThis.onmouseleave = function() {
    hoverThis.removeEventListener("mousemove", mouseMoveAnim);
    gsap.to(".move-me", {
        delay: 0.1,
        duration: 0.5,
        rotationY: 3,
        rotationX: 3,
        x: 0,
        y: 0,
        ease: "power1.inOut"
    });
};


// Animate On Scroll .click_link Section When in View
const scrollElements = document.querySelectorAll(".js-scroll");
const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};
const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}

window.addEventListener("scroll", () => { 
  handleScrollAnimation();
});




// 3D Letters Animation 
const circleText = document.querySelector(".rotate3d-letters");
window.addEventListener("scroll", () => {
    var top = window.pageYOffset / 1.7;
    circleText.style.transform = 'rotate3d(0, 1, 0, ' + top + 'deg)';
});

// Popping up words animation 
const items = [...document.querySelectorAll('.item')];
let index = -1;
let currentElement, topElement;
const transitionTime = getTopElementTransitionTime();
const holdTime = 1000;

update();
setInterval(update, transitionTime + holdTime);

function update() {
    if (topElement) {
        topElement.classList.remove('top');
    }
    if (currentElement) {
        currentElement.classList.remove('shown');
        currentElement.classList.add('top');
        topElement = currentElement;
    }
    index = (index + 1) % items.length;
    currentElement = items[index];
    currentElement.classList.add('shown');
    setTimeout(() => {
        if (topElement) {
            topElement.classList.remove('top');
        }
    }, transitionTime);
}

function getTopElementTransitionTime() {
    const ele = document.createElement('div');
    ele.classList.add('item', 'top');
    ele.style.display = 'none';
    document.body.append(ele);
    const td = getComputedStyle(ele).transitionDuration;
    ele.remove();
    return parseFloat(td) * 1000;
}


// Highlight letters on scroll a
const debouncedRAF = (function() {
    let frameId = null;

    return fn => ev => {
        if (frameId !== null) { return; }

        frameId = requestAnimationFrame(time => {
            fn(time);
            frameId = null;
        });
    };
})();

function debounce(fn, time) {
    let timerId = null;
    return (...args) => {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => fn(...args), time);
    }
}

function getPageOffsetTop(el) {
    let offset = 0,
        node = el;
    do {
        offset += node.offsetTop;
    } while (node = node.offsetParent);
    return offset;
}

function scrollHighlighter(elements) {
    const START_OFFSET = 0.1;
    const END_OFFSET = 0.6;
    const offsets = new WeakMap();
    const instance = {
        elements: Array.from(elements),
        update(scrollTop) {
            const endAt = END_OFFSET;
            this.elements.forEach(el => {
                const elOffset = offsets.get(el);
                const relPosition = 1 - (elOffset - scrollTop) / this.windowHeight;
                let startAt = START_OFFSET;
                const startOffset = this.windowHeight * (1 - startAt);
                if (startOffset > elOffset) {
                    startAt = Math.min(endAt, 1 - elOffset / this.windowHeight);
                }
                const progress = (relPosition - startAt) / (endAt - startAt);
                const clampedProgress = Math.min(1, Math.max(0, progress));
                el.style.setProperty(
                    '--highlight-range',
                    (clampedProgress * 100).toFixed(0) + '%'
                );
            });
        },
        reflow() {
            this.windowHeight = window.innerHeight;
            this.elements.forEach(el => {
                offsets.set(el, getPageOffsetTop(el));
            });
        }
    };
    instance.elements.push = (...args) => {
        const result = Array.prototype.push.call(instance.elements, ...args);
        instance.reflow();
        return result;
    }
    instance.reflow();
    instance.update(0);
    return instance;
}
const hl = scrollHighlighter(document.querySelectorAll('.highlight'));
window.addEventListener('resize', debounce(() => hl.reflow(), 100));
document.addEventListener('scroll', debouncedRAF(() => {
    hl.update(window.pageYOffset || document.documentElement.scrollTop);
}));