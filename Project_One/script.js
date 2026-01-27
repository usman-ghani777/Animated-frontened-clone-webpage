// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

let xscale = 1;
let yscale = 1;
let xprev = 0;
let yprev = 0;
let timeout;

function circle_skew() {
    window.addEventListener("mousemove", function (e) {
        clearTimeout(timeout);

        // Use Math.abs to ensure the scale is always positive
        // and divide by a factor (like 10 or 20) to make the skew subtle
        let xdiff = e.clientX - xprev;
        let ydiff = e.clientY - yprev;

        xscale = gsap.utils.clamp(0.8, 1.2, 1 + Math.abs(xdiff) * 0.01);
        yscale = gsap.utils.clamp(0.8, 1.2, 1 + Math.abs(ydiff) * 0.01);

        xprev = e.clientX;
        yprev = e.clientY;

        circleMouseFollow(xscale, yscale, e);

        timeout = setTimeout(function () {
            document.querySelector("#minicircle").style.transform = 
                `translate(${e.clientX}px, ${e.clientY}px) scale(1, 1)`;
        }, 100);
    });
}

function circleMouseFollow(xscale, yscale, e) {
    document.querySelector("#minicircle").style.transform = 
        `translate(${e.clientX}px, ${e.clientY}px) scale(${xscale}, ${yscale})`;
}

// Combine all animations into a single initialization function
function init() {
    circle_skew();
    animateHero();
    // navanimations(); // Make sure this function is defined
}

init();
function animateHero() {
    const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.5 }
    });

    tl.from("#nav", { y: -20, opacity: 0, duration: 1 }) // Common nav entrance
      .from("#heading", {
          y: 100,      
          opacity: 0,
          skewY: 7,    
          stagger: 0.1
      }, "-=1")
      .from("#blocktext", { y: 50, opacity: 0 }, "-=1")      
      .from("#small_headings, #hero_footer", {
          y: 20,       
          opacity: 0,
          stagger: 0.2,
          ease: "back.out(1.7)" 
      }, "-=0.7");
}


document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;
  elem.addEventListener("mouseleave", function (details) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: "power3.out",
      duration: 0.5,
    });
  });
  elem.addEventListener("mousemove", function (details) {
    // Calculate the difference between the mouse Y position and the top of the element
    var diff = details.clientY - elem.getBoundingClientRect().top;   
    // Logic for rotation: current mouse X minus previous mouse X
    diffrot = details.clientX - rotate;
    rotate = details.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: "power3.out",
      top: diff, // Centers the image vertically on cursor
      left: details.clientX, // Centers the image horizontally on cursor
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5), // Adds the "swing" effect
    });
  });
});