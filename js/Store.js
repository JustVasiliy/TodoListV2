//class for save items in array and logic
import { API } from "./API.js";
import { url } from "../config/index.js";
const api = new API(url);
export class Store {
  constructor() {
    this.arrayTodos = [];
  }

  async create(name) {
    await api.callAPI("create", "POST", {
      name: name,
      checked: false,
      deleted: false,
      editing: false,
    });
  }
 
  async put(route, data) {
    await api.callAPI(route, "PUT", data);
  }
  async delete(id) {
    await api.callAPI("delete", "DELETE", { id: id });
  }

  change(id) {
    for (let i = 0; i < this.arrayTodos.length; i++) {
      if (this.arrayTodos[i].id === +id) {
        this.arrayTodos[i].editing = true;
      }
    }
  }

  async get() {
    this.arrayTodos = await api.callAPI("todos", "GET");
    return await this.arrayTodos
  }
}
