const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if (!inputBox.value){
        inputBox.placeholder = 'You must write something';
        return;
    }
    else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        //edit button   œ≈–≈œ»—¿“‹ ¬ CSS

        let editBtn = document.createElement("img");
        editBtn.src = "img/edit-button.png";
        editBtn.classList.add("edit-button");
        li.appendChild(editBtn);

        saveData(); // Save changes!
    }
    inputBox.placeholder = 'Add text...';
    inputBox.value = '';
}

listContainer.addEventListener("click", function (event){
   if (event.target.tagName === 'LI'){
       event.target.classList.toggle('checked');
       saveData();
   }
   else if(event.target.tagName === 'SPAN'){
       event.target.parentElement.remove();
       saveData();
   }
   else if(event.target.classList.contains('edit-button')){
       if (event.target.classList.contains('in-edit')){
           event.target.classList.remove('in-edit');
           finishEdit(event);
       }
       else{
           event.target.classList.add('in-edit');
           startEdit(event);
       }
   }

}, false);

function startEdit(event) {
    let li = event.target.closest('li');
    let taskText = li.firstChild;

    let taskInput = document.createElement('input');

    taskInput.type = 'text';
    taskInput.value = taskText.textContent;
    taskText.replaceWith(taskInput);

    console.log('Edit started.')
    console.log(taskInput.value);

}

function finishEdit(event) {
    let li = event.target.parentElement;
    let taskInput = li.querySelector('input')

    if (taskInput){
        let newText = taskInput.value;

        li.firstChild.replaceWith(document.createTextNode(newText));
        saveData();
    }

    console.log(taskInput.value);
    console.log('Edit finished.')
}

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();



// function editTask (event) {
//     console.log(event.target.classList)
//
//     let li = event.target.closest('li');
//     li.classList.add('editingLi')
//     let textCont = li.firstChild;
//     console.log(textCont.textContent)
//
//     let inputArea = document.createElement('input');
//     inputArea.value = textCont.textContent;
//     inputArea.focus();
//
//     textCont.replaceWith(inputArea);
//
// }

// function finishEditing (event) {
//     let li = event.target.closest('li');
//     let inputArea = li.querySelector('input');
//
//     if (inputArea){
//         let newText = inputArea.value;
//
//         let textNode = document.createTextNode(newText || 'Empty :(');
//         inputArea.replaceWith(textNode);
//     }
//
//     event.target.classList.remove('editing')
//
//     li.classList.remove('editingLi');
//
//     saveData();
// }

// else if(event.target.classList.contains('edit-button')){
//     if (event.target.classList.contains('editing')){
//         finishEditing(event);
//     }
//     else {
//         event.target.classList.toggle('editing');
//     }
//     editTask(event);
// }