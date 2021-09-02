class Card{
    constructor(container, title, type, text = "", check){
        this.container = container;
        this.title = title;
        this.type = type;
        this.text = text;
        this.checked = check;
        this.functionButtonAcept = function(e){};
        
        this.createCard();
    }

    createCard = () =>{
        // Card
        let card = document.createElement("div");
        card.classList.add(this.type + "-item");
        card.classList.add("list-item");

        // Menu
        if (this.type === "check"){

            let menu = document.createElement("div");
            menu.classList.add("list-item_menu");
            
            let checkBox = document.createElement("input");
            checkBox.setAttribute("type","checkbox");
            (this.checked === true) ? checkBox.setAttribute("checked","true"): null;
            checkBox.className = "btn checkbox-item";

            checkBox.addEventListener("click", e => {
                let updateParent = getData();
                let update = getData().childs.filter(x => x.title === this.title)[0];
                let index = -1;
                for (let i = 0; i < updateParent.childs.length; i++){
                    if (updateParent.childs[i].title === this.title){
                        index = i;
                        break;
                    }
                }
                update.check = e.target.checked;
                updateParent.childs[index] = update;                
                localStorage.setItem(updateParent.title,JSON.stringify(updateParent));
            });

            let title = document.createElement("h5");
            title.className = "group-title";
            title.innerText = this.title;

            let deletebutton = document.createElement("input");
            deletebutton.setAttribute("type","button");
            deletebutton.setAttribute("value","x");
            deletebutton.className = "btn btn-delete";
            deletebutton.addEventListener("click", e => {
                let updateParent = getData();
                let index = -1;
                for (let i = 0; i < updateParent.childs.length; i++){
                    if (updateParent.childs[i].title === this.title){
                        index = i;
                        break;
                    }
                }
                updateParent.childs.splice(index,1);
                localStorage.setItem(updateParent.title,JSON.stringify(updateParent));
                window.location.reload();
            });
            
            menu.appendChild(checkBox);
            menu.appendChild(title);
            menu.appendChild(deletebutton);

             // Agregar a modal
            card.appendChild(menu);
        }
        else{

            let menu = document.createElement("div");
            menu.classList.add("list-item_menu");
            
            let editButton = document.createElement("input");
            editButton.setAttribute("value","✏");
            editButton.setAttribute("type","button");
            editButton.className = "btn btn_edit btn-circle--dark";
            editButton.addEventListener("click", (e) => {
                let text = card.querySelector("p");
                if (e.target.classList.contains("btn-circle--dark")){
                    text.setAttribute("contenteditable","true");
                    text.focus();
                    e.target.className = "btn btn_edit btn-ok";
                    e.target.value = "save";
                }
                else if (e.target.classList.contains("btn-ok")){
                    let updateParent = getData();                
                    updateParent.childs[0].text = text.innerText;
                    localStorage.setItem(updateParent.title,JSON.stringify(updateParent));
                    window.location.reload();
                    e.target.className = "btn btn_edit btn-circle--dark";
                    e.target.value = "✏";
                }
            });

            let title = document.createElement("h5");
            title.className = "group-title";
            title.innerText = this.title;

            
            menu.appendChild(editButton);
            menu.appendChild(title);
            
            let text = document.createElement("p");
            text.className = "group-title";
            text.innerText = this.text;
            
            // Agregar a modal
            card.appendChild(menu);
            card.appendChild(text);
        }

        this.card = card;
    }

    getHtml = () =>{
        return this.card;
    }

    show = () => {
        let cd = this.getHtml();
        this.container.appendChild(cd);
    }

}