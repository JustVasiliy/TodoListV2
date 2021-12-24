export class API {
  constructor(url) {
    this.url = url;
  }
  async callAPI(route, method, obj) {
    const url = `${this.url}${route}`;
    const options = {
      method: `${method}`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    if (method === "GET") {
      delete options.body;
    }
    const response = await fetch(url, options);
    if (method === "GET") {
      return await response.json();
    } else {
      return await response;
    }
  }
}
