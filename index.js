//работа с элементами
const tasksDiv = document.querySelector('.tasks');
let elArr = [];

const addBtnEl = document.querySelector('.add__btn');
const addTextEl = document.querySelector('.add__text');

// Добавление нового элемнта
const addTask = (obj) => {
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('task');

  const icon = document.createElement('i');
  icon.classList.add('fa-solid');
  icon.classList.add('fa-check');

  const taskP = document.createElement('p');
  taskP.classList.add('task__p');
  taskP.textContent = obj.name;

  const iconTrash = document.createElement('i');
  iconTrash.classList.add('fa-regular');
  iconTrash.classList.add('fa-trash-can');

  //проверка на выполнена задача или нет
  if (obj.active === 1) {
    icon.classList.add('completed-i');
    taskP.classList.add('completed-p');
  }

  //вешую событие на новый элемент
  icon.addEventListener('click', function () {
    check(this, obj);
  });
  iconTrash.addEventListener('click', function () {
    deleteEl(this, obj);
  });

  //добавление новых элементов на страницу
  tasksDiv.prepend(taskDiv);
  [icon, taskP, iconTrash].forEach((el) => {
    taskDiv.append(el);
  });
};

//добавление нового элемента
addBtnEl.addEventListener('click', () => {
  if (addTextEl.value !== '') {
    elArr.push({
      name: addTextEl.value,
      active: 0,
    });
    addTask(elArr[elArr.length - 1]);
    loacalAdd();
    addTextEl.value = '';
  }
});

//событие на полную загрузку страницы и выгрузка локальных данных
window.addEventListener('load', () => {
  if (localStorage.hasOwnProperty('Lerts')) {
    elArr = JSON.parse(localStorage.getItem('Lerts'));
    if (elArr.lenght !== 0) {
      elArr.forEach((obj) => {
        console.log(obj);
        addTask(obj);
      });
    }
  }
});

// функция для снятия и установки выполнения задания из списка
function check(e, obj) {
  let elment;

  if (e.classList.contains('completed-i')) {
    e.classList.remove('completed-i');
    e.nextElementSibling.classList.remove('completed-p');
    obj.active = 0;
    elment = elArr.splice(elArr.indexOf(obj), 1);
    elArr.push(elment[0]);
    elment = e.parentElement;
    e.parentElement.remove();
    tasksDiv.prepend(elment);
  } else {
    e.classList.add('completed-i');
    e.nextElementSibling.classList.add('completed-p');
    obj.active = 1;
    elment = elArr.splice(elArr.indexOf(obj), 1);
    elArr.unshift(elment[0]);
    elment = e.parentElement;
    e.parentElement.remove();
    tasksDiv.appendChild(elment);
  }
  loacalAdd();
}

//удаление элемента
function deleteEl(el, obj) {
  elArr.splice(elArr.indexOf(obj), 1);
  el.parentElement.remove();
  loacalAdd();
}

//добавление в локальное хранилище
function loacalAdd() {
  localStorage.Lerts = JSON.stringify(elArr);
}
