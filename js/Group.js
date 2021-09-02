class Group{
    constructor(container, title, status, type, progress){
        this.container = container;
        this.title = title;
        this.status = status
        this.type = type;
        this.progress = progress;
        this.progressBar = "";
        this.createGroup();

        let obj = JSON.parse(localStorage.getItem(this.title));
        let childsCheck = obj.childs.filter(x => x.check === true).length;
        let childsNum = obj.childs.length;
        let promedio = childsNum === 0 ? 0 : childsCheck * 100 / childsNum ;
        if (this.type === "check"){
            this.group.querySelector(".progress-group").value -= promedio;
        }

        this.group.addEventListener("click",e => {
            e.stopPropagation();
            window.location = `groupView.html?url=${this.title}`;
        });
    }

    createGroup = () =>{
        // Group
        let group = document.createElement("div");
        group.className = `${this.type}-group card`;
        this.progressBar = this.type !== "note" ? `<progress class="progress-group" min="0" max="100" value="${this.progress}"></progress>` : "";

        group.innerHTML = `
        <div class="status status-${this.status}"></div>
        <h5 class="group-title">${this.title}</h5>
        ${this.progressBar}
        `;

        let deleteButton = document.createElement("input");
        deleteButton.setAttribute("type","button");
        deleteButton.setAttribute("value","x");
        deleteButton.className = "btn btn-delete delete-group";
        deleteButton.style.width = "25px";
        deleteButton.style.height = "25px";
        deleteButton.style.zIndex = 10;
        deleteButton.addEventListener("click", e => {
            e.stopPropagation();
            let ask = confirm(`Delete ${this.title}?`);
            if (ask){
                let title = group.querySelector("h5").innerText;
                localStorage.removeItem(title);
                window.location.reload();
            }
        });
        
        group.appendChild(deleteButton);
        this.group = group;
    }

    getHtml = () =>{
        return this.group;
    }

    addToContaier = () =>{
        this.container.appendChild(this.group);
    }

}