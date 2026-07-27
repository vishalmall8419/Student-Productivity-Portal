
gsap.registerPlugin(ScrollTrigger);

gsap.defaults({
    duration: 1,
    ease: "power3.out"
});

// =======================================
// NAVBAR TIMELINE
// =======================================

const navTl = gsap.timeline({ paused: true });

navTl
    .from(".navbar", {

        y: 0,
        opacity: 0,
        duration: .8

    })

    .from(".navbar-brand", {

        x: -40,
        opacity: 0

    })

    .from(".nav-item", {

        y: -20,
        opacity: 0,
        stagger: .08

    }, "-=.4")

    .from("#themeBtn", {

        scale: 1.1,
        rotation: 180 * 4

    }, "-=.3");



// =======================================
// HERO TIMELINE
// =======================================

const heroTl = gsap.timeline({ paused: true });

heroTl

    .from(".hero-title", {

        x: -30,
        opacity: 0

    })

    .from(".hero-section .lead", {

        y: 40,
        opacity: 0

    }, "-=.4")

    .from(".hero-section .btn", {

        y: 65,
        opacity: 1,
        stagger: .15

    }, "-=.4")

    .from(".hero-card", {

        x: 80,
        opacity: 1,
        scale: .95

    }, "-=.5")

    .from(".mini-card", {

        y: 40,
        opacity: 1,
        scale: .85,
        stagger: .15

    }, "-=.2");




// ===========================================
// LOADER
// ===========================================

window.addEventListener("load", () => {

    document.body.style.visibility = "visible";

    const loaderTl = gsap.timeline();

    loaderTl

        .from(".loader-card", {

            scale: .8,
            opacity: 0,
            duration: .6,
            ease: "back.out(1.7)"

        })

        .from(".loader-logo", {

            rotation: 360,
            scale: 1,
            duration: .8

        }, "-=.3")

        .from(".loader-card h2", {

            y: 20,
            opacity: 0,
            duration: .4

        }, "-=.4")

        .from(".loader-card p", {

            y: 20,
            opacity: 0,
            duration: .4

        }, "-=.3")

        .to(".loader-bar", {

            width: "100%",
            duration: 1.8,
            ease: "power2.inOut"

        })

        .to("#loader", {

            opacity: 0,
            duration: .8,
            pointerEvents: "none",

            onComplete() {

                document.getElementById("loader").remove();

            }

        })

        // Loader pura hide hone ke baad
        .add(() => {

            navTl.play();

            heroTl.play();

            ScrollTrigger.refresh();

            console.log("GSAP Loaded");

        });

});
// =======================================
// FLOATING HERO CARD
// =======================================

gsap.to(".hero-card", {

    y: -15,

    repeat: -1,

    yoyo: true,

    duration: 2,

    ease: "sine.inOut"

});

// =======================================
// FLOATING CIRCLES
// =======================================

gsap.utils.toArray(".circle").forEach((circle, i) => {

    gsap.to(circle, {

        y: -20,

        x: 10,

        repeat: -1,

        yoyo: true,

        duration: 4 + i,

        ease: "sine.inOut"

    });

});

// =======================================
// HERO PARALLAX
// =======================================

const heroCard1 = document.querySelector(".hero-card");

if (heroCard1) {

    window.addEventListener("mousemove", (e) => {

        const x = (e.clientX - window.innerWidth / 2) / 40;

        const y = (e.clientY - window.innerHeight / 2) / 40;

        gsap.to(heroCard1, {

            x,

            y,

            duration: .6,

            overwrite: "auto"

        });

    });

}
// =======================================
// THEME BUTTON
// =======================================

const themeBtn = document.querySelector("#themeBtn");

if (themeBtn) {

    themeBtn.addEventListener("mouseenter", () => {

        gsap.to(themeBtn, {

            scale: 1.08,

            duration: .2

        });

    });

    themeBtn.addEventListener("mouseleave", () => {

        gsap.to(themeBtn, {

            scale: 1,

            duration: .2

        });

    });

}






// =======================================
// GSAP PART 2
// CHUNK 1
// REVEAL FUNCTION
// =======================================

function reveal(selector, options = {}) {

    gsap.utils.toArray(selector).forEach((element) => {

        gsap.from(element, {

            opacity: 0,

            duration: 1,

            ease: "power3.out",

            overwrite: "auto",

            scrollTrigger: {

                trigger: element,

                start: "top 85%",

                toggleActions: "play none none none",

                once: true

            },

            ...options

        });

    });

}

