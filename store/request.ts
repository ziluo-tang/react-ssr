class IRequest {
  get(url, params?) {
    if (params) {
      url = `${url}?${Object.keys(params)
        .map((key) => {
          return key + "=" + params[key];
        })
        .join("&")}`;
    }
    return fetch(url, {
      method: "get",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then(this.resolveRes);
  }
  post(url, data) {
    return fetch(url, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }).then(this.resolveRes);
  }
  private async resolveRes(res) {
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(res.statusText);
    }
  }
}

export default new IRequest();
