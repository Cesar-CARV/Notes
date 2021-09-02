class ModalAddCard extends Modal{
    
    constructor(container, title ,type){
        super(container, title);
        this.type = type;

        this.content.innerHTML = `
        <input type="text" class="title_input" placeholder="Title" minlength="3" maxlength="40" required><br>
        Checked: <input type="checkbox" class="check_input">
        `;


        this.functionButtonAcept = (e)=>{
            e.preventDefault();
            let title = this.modal.querySelector(".title_input");
            let check = this.modal.querySelector('.check_input').checked;
            let existCard = getData().childs.filter(x => x.title === title.value)[0] === undefined ? false : true;
            // console.log(existCard);

            if (title.value.length >= 3 && title.value.length < 40){
                if (existCard === false){

                    let obj = this.createObject(title.value,check,"");
                    let updateParent = getData();                
                    updateParent.childs.unshift(obj);
                    localStorage.setItem(updateParent.title,JSON.stringify(updateParent));
                    window.location.reload();
                    this.hide();
                    
                }
                else{
                    alert("Note repeated!");
                    title.focus();
                }
            }
            else {
                title.focus();
            }

        }

    }

    createObject = (title, check, text) => {

        let obj = {
            "title": title,
            "check": check,
            "text": text
        }

        return obj;
    }

}