// =======================================
// CHUNK 2
// LEFT & RIGHT
// =======================================

reveal(".reveal-left", {

    x: -80

});


reveal(".reveal-right", {

    x: 80

});

// =======================================
// CHUNK 3
// TOP & BOTTOM
// =======================================

reveal(".reveal-top", {

    y: -80

});


reveal(".reveal-bottom", {

    y: 80

});

// =======================================
// CHUNK 4
// SCALE & FADE
// =======================================

reveal(".scale-in", {

    scale: .8

});


reveal(".fade-in");


// =======================================
// CHUNK 8
// FORM
// =======================================

reveal(".form-control", {

    y: 20

});


reveal(".form-select", {

    y: 20

});


reveal(".form-check", {

    x: -20

}); 

// =======================================
// CHUNK 10
// REFRESH
// =======================================

window.addEventListener("load", () => {

    ScrollTrigger.refresh();

});

console.log("✅ GSAP Part 2 Loaded");
// =======================================
// GSAP PART 3
// Hover & Interactive Effects
// =======================================


// =======================================
// MAGNETIC BUTTONS
// =======================================

document.querySelectorAll(".magnetic").forEach((button) => {

    button.addEventListener("mousemove", (e) => {

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {

            x: x * .25,
            y: y * .25,

            duration: .3,

            ease: "power2.out",

            overwrite: "auto"

        });

    });

    button.addEventListener("mouseleave", () => {

        gsap.to(button, {

            x: 0,
            y: 0,

            duration: .4,

            ease: "elastic.out(1,.4)",

            overwrite: "auto"

        });

    });

});



// =======================================
// BUTTON HOVER
// =======================================

document.querySelectorAll(".btn").forEach((button) => {

    button.addEventListener("mouseenter", () => {

        gsap.to(button, {

            scale: 1.05,

            duration: .2,

            overwrite: "auto"

        });

    });

    button.addEventListener("mouseleave", () => {

        gsap.to(button, {

            scale: 1,

            duration: .2,

            overwrite: "auto"

        });

    });

});



// =======================================
// DASHBOARD CARD HOVER
// =======================================

document.querySelectorAll(".dashboard-card").forEach((card) => {

    card.addEventListener("mouseenter", () => {

        gsap.to(card, {

            y: -10,

            scale: 1.02,

            duration: .3,

            overwrite: "auto"

        });

    });

    card.addEventListener("mouseleave", () => {

        gsap.to(card, {

            y: 0,

            scale: 1,

            duration: .3,

            overwrite: "auto"

        });

    });

});



// =======================================
// HERO CARD HOVER
// =======================================

const heroCard = document.querySelector(".hero-card");

if (heroCard) {

    heroCard.addEventListener("mouseenter", () => {

        gsap.to(heroCard, {

            scale: 1.03,

            duration: .3,

            overwrite: "auto"

        });

    });

    heroCard.addEventListener("mouseleave", () => {

        gsap.to(heroCard, {

            scale: 1,

            duration: .3,

            overwrite: "auto"

        });

    });

}



// =======================================
// MINI CARD
// =======================================

document.querySelectorAll(".mini-card").forEach((card) => {

    card.addEventListener("mouseenter", () => {

        gsap.to(card, {

            scale: 1.08,

            rotation: 3,

            duration: .3,

            overwrite: "auto"

        });

    });

    card.addEventListener("mouseleave", () => {

        gsap.to(card, {

            scale: 1,

            rotation: 0,

            duration: .3,

            overwrite: "auto"

        });

    });

});



// =======================================
// ICON ROTATION
// =======================================

document.querySelectorAll(".spin-hover").forEach((icon) => {

    icon.addEventListener("mouseenter", () => {

        gsap.to(icon, {

            rotation: "+=360",

            duration: .6,

            ease: "power2.out",

            overwrite: "auto"

        });

    });

});



// =======================================
// INPUT FOCUS
// =======================================

document.querySelectorAll(".form-control,.form-select").forEach((input) => {

    input.addEventListener("focus", () => {

        gsap.to(input, {

            scale: 1.02,

            duration: .2,

            overwrite: "auto"

        });

    });

    input.addEventListener("blur", () => {

        gsap.to(input, {

            scale: 1,

            duration: .2,

            overwrite: "auto"

        });

    });

});



// =======================================
// OUTPUT PANEL
// =======================================

