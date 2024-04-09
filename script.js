function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

function navAnimation() {
    var nav = document.querySelector("nav")

    nav.addEventListener("mouseenter", function () {
        var tl = gsap.timeline()

        tl.to(".nav-bottom", {
            height: "23vh",
            duration: 0.5
        })
        tl.to(".nav-2 h5", {
            display: "block",
            duration: 0.1

        })
        tl.to(".nav-2 h5 span", {
            y: 0,
            duration: 0.3,
            stagger: {
                amount: 0.5
            }
        })
    })

    nav.addEventListener("mouseleave", function () {
        var tl = gsap.timeline()

        tl.to(".nav-2 h5 span", {
            y: 25,
            duration: 0.3,
            stagger: {
                amount: 0.1
            }
        })
        tl.to(".nav-2 h5", {
            display: "none",
            duration: 0.1
        })
        tl.to(".nav-bottom", {
            height: 0,
            duration: 0.1
        })
    })
}

function Right_elem() {

    var rightelem = document.querySelectorAll(".right-elem")

    rightelem.forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            // console.log(elem.childNodes) // childnodes help to check child node which are available in elem you can use elem.childNodes [] to know no of child like which no. of child you want to print or check
            // elem.childNodes[3].style.opacity = 1\
            gsap.to(elem.childNodes[3], {
                opacity: 1,
                scale: 1
            })
        })
        elem.addEventListener("mouseleave", function () {
            gsap.to(elem.childNodes[3], {
                opacity: 0,
                scale: 0
            })
        })
        elem.addEventListener("mousemove", function (dets) {
            gsap.to(elem.childNodes[3], {
                x: dets.x - elem.getBoundingClientRect().x - 40,
                y: dets.y - elem.getBoundingClientRect().y - 100
            })
        })
    })
}

function VideoAnimation() {
    var sec3center = document.querySelector(".sec_3_center")
    var video = document.querySelector(".section3 video")

    sec3center.addEventListener("click", function () {
        video.play()
        gsap.to(video, {
            transform: "scaleX(1) scaleY(1)",
            opacity: 1,
            borderRadius: 0
        })
    })

    video.addEventListener("click", function () {
        video.pause()
        gsap.to(video, {
            transform: "scaleX(0) scaleY(0)",
            opacity: 0,
            borderRadius: "30px"
        })
    })
}

function boxVideo(){
var rightBox = document.querySelectorAll(".rightBox")
var rightVideo = document.querySelectorAll(".rightBox video")

rightBox.forEach(function(elem){
    elem.addEventListener("mouseenter", function(){
        elem.childNodes[3].style.opacity=1,
        elem.childNodes[3].play()
    })

    elem.addEventListener("mouseleave", function(){
        elem.childNodes[3].style.opacity=0,
        elem.childNodes[3].load() // ever time you leave video get reset insted of pause
    })
})
}

function scrollAnimation(){
    gsap.to("#btm7-p2 h4, #btm7-p3 h4, #btm7-p4 h4",{
        x:90,
        duration:1,
        stagger:{
            amount:-1
        },
        scrollTrigger:{
            trigger:"#btm7-p2, #btm7-p3, #btm7-p4",
            scroller:"#main",
            // markers:true,
            start:"top 80%",
            end:"top 0",
            scrub:true
        }
    })
}

function LoadingAnimation(){
    var tl = gsap.timeline()
tl.from(".section1",{
    opacity:0,
    duration:0.3,
    delay:0.2
})
tl.from(".section1",{
    transform:"scaleX(0.7) scaleY(0.2) translateY(80%)",
    borderRadius:"50px",
    duration:2,
    ease:"expo.out"
})
tl.from("nav",{
    opacity:0,
    delay:0.2
})
tl.from(".section1 h1, .section1 p, .section1 div",{
    opacity:0,
    duration:0.4,
    stagger:0.2
})
}

LoadingAnimation()
locomotiveAnimation()
navAnimation()
Right_elem()
VideoAnimation()
boxVideo()
scrollAnimation()