console.log("welcome");
let item = localStorage.getItem("displayTable");
console.log(item)
if (item == null) {
    objArray = []
}
else {
    objArray = JSON.parse(item);
}

class library {
    setBook(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
    display() {
        let table = document.getElementById("displayTable");
        
        if(objArray.length!=0){
            let html='';
        objArray.forEach(function (element) {
            html+= `<tr>
                        <td>${element.name}</td>
                        <td>${element.author}</td>
                        <td>${element.type}</td>
                 </tr>`

        });
        table.innerHTML=html;}
        else{
            table.innerHTML="Nothing to show. Please add books."
        }
        

    }
    showMsg(type, str)
    {
        let submissionMsg = document.getElementById("msg");
        submissionMsg.innerHTML=`<div class="alert alert-${type}" role="alert">
            ${str}
          </div>`
        setTimeout(() => {
            submissionMsg.innerHTML='';
        }, 3000);
    }
    validate()
    {
        if(this.name.length<3 || this.author.length<3)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    pushElem()
    {
        objArray.push({ name: this.name, author: this.author, type: this.type });
        localStorage.setItem('displayTable', JSON.stringify(objArray));
    }
    
}
let m = new library();
m.display();
let submitForm = document.getElementById("formSubmit");
submitForm.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log("submit");
    let name = document.getElementById("enterName").value;
    let author = document.getElementById("enterAuthor").value;
    let type
    let fiction = document.getElementById("Fiction");
    let adventure = document.getElementById("Adventure");
    let cooking = document.getElementById("Cooking");
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (adventure.checked) {
        type = adventure.value;
    }
    else {
        type = cooking.value;
    }
    let lb = new library();
    lb.setBook(name, author, type);
    if(lb.validate())
    {
        lb.showMsg("success","Book added to library");
        lb.pushElem();
    }
    else
    {
        lb.showMsg("danger", "Not submitted: Book name and Author name length should be greater than 3");
    }
    //lb.validate();
    
    console.log(item);
    lb.display();
    submitForm.reset();
})
