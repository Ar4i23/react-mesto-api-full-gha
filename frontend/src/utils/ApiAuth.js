class ApiAuth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authorization = this._headers.authorization;
    this._contenType = this._headers["Content-Type"];
  }
  _checkResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`${res.status} ${res.statusText}`);
  }

  signup(data) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    }).then(this._checkResponse);
  }
  signin(data) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    }).then(this._checkResponse);
  }

  getUsersMe(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": this._contenType,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}
const apiAuth = new ApiAuth({
  baseUrl: "https://api.arthur.mesto.nomoredomainsrocks.ru",
  headers: {
    "Content-Type": "application/json",
  },
});
export default apiAuth;
