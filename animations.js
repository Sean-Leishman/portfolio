
let options = {
    threshold: .8,
}

const defaultObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting){
            let child = entry.target; 
            let parent = window.getComputedStyle(child.parentElement).display;

            if (parent === 'grid'){
                let childStyle = window.getComputedStyle(child)
                let row = childStyle.getPropertyValue('grid-column-start');
                let column = childStyle.getPropertyValue('grid-row-start');

                if (row === "span 2"){
                    entry.target.classList.add("animate-left")
                }
                if (column === "span 2"){
                    entry.target.classList.add("animate-right");
                }
            }

            entry.target.classList.add("show");
        }
        else{
            //entry.target.classList.remove("show");
        }
    })
}, options)

const animateLeftObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting){
            entry.target.classList.add("animate-left");
        }
        else{
            //entry.target.classList.remove("show");
        }
    })
}, options)

function addProjectClasses(){
    if (window.innerWidth > 1400){
        document.querySelectorAll(".project-card:nth-child(n)").forEach((el) => {
            el.classList.add('animate-left')
        })
        document.querySelectorAll(".project-card:nth-child(3n+2)").forEach((el) => {
            el.classList.remove('animate-left')
            el.classList.add('animate-right')
        })
    }
    else if (window.innerWidth <= 1400 && window.innerWidth > 800){
        document.querySelectorAll(".project-card:nth-child(3n+1)").forEach((el) => {
            el.classList.add('animate-left')
        })
    }
    else if (window.innerWidth <= 800 && window.innerWidth > 500){
        document.querySelectorAll(".project-card:nth-child(odd)").forEach((el) => {
            el.classList.add('animate-left')
        })
        document.querySelectorAll(".project-card:nth-child(even)").forEach((el) => {
            el.classList.add('animate-right')
        })
    }
    else if (window.innerWidth <= 500){
        document.querySelectorAll(".project-card:nth-child(n)").forEach((el) => {
            el.classList.add('animate-down')
        })
    }

}

window.onload = function() {
    addProjectClasses();
}

window.resize = function() {
    addProjectClasses();
}

window.addEventListener('resize', () => {
    
})

const hiddenElements = document.querySelectorAll(".hidden")
const projectsAnimateLeft = document.querySelectorAll(".project-card:nth-child(3n+1)")

hiddenElements.forEach(element => defaultObserver.observe(element));
projectsAnimateLeft.forEach(element => animateLeftObserver.observe(element))

const projectArea = document.querySelector(".project-area");
const nextButtons = document.querySelectorAll(".next-button");
const prevButtons = document.querySelectorAll(".prev-button");

const projectGrids = document.querySelectorAll(".project-grid-container");
const [projectGridLeft, projectGridRight] = projectGrids;

let currentButtonIndex = 0;

prevButtons.forEach(prevButton => {
    prevButton.addEventListener('click', (e) => {
        projectArea.classList.remove("show-left");
        projectArea.classList.add("show-right");

        projectGridLeft.classList.remove("hidden-button");
        projectGridLeft.classList.add("show-button");
        projectGridRight.classList.remove("show-button");
        projectGridRight.classList.add("hidden-button");

        prevButton.classList.add("hidden-button");
        prevButton.classList.remove("show-button");
        currentButtonIndex--;
        nextButtons[currentButtonIndex].classList.remove("hidden-button");
        nextButtons[currentButtonIndex].classList.add("show-button");
})});

nextButtons.forEach(nextButton => {
    nextButton.addEventListener('click', (e) => {
        projectArea.classList.remove("show-right");
        projectArea.classList.add("show-left");

        projectGridLeft.classList.remove("show-button");
        projectGridLeft.classList.add("hidden-button");
        projectGridRight.classList.remove("hidden-button");
        projectGridRight.classList.add("show-button");

        nextButton.classList.add("hidden-button");
        nextButton.classList.remove("show-button");
        currentButtonIndex++;
        prevButtons[currentButtonIndex].classList.remove("hidden-button");
        prevButtons[currentButtonIndex].classList.add("show-button");
})});

