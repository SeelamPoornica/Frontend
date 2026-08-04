// Get Tasks from Local Storage

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let updateId = null;

// Display Tasks

displayTasks();


// Add Task

function saveTask(){

    let text = document.getElementById("task").value.trim();

    if(text==""){

        alert("Please Enter the Task");

        return;

    }

    // Update Task

    if(updateId!=null){

        let task = tasks.find(function(t){

            return t.id == updateId;

        });

        task.name = text;

        task.date = new Date().toLocaleString();

        updateId = null;

    }

    // Add New Task

    else{

        let task = {

            id : Date.now(),

            name : text,

            date : new Date().toLocaleString()

        };

        // push()

        tasks.push(task);

    }

    // Store in Local Storage

    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Empty Input Box

    document.getElementById("task").value = "";

    displayTasks();
}
function displayTasks(){
    let list = document.getElementById("taskList");
    list.innerHTML = "";
    tasks.map(function(task){
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        let span = document.createElement("span");
        span.innerText = task.name;
        let div = document.createElement("div");
        let updateBtn = document.createElement("button");
        updateBtn.innerText = "Update";
        updateBtn.className = "btn btn-warning btn-sm me-2";
        updateBtn.onclick = function(){
            editTask(task.id);
        };
        let completeBtn = document.createElement("button");
        completeBtn.innerText = "Completed";
        completeBtn.className = "btn btn-success btn-sm";
        completeBtn.onclick = function(){
            completeTask(task.id);
        };
        div.appendChild(updateBtn);
        div.appendChild(completeBtn);
        li.appendChild(span);
        li.appendChild(div);
        list.appendChild(li);
    });
}
function editTask(id){
    let task = tasks.find(function(t){
        return t.id == id;
    });
    document.getElementById("task").value = task.name;
    updateId = id;
}
function completeTask(id){
    tasks = tasks.filter(function(task){
        return task.id != id;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}
function clearTasks(){
    if(confirm("Clear All Tasks?")){
       tasks = [];
        localStorage.removeItem("tasks");
        displayTasks();
    }
}
