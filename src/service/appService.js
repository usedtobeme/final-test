import axios from "axios";

const url = "https://5cfe634cca949b00148d40ab.mockapi.io/data";
const urlUser="https://5cfe634cca949b00148d40ab.mockapi.io/user"

export function getAll(callback) {
  axios
    .get(url)
    .then(res => {
      callback(res);
    })
    .catch(e => {
      console.log(e);
      callback(e);
    });
}
export function getId(id, callback) {
  axios
    .get(`${url}/${id}`)
    .then(res => {
      callback(res);
    })
    .catch(e => {
      console.log(e);
      callback(e);
    });
}

export function getUser(callback) {
  axios
    .get(urlUser)
    .then(res => {
      callback(res);
    })
    .catch(e => {
      console.log(e);
      callback(e);
    });
}
