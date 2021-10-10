//initilizes the local storage object
if(!localStorage.tasks || localStorage.tasks.length == 0){
    localStorage.setItem('tasks', JSON.stringify({
        "todo": [],
        "in-progress": [],
        "done": [],
        'deleted':[]
          })
        );
}  
let localStorageObjectForUpdate = JSON.parse(localStorage.tasks);

//adding event listeners to the body
document.body.addEventListener('mouseover' ,addHoverReplace);
document.body.addEventListener('dblclick',gainFocus);
document.body.addEventListener('focusout', saveValueBlur);
document.body.addEventListener('contextmenu', removeLi);
document.addEventListener('click', sortAz);
document.body.addEventListener('click', deleteAll);

//local storage save function
function innerLocalStorageSave(listName,ul){
    localStorageObjectForUpdate[listName][0] = ul.outerHTML;
}
function localStorageSave(){
    innerLocalStorageSave('todo', toDoTasksUl);
    innerLocalStorageSave('in-progress', inProgressTasksUl);
    innerLocalStorageSave('done', doneTasksUl);
    innerLocalStorageSave('deleted', deletedTasksUl);
    localStorage.setItem('tasks',JSON.stringify(localStorageObjectForUpdate));
}

//setting global variables for the document elements
let taskDiv = document.getElementById('tasks-div')
let taskSectionsArray = Array.from(document.querySelectorAll('.task-section'));
let submitButtonArray = Array.from(document.getElementsByClassName('add-task'));
let searchBar = document.getElementById('search');
let saveButton = document.getElementById('save-button');
let loadButton = document.getElementById('load-button');
let showRecycleBin = document.getElementById('show-recycle');
let loader = document.querySelector('.api-buttons').lastElementChild;
let recycleBin = document.querySelector('.recycle-bin');
let toDoContainer = document.getElementById('to-do-container');
let inProgressContainer = document.getElementById('in-progress-container');
let doneContainer = document.getElementById('done-container');
const taskEnumeratorArray = Array.from(document.getElementsByClassName('task-enumerator'));
 
 //localstorage loading after refresh
 if(localStorageObjectForUpdate.todo[0] != null || localStorageObjectForUpdate['in-progress'][0] != null || localStorageObjectForUpdate.done[0] != null || localStorageObjectForUpdate.deleted[0] != null){  
    function appendToContainer(container, ul){
        if(localStorageObjectForUpdate[ul][0] == null){
            container.innerHTML = '';
        }else{
            container.innerHTML = localStorageObjectForUpdate[ul][0];
        }
    }
    appendToContainer(toDoContainer, 'todo');
    appendToContainer(inProgressContainer,'in-progress');
    appendToContainer(doneContainer, 'done');
    appendToContainer(recycleBin, 'deleted');
    listCounter();
 }else{
    let toDoTasksUl = createElement('ul', children = [], classes = ['to-do-tasks'], attributes = {});
    let inProgressTasksUl = createElement('ul', children = [], classes = ['in-progress-tasks'], attributes = {});
    let doneTasksUl = createElement('ul', children = [], classes = ['done-tasks'], attributes = {});
    let deletedTasksUl = createElement('ul', children = [], classes = ['recycle-Ul'], attributes = {});
    toDoContainer.appendChild(toDoTasksUl);
    inProgressContainer.appendChild(inProgressTasksUl);
    doneContainer.appendChild(doneTasksUl);
    recycleBin.appendChild(deletedTasksUl);
    listCounter();
 }

 let toDoTasksUl = toDoContainer.firstChild;
 let inProgressTasksUl = inProgressContainer.firstChild;
 let doneTasksUl = doneContainer.firstChild;
 let deletedTasksUl = recycleBin.firstChild;

//total list item counter function
function listCounter(){
    for(let taskEnumerator of taskEnumeratorArray){
        const totalTasks = Array.from(taskEnumerator.parentElement.lastElementChild.firstElementChild.children).length
        taskEnumerator.textContent = `total: ${totalTasks}`
    }
}

//adding a list item functionality

