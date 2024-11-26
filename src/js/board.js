export default class Board {
  constructor() {
    this.tasks = {};
    this.counter = 0;
  }

  addTable() {
    const id = ++this.counter;
    this.tasks[id] = [];
    return id;
  }

  removeTable(id) {
    console.log("removee");
    delete this.tasks[id];
  }

  addTaskToTable(tableId, task) {
    if (!this.tasks[tableId]) {
      console.error(`Table with ID ${tableId} does not exist.`);
      return;
    }
    this.tasks[tableId].push(task);
  }

  removeTaskFromTable(tableId, taskId) {
    if (!this.tasks[tableId]) {
      console.error(`Table with ID ${tableId} does not exist.`);
      return;
    }
    this.tasks[tableId] = this.tasks[tableId].filter(
      (task) => task.id !== taskId,
    );
  }
}
