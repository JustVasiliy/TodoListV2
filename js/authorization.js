import { API } from "../js/API.js";
import { url } from "../config/index.js";
import { getCookie } from "./getCookie.js";
const btnAuth = document.getElementById("Auth");
const inputNickname = document.getElementById("nickname");
const inputPassword = document.getElementById("password");
const api = new API(url);
if (document.cookie["token"] !== undefined) {
  document.cookie["token"] = "";
}

btnAuth.addEventListener("click", sendAuth);

async function sendAuth() {
  const call = await api.callAPI("authorization", "POST", "12345", {
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
}
