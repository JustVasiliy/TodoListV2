//class for save items in array and logic
import { API } from "./API.js";
const api = new API("http://127.0.0.1:3000/");
export class Store {
  constructor() {
    this.array = [];
  }

  async create(name) {
    api.callAPI("create", "POST", {
      name: name,
      checked: false,
      deleted: false,
      editing: false,
    });
  }
  put(route, data) {
    api.callAPI(route, "PUT", data);
  }
  delete(id) {
    api.callAPI("delete", "DELETE", { id: id });
  }

  change(id) {
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i].id === +id) {
        this.array[i].editing = true;
      }
    }
  }

  async get() {
    this.array = await api.callAPI("todos", "GET");
  }
}
