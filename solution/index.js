/*
 localStorage.setItem('tasks', JSON.stringify({
    "todo": [],
    "in-progress": [],
    "done": []
      })
    ); 
*/
   //localStorage.clear();
    //console.log(JSON.parse(localStorage.tasks).todo);
//localstorage loading function
/*
function addTaskByLocalStorage(listValue){
    let newTaskInnerItem = createElement('input', children = [], classes = ['taskItemInner'], attributes = {value: `${listValue}`, 'disabled' :''});
    let newTask = createElement('li',children = [newTaskInnerItem], classes = ['taskItem'], attributes = {});
    
    newTaskInnerItem.addEventListener('blur', saveValueBlur);
    newTask.addEventListener('dblclick', gainFocus);
    newTask.addEventListener('mouseenter', hoverReplace);
    
    return newTask;
}
*/




//setting variables for the document elements
let taskDiv = document.getElementById('tasks-div')
let taskSectionsArray = Array.from(document.querySelectorAll('.task-section'));
 let toDoTasksUl = document.getElementsByClassName('to-do-tasks')[0];
 let inProgressTasksUl = document.getElementsByClassName('in-progress-tasks')[0];
 let doneTasksUl = document.getElementsByClassName('done-tasks')[0];
 let submitButtonArray = Array.from(document.getElementsByClassName('add-task'));

 let localStorageTasksObjectForUpdate = JSON.parse(localStorage.tasks);



 //load local storage
 const parser = new DOMParser();

 //loop function to be changed
console.log(localStorage.tasks);
let localStorageElements = JSON.parse(localStorage.tasks);
console.log(localStorageElements.todo);
for(let element of localStorageElements.todo){
    element = parser.parseFromString(element, "text/html").body;
    for(let child of element.children){
        console.log(child);
        toDoTasksUl.appendChild(child);
        child.addEventListener('dblclick', gainFocus);
        child.addEventListener('mouseenter', hoverReplace);
    }
}
for(let element of localStorageElements['in-progress']){
     element = parser.parseFromString(element, "text/html").body;
    for(let child of element.children){
        inProgressTasksUl.appendChild(child);
        child.addEventListener('dblclick', gainFocus);
        child.addEventListener('mouseenter', hoverReplace);
    }
}
for(let element of localStorageElements.done){
     element = parser.parseFromString(element, "text/html").body;
     for(let child of element.children){
        doneTasksUl.appendChild(child);
        child.addEventListener('dblclick', gainFocus);
        child.addEventListener('mouseenter', hoverReplace);
    }
 }

//adding a list item functionality
function addTask(e){
    let target = e.target;
    let currentSection = target.parentElement;
    if(target.className === 'add-task'){
        let inputText = target.previousElementSibling.value;
       if(inputText === ''){
            alert("You haven't entered any text");
       }else{
           if(currentSection.id === 'to-do-section'){
               sectionArrayLEngth = localStorageTasksObjectForUpdate.todo.length;
           }if(currentSection.id === 'in-progress-section'){
            sectionArrayLEngth = localStorageTasksObjectForUpdate['in-progress'].length;
           }if(currentSection.id === 'done-section'){
            sectionArrayLEngth = localStorageTasksObjectForUpdate.done.length;
           }
            let newTaskInnerItem = createElement('input', children = [], classes = ['taskItemInner'], attributes = {value: `${target.previousElementSibling.value}`, 'disabled' :'', 'data-index': `${sectionArrayLEngth}`, 'data-section': `${currentSection.id}`});
            let newTask = createElement('li',children = [newTaskInnerItem], classes = ['taskItem'], attributes = {});
            
          
            newTask.addEventListener('dblclick', gainFocus);
            newTask.addEventListener('mouseenter', hoverReplace);
            /*
            newTaskInnerItem.addEventListener('blur',(e) => {
                console.log(e.target);
                e.target.setAttribute('disabled', '')
            });
            */
           
            //local storage insertion
            /*
            if(currentSection.id === 'to-do-section'){
                localStorageTasksObjectForUpdate.todo.push(`${target.previousElementSibling.value}`);
               console.log(localStorageTasksObjectForUpdate.todo);
            }else if(currentSection.id === 'in-progress-section'){
                localStorageTasksObjectForUpdate['in-progress'].push(`${target.previousElementSibling.value}`);
            }else if(currentSection.id === 'done-section'){
                localStorageTasksObjectForUpdate.done.push(`${target.previousElementSibling.value}`)
            }
                console.log(JSON.stringify(localStorageTasksObjectForUpdate));
            localStorage.setItem('tasks', JSON.stringify(localStorageTasksObjectForUpdate));
            */
            if(currentSection.id === 'to-do-section'){
                localStorageTasksObjectForUpdate.todo.unshift(newTask.outerHTML);
               console.log(localStorageTasksObjectForUpdate.todo);
            }else if(currentSection.id === 'in-progress-section'){
                localStorageTasksObjectForUpdate['in-progress'].unshift(newTask.outerHTML);
            }else if(currentSection.id === 'done-section'){
                localStorageTasksObjectForUpdate.done.unshift(newTask.outerHTML);
            }
            console.log(localStorageTasksObjectForUpdate);
            localStorage.setItem('tasks', JSON.stringify(localStorageTasksObjectForUpdate))
            // end of local storage insertion
            target.nextElementSibling.insertBefore(newTask, target.nextElementSibling.firstChild);
            target.previousElementSibling.value = '';
 
       }
    }
}
taskDiv.addEventListener('click', addTask)

// double click functionality

//gaining focus function
 function gainFocus(e){
     let target = e.target;
     if(target.className === 'taskItemInner'){
         target.removeAttribute('disabled');
         target.addEventListener('blur',(e) => {
            console.log(e.target);
            e.target.setAttribute('disabled', '')
        })
     }
 };


 // getting out of focus after blur
 /*
 function saveValueBlur(e){
    console.log(e.target);
    e.target.setAttribute('disabled', '');
 }
 */

 // hover + alt + 1/2/3 functionality
 function hoverReplace(e){
     let target = e.target;
     function innerKeyReplace(e){
        console.log(e.altKey)
        if(e.altKey ){
            console.log(e.key)
            if(e.key == 1){
                toDoTasksUl.append(target);
                target.firstChild.setAttribute('data-section', 'to-do-section');
            }else if(e.key == 2){
               inProgressTasksUl.append(target);
               target.firstChild.setAttribute('data-section', 'in-progress-section');
            }else if(e.key == 3){
                doneTasksUl.append(target);
                target.firstChild.setAttribute('data-section', 'done-section')
            }
       }
     } 
     target.addEventListener('mouseleave', () => {
        window.removeEventListener('keydown',innerKeyReplace);
    });
           
      if(target.tagName === 'LI'){
          window.addEventListener('keydown',innerKeyReplace);
      }
 }
 
 /*
 function innerKeyReplace(e){
     console.log(e.target);
    //console.log(e.altKey)
    if(e.altKey ){
        console.log(e.key)
        if(e.key == 1){
            toDoTasksUl.append(e.target);
        }else if(e.key == 2){
           inProgressTasksUl.append(e.target);
        }else if(e.key == 3){
            doneTasksUl.append(e.target);
        }
   }
 }
 */













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




  