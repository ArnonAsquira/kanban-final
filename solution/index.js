 if(!localStorage.tasks){
    localStorage.setItem('tasks', JSON.stringify({
        "todo": [],
        "in-progress": [],
        "done": []
          })
        );
 }
 


    console.log(JSON.parse(localStorage.tasks).todo);
    let localStorageObjectForUpdate = JSON.parse(localStorage.tasks);


document.body.addEventListener('mouseover' ,addHoverReplace);
document.body.addEventListener('dblclick',gainFocus);
document.body.addEventListener('focusout', saveValueBlur);
//local storage save function
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


    localStorageObjectForUpdate.todo = todoTasksArray.reverse();
    localStorageObjectForUpdate['in-progress'] = inProgressTaskArray.reverse();
    localStorageObjectForUpdate.done = doneTaskArray.reverse();
    console.log(localStorageObjectForUpdate);
    localStorage.setItem('tasks',JSON.stringify(localStorageObjectForUpdate));
}

//setting variables for the document elements
let taskDiv = document.getElementById('tasks-div')
let taskSectionsArray = Array.from(document.querySelectorAll('.task-section'));
let submitButtonArray = Array.from(document.getElementsByClassName('add-task'));
let searchBar = document.getElementById('search');
let saveButton = document.getElementById('save-button');
let loadButton = document.getElementById('load-button');
 
 //localstorage loading function
 
 if(localStorageObjectForUpdate.todo.length > 0 || localStorageObjectForUpdate['in-progress'].length > 0 || localStorageObjectForUpdate.done.length > 0){
    let toDoContainer = document.querySelector('#to-do-container');
    let inProgressContainer = document.getElementById('in-progress-container');
    let doneContainer = document.getElementById('done-container');

    var toDoTasksUl = createElement('ul', children = [], classes = ['to-do-tasks'], attributes = {});
    var inProgressTasksUl = createElement('ul', children = [], classes = ['in-progress-tasks'], attributes = {});
    var doneTasksUl = createElement('ul', children = [], classes = ['done-tasks'], attributes = {});

    console.log(toDoTasksUl);

    toDoContainer.appendChild(toDoTasksUl)
    inProgressContainer.appendChild(inProgressTasksUl); 
    doneContainer.appendChild(doneTasksUl);
   
    console.log(toDoContainer);

   for(let task of JSON.parse(localStorage.tasks).todo){
       console.log(toDoContainer);
    let newTask = createElement('li',children = [task], classes = ['task'], attributes = {'draggable': 'true'});
    newTask.addEventListener('dragstart', dragItem);
    newTask.addEventListener('dragend', endDrag);
    toDoContainer.firstChild.appendChild(newTask);
   }
   for(let task of JSON.parse(localStorage.tasks)['in-progress']){
    console.log(task + 'inprogress task');
    let newTask = createElement('li',children = [task], classes = ['task'], attributes = {'draggable': 'true'});
    newTask.addEventListener('dragstart', dragItem);
    newTask.addEventListener('dragend', endDrag);
    inProgressContainer.firstChild.appendChild(newTask);
   }
   for(let task of JSON.parse(localStorage.tasks).done){
    console.log(task + 'done task');
    let newTask = createElement('li',children = [task], classes = ['task'], attributes = {'draggable': 'true'});
    newTask.addEventListener('dragstart', dragItem);
    newTask.addEventListener('dragend', endDrag);
    doneContainer.firstChild.appendChild(newTask);
   }

 }else{
    var toDoTasksUl = createElement('ul', children = [], classes = ['to-do-tasks'], attributes = {})
    var inProgressTasksUl = createElement('ul', children = [], classes = ['in-progress-tasks'], attributes = {})
    var doneTasksUl = createElement('ul', children = [], classes = ['done-tasks'], attributes = {})

    document.getElementById('to-do-container').appendChild(toDoTasksUl);
    document.getElementById('in-progress-container').appendChild(inProgressTasksUl);
    document.getElementById('done-container').appendChild(doneTasksUl);
}
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
//API functions
async function saveApi(){


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


    console.log('save button');
     await fetch('https://json-bins.herokuapp.com/bin/614adb6c4021ac0e6c080c15',{
        method: 'PUT',
        headers :{
            Accept: "application/json", "Content-Type": "application/json",
        },
        body: JSON.stringify({'tasks':{'todo':[...todoTasksArray.reverse()], 'in-progress': [...inProgressTaskArray.reverse()], 'done' : [...doneTaskArray.reverse()]} 
        }) 
  })
}

async function loadApi(){
   await fetch('https://json-bins.herokuapp.com/bin/614adb6c4021ac0e6c080c15').then(response => response.json())
   .then(data => {
    toDoTasksUlAPI = data.tasks.todo[0];
    inProgressTasksUlAPI = data.tasks['in-progress'][0];
    doneTasksUlAPI = data.tasks.done[0];
    //
    let toDoSection = document.getElementById('to-do-container');
    let inProgressContainer = document.getElementById('in-progress-container');
    let donContainer = document.getElementById('done-container');
    //
    toDoSection.innerHTML = toDoTasksUlAPI;
    inProgressContainer.innerHTML = inProgressTasksUlAPI;
    donContainer.innerHTML = doneTasksUlAPI;

    toDoTasksUl = toDoSection.firstChild;
    inProgressTasksUl = inProgressContainer.firstChild;
    doneTasksUl = donContainer.firstChild;

    localStorageSave();

    for(let li of Array.from(document.querySelectorAll('.task'))){
        li.addEventListener('dragstart', dragItem);
        li.addEventListener('dragend', endDrag);
      };
   });
}

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
            console.log(document.querySelector('.dragging'));
            console.log('over element');
            section.lastElementChild.firstElementChild.appendChild(document.querySelector('.dragging'));
        }else{
            console.log(section.lastElementChild.firstElementChild)
            console.log('over element')
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




