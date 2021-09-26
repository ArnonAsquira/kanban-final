 if(!localStorage.tasks){
    localStorage.setItem('tasks', JSON.stringify({
        "todo": [],
        "in-progress": [],
        "done": []
          })
        );
 }

 //localStorage.clear(); // clears the local storage

    console.log(localStorage.tasks);
  // initilizes the local storgae object for updates
    if(typeof(localStorage.tasks) === 'string'){
        var localStorageObjectForUpdate = JSON.parse(localStorage.tasks);
    }else{   
        var localStorageObjectForUpdate = localStorage.tasks;
    }


document.body.addEventListener('mouseover' ,addHoverReplace);
document.body.addEventListener('dblclick',gainFocus);
document.body.addEventListener('focusout', saveValueBlur);
//local storage save function
//localStorageLoad();
function localStorageSave(){

    let todoTasksArray = Array.from(toDoTasksUl.children);
    let inProgressTaskArray = Array.from(inProgressTasksUl.children);
    let doneTaskArray = Array.from(doneTasksUl.children);

    todoTasksArray = todoTasksArray.map((task) => {
        return (task.textContent)
    });
    inProgressTaskArray = inProgressTaskArray.map((task) => {
        return (task.textContent)
    });
    doneTaskArray = doneTaskArray.map((task) => {
        return (task.textContent)
    });


    localStorageObjectForUpdate.todo = todoTasksArray 
    localStorageObjectForUpdate['in-progress'] = inProgressTaskArray 
    localStorageObjectForUpdate.done = doneTaskArray 
    localStorage.setItem('tasks',JSON.stringify(localStorageObjectForUpdate));
}

//setting variables for the document elements
let taskDiv = document.getElementById('tasks-div')
let taskSectionsArray = Array.from(document.querySelectorAll('.task-section'));
let submitButtonArray = Array.from(document.getElementsByClassName('add-task'));
let searchBar = document.getElementById('search');
let saveButton = document.getElementById('save-btn');
let loadButton = document.getElementById('load-btn');
let apiButtons = document.getElementsByClassName('api-buttons')[0];
let toDoContainer = document.querySelector('#to-do-container');
let inProgressContainer = document.getElementById('in-progress-container');
let doneContainer = document.getElementById('done-container');

 
 //localstorage loading function

    if(localStorageObjectForUpdate.todo.length > 0 || localStorageObjectForUpdate['in-progress'].length > 0 || localStorageObjectForUpdate.done.length > 0){

        var toDoTasksUl = createElement('ul', children = [], classes = ['to-do-tasks'], attributes = {});
        var inProgressTasksUl = createElement('ul', children = [], classes = ['in-progress-tasks'], attributes = {});
        var doneTasksUl = createElement('ul', children = [], classes = ['done-tasks'], attributes = {});

        console.log(toDoTasksUl);

        toDoContainer.appendChild(toDoTasksUl)
        inProgressContainer.appendChild(inProgressTasksUl); 
        doneContainer.appendChild(doneTasksUl);
    
        console.log(toDoContainer);

        function loadUl(ul,container){
            for(let task of JSON.parse(localStorage.tasks)[ul]){
                let newTask = createElement('li',children = [task], classes = ['task'], attributes = {'draggable': 'true'});
                newTask.addEventListener('dragstart', dragItem);
                newTask.addEventListener('dragend', endDrag);
                container.firstChild.appendChild(newTask);
            }
        }
     loadUl('todo', toDoContainer);
     loadUl('in-progress', inProgressContainer);
     loadUl('done', doneContainer);

    }else{
        var toDoTasksUl = createElement('ul', children = [], classes = ['to-do-tasks'], attributes = {})
        var inProgressTasksUl = createElement('ul', children = [], classes = ['in-progress-tasks'], attributes = {})
        var doneTasksUl = createElement('ul', children = [], classes = ['done-tasks'], attributes = {});
        
        console.log('no local storage');
    
        document.getElementById('to-do-container').appendChild(toDoTasksUl);
        document.getElementById('in-progress-container').appendChild(inProgressTasksUl);
        document.getElementById('done-container').appendChild(doneTasksUl);
    }
    console.log('local storageLoad');




//load local storage

console.log
 //adding the section lists to the DOM

//adding a list item functionality
function addTask(e){
    let target = e.target;
    let currentSection = target.parentElement;
    if(target.className === 'add-task'){
        let inputText = target.previousElementSibling.value;
       if(inputText === ''){
            alert("You haven't entered any text");
       }else{
            let newTask = createElement('li',children = [`${target.previousElementSibling.value}`], classes = ['task'], attributes = {'draggable': 'true'});
            console.log(target.nextElementSibling.firstChild);
            target.nextElementSibling.firstChild.insertBefore(newTask, target.nextElementSibling.firstChild.firstChild);

              //local storage insertion
              localStorageSave();
              // end of local storage insertion

              newTask.addEventListener('dragstart', dragItem);
              newTask.addEventListener('dragend', endDrag);

            target.previousElementSibling.value = '';
             
       }
    }
}
taskDiv.addEventListener('click', addTask)

