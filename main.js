
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let underLine = document.getElementById("under-line");
let tabs = document.querySelectorAll(".task-tabs div"); 
let taskList = [];
let filterList = [];
let mode = 'all'

addButton.addEventListener("click",addTask)
addButton.addEventListener("click",function(){
    taskInput.value=""
});
taskInput.addEventListener("keypress",function(event){
    if(event.key === "Enter"){
        event.preventDefault();
        document.getElementById("add-button").click();
    }
})
taskInput.addEventListener("keyup",function(event){
    if (taskInput.value !== ""){
        addButton.disabled = false;
    } else {
        addButton.disabled = true;
    }
})

addButton.disabled = true;

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){
        filter(event)
    });
    tabs[i].addEventListener("click",(event)=>
    lineIndicator(event));
}

function addTask(){
    let task = {       
        id: randomIDGenerate(),  
        taskContent: taskInput.value,
        isComplete: false,
    }
    taskList.push(task);
    console.log(taskList);
    render();
    addButton.disabled=true;
    
}


function render(){
   
    let list = [];
    if(mode === "all"){
        list = taskList;
       
    }else if(mode === "ongoing" || mode === "done"){
        list = filterList;
    }
    
    let resultHTML = '';
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML+=`<div class="task-done-background">
            <div class = "task-done">${list[i].taskContent}</div>
            <div class="button-box">
            <button onclick="toggleComplete('${list[i].id}')"><i class="fas fa-undo-alt"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
            </div>
        </div>`
        } else {
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div class="button-box">
            <button onclick="toggleComplete('${list[i].id}')"><i class="fa fa-check"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
            </div>
        </div>` 
        } 
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    console.log("id:",id)
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete; 
            break;
        }
    }
    render(); 
    console.log(taskList)
}

function deleteTask(id) {
    for(let i=0;i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
            
        }
    }
    for(let i=0;i<filterList.length; i++){
        if(filterList[i].id == id){
            filterList.splice(i,1);
            break;
        }
    }
    render();
    console.log(taskList);
}

function filter(event){ 
    
    filterList = [];
    mode = event.target.id;
    if(mode === "all"){
        render();
        
    } else if(mode === "ongoing"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log("진행중",filterList);
        
        
    } else if (mode==="done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            }
        }
        render();
        
    }
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function lineIndicator(e){
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight -3+ "px";
}