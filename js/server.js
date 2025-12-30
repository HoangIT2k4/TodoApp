function checktest() {
    var text1 = document.getElementById("textIP");
    var text2 = text1.value;

    if (text2.trim() === "") {
        alert("Vui lòng nhập công việc");
        return;
    }
    //let list = JSON.parse(localStorage.getItem('TodoApp')) || [];
    //list.push(text2);
    localStorage.setItem('TodoApp', JSON.stringify(text2));
    loaddata();
    text1.value = "";
}

function renderTask(text) {
    var container = document.getElementById("GetText");
    var taskItem = document.createElement("div");
    taskItem.className = "todo-item";
    taskItem.innerHTML = `
        <span class="task-text">${text}</span>
        <div>
            <input type="checkbox" class="task-checkbox">
            <label class="test123">Hoàn Thành</label>
        </div>
        <button class="btn-delete" onclick="deleteTask(this, '${text}')">Xóa</button>
    `;
    container.appendChild(taskItem);
}

function deleteTask(button , textToDelete) {
    button.parentElement.remove();
    let list = JSON.parse(localStorage.getItem('TodoApp')) || [];
    list = list.filter(item => item !== textToDelete);
    localStorage.setItem('TodoApp', JSON.stringify(list));
}

function saveToStorage(text) {
    let list = JSON.parse(localStorage.getItem('TodoApp')) || [];
    list.push(text);
    localStorage.setItem('TodoApp', JSON.stringify(list));
}

function loaddata(){
    var container = document.getElementById("GetText");
    container.innerHTML = "";
    let data = JSON.parse(localStorage.getItem('TodoApp'));
        data.forEach(function(Text) {
            renderTask(Text);
        });
}

document.addEventListener('change', function(e) {
    if (e.target && e.target.classList.contains('task-checkbox')) {
        const checkbox = e.target;
        const taskItem = checkbox.closest('.todo-item'); 
        const span = taskItem.querySelector('.task-text');
        const label = taskItem.querySelector('.test123');

        if (checkbox.checked) {
            span.classList.add('strikethrough');
            label.classList.add('strikethrough');
        } else {
            span.classList.remove('strikethrough');
            label.classList.remove('strikethrough');
        }
    }
});

 document.addEventListener('DOMContentLoaded', loaddata);
