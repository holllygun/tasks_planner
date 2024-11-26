import Space from "./generate_table";
import Board from "./board";
import TaskFilter from "./task_filter";

export default class UserBoard {
  constructor() {
    this.board = new Board();
    this.space = new Space();
    this.taskFilter = new TaskFilter(".filter_input", ".task_container");

    this.init();
  }

  init() {
    const addBtn = document.querySelector(".add_taskslist_button");
    addBtn.addEventListener("click", () => {
      const hidden = document.querySelector(".hidden");
      if (hidden) {
        hidden.classList.remove("hidden");
      }

      const id = this.board.addTable();
      this.space.generateTable(
        id,
        (removeId) => {
          this.board.removeTable(removeId);
          this.taskFilter.applyFilter(
            this.taskFilter.filterInput.value.toLowerCase(),
          );
        },
        (taskId, taskContent) => {
          this.board.addTaskToTable(id, { id: taskId, content: taskContent });
          this.taskFilter.applyFilter(
            this.taskFilter.filterInput.value.toLowerCase(),
          );
        },
      );

      this.taskFilter.applyFilter(
        this.taskFilter.filterInput.value.toLowerCase(),
      );
    });
  }
}
