function checktest() {
    var text1 = document.getElementById("textIP");
    var text2 = text1.value;

    const inputElement = document.getElementById('textIP');
    inputElement.addEventListener('input', function() {
        this.value = this.value.replace(/<[^>]*>/g, '');
    });

    if (text2.trim() === "") {
        alert("Vui lòng nhập công việc");
       
        return;
    }

    let text3 = text1.value.trim().split(/\s+/);
    if(text3.length > 5){
        alert("Vui lòng không nhập quá dài");
        return;
    }
    saveToStorage(text2)
    renderTask(text2,false);
    text1.value = "";
}

function renderTask(text , check) {
    var container = document.getElementById("GetText");
        var taskItem = document.createElement("div");
        taskItem.className = "todo-item";
        taskItem.innerHTML = `
            <span class="task-text ${(check) ? "strikethrough" : ""}">${text}</span>
            <div>
                <input type="checkbox" class="task-checkbox" ${(check) ? "checked" : ""}>
                <label class="test123  ${(check) ? "strikethrough" : ""}">Hoàn Thành</label>
            </div>
            <button class="btn-delete" onclick="deleteTask(this, '${text}')">Xóa</button>
            <button class="btn-update" onclick="updateTask(this, '${text}')">Sửa</button>
        `;
        container.appendChild(taskItem);
}

function deleteTask(button , textToDelete) {
    var taskItem = button.closest('.todo-item');
    var container = document.getElementById("GetText");
    var children = Array.from(container.children);
    var index = children.indexOf(taskItem);
    let list = JSON.parse(localStorage.getItem('TodoApp')) || [];
    let listcheck = JSON.parse(localStorage.getItem('TodoAppcheck')) || [];
    if (index !== -1) {
        list.splice(index, 1);
        listcheck.splice(index, 1);
        //list[index] = list.filter(item => item !== textToDelete);
        //listcheck[index] = listcheck.filter(item => item !== textToDelete);
    }
    button.parentElement.remove();
    localStorage.setItem('TodoApp', JSON.stringify(list));
    localStorage.setItem('TodoAppcheck', JSON.stringify(listcheck));
    loaddata();
}
function updateTask(button, textToUpdate) {
    
    var text1 = document.getElementById("textIP");
    var text2 = text1.value;
    if (text2.trim() === "") {
        alert("Vui lòng nhập công việc");
        return;
    }
    var taskItem = button.closest('.todo-item');
    var container = document.getElementById("GetText");
    var children = Array.from(container.children);
    var index = children.indexOf(taskItem);
    let data = JSON.parse(localStorage.getItem('TodoApp')) || [];
    if (index !== -1) {
        data[index] = text2; 
    }
    localStorage.setItem('TodoApp', JSON.stringify(data));
    loaddata();
    text1.value = "";
}

function saveToStorage(text) {
    let list = JSON.parse(localStorage.getItem('TodoApp')) || [];
    list.push(text);
    localStorage.setItem('TodoApp', JSON.stringify(list));
    let listcheck = JSON.parse(localStorage.getItem('TodoAppcheck')) || [];
    listcheck.push(false);
    localStorage.setItem('TodoAppcheck', JSON.stringify(listcheck));
}

function loaddata(){
    var container = document.getElementById("GetText");
    container.innerHTML = "";
    let data = JSON.parse(localStorage.getItem('TodoApp')) || [];
    let datacheck = JSON.parse(localStorage.getItem('TodoAppcheck')) || [];
        for(let i = 0 ; i< data.length; i++) {
            a = datacheck[i];
            renderTask(data[i] , a);
        };
    const inputElement = document.getElementById('textIP');
    inputElement.addEventListener('input', function() {
        this.value = this.value.replace(/<[^>]*>/g, '');
    });
}
function datachecked(){
    var container = document.getElementById("GetText");
    container.innerHTML = "";
    let data = JSON.parse(localStorage.getItem('TodoApp')) || [];
    let datacheck = JSON.parse(localStorage.getItem('TodoAppcheck')) || [];
        for(let i = 0 ; i< data.length; i++) {
            if(datacheck[i]){
                a = datacheck[i];
                renderTask(data[i] , a);
            }
        };
}
function datasave(){
    var container = document.getElementById("GetText");
    container.innerHTML = "";
    let data = JSON.parse(localStorage.getItem('TodoApp')) || [];
    let datacheck = JSON.parse(localStorage.getItem('TodoAppcheck')) || [];
        for(let i = 0 ; i< data.length; i++) {
            if(datacheck[i]){
            }
            else{
                a = datacheck[i];
                renderTask(data[i] , a);
            }
        };
}

document.addEventListener('change', function(e) {
    if (e.target && e.target.classList.contains('task-checkbox')) {
        const checkbox = e.target;
        const taskItem = checkbox.closest('.todo-item'); 
        var container = document.getElementById("GetText");
        var children = Array.from(container.children);
        var index = children.indexOf(taskItem);
        const span = taskItem.querySelector('.task-text');
        const label = taskItem.querySelector('.test123');
        let datacheck = JSON.parse(localStorage.getItem('TodoAppcheck')) || [];

        if (checkbox.checked) {
            if(index !== -1) {
                datacheck[index] = true;
                span.classList.add('strikethrough');
                label.classList.add('strikethrough');
                localStorage.setItem('TodoAppcheck', JSON.stringify(datacheck));
            }
        } else {
            if(index !== -1) {
                datacheck[index] = false;
                span.classList.remove('strikethrough');
                label.classList.remove('strikethrough');
                localStorage.setItem('TodoAppcheck', JSON.stringify(datacheck));
            }
        }
    }
});

 document.addEventListener('DOMContentLoaded', loaddata);
