import pinImage from "../img/rb_7933.png";

export default class Task {
  constructor(id, content, boardId) {
    this.id = id;
    this.content = content;
    this.boardId = boardId;
  }

  render() {
    const task = this.createTaskElement(this.content);
    task.setAttribute("data-id", this.id);
    task.setAttribute("data-board-id", this.boardId);
    return task;
  }

  createTaskElement(content) {
    const task = document.createElement("div");
    task.setAttribute("data-id", this.id);
    task.classList.add("task");

    const taskInputWrapper = document.createElement("div");
    taskInputWrapper.classList.add("task_input_wrapper");
    task.appendChild(taskInputWrapper);

    const inputWrapper = document.createElement("div");
    inputWrapper.classList.add("input_wrapper");

    const inputInnerWrapper = document.createElement("div");
    inputInnerWrapper.classList.add("input_inner_wrapper");
    inputWrapper.appendChild(inputInnerWrapper);

    const taskInput = document.createElement("textarea");
    taskInput.classList.add("task_input");
    taskInput.textContent = content;

    const taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.name = "task_checkbox";
    taskCheckbox.classList.add("task_checkbox");
    taskCheckbox.addEventListener("change", () => {
      if (taskCheckbox.checked) {
        taskInput.classList.add("line-through"); 

        setTimeout(() => {
          task.remove();
          const board = document.querySelector(
            `.task_container[data-id="${this.boardId}"]`,
          );
          if (board) {
            const pinnedTasksContainer = board.querySelector(
              ".pinned_wrapper .pinned_tasks",
            );
            const emptyMessage = board.querySelector(
              ".pinned_wrapper .no_pinned_tasks",
            );
            this.updatePinnedVisibility(pinnedTasksContainer, emptyMessage);
          }
        }, 1000);
      }
    });

    const taskButtons = document.createElement("div");
    taskButtons.classList.add("task_buttons");

    const deleteBtn = this.createButton("🗑️", "delete_task_button", () => {
      const board = document.querySelector(
        `.task_container[data-id="${this.boardId}"]`,
      );
      const pinnedTasksContainer = board.querySelector(
        ".pinned_wrapper .pinned_tasks",
      );
      const emptyMessage = board.querySelector(
        ".pinned_wrapper .no_pinned_tasks",
      );
      task.remove();

      this.updatePinnedVisibility(pinnedTasksContainer, emptyMessage);
    });
    const pinnedBtn = this.createButton("📌", "pinned_task_button", () =>
      this.addPin(this.content),
    );

    taskButtons.append(deleteBtn, pinnedBtn);

    inputInnerWrapper.append(taskInput, taskCheckbox);
    taskInputWrapper.append(inputWrapper, taskButtons);
    return task;
  }

  createButton(text, className, onClick) {
    const button = document.createElement("button");
    button.classList.add(className);
    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
  }

  createPinnedSection(board) {
    const taskBlock = board.querySelector(".task_block");
    if (board.querySelector(".pinned_wrapper")) return;

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper", "pinned_wrapper");

    const pinnedHeader = document.createElement("h2");
    pinnedHeader.textContent = "Pinned";
    const pinImg = document.createElement("img");
    pinImg.src = pinImage;
    pinImg.alt = "pin";
    pinImg.classList.add("pin");

    const pinnedHeaderWrapper = document.createElement("div");
    pinnedHeaderWrapper.classList.add("pinned_header_wrapper");
    pinnedHeaderWrapper.append(pinnedHeader, pinImg);

    const pinnedTasks = document.createElement("div");
    pinnedTasks.classList.add("pinned_tasks");

    const noPinned = document.createElement("div");
    noPinned.classList.add("no_pinned_tasks");
    noPinned.textContent = "No pinned tasks";

    wrapper.append(pinnedHeaderWrapper, pinnedTasks, noPinned);

    const allTasks = taskBlock.querySelector(".all_tasks_wrapper");
    taskBlock.insertBefore(wrapper, allTasks);
    this.updatePinnedVisibility(pinnedHeaderWrapper, noPinned);

    return wrapper;
  }

  updatePinnedVisibility(pinnedTasks, emptyMessage) {
    if (!emptyMessage) return;
    const pinnedHeaderWrapper = emptyMessage
      .closest(".pinned_wrapper")
      .querySelector(".pinned_header_wrapper");
    if (pinnedTasks.children.length === 0) {
      emptyMessage.style.display = "block";
      pinnedTasks.style.display = "none";
      pinnedHeaderWrapper.style.display = "none";
    } else {
      emptyMessage.style.display = "none";
      pinnedTasks.style.display = "flex";
      pinnedHeaderWrapper.style.display = "flex";
    }
  }

  addPin(content) {
    const board = document.querySelector(
      `.task_container[data-id="${this.boardId}"]`,
    );
    console.log(board);
    if (!board) return;

    const pinnedWrapper = board.querySelector(".pinned_wrapper");

    if (!pinnedWrapper) {
      this.createPinnedSection(board);
    }

    const pinnedTasksContainer = board.querySelector(
      ".pinned_wrapper .pinned_tasks",
    );
    const allTasksContainer = board.querySelector(".all_tasks_wrapper");
    const emptyMessage = board.querySelector(
      ".pinned_wrapper .no_pinned_tasks",
    );

    const existingPinnedTask = pinnedTasksContainer.querySelector(
      `[data-id="${this.id}"]`,
    );
    if (existingPinnedTask) {
      pinnedTasksContainer.removeChild(existingPinnedTask);

      const taskElement = this.createTaskElement(content);
      allTasksContainer.appendChild(taskElement);
    } else {
      const pinnedTask = this.createTaskElement(content);
      pinnedTasksContainer.appendChild(pinnedTask);

      const task = allTasksContainer.querySelector(`[data-id="${this.id}"]`);
      if (task) {
        allTasksContainer.removeChild(task);
      }
    }
    this.updatePinnedVisibility(pinnedTasksContainer, emptyMessage);
  }
}
