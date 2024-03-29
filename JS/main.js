"use strict"
//Toggle Class
document.querySelector(".toggle-setting .fa-gear").onclick = function() {

    //Toggle For Class Gear To Spin
    this.classList.toggle("fa-spin");

    //Toggle For Settings-box
    document.querySelector(".settings-box").classList.toggle("open");

};

//Check If Local Storage has Color

let mainColor = localStorage.getItem('color_option');
if(mainColor !==null){
    document.documentElement.style.setProperty('--main--color' ,mainColor);

    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");

        if (element.dataset.color == mainColor){
            element.classList.add("active");
        }
    });
}


    // Handle Avtive Function For Any Class TO Add Active Or Not!
    function handelActive(ev){

        ev.target.parentElement.querySelectorAll(".active").forEach(element =>{

            element.classList.remove("active");

        });

        ev.target.classList.add("active");

    };



    // Switch Colors

    const colorLi = document.querySelectorAll(".colors-list li");

    colorLi.forEach(li =>{
        
        li.addEventListener("click", (e) =>{

            document.documentElement.style.setProperty('--main--color' ,e.target.dataset.color);

            localStorage.setItem('color_option' ,e.target.dataset.color );

            handelActive(e);
        });
    });

    // Switch Random Back Option

    let backGroundOption = true;

    let backgroundInterval;

    let backgroundLocalItem = localStorage.getItem("back_option");

    

    if (backgroundLocalItem !== null) {

        document.querySelectorAll(".background-option span").forEach(ele =>{

            ele.classList.remove("active");
        });

        if (backgroundLocalItem === 'true') {

            backGroundOption = true;
            document.querySelector(".option-box .background-option .yes").classList.add("active");

        } else {

            backGroundOption = false;
            document.querySelector(".option-box .background-option .no").classList.add("active");
        };
    };

    


    const randomBackEl = document.querySelectorAll(".option-box .background-option span");

    randomBackEl.forEach(span =>{
        
        span.addEventListener("click", (ev) =>{
            
            handelActive(ev);

            //Random BackGround Option
            if (ev.target.dataset.background === 'yes') {

                randomizeImgs();
                localStorage.setItem("back_option" , true);
                

            } else{

                clearInterval(backgroundInterval);
                localStorage.setItem("back_option" , false);
            }
        
        });
        
    });

    
        


//Select landing Page
let landingPage = document.querySelector(".landing-page");

//Get Array Of Imgs
let imgsArray = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg","06.jpg"];

function randomizeImgs() {
    
    if (backGroundOption === true){
    
    backgroundInterval = setInterval( () =>{

    //Get Random Number
    let randomNumber = Math.floor(Math.random() * imgsArray.length);
    
    //Change Background Image Url
    landingPage.style.backgroundImage = 'url("images/LandingPage/'+ imgsArray[randomNumber] +'")';
    document.getElementById("landing").style.transition = " 3s all ease-in-out";
    },4000);
    };
};
    randomizeImgs();

    //Select services Selector

    let ourservices = document.querySelector(".services");

    window.onscroll = () => {

        //services Offset Top
    let ourservicesOffsetTop = ourservices.offsetTop;
        
        //Outer Height
    let ourservicesOuterHeight = ourservices.offsetHeight;
    
        //Window Height
    let windowHeight = this.innerHeight;

        //windowScrollTop
    let windowScrollTop = this.pageYOffset;
        
    if (windowScrollTop > ((ourservicesOffsetTop + ourservicesOuterHeight) - windowHeight)) {
        
        let allservices = document.querySelectorAll(".service-box .service-progress span");

        allservices.forEach(service => {

            service.style.width = service.dataset.progress;

        });
    }
};

    // Start Bullets

    let ourBullets = document.querySelectorAll(".nav-bullets .bullet");

    ourBullets.forEach(bullet => {

        bullet.addEventListener('click' , (e) =>{

            document.querySelector(e.target.dataset.section).scrollIntoView({behavior:'smooth'});
        });

    });
    
    // Switch Bullets

    let bulletsSpan = document.querySelectorAll(".bullets-option span");

    let bulletsContain = document.querySelector(".nav-bullets");

    let bulletsLocalItem = localStorage.getItem("bullets_option");

    if (bulletsLocalItem !== null ) {

        bulletsSpan.forEach(span =>{
            span.classList.remove("active");
        });

        if (bulletsLocalItem === 'block'){

            bulletsContain.style.display = 'block';

            document.querySelector(".bullets-option .yes").classList.add("active")

        }else{

            bulletsContain.style.display = 'none';

            document.querySelector(".bullets-option .no").classList.add("active")
        }

    }

    bulletsSpan.forEach(span =>{

        span.addEventListener("click" , (e) => {

            if (span.dataset.display === 'show') {

                bulletsContain.style.display = 'block';

                localStorage.setItem("bullets_option" , 'block');

            }else{
                bulletsContain.style.display = 'none';

                localStorage.setItem("bullets_option" , 'none');
            }

            handelActive(e);
        });

    });

    //Start Reset Option

    document.querySelector(".reset-options").onclick = () =>{

        localStorage.removeItem("color_option");
        localStorage.removeItem("bullets_option");
        localStorage.removeItem("back_option");
        //Reload The Window

        window.location.reload();
    };