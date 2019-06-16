import axios from "axios";

const url = "https://klatsch.herokuapp.com/users";
const urlUser = "https://5cfe634cca949b00148d40ab.mockapi.io/user";

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

export function getFiltered(criteria, i, callback) {
  let params = "";
  if (!criteria[0]) {
    params = `&status=${criteria[1]}&status=${criteria[2]}&status=${
      criteria[3]
    }`;
  }

  axios
    .get(
      `${url}?_sort=appointment.start&_order=asc&_page=1&_limit=${i}${params}&appointment.start_gte=${new Date().getTime()}`
    )
    .then(res => {
      callback(res.data);
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
export function changeStatus(e, callback) {
  axios
    .put(`${url}/${e.id}`, e, {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      callback(res);
    })
    .catch(e => {
      console.log(e);
      callback(e);
    });
}
