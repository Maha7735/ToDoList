let tasks = [
  {
    title: "دراسة البرمجة",
    date: "01/01/2030",
    isDone: false,
  },
  {
    title: "دراسة التخزين السحابي",
    date: "01/03/2030",
    isDone: false,
  },
  {
    title: "دراسة الرياضيات",
    date: "01/03/2030",
    isDone: false,
  },
];
//we put the get local storge here to avoid the overwrite
function getTasksFromStorge() {
  let retrievedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (retrievedTasks == null) {
    tasks = [];
  } else {
    tasks = retrievedTasks;
  }
  //بدل جمله الاف اقدر اختصر كالتالي
  // tasks = retrievedTasks ?? []
}
getTasksFromStorge();
//we put this code inside function as a Correct practice

function fillTasksOnThePage() {
  document.getElementById("tasks").innerHTML = "";
  let index = 0;
  for (var i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    var content = `
                  <div class="task ${task.isDone ? "done" : ""} ">
                      <div id="info">
                      <h2>${tasks[i].title}</h2>
                      <div>
                          <i class="fa-solid fa-calendar-days"></i><span> ${
                            tasks[i].date
                          } </span>
                      </div>
                      </div>
                      <div id="action">
                      <button onclick="deleteTask(${index})" class="circular" id="delete">
                          <i class="fa-solid fa-trash"></i>
                      </button>
                      ${
                        task.isDone
                          ? `
                          <button onclick="toggleTaskCompletion(${index})" style="background-color: rgb(134, 91, 91);" class="circular" id="check">
                          <i class="fa-solid fa-xmark"></i></i>
                      </button>
                          `
                          : `
                        <button onclick="toggleTaskCompletion(${index})" class="circular" id="check">
                          <i class="fa-solid fa-check"></i></i>
                      </button>
                        `
                      }

                      <button onclick="editTask(${index})" class="circular" id="edit">
                          <i class="fa-solid fa-pen"></i></i>
                      </button>
                      </div>
                  </div>
              `;
    document.getElementById("tasks").innerHTML += content;
    index++;
  }
}
fillTasksOnThePage();

document.getElementById("addBtn").addEventListener("click", function () {
  let taskName = prompt("الرجاء ادخال عنوان المهمه");
  //MAKE DATE
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const formattedDate = `${day}/${month}/${year}`;
  // == MAKE DATE==
  let newTask = {
    title: taskName,
    date: formattedDate,
    isDone: false,
  };
  tasks.push(newTask);
  // THE BEST PLACE TO CREATE LOCAL STORGE AFTER WE ADD THE NEW TASK
  //LOCAL STORGE
  storeTasks();

  fillTasksOnThePage();
});

//DELETE FUNCTION
function deleteTask(index) {
  let isConfirm = confirm(` هل انت متاكد من حذف : ${tasks[index].title} ؟`);
  if (isConfirm) {
    tasks.splice(index, 1);
    storeTasks();
    //after any programing refresh we call the function to refresh the UI also
    fillTasksOnThePage();
  }
}
// == DELETE FUNCTION ==

//EDIT FUNCTION
function editTask(index) {
  let task = tasks[index];
  let newTaskTitle = prompt("الرجاء ادخال عنوان المهمة الجديد ", task.title);
  task.title = newTaskTitle;
  storeTasks();
  fillTasksOnThePage();
}
// == EDIT FUNCTION ==
//COMPLETE FUNCTION
// == COMPLETE FUNCTION ==
function toggleTaskCompletion(index) {
  let task = tasks[index];
  task.isDone = !task.isDone;
  storeTasks();
  fillTasksOnThePage();
}
//storge FUNCTION ======
function storeTasks() {
  let taskString = JSON.stringify(tasks);
  localStorage.setItem("tasks", taskString);
}