const outputPanel = document.querySelector("#outputData");

if (outputPanel) {

    outputPanel.addEventListener("mouseenter", () => {

        gsap.to(outputPanel, {

            scale: 1.01,

            duration: .25,

            overwrite: "auto"

        });

    });

    outputPanel.addEventListener("mouseleave", () => {

        gsap.to(outputPanel, {

            scale: 1,

            duration: .25,

            overwrite: "auto"

        });

    });

}



// =======================================
// FOOTER ICONS
// =======================================

document.querySelectorAll("footer i").forEach((icon) => {

    icon.addEventListener("mouseenter", () => {

        gsap.to(icon, {

            scale: 1.3,

            rotation: 360,

            duration: .5,

            overwrite: "auto"

        });

    });

    icon.addEventListener("mouseleave", () => {

        gsap.to(icon, {

            scale: 1,

            rotation: 0,

            duration: .5,

            overwrite: "auto"

        });

    });

});



console.log("✅ GSAP Part 3 Loaded");

// =======================================
// GSAP PART 4
// Premium Effects
// =======================================


// =======================================
// CURSOR GLOW
// =======================================

const cursorGlow = document.querySelector("#cursorGlow");

if (cursorGlow) {

    window.addEventListener("mousemove", (e) => {

        gsap.to(cursorGlow, {

            x: e.clientX,

            y: e.clientY,

            duration: 0.15,

            ease: "power2.out",

            overwrite: "auto"

        });

    });

}



// =======================================
// SCROLL PROGRESS BAR
// =======================================

const progressBar = document.querySelector("#progressBar");

if (progressBar) {

    window.addEventListener("scroll", () => {

        const scrollTop = window.scrollY;

        const pageHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = (scrollTop / pageHeight) * 100;

        gsap.to(progressBar, {

            width: progress + "%",

            duration: 0.2,

            overwrite: "auto"

        });

    });

}



// =======================================
// COUNTER ANIMATION
// =======================================

function animateCounter(selector) {

    document.querySelectorAll(selector).forEach(counter => {

        const target = Number(counter.textContent);

        if (isNaN(target)) return;

        gsap.from(counter, {

            textContent: 0,

            duration: 2,

            ease: "power2.out",

            snap: { textContent: 1 },

            scrollTrigger: {

                trigger: counter,

                start: "top 85%",

                once: true

            }

        });

    });

}

animateCounter("#totalRegistrations");
animateCounter("#studyHours");
animateCounter("#quoteViewed");
animateCounter("#loginCount");



// =======================================
// PROGRESS BAR
// =======================================

function animateProgress(id) {

    const bar = document.querySelector(id);

    if (!bar) return;

    gsap.from(bar, {

        width: 0,

        duration: 1.5,

        ease: "power2.out",

        scrollTrigger: {

            trigger: bar,

            start: "top 90%",

            once: true

        }

    });

}

animateProgress("#goalProgress");
animateProgress("#studyProgress");



// =======================================
// QUOTE CHANGE
// =======================================

function animateQuote() {

    const quote = document.querySelector("#quoteText");

    if (!quote) return;

    gsap.fromTo(

        quote,

        {

            opacity: 0,

            y: 20

        },

        {

            opacity: 1,

            y: 0,

            duration: 0.5,

            overwrite: "auto"

        }

    );

}



// =======================================
// NOTIFICATION
// =======================================

function animateNotification() {

    const box = document.querySelector("#notificationBox");

    if (!box) return;

    gsap.fromTo(

        box,

        {

            y: -30,

            opacity: 0

        },

        {

            y: 0,

            opacity: 1,

            duration: 0.5,

            overwrite: "auto"

        }

    );

}



// =======================================
// TIMER PULSE
// =======================================

function pulseTimer(id) {

    const timer = document.querySelector(id);

    if (!timer) return;

    gsap.fromTo(

        timer,

        {

            scale: 1

        },

        {

            scale: 1.08,

            repeat: 1,

            yoyo: true,

            duration: 0.2,

            overwrite: "auto"

        }

    );

}



// =======================================
// CARD POP
// =======================================

function cardPop(card) {

    if (!card) return;

    gsap.fromTo(

        card,

        {

            scale: 0.85,

            opacity: 0

        },

        {

            scale: 1,

            opacity: 1,

            duration: 0.4,

            ease: "back.out(1.8)",

            overwrite: "auto"

        }

    );

}



