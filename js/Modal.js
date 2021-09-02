class Modal{
    constructor(container, title){
        this.container = container;
        this.title = title;
        this.functionButtonAcept = function(e){};
        this.classModal = "none";
        this.content = document.createElement("div");
        
        this.createModal();
    }

    createModal = () =>{
        // Modal
        let modal = document.createElement("div");
        modal.classList.add("modal");
        modal.classList.add(this.classModal);

        // Menu
        let menu = document.createElement("div");
        menu.classList.add("modal-menu");

        let title = document.createElement("h3");
        title.innerText = this.title;

        let closebutton = document.createElement("input");
        closebutton.setAttribute("type","button");
        closebutton.setAttribute("value","x");
        closebutton.className = "btn btn-circle--dark";
        closebutton.addEventListener("click",this.hide);
        
        menu.appendChild(title);
        menu.appendChild(closebutton);

        // Form
        let form = document.createElement("form");
        form.className = "form";
        
        let buttonsContainer = document.createElement("div");
        buttonsContainer.className = "modal-buttons";
        
        let cancelButton = document.createElement("input");
        cancelButton.className = "btn btn-cancel";
        cancelButton.setAttribute("type","button");
        cancelButton.setAttribute("value","Cancel");
        cancelButton.addEventListener("click",this.hide);
        
        let aceptButton = document.createElement("input");
        aceptButton.className = "btn btn-ok";
        aceptButton.setAttribute("type","submit");
        aceptButton.setAttribute("value","Acept");
        aceptButton.addEventListener("click", e => this.functionButtonAcept(e));
            
        buttonsContainer.appendChild(cancelButton);
        buttonsContainer.appendChild(aceptButton);
        form.appendChild(this.content);
        form.appendChild(buttonsContainer);
        
        // Content
        let content = document.createElement("div");
        content.className = "modal-content";
        content.appendChild(form);

        // Agregar a modal
        modal.appendChild(menu);
        modal.appendChild(content);


        this.modal = modal
    }

    getHtml = () =>{
        return this.modal;
    }

    show = () => {
        let md = this.getHtml();
        this.container.appendChild(md);
        this.container.style.display = "flex";
    }

    hide = () => {
        this.container.style.display = "none";
        this.container.innerHTML = "";
    }

}