// double click functionality

//gaining focus function
 function gainFocus(e){
     let target = e.target;
     if(target.tagName === 'LI'){
         target.setAttribute('contenteditable' , 'true');
         target.style.backgroundColor = 'rgba(50,50,200,0.5)';
     }
 };

 // getting out of focus after blur
 function saveValueBlur(e){
    let target = e.target;
     if(target.tagName != 'LI'){
        return;
     }
     target.setAttribute('contenteditable', 'false');
     target.style.backgroundColor = 'rgba(0,0,0,0)';
    localStorageSave();
 }
 //

 // hover + alt + 1/2/3 functionality
 function hoverReplace(e){
     let target = e.target;
  
     
      function innerKeyReplace(e){
            if(e.altKey){
                if(e.key == 1){
                    toDoTasksUl.insertBefore(target, toDoTasksUl.firstChild);
                }else if(e.key == 2){
                    inProgressTasksUl.insertBefore(target, inProgressTasksUl.firstChild);
                }else if(e.key == 3){
                    doneTasksUl.insertBefore(target,doneTasksUl.firstChild);
                }
            }
                 //local storage insertion
                 localStorageSave();
                 // end of local storage insertion
       }

       target.addEventListener('mouseleave', () => {
            window.removeEventListener('keydown',innerKeyReplace);
        }); 

        window.addEventListener('keydown',innerKeyReplace);
 }
//add addHoverReplace
function addHoverReplace(e){
    if (e.target.tagName != 'LI'){
        return
    };
    e.target.addEventListener('mouseenter', hoverReplace);
}

//create Element function
function createElement(tagName, children = [], classes = [], attributes = {}) {
    let newEl = document.createElement(tagName);
    for(let child of children){
        if(typeof(child) === "string"){
            child = document.createTextNode(child);
        }
         newEl.append(child);
    }
    for(let cls of classes){
        newEl.classList.add(cls);
    }
    for(let attr in attributes){
        newEl.setAttribute(attr, attributes[attr]);
    }
  
    return newEl
  }


//search bar functions
function searchTask(e){
  let value = e.target.value;
  let toDoTaskArray = Array.from(document.querySelectorAll('.to-do-tasks > .task'));
  let inProgressTaskArray = Array.from(document.querySelectorAll('.in-progress-tasks > .task'));
  let doneTaskArray = Array.from(document.querySelectorAll('.done-tasks > .task'));
  for(let li of toDoTaskArray){
      li.hidden = false;
      if(!li.textContent.toLowerCase().includes(value.toLowerCase())){
        li.hidden = true;
      }
  }
  for(let li of inProgressTaskArray){
    li.hidden = false;
    if(!li.textContent.toLowerCase().includes(value.toLowerCase())){
        li.hidden = true;
      }
  }
  for(let li of doneTaskArray){
    li.hidden = false;
    if(!li.textContent.toLowerCase().includes(value.toLowerCase())){
        li.hidden = true;
      }
  }
}

searchBar.addEventListener('focus', () => {
   let placeholder = document.querySelector('.placeholder');
   let label = document.querySelector('.placeholder-label');
   placeholder.style = 'transform: translateY(-150%); color:blue; font-size:12px';
   label.style = 'border-bottom: solid 3px blue;'
})
searchBar.addEventListener('blur', () => {
    if(searchBar.value === ''){
        let placeholder = document.querySelector('.placeholder');
        let label = document.querySelector('.placeholder-label');
        placeholder.style = 'transform: translateY(0%); color:black; font-size:16px';
        label.style = 'border-bottom: solid 1px black;'
    }
})
//
searchBar.addEventListener('keyup', searchTask);


//adding event listeners for API buttons
saveButton.addEventListener('click', saveApi);
loadButton.addEventListener('click', loadApi);
//



//dragItem function
function dragItem(e){
    e.target.classList.add('dragging');
}

function endDrag(e){
   e.target.classList.remove('dragging');
   localStorageSave();
}



for(let li of Array.from(document.querySelectorAll('.task'))){
  li.addEventListener('dragstart', dragItem);
  li.addEventListener('dragend', endDrag);
};
let sections = Array.from(document.querySelectorAll('section'));

sections.forEach((section) => {
  
    section.addEventListener('dragover', (e) => {
        let afterElement = elementAfterDragging(section, e.clientY);
        
        if(afterElement == null){
            section.lastElementChild.firstElementChild.appendChild(document.querySelector('.dragging'));
        }else{
            section.lastElementChild.firstElementChild.insertBefore(document.querySelector('.dragging'), afterElement);
        }
 })
})


function elementAfterDragging(container, y){  
    let draggableElements = [...container.querySelectorAll('[draggable = true]:not(.dragging)')];
    return draggableElements.reduce((closest, child)=>{
        let box = child.getBoundingClientRect();
        let offset = y - box.top - box.height / 2;
        if(offset < 0 && offset > closest.offset){
          return{offset: offset, element: child};
        }else{
            return closest;
        }
        console.log(offset);
    }, {offset: Number.NEGATIVE_INFINITY}).element
}



