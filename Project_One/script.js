// used for locomootive scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
function circleMouseFollow(){
    window.addEventListener('mousemove', function(e){
        // Center the circle on cursor
       document.getElementById('minicircle').style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
}
circleMouseFollow();
