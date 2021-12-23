export class API {
  constructor(url) {
    this.url = url;
  }
  async pushToAPI(route, method, obj) {
    const url = `${this.url}${route}`;
    const options = {
      method: `${method}`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };

    const response = await fetch(url, options);
    return await response;
  }
  async callAPI() {
    const response = await fetch("http://127.0.0.1:3000/todos", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  }
}