function localStorageLoad(){
    //localstorage loading function



    if(localStorageObjectForUpdate.todo.length > 0 || localStorageObjectForUpdate['in-progress'].length > 0 || localStorageObjectForUpdate.done.length > 0){
        let toDoContainer = document.querySelector('#to-do-container');
        let inProgressContainer = document.getElementById('in-progress-container');
        let doneContainer = document.getElementById('done-container');

        var toDoTasksUl = createElement('ul', children = [], classes = ['to-do-tasks'], attributes = {});
        var inProgressTasksUl = createElement('ul', children = [], classes = ['in-progress-tasks'], attributes = {});
        var doneTasksUl = createElement('ul', children = [], classes = ['done-tasks'], attributes = {});

     

        toDoContainer.appendChild(toDoTasksUl)
        inProgressContainer.appendChild(inProgressTasksUl); 
        doneContainer.appendChild(doneTasksUl);
    
        function loadUl(ul,container){
            for(let task of JSON.parse(localStorage.tasks)[ul]){
                let newTask = createElement('li',children = [task], classes = ['task'], attributes = {'draggable': 'true'});
                newTask.addEventListener('dragstart', dragItem);
                newTask.addEventListener('dragend', endDrag);
                container.firstChild.appendChild(newTask);
            }
        }

        loadUl('todo', toDoContainer);
        loadUl('in-progress', inProgressContainer);
        loadUl('done', doneContainer);

    }else{
        var toDoTasksUl = createElement('ul', children = [], classes = ['to-do-tasks'], attributes = {})
        var inProgressTasksUl = createElement('ul', children = [], classes = ['in-progress-tasks'], attributes = {})
        var doneTasksUl = createElement('ul', children = [], classes = ['done-tasks'], attributes = {});
        
        console.log('no local storage');
    
        document.getElementById('to-do-container').appendChild(toDoTasksUl);
        document.getElementById('in-progress-container').appendChild(inProgressTasksUl);
        document.getElementById('done-container').appendChild(doneTasksUl);
    }
    console.log('local storageLoad');
}



//Api functions

async function loadApi(){
  
  
    //try {
      apiButtons.lastElementChild.classList.add('loader');
      const url = 'https://json-bins.herokuapp.com/bin/614adb6c4021ac0e6c080c15'
      const response = await fetch(url, {
        method: 'Get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      // handle errors:
       apiButtons.lastElementChild.classList.remove('loader');
      if (!response.ok) {
        alert(response.status)
        throw 'error';
      }
      const data = await response.json()
      if(localStorage.tasks == JSON.stringify(data.tasks)){
        for(let section of taskSectionsArray){
            section.lastElementChild.innerHTML = '';
        }
        localStorageLoad();
      }else{
                if(typeof(data.tasks) === 'string'){
                    todoTasksArrayAPI = Array.from(JSON.parse(data.tasks).todo);
                    inProgressTaskArrayAPI = Array.from(JSON.parse(data.tasks)['in-progress']);
                    doneTaskArrayAPI= Array.from(JSON.parse(data.tasks).done);
                }else{
                    todoTasksArrayAPI = Array.from(data.tasks.todo);
                    inProgressTaskArrayAPI = Array.from(data.tasks['in-progress']);
                    doneTaskArrayAPI= Array.from(data.tasks.done);
                }     
            toDoTasksUl.innerHTML = '';
            inProgressTasksUl.innerHTML = '';
            doneTasksUl.innerHTML = '';
                  

            function pushTasks(ulAPI, container){
                for(let task of ulAPI){
                    let newTask = createElement('li',children = [task], classes = ['task'], attributes = {'draggable': 'true'});
                    newTask.addEventListener('dragstart', dragItem);
                    newTask.addEventListener('dragend', endDrag);
                    container.firstChild.appendChild(newTask);
            }
        }
            pushTasks(todoTasksArrayAPI, toDoContainer);
            pushTasks(inProgressTaskArrayAPI, inProgressContainer);
            pushTasks(doneTaskArrayAPI, doneContainer);
                    localStorageSave();
                }
    
    apiButtons.lastElementChild.classList.remove('loader');
  }


 // saveApi
 async function saveApi() {
    try {
      const { tasks } = localStorage
      console.log(tasks)
      apiButtons.lastElementChild.classList.add('loader');
      const url = 'https://json-bins.herokuapp.com/bin/614adb6c4021ac0e6c080c15'
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
    body: JSON.stringify({'tasks':{'todo':[...localStorageObjectForUpdate.todo], 'in-progress': [...localStorageObjectForUpdate['in-progress']], 'done' : [...localStorageObjectForUpdate.done]}})
    //body: JSON.stringify({'tasks':{'todo':[], 'in-progress': [], 'done' : []}}),
      })
      if (!response.ok) {
        alert(response.status)
        apiButtons.lastElementChild.classList.remove('loader');
      }
      apiButtons.lastElementChild.classList.remove('loader');
    } catch (e) {
      console.log(e)
    }
  }