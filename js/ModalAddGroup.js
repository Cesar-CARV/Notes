class ModalAddGroup extends Modal{
    
    constructor(container, title ,type, text="", status="none", edit=false){
        super(container, title);
        this.type = type;
        this.text = text;
        this.status = status;
        this.edit = edit;
        
        let checks = ["","","",""];
        switch (this.status){
            case "none": checks[0] = "checked";break;
            case "little": checks[1] = "checked";break;
            case "medium": checks[2] = "checked";break;
            case "high": checks[3] = "checked";break;
        }

        this.content.innerHTML = `
        <input type="text" value="${this.text}" class="title_input" placeholder="Title" minlength="3" maxlength="40" required><br>
        Importancia
        <ul>
            <li><input type="radio" name="status-radio" id="radio-none" value="none" ${checks[0]}><label for="radio-none"> None</label></li>
            <li><input type="radio" name="status-radio" id="radio-little" value="little" ${checks[1]}><label for="radio-little"> Little bit</label></li>
            <li><input type="radio" name="status-radio" id="radio-medium" value="medium" ${checks[2]}><label for="radio-medium"> Medium</label></li>
            <li><input type="radio" name="status-radio" id="radio-hight" value="high" ${checks[3]}><label for="radio-hight"> High</label></li>
        </ul>
        `;


        this.functionButtonAcept = (e)=>{
            e.preventDefault();
            let title = this.modal.querySelector(".title_input");
            let status = this.modal.querySelectorAll('input[type="radio"]:checked')[0].value;
            let tamLStorage = localStorage.length;

            if (title.value.length >= 3 && title.value.length < 40){
                let obj = this.createObject(title.value,status);
                
                if (this.edit){
                    // console.log(obj);
                    let oldtitle = this.text;
                    if (title.value !== oldtitle){
                        localStorage.setItem(title.value,JSON.stringify(obj));
                        localStorage.removeItem(oldtitle);
                        window.location = `groupView.html?url=${title.value}`;
                        return;
                    }
                    else{
                        localStorage.setItem(title.value,JSON.stringify(obj));    
                        this.hide();
                        return;
                    }
                }else{
                    localStorage.setItem(title.value,JSON.stringify(obj));
                    window.location.reload();
                }

                
                if (tamLStorage < localStorage.length){
                    this.hide();
                }
                else{
                    alert("Group repeated!");
                    title.focus();
                }
            }
            else {
                title.focus();
            }

        }

    }

    createObject = (title, status) => {
        let obj;
        let childs = [];

        if (this.edit){
            childs = getData().childs;
        }
        if (this.type == "note"){
            if (childs.length === 0){childs[0] = {"title":title,"check":false,"text":"..."};}
        }

        obj = {
            "title": title,
            "status": status,
            "type": this.type,
            "progress": "100",
            "childs": childs
        }

        return obj;
    }

}