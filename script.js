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
        //edit button   ѕ≈–≈ѕ»—ј“№ ¬ CSS

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
       undoCoords(event, event.target.parentElement);

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

function undoCoords(event, parentElem){
    /// Tip creating
    let tipElem = document.createElement('div');
    tipElem.classList.add('tip-element');

    // let tipText = document.createElement('span')
    // tipText.innerHTML = "Undo?"
    // tipElem.appendChild(tipText);

    let img = document.createElement('img');
    img.src = 'img/undo-button.png';
    img.classList.add('undo-button');
    tipElem.appendChild(img);

    document.body.append(tipElem);
    console.log('Successfully added.')
    /// Tip coords
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    let rect = listContainer.getBoundingClientRect();

    // ”станавливаем координаты относительно ближайшего контейнера
    // tipElem.style.left = rect.right + 'px';
    // tipElem.style.top = rect.top + 'px';

    let todoAppCords = listContainer.getBoundingClientRect();
    //
    // let tipLeftCords = todoAppCords.right + window.scrollX + 10;
    // let tipTopCords = todoAppCords.top + window.scrollY + 10;

    let tipLeftCords = todoAppCords.right + tipElem.offsetWidth + scrollLeft - 10;
    let tipTopCords = tipElem.offsetHeight - 10 + scrollTop + 289;

    tipElem.style.left = tipLeftCords + 'px';
    tipElem.style.top = tipTopCords + 'px';

    tipElem.classList.add('active-tip');
    console.log('Coords applied')

    /// Undo deletion

    img.addEventListener("click", function (event) {
        console.log('Button click!')
        listContainer.appendChild(parentElem);
        tipElem.classList.remove('active-tip');
        setTimeout(() => {
            tipElem.remove(); // ”дал€ем элемент после завершени€ анимации
        }, 200);

    } )


    setTimeout(() => {
        tipElem.classList.remove('active-tip'); // ”даление элемента через 5 секунд
    }, 5000);
    setTimeout(() => {
        tipElem.remove();
    }, 5200);


}

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

// setInterval(() => {
//     const rect = listContainer.getBoundingClientRect();
//     alert('Right: ' + rect.right);
// }, 5000);

showTask(); /// ¬кЋё„»“№!




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