const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter =  document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load All event listeners
loadEventListeners();

//load all event listeners
function loadEventListeners(){
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit',addTask);
    //remove taks event
    taskList.addEventListener('click',remove);
    //clear task event
    clearBtn.addEventListener('click',clearTask);
    //filter tasks event
    filter.addEventListener('keyup',filterTask);

}

//get tasks form ls 
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
         //creat li element
        const li = document.createElement('li');
        //add class
        li.className = 'collection-item';
        //creattext node and append to li
        li.appendChild(document.createTextNode(task));
        //create new link element 
        const link = document.createElement('a');
        //add class
        link.className='delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append the link to li
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);
    });
}

//add task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a Task');
        return false;
    }else{
          
        //create li element
        const li = document.createElement('li');
        //add class
        li.className = 'collection-item';
        //creattext node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        //create new link element 
        const link = document.createElement('a');
        //add class
        link.className='delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append the link to li
        li.appendChild(link);

        //append lu to ul
        taskList.appendChild(li);

        //store in LS
        storeTaskInLocalStorege(taskInput.value);
        //clear input
        taskInput.value = '';

    }
  
    e.preventDefault();
}

//store task
function storeTaskInLocalStorege(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//remove task
function remove(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        console.log(e.target);
        if(confirm('Are you Sure?')){
            e.target.parentElement.parentElement.remove();
            
            //remove form ls
            removeTaskFormLocalStorage(e.target.parentElement.parentElement);
        }
    }
    
}
//remove form LS
function removeTaskFormLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}
//clear Taks
function clearTask(){
    //faster way
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //clear form LS
    clearTaskFormLocalStorage();
}

//clear task form LS
function clearTaskFormLocalStorage(){
    localStorage.clear();
}

//filter task
function filterTask(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(tesk){
        const  item = tesk.firstChild.textContent;
        if(item.toLocaleLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}