// =======================================
// DELETE ANIMATION
// =======================================

function deleteCard(card) {

    if (!card) return;

    gsap.to(card, {

        scale: 0,

        opacity: 0,

        y: -40,

        duration: 0.35,

        ease: "power2.in",

        onComplete() {

            card.remove();

        }

    });

}



// =======================================
// SUCCESS POP
// =======================================

function successPop(element) {

    if (!element) return;

    gsap.fromTo(

        element,

        {

            scale: 0.6

        },

        {

            scale: 1,

            duration: 0.4,

            ease: "back.out(2)",

            overwrite: "auto"

        }

    );

}



// =======================================
// ERROR SHAKE
// =======================================

function errorShake(element) {

    if (!element) return;

    gsap.fromTo(

        element,

        {

            x: -8

        },

        {

            x: 8,

            repeat: 5,

            yoyo: true,

            duration: 0.05,

            clearProps: "x"

        }

    );

}



// =======================================
// REFRESH
// =======================================

window.addEventListener("load", () => {

    ScrollTrigger.refresh();

});

console.log("✅ GSAP Part 4 Loaded");
// =======================================
// GSAP PART 5
// Utility Functions
// =======================================



// =======================================
// SUCCESS ANIMATION
// =======================================

function successAnimation(element) {

    if (!element) return;

    gsap.fromTo(element,

        {
            scale: .7,
            opacity: 0
        },

        {
            scale: 1,
            opacity: 1,
            duration: .45,
            ease: "back.out(2)",

            overwrite: "auto"
        }

    );

}




// =======================================
// ERROR SHAKE
// =======================================

function errorAnimation(element) {

    if (!element) return;

    gsap.fromTo(element,

        {
            x: -8
        },

        {
            x: 8,

            repeat: 5,

            yoyo: true,

            duration: .05,

            clearProps: "x"

        }

    );

}




// =======================================
// BUTTON CLICK
// =======================================

function buttonClick(button) {

    if (!button) return;

    gsap.fromTo(button,

        {
            scale: .9
        },

        {
            scale: 1,

            duration: .2,

            overwrite: "auto"

        }

    );

}




// =======================================
// CARD POP
// =======================================

function cardAnimation(card) {

    if (!card) return;

    gsap.fromTo(card,

        {
            scale: .7,

            opacity: 0
        },

        {
            scale: 1,

            opacity: 1,

            duration: .45,

            ease: "back.out(2)",

            overwrite: "auto"

        }

    );

}




// =======================================
// DELETE CARD
// =======================================

function deleteAnimation(card) {

    if (!card) return;

    gsap.to(card, {

        scale: 0,

        opacity: 0,

        y: -40,

        duration: .35,

        ease: "power2.in",

        onComplete() {

            card.remove();

        }

    });

}




// =======================================
// INPUT SUCCESS
// =======================================

function inputSuccess(input) {

    if (!input) return;

    gsap.fromTo(input,

        {
            borderColor: "#198754"
        },

        {
            borderColor: "#ced4da",

            duration: 1

        }

    );

}




// =======================================
// INPUT ERROR
// =======================================

function inputError(input) {

    if (!input) return;

    gsap.fromTo(input,

        {
            borderColor: "#dc3545"
        },

        {
            borderColor: "#ced4da",

            duration: 1

        }

    );

}




// =======================================
// NOTIFICATION
// =======================================

function notificationAnimation(box) {

    if (!box) return;

    gsap.fromTo(box,

        {

            y: -30,

            opacity: 0

        },

        {

            y: 0,

            opacity: 1,

            duration: .4,

            overwrite: "auto"

        }

    );

}




// =======================================
// QUOTE
// =======================================

function quoteAnimation(element) {

    if (!element) return;

    gsap.fromTo(element,

        {

            opacity: 0,

            y: 20

        },

        {

            opacity: 1,

            y: 0,

            duration: .5,

            overwrite: "auto"

        }

    );

}




// =======================================
// TIMER PULSE
// =======================================

function timerPulse(timer) {

    if (!timer) return;

    gsap.fromTo(timer,

        {

            scale: 1

        },

        {

            scale: 1.08,

            repeat: 1,

            yoyo: true,

            duration: .2,

            overwrite: "auto"

        }

    );

}




// =======================================
// STORAGE SAVE
// =======================================

