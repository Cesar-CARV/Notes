const buttonText = document.querySelector(".btn_text");
const buttonAdd = document.querySelector(".btn_add");
const buttonCheck = document.querySelector(".btn_check");
const containerModal = document.querySelector(".modal-container");
const containerGroup = document.querySelector(".notes-container");


buttonAdd.addEventListener("click",(e)=>{
    showHideButtons();
});

buttonText.addEventListener("click", e=>{
    let modal = new ModalAddGroup(containerModal, "Add Group", "note");
    modal.show();
    showHideButtons();
});

buttonCheck.addEventListener("click", e=>{
    let modal = new ModalAddGroup(containerModal, "Add Group", "check");
    modal.show();
    showHideButtons();
});

const showHideButtons = () =>{
    buttonAdd.classList.toggle("btn_add--checked");

    if (buttonAdd.classList.contains("btn_add--checked")){
        buttonText.style.display = "block";
        buttonText.style.top = "-50px";
        buttonText.style.left = "calc(50% - 70px)";
        
        buttonCheck.style.display = "block";
        buttonCheck.style.top = "-50px";
        buttonCheck.style.left = "calc(50% + 20px)";
    }
    else{
        buttonText.style.display = "none";
        buttonText.style.top = "10px";
        buttonText.style.left = "calc(50% - 25px)";
        
        buttonCheck.style.display = "none";
        buttonCheck.style.top = "10px";
        buttonCheck.style.left = "calc(50% - 25px)";
    }
}


window.onload = () =>{
    for (let i = 0; i < localStorage.length; i++){
        let groupJson = JSON.parse(localStorage.getItem(localStorage.key(i)));
        let group = new Group(containerGroup, groupJson.title, groupJson.status, groupJson.type, groupJson.progress);
        group.addToContaier();
    }
        
}



