//class for save items in array and logic
import { API } from "./API.js";
import { url } from "../config/index.js";
import { getCookie } from "./getCookie.js";
import { RenderPages } from "./RenderPages.js";
const api = new API(url);

export class Store {
  constructor() {
    this.arrayTodos = [];
  }

  async create(name) {
    const token = getCookie("token");

    const res = await api.callAPI("create", "POST", token, {
      name: name,
      checked: false,
      deleted: false,
      editing: false,
      token: token,
    });
    const status = await res.json();
   
    if (status.status === 401) {
      document.cookie = 'token=Invalid token';
      window.location = 'index.html';
    }
  }

  async put(route, data) {
    const token = getCookie("token");
    const res = await api.callAPI(route, "PUT", token, data);
    const status = await res.json();
    if (status.status === 401) {
      document.cookie = 'token=Invalid token';
      window.location = 'index.html';
    }
  }
  async delete(id) {
    const token = getCookie("token");
    const res = await api.callAPI("delete", "DELETE", token, { id: id });
    const status = await res.json();
    if (status.status === 401) {
      document.cookie = 'token=Invalid token';
      window.location = 'index.html';
    }

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
    this.arrayTodos = await api.callAPI("get", "GET", token);
    const status = await api.callAPI("get", "GET", token);
    
    if (
      status.status === 401
    ) {
      document.cookie = 'token=Invalid token'
      window.location = 'index.html'
      
    }
    return await this.arrayTodos;
  }
}