function storageAnimation(card) {

    if (!card) return;

    gsap.fromTo(card,

        {

            boxShadow: "0 0 0px gold"

        },

        {

            boxShadow: "0 0 25px gold",

            repeat: 1,

            yoyo: true,

            duration: .35

        }

    );

}




// =======================================
// CUSTOM COUNTER
// =======================================

function startCounter(element, target) {

    if (!element) return;

    let value = 0;

    const increment = Math.ceil(target / 80);

    const interval = setInterval(() => {

        value += increment;

        if (value >= target) {

            value = target;

            clearInterval(interval);

        }

        element.textContent = value;

    }, 20);

}




// =======================================
// PROGRESS BAR
// =======================================

function progressAnimation(bar, value) {

    if (!bar) return;

    gsap.to(bar, {

        width: value + "%",

        duration: 1,

        ease: "power2.out"

    });

}




// =======================================
// OUTPUT PANEL
// =======================================

function outputAnimation(output) {

    if (!output) return;

    gsap.fromTo(output,

        {

            opacity: 0,

            scale: .95

        },

        {

            opacity: 1,

            scale: 1,

            duration: .4

        }

    );

}




// =======================================
// ICON ROTATE
// =======================================

function iconSpin(icon) {

    if (!icon) return;

    gsap.to(icon, {

        rotation: "+=360",

        duration: .7,

        overwrite: "auto"

    });

}




// =======================================
// PAGE READY
// =======================================

console.log("✅ GSAP Utility Loaded");
// =======================================
// GSAP PART 6
// Production Ready
// =======================================


// =======================================
// MASTER CONTROLLER
// =======================================

const AnimationController = {

    pause() {

        gsap.globalTimeline.pause();

    },

    play() {

        gsap.globalTimeline.play();

    },

    resume() {

        gsap.globalTimeline.resume();

    },

    kill() {

        gsap.killTweensOf("*");

        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    },

    refresh() {

        ScrollTrigger.refresh();

    }

};




// =======================================
// WINDOW RESIZE
// =======================================

window.addEventListener("resize", () => {

    AnimationController.refresh();

});




// =======================================
// PAGE VISIBILITY
// =======================================

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        AnimationController.pause();

    } else {

        AnimationController.resume();

    }

});




// =======================================
// LAZY REFRESH
// =======================================

window.addEventListener("load", () => {

    setTimeout(() => {

        ScrollTrigger.refresh();

    }, 300);

});




// =======================================
// FLOATING ELEMENTS
// =======================================

gsap.utils.toArray(".floating").forEach((element, index) => {

    gsap.to(element, {

        y: -12,

        repeat: -1,

        yoyo: true,

        duration: 2 + (index * .3),

        ease: "sine.inOut",

        overwrite: "auto"

    });

});




// =======================================
// GLOW HOVER
// =======================================

document.querySelectorAll(".glow-hover").forEach(card => {

    card.addEventListener("mouseenter", () => {

        gsap.to(card, {

            boxShadow:

                "0 15px 40px rgba(255,193,7,.35)",

            duration: .3,

            overwrite: "auto"

        });

    });



    card.addEventListener("mouseleave", () => {

        gsap.to(card, {

            boxShadow: "none",

            duration: .3,

            overwrite: "auto"

        });

    });

});




// =======================================
// SPIN HOVER
// =======================================

document.querySelectorAll(".spin-hover").forEach(icon => {

    icon.addEventListener("mouseenter", () => {

        gsap.to(icon, {

            rotation: "+=360",

            duration: .7,

            overwrite: "auto"

        });

    });

});




// =======================================
// AUTO REFRESH TRIGGER
// =======================================

setInterval(() => {

    ScrollTrigger.refresh();

}, 10000);




// =======================================
// PERFORMANCE
// =======================================

gsap.config({

    force3D: true,

    nullTargetWarn: false

});




// =======================================
// MOBILE
// =======================================

if (window.innerWidth < 768) {

    gsap.globalTimeline.timeScale(.9);

}




// =======================================
// DESKTOP
// =======================================

if (window.innerWidth > 992) {

    gsap.globalTimeline.timeScale(1);

}




// =======================================
// PAGE UNLOAD
// =======================================

window.addEventListener("beforeunload", () => {

    AnimationController.kill();

});




// =======================================
// DEBUG
// =======================================

console.log("GSAP Version :", gsap.version);

console.log("ScrollTrigger :", ScrollTrigger);

console.log("Animations :", ScrollTrigger.getAll().length);




// =======================================
// READY
// =======================================
