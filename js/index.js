import { Render } from "./Render.js";
import { RenderMainForm } from "./RenderMainForm.js";
import { Store } from "./Store.js";
import { EventEmitter } from "./EventEmitter.js";
import { API } from "./API.js";
import { getCookie } from "./getCookie.js";
import { RenderPages } from "./RenderPages.js";
import { url } from "../config/index.js";

const renderPage = new RenderPages();
//check authorization
if (
  getCookie("token") === "Invalid token" ||
  getCookie("token") === undefined ||
  getCookie("token") === ""
) {
  renderPage.renderAuthOrRegistr();
  const registration = document.getElementById("registration");
  const authorization = document.getElementById("authorization");
  //registration
  registration.addEventListener("click", () => {
    //clean DOM
    const nodeUl = document.getElementById("root");
    while (nodeUl.firstChild) nodeUl.removeChild(nodeUl.firstChild);
    renderPage.renderRegistration();
    const inputName = document.getElementById("name");
    const inputSurname = document.getElementById("surname");
    const inputNickname = document.getElementById("nickname");
    const inputPassword = document.getElementById("password");
    const btnSend = document.getElementById("send");

    const api = new API(url);

    btnSend.addEventListener("click", async () => {
      const call = await api.callAPI("registration", "POST", "", {
        name: inputName.value,
        surname: inputSurname.value,
        nickname: inputNickname.value,
        password: inputPassword.value,
        id: Math.round(Date.now() / 100 + 30),
      });

      document.cookie = `token=${await call.text()}`;
      window.location = "index.html";
    });
  });
  //authorization
  authorization.addEventListener("click", () => {
    //clean DOM
    const nodeUl = document.getElementById("root");
    while (nodeUl.firstChild) nodeUl.removeChild(nodeUl.firstChild);

    renderPage.renderAuthorization();
    const btnAuth = document.getElementById("Auth");
    const inputForNickname = document.getElementById("nickname");
    const inputForPassword = document.getElementById("password");
    if (document.cookie["token"] !== undefined) {
      document.cookie["token"] = "";
    }

    btnAuth.addEventListener("click", sendAuth);
    const api = new API(url);
    async function sendAuth() {
      const call = await api.callAPI("authorization", "POST", "12345", {
        nickname: inputForNickname.value,
        password: inputForPassword.value,
      });

      document.cookie = `token=${await call.text()}`;

      window.location = "index.html";
    }
  });
} else {
  //if token is valid, render this
  const renderMainForm = new RenderMainForm();
  let api = new API("http://127.0.0.1:3000/");

  const store = new Store();
  let reRender = new Render();
  //render main form
  renderMainForm.render();

  const btnCreate = document.querySelector(".btnCreate");
  const inputCreateName = document.querySelector(".inputCreateName");
  const listItems = document.querySelector(".listItems");

  const emitter = new EventEmitter();
  emitter.on("tasksUpdated", (data) => reRender.render(data));
  document.addEventListener("DOMContentLoaded", async () => {
    await store.get();
    emitter.emit("tasksUpdated", store.arrayTodos);
  });

  btnCreate.addEventListener("click", async () => {
    if (inputCreateName.value.trim() !== "") {
      await store.create(inputCreateName.value.trim());
      await store.get();

      emitter.emit("tasksUpdated", store.arrayTodos);
    }

    inputCreateName.value = "";
  });
  inputCreateName.addEventListener("keydown", async (event) => {
    if (event.keyCode === 13) {
      if (inputCreateName.value.trim() !== "") {
        await store.create(inputCreateName.value.trim());
        await store.get();
        emitter.emit("tasksUpdated", store.arrayTodos);
      }
      inputCreateName.value = "";
    }
  });

  //listeners
  listItems.addEventListener("click", async (event) => {
    if (event.target.className === "check") {
      const id = event.target.parentElement.getAttribute("id");
      const name = event.target.parentElement.children[1].innerText;
      let checked =
        !!event.target.parentElement.children[2].getAttribute("checked");
      await store.put("put", {
        id: id,
        name: name,
        checked: !checked,
        deleted: false,
        editing: false,
      });

      await store.get();
      emitter.emit("tasksUpdated", store.arrayTodos);
    } else if (event.target.className === "delete") {
      let id = event.target.parentElement.parentElement.getAttribute("id");
      await store.delete(id);
      await store.get();
      emitter.emit("tasksUpdated", store.arrayTodos);
    } else if (event.target.className === "change") {
      let id = event.target.parentElement.parentElement.getAttribute("id");
      await store.change(id);
      emitter.emit("tasksUpdated", store.arrayTodos);
    } else if (event.target.className === "saveBtn") {
      const id = event.target.parentElement.parentElement.getAttribute("id");
      const inputChange = event.target.parentElement.parentElement.children[0];
      let checked =
        event.target.parentElement.parentElement.children[2].getAttribute(
          "checked"
        );
      if (checked === null) {
        checked = false;
      }
      let newName = inputChange.value;
      if (newName.trim() !== "") {
        await store.put("put", {
          id: id,
          name: newName,
          checked: checked,
          deleted: false,
          editing: false,
        });
      }

      await store.get();
      emitter.emit("tasksUpdated", store.arrayTodos);
    }
  });
  //Keydown for inputChange
  listItems.addEventListener("keydown", async (event) => {
    let id = event.target.parentElement.getAttribute("id");
    let checked =
      event.target.parentElement.children[2].getAttribute("checked");

    if (checked === null) {
      checked = false;
    }
    if (event.keyCode === 13) {
      const inputChange = event.target;
      let newName = inputChange.value;
      if (newName.trim() !== "") {
        await store.put("put", {
          id: id,
          name: newName,
          checked: checked,
          deleted: false,
          editing: false,
        });
      }
      const todos = await api.callAPI("todos", "GET");
      emitter.emit("tasksUpdated", todos);
    } else if (event.keyCode === 27) {
      let newName = undefined;
      await store.editing(id, newName);
    }
  });
  store.get();
}
