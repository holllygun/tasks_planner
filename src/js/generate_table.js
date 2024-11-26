import starImagePath from "../img/star_11886128.png";
import deleteImagePath from "../img/close_440471.png";
import Task from "./Task";

export default class Space {
  generateTable(id, removeTableCallback, addTaskCallback) {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task_container");
    taskContainer.dataset.id = id;
    document.querySelector(".planner_container").appendChild(taskContainer);

    const taskBlock = document.createElement("div");
    taskBlock.classList.add("task_block");
    taskContainer.appendChild(taskBlock);

    const boardTitleWrapper = document.createElement("div");
    boardTitleWrapper.classList.add("board_title_wrapper");

    const boardTitle = document.createElement("h2");
    boardTitle.classList.add("board_title");
    boardTitle.contentEditable = true;
    boardTitle.textContent = `Board ${id}`;

    taskBlock.appendChild(boardTitleWrapper);

    boardTitle.addEventListener("blur", () => {
      const updatedTitle = boardTitle.textContent.trim();
      if (!updatedTitle) {
        boardTitle.textContent = `Board ${id}`;
      }
    });

    boardTitleWrapper.appendChild(boardTitle);

    const topTaskWrapper = document.createElement("div");
    topTaskWrapper.classList.add("top_task_wrapper");
    taskBlock.appendChild(topTaskWrapper);

    const topWrapper = document.createElement("div");
    topWrapper.classList.add("wrapper", "top_wrapper");

    const h2 = document.createElement("h2");
    h2.textContent = "TOP Tasks";
    const starimg = document.createElement("img");
    starimg.src = starImagePath;
    starimg.alt = "star";
    starimg.classList.add("star");
    topWrapper.append(h2, starimg);
    topTaskWrapper.appendChild(topWrapper);

    const topTask = document.createElement("div");
    topTask.classList.add("task_input", "top_task");
    topTask.contentEditable = true;
    topTaskWrapper.appendChild(topTask);

    const allTasksWrapper = document.createElement("div");
    allTasksWrapper.classList.add("all_tasks_wrapper");
    taskBlock.appendChild(allTasksWrapper);

    const allTasksHeader = document.createElement("h2");
    allTasksHeader.textContent = "All Tasks";
    allTasksWrapper.appendChild(allTasksHeader);

    topTask.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const content = topTask.textContent.trim();
        if (!content || !/[a-zA-Zа-яА-Я]/.test(content)) {
          const topWrapper = taskContainer.querySelector(".top_wrapper");
          const existingError = topWrapper.querySelector(".error");
          if (!existingError) {
            const error = document.createElement("div");
            error.classList.add("error");
            topWrapper.appendChild(error);
            error.textContent = "Please, write down a task!";
            setTimeout(() => {
              error.remove();
            }, 2000);
          }
        } else {
          const taskId = Date.now();
          const boardId = taskContainer.dataset.id;
          addTaskCallback(taskId, content, boardId);
          const task = new Task(taskId, content, boardId);
          const taskElement = task.render();

          allTasksWrapper.appendChild(taskElement);

          topTask.textContent = "";
        }
      }
    });

    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    taskContainer.appendChild(tooltip);
    const button = document.createElement("button");
    button.type = "submit";
    button.classList.add("remove_taskslist_button");
    tooltip.appendChild(button);
    button.addEventListener("click", () => {
      removeTableCallback(id);
      taskContainer.remove();
    });

    const crossImg = document.createElement("img");
    crossImg.src = deleteImagePath;
    crossImg.alt = "delete";
    crossImg.classList.add("remove_img");
    button.appendChild(crossImg);
    
    const tooltipText = document.createElement("div");
    tooltipText.classList.add("tooltiptext");
    tooltipText.textContent = "Delete tasklist";
    tooltip.appendChild(tooltipText);

    return taskContainer;
  }
}
