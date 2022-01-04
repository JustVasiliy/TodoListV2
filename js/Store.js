//class for save items in array and logic
import { API } from "./API.js";
import { url } from "../config/index.js";
import { getCookie } from "./getCookie.js";
const api = new API(url);

export class Store {
  constructor() {
    this.arrayTodos = [];
  }

  async create(name) {
    const token = getCookie("token");
    await api.callAPI("create", "POST", token, {
      name: name,
      checked: false,
      deleted: false,
      editing: false,
      token: token,
    });
  }

  async put(route, data) {
    const token = getCookie("token");
    await api.callAPI(route, "PUT", token, data);
  }
  async delete(id) {
    const token = getCookie("token");
    await api.callAPI("delete", "DELETE", token, { id: id });
  }

  change(id) {
    for (let i = 0; i < this.arrayTodos.length; i++) {
      if (this.arrayTodos[i].id === +id) {
        this.arrayTodos[i].editing = true;
      }
    }
  }

  async get() {
    const token = getCookie("token");
    this.arrayTodos = await api.callAPI("todos", "GET", token);
    if (
      (await api.callAPI("todos", "GET", token)) === "You don't have a token"
    ) {
      window.location = "authOrRegistr.html";
    }
    return await this.arrayTodos;
  }
}
