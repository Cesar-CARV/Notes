const buttonConfig = document.querySelector(".btn_config");
const buttonAdd = document.querySelector(".btn_add");
const containerModal = document.querySelector(".modal-container");
const containerList = document.querySelector(".list-notes");


const getData = () =>{
    let paramstr = window.location.search.substr(1);
    let paramarr = paramstr.split ("&");
    let params = {};
    
    for ( let i = 0; i < paramarr.length; i++) {
        let tmparr = paramarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    if (params['url']) {
        if (params['url'].includes("%20")){
            while (params['url'].includes("%20")){
                params['url'] = params['url'].replace("%20"," ");
            }
        }

        return JSON.parse(localStorage.getItem(params['url'].replace("%"," ")));

    } else {
        // console.log('No se envió el parámetro variable');
        return null;
    }
}

window.onload = () => {
    let group = getData();
    
    if (group !== null){
        //group.type === "note" ? buttonAdd.parentElement.style.display = "none" : null;
        buttonAdd.parentElement.style.display = group.type === "note" ?  "none" : null;
        for (let i = 0; i < group['childs'].length; i++) {
            const element = group['childs'][i];
            let card = new Card(
                containerList,
                group.type === "note" ? group.title : element.title,
                group.type,
                element.text,
                element.check);
            card.show();
        }
    }
    else{
        buttonAdd.style.display = "none";
        containerModal.innerHTML = `
        <div class="modal none">
            <div class="modal-menu">
                <h3 style="color: #F55;">Error</h3>
            </div>
            <div class="modal-content">
                <form class="form">
                    <div>
                        <center>Group Not Found :c</center>
                        <br>
                    </div>
                    <div class="modal-buttons">
                        <!--input class="btn btn-ok" type="submit" value="Acept"-->
                        <!--a href="index.html" class="btn btn-ok">Acept</a-->
                        <a href="index.html"><input class="btn btn-cancel" type="button" value="Back"></a>
                    </div>
                </form>
            </div>
        </div>
        `;
        containerModal.style.display = "flex";
    }
}

buttonConfig.addEventListener("click",(e)=>{
    if (containerModal.style.display === "none"){
        let data = getData();
        let modal = new ModalAddGroup(containerModal, "Edit Note", data.type, data.title, data.status, true);
        modal.show();
    }
});

buttonAdd.addEventListener("click", e => {
    if (containerModal.style.display === "none"){
        let modal = new ModalAddCard(containerModal, "Edit Note", "note");
        modal.show();
    }
});

