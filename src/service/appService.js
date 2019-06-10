import axios from "axios";

const url = "https://5cfe634cca949b00148d40ab.mockapi.io/data";

export function getAll(callback) {
  axios
    .get(url)
    .then(res => {
      return(res);
    })
    .catch(e => {
      console.log(e);
      callback(e);
    });
}
export function getId(id,callback) {
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
