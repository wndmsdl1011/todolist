//유저가 값을 입력한다
//'+' 버튼을 클릭하면, 할일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다.
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 1. check 버튼을 클릭하는 순간 false => true
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false이면 안 끝난걸로 간주하고 그대로 있기

// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만 표시된다.
// 전쳅탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let underLine = document.getElementById("under-line");
let tabs = document.querySelectorAll(".task-tabs div"); //task-tabs 클래스 아래 div들을 다 지정
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
    let task = {        //각 task가 끝났는지 표시하기 위해서 객체를 쓴다.
        id: randomIDGenerate(),  //구글에서 generate random id javascript 검색해서 코드 가져오기, Check함수를 만들기 위해 객체에 id 추가
        taskContent: taskInput.value,
        isComplete: false,
    }
    taskList.push(task);
    console.log(taskList);
    render();
    addButton.disabled=true;
    
}

//단어 선택 후 ctrl+d 하면 같은 단어들에게 동시 작업 가능
function render(){
    //1. 내가 선택한 탭에 따라서
    let list = [];
    if(mode === "all"){
        list = taskList;
        //all -> taskList
    }else if(mode === "ongoing" || mode === "done"){
        list = filterList;
        //ongoing,done -> filterList
    }
    //2. 리스트를 달리 보여준다.
    //all->taskList
    //ongoing,done -> filterList
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
        </div>` //객체의 taskContent 값만 필요하기 때문에 .taskContent를 쓴다
        } //onclick과 addEventListener의 차이는 코딩누나님이 자료로 정리해주신다했음.
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    console.log("id:",id)
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete; //!연산을 쓰면 true=>false, false=>true 둘 다 할 수 있다.
            break;
        }
    }
    render(); //값을 바꾼 후 render() 함수를 불러와서 UI도 최신화한다.
    console.log(taskList)
}

function deleteTask(id) {
    for(let i=0;i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
            // taskList[i].isDeleted = true
        }
    }
    for(let i=0;i<filterList.length; i++){
        if(filterList[i].id == id){
            filterList.splice(i,1);
            break;
        }
    }
    render(); //UI 업데이트
    console.log(taskList);
}

function filter(event){ //뭐를 클릭했는지를 addEventListener부터 받아온다(매개변수로)
    // console.log("filter",event.target.id); 
    filterList = [];
    mode = event.target.id;
    if(mode === "all"){
        render();
        //전체 리스트를 보여준다.
    } else if(mode === "ongoing"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log("진행중",filterList);
        //진행중인 아이템을 보여준다.
        //task.isComplete=false
    } else if (mode==="done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            }
        }
        render();
        //끝나는 케이스
        //task.isComplete=true
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