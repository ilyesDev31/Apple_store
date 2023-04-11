const header = document.querySelector('header');
const burger = document.querySelector('.burger');
const burgerBars = burger.querySelectorAll("span");
const menu = document.querySelector('header .container > ul');
const menuLi = menu.querySelectorAll("li");
const extraMenu = document.querySelector('.extra-menu');
const extraMenuDivs = extraMenu.querySelectorAll('.container > div');
let SlidesInitialValue = [120,120,120,120,120,120,120];
let opened = false;

window.addEventListener('DOMContentLoaded', function(){
this.scroll(0,6000)
    
    opened = false;
    document.body.style.overflowY = "scroll";
    removeClassFromAList(burgerBars, "active");
    menu.classList.remove('active');
});

burger.addEventListener('click', handleMenu);

// burget and all concerning it
function handleMenu(){
    opened = !opened;
    if(opened){
        document.body.style.overflowY = "hidden";
      addClassForList(burgerBars, "active");
      menu.classList.add('active');
      header.classList.add('active');
    }else{
        document.body.style.overflowY = "scroll";
        removeClassFromAList(burgerBars, "active");
        menu.classList.remove('active');
        header.classList.remove('active');
        menu.classList.remove('removeLi');
    extraMenu.classList.remove('active');
    document.querySelector('.blur').style.filter ="blur(0px)";
    }
}
// function to add a class to a list
function addClassForList(list, classs){
    list.forEach(li =>{
        li.classList.add(classs);
    })
}
// function to remove a class from a list
function removeClassFromAList(list, classs){
    list.forEach(li =>{
        li.classList.remove(classs)
    })
}

menuLi.forEach(li =>{
    li.addEventListener('click',function(){
        menu.classList.add('removeLi');
        if(!extraMenu.classList.contains('active')){
            document.querySelector('.blur').style.filter ="blur(8px)"
        extraMenu.classList.add('active');
            header.classList.add('active');
        }
        removeClassFromAList(extraMenuDivs, "active");
        extraMenuDivs.forEach(div =>{
            if(div.classList.contains(li.className)){
                div.classList.add('active');
                console.log(li)
            }
        })
    })
});

window.addEventListener('mousemove', shutDownMenu);

function shutDownMenu(e){
let menuY = extraMenu.getBoundingClientRect().height + extraMenu.getBoundingClientRect().y;
if(window.innerWidth > 992){
    if(e.clientY >= menuY || e.clientY <=0.1 || e.clientX <=3){
        extraMenu.classList.remove('active');
        header.classList.remove('active');
        document.querySelector('.blur').style.filter ="blur(0px)";
    }
}

}

// slider function
const  buttonAdd = [
    document.querySelectorAll('.slider-1 .buttons > div'),
    document.querySelectorAll('.slider-2 .buttons > div'),
    document.querySelectorAll('.slider-3 .buttons > div'),
    document.querySelectorAll('.slider-4 .buttons > div'),
    document.querySelectorAll('.slider-5 .buttons > div'),
    document.querySelectorAll('.slider-6 .buttons > div'),
    document.querySelectorAll('.slider-7 .buttons > div'),
]
const slides_ = [
    document.querySelectorAll('.slider-1 .cont-custome > div'),
    document.querySelectorAll('.slider-2 .cont-custome > div'),
    document.querySelectorAll('.slider-3 .cont-custome > div'),
    document.querySelectorAll('.slider-4 .cont-custome > div'),
    document.querySelectorAll('.slider-5 .cont-custome > div'),
    document.querySelectorAll('.slider-6 .cont-custome > div'),
    document.querySelectorAll('.slider-7 .cont-custome > div'),
]

let isSliding = false;

function slide(imgWidth , gap,lastImgPos, buttons,event){
    buttons[0].classList.remove('active');
    if(isSliding === true) return;
    isSliding = true;
    setTimeout(() =>{
        isSliding = false;
    },500)
    if(lastImgPos <= window.innerWidth){
        buttons[1].classList.add('active');
    }
    let sliderNumber = +(event.target.parentElement.parentElement.classList[1][7]-1);
    console.log(typeof sliderNumber)

const SliderContainer = document.querySelector(`.slider-${+(sliderNumber+1).toString()} .cont-custome`);
if(sliderNumber === 6  ){
    if(window.innerWidth >= 1200){
        SlidesInitialValue[sliderNumber] -= 50
    }else{
        SlidesInitialValue[sliderNumber]-= (imgWidth  + gap-10);
    }
}else{
    SlidesInitialValue[sliderNumber]-= (imgWidth  + gap-10);
}
    SliderContainer.style.transform = `translateX(${SlidesInitialValue[sliderNumber]}px)`;

}
 

function slideMinus(imgWidth , gap, firstPos, buttons,event){
    if(isSliding === true) return;
    isSliding = true;
    setTimeout(() =>{
        isSliding = false;
    },500);
    let sliderNumber =+(event.target.parentElement.parentElement.classList[1][7]-1).toString();
    const SliderContainer = document.querySelector(`.slider-${+(sliderNumber+1).toString()} .cont-custome`);
    buttons[1].classList.remove('active');
if(SlidesInitialValue[sliderNumber]+(imgWidth  + gap) >= 120 && !buttons[0].classList.contains('active')){
    buttons[0].classList.add('active');
}
if(SlidesInitialValue[sliderNumber] < firstPos){
    if(sliderNumber === "7" && window.innerWidth > 992){
        SlidesInitialValue[sliderNumber]+= 50;
    }else{
        SlidesInitialValue[sliderNumber]+= (imgWidth  + gap-10);
    }
    SliderContainer.style.transform = `translateX(${SlidesInitialValue[sliderNumber]}px)`;
   
}
}

for(let i = 0; i < buttonAdd.length; i++){
    let devision = 1;
    if(i === 4 || i === 2) devision = 1.5;
    if(i === 5) devision = 1.4;

    buttonAdd[i][1].addEventListener('click', function(e){
        slide(slides_[i][0].getBoundingClientRect().width/devision,40,slides_[i][slides_[i].length-1].getBoundingClientRect().x,buttonAdd[i],e);
    })
    buttonAdd[i][0].addEventListener('click', function(e){
        slideMinus(slides_[i][0].getBoundingClientRect().width/devision,40,120,buttonAdd[i],e)
    });
}

// phone colors 
const phoneColor = document.querySelectorAll(".phone-colors > div");
phoneColor.forEach(col =>{
    col.style.backgroundColor = col.dataset.color;
});