//inner add task function
function innerAddTaskToul(target){
    let newTask = createElement('li',children = [`${target.previousElementSibling.value}`], classes = ['task'], attributes = {'draggable': 'true'});
    target.nextElementSibling.firstChild.insertBefore(newTask, target.nextElementSibling.firstChild.firstChild);
      //local storage insertion
      localStorageSave();
     //individual eventListeners for drag and Drop
      newTask.addEventListener('dragstart', dragItem);
      newTask.addEventListener('dragend', endDrag);
    target.previousElementSibling.value = '';
    listCounter(); 
}
//add task function
function addTask(e){
    let target = e.target;
    if(target.className === 'add-task'){
        let inputText = target.previousElementSibling.value;
       if(inputText === ''){
            alert("You haven't entered any text");
       }else{
        innerAddTaskToul(target);
       }
    }
}
taskDiv.addEventListener('click', addTask);
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
    listCounter();
 }
 //

 // hover + alt + 1/2/3 functionality
 function checkListAtAlt(eventKey,target,keyNum, ulToInsert){
    if(eventKey == keyNum){
        ulToInsert.insertBefore(target, ulToInsert.firstChild);
    }
 }
 function hoverReplace(e){
     let target = e.target; 
      function innerKeyReplace(e){
            if(e.altKey){
                checkListAtAlt(e.key,target,1, toDoTasksUl);
                checkListAtAlt(e.key,target,2, inProgressTasksUl);
                checkListAtAlt(e.key,target,3,doneTasksUl);
            }
                 //local storage insertion
                 localStorageSave();
                 listCounter();       
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
function hideTask(tasksList){
    for(let li of tasksList){
        li.hidden = false;
        if(!li.textContent.toLowerCase().includes(value.toLowerCase())){
          li.hidden = true;
        }
    }
}
function searchTask(e){
  let value = e.target.value;
  let taskArray = Array.from(document.getElementsByTagName('li'));
  hideTask(taskArray);
}
//search bar animations
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
    loader.classList.add('loader');
    console.log('save button');
     await fetch('https://json-bins.herokuapp.com/bin/614adb6c4021ac0e6c080c15',{
        method: 'PUT',
        headers :{
            Accept: "application/json", "Content-Type": "application/json",
        },
        //body: JSON.stringify({'tasks':{'todo':[], 'in-progress': [], 'done' : []} // resets the API
        body: JSON.stringify({'tasks':{'todo':[toDoTasksUl.outerHTML], 'in-progress': [inProgressTasksUl.outerHTML], 'done' : [doneTasksUl.outerHTML]}
        }) 
  }).then(response => {if(response.status > 400){alert("i'm a teapot")}})
  loader.classList.remove('loader');
}

//load API function
async function loadApi(){
    loader.classList.add('loader');
   await fetch('https://json-bins.herokuapp.com/bin/614adb6c4021ac0e6c080c15').then(response => response.json())
   .then(data => {
    loader.classList.remove('loader');
    toDoTasksUlAPI = data.tasks.todo[0];
    inProgressTasksUlAPI = data.tasks['in-progress'][0];
    doneTasksUlAPI = data.tasks.done[0];
    //
    let toDoContainer = document.getElementById('to-do-container');
    let inProgressContainer = document.getElementById('in-progress-container');
    let doneContainer = document.getElementById('done-container');
    //

    function loadTasksFromApi(taskList, section){
        if(taskList == undefined){
            section.innerHTML = '';
        }else{
            section.innerHTML = taskList; 
        }
    } 
    loadTasksFromApi(toDoTasksUlAPI, toDoContainer);
    loadTasksFromApi(inProgressTasksUlAPI,  inProgressContainer);
    loadTasksFromApi(doneTasksUlAPI, doneContainer);

    toDoTasksUl = toDoContainer.firstChild;
    inProgressTasksUl = inProgressContainer.firstChild;
    doneTasksUl = doneContainer.firstChild;
    //saving changes to local storage
    localStorageSave();
    listCounter();

    //resetting the individual dargNdrop eventListeners
    for(let li of Array.from(document.querySelectorAll('.task'))){
        li.addEventListener('dragstart', dragItem);
        li.addEventListener('dragend', endDrag);
      };
   });
}
//adding the event listeners to the load and save buttons
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
   listCounter();
}
//adding event listeners for dragNdrop
for(let li of Array.from(document.querySelectorAll('.task'))){
  li.addEventListener('dragstart', dragItem);
  li.addEventListener('dragend', endDrag);
};
//adding the drop event to the sections
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
//controls what li to switch
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
    }, {offset: Number.NEGATIVE_INFINITY}).element
}
//game trigger event
let asCounter = 0;
document.addEventListener('keydown', (e) => {
    if(e.key == 'a'){
        asCounter += 1;
        if(asCounter === 100){
            window.location.href =  "./htmlgame.html"
        }
    }

})

//change theme event
let themeButton = document.getElementById('new-theme-btn');
let cssLink = document.head.querySelector('link');
themeButton.addEventListener('click', (e) => {
    if(cssLink.href == 'http://127.0.0.1:5500/solution/styles.css' || cssLink.href == "./styles.css"){
        cssLink.setAttribute('href', './cssFornewTheme.css');
    }else{
        cssLink.setAttribute('href', './styles.css');
    }
})


//right click for erasing li function
function removeLi(e){
    if(e.target.tagName === 'LI'){
        e.preventDefault();
        deletedTasksUl.appendChild(e.target);
        localStorageSave();
        listCounter();
    }
}
//recycle bin button event listener
showRecycleBin.addEventListener('click', (e)=>{
    recycleBin.hidden = !recycleBin.hidden;
})

//sort LI alphabetically
let azCounter = 1;

function sortAzUp(target){
    Array.from(target.parentElement.lastElementChild.firstElementChild.children).sort((a,b) => {
        if (a.textContent > b.textContent) {
            target.parentElement.lastElementChild.firstElementChild.insertBefore(a, b);
            return;
          }
          if (b.textContent < a.textContent) {
              target.parentElement.insertBefor(b, a);
            return;
          }
          })
}
function sortAzDown(target){
    Array.from(target.parentElement.lastElementChild.firstElementChild.children).sort((a,b) => {
        if (a.textContent < b.textContent) {
            target.parentElement.lastElementChild.firstElementChild.insertBefore(a, b);
            return;
          }
          if (b.textContent > a.textContent) {
              target.parentElement.insertBefor(b, a);
            return;
          }
          })
}

function innerSortAz(counter, target){
    if(counter % 2 === 0){
        sortAzUp(target);
     }else{
        sortAzDown(target);
     }
}

function sortAz(e){
    let target = e.target;
 if(target.className != 'sort-az'){
     return;
 }
 innerSortAz(azCounter, target);
 azCounter ++;
}
//local storage clear button lisener
function deleteAll(e){
    const target = e.target;
    if(target.className === 'delete-button'){
        localStorage.setItem('tasks', JSON.stringify({
            "todo": [],
            "in-progress": [],
            "done": [],
            'deleted':[]
            })
        );
        location.reload();
    }
}
