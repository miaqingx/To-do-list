const formEl = document.querySelector('.form')
const inputEl = document.querySelector('.input')
const ulEl = document.querySelector('.list')


let listStorage = JSON.parse(localStorage.getItem('list'));
if (listStorage){
    listStorage.forEach((task) => {
        todoList(task)
    });
}

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    todoList()
});

function todoList(task){
    let newTask = inputEl.value;
    if (task) {
        newTask = task.name
    }

    const liElement = document.createElement('li');
    if (task && task.completed) { 
        liElement.classList.add('checked');
    }
    liElement.innerText = newTask;
    ulEl.appendChild(liElement);
    inputEl.value = '';

    const checkBtnEl = document.createElement('div');
    checkBtnEl.innerHTML = `<i class="fas fa-check-square"></i>`;
    liElement.appendChild(checkBtnEl);

    const trashBtnEl = document.createElement('div');
    trashBtnEl.innerHTML = `<i class="fas fa-trash"></i>`;
    liElement.appendChild(trashBtnEl);

    checkBtnEl.addEventListener('click', () => {
        liElement.classList.toggle('checked');
        updateLocalStorage();
    });

    trashBtnEl.addEventListener('click', () => {
        liElement.remove();
        updateLocalStorage();
    });
    updateLocalStorage();
};

function updateLocalStorage(){
    const liEls =  document.querySelectorAll('li'); 
    listStorage = []
    liEls.forEach((liElement) => {
        listStorage.push({
            name: liElement.innerText,
            checked: liElement.classList.contains('checked')
        });
    })
    localStorage.setItem('list', JSON.stringify(list));
}