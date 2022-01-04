import { API } from "../js/API.js";
import { url } from "../config/index.js";
import { getCookie } from "./getCookie.js";
const inputName = document.getElementById("name");
const inputSurname = document.getElementById("surname");
const inputNickname = document.getElementById("nickname");
const inputPassword = document.getElementById("password");
const btnSend = document.getElementById("send");

const api = new API(url);

btnSend.addEventListener("click", async () => {
  const call = await api.callAPI("new-user", "POST", "", {
    name: inputName.value,
    surname: inputSurname.value,
    nickname: inputNickname.value,
    password: inputPassword.value,
  });

  document.cookie = `token=${await call.text()}`;

  if (
    getCookie("token") === "You need registration!" ||
    getCookie("token") === undefined ||
    getCookie("token") === ""
  ) {
    window.location = "authOrRegistr.html";
  } else {
    window.location = "index.html";
  }
});
