window.addEventListener("scroll",()=>{
    const scrollDiv = document.querySelector(".barraNavegacao");

    if(window.scrollY>50){
        scrollDiv.classList.add("expandido");


    }else{
        scrollDiv.classList.remove("expandido");
    }
});