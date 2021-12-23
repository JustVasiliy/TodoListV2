//class for save items in array and logic
import { API } from "./API.js";
const api = new API("http://127.0.0.1:3000/");
export class Store {
  constructor() {
    this.array = [];
  }
  async create(name) {
    api.pushToAPI("create", "POST", {
      name: name,
      checked: false,
      deleted: false,
      editing: false,
    });
  }
  check(id) {
    api.pushToAPI("checked", "PUT", { id: id });
  }
  delete(id) {
    api.pushToAPI("delete", "DELETE", { id: id });
  }
  change(id) {
    api.pushToAPI("editing", "PUT", { id: id });
  }
  editing(id, chengedName) {
    api.pushToAPI("change", "PUT", { name: chengedName, id: id });
  }
}
