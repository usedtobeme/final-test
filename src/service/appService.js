import axios from 'axios'

const url = 'https://klatsch.herokuapp.com/users'
const urlUser = 'https://5cfe634cca949b00148d40ab.mockapi.io/user'
const urlAvatar = 'https://randomuser.me/api/?gender='

export function getAll(callback) {
  axios
    .get(url)
    .then(res => {
      callback(res)
    })
    .catch(e => {
      console.log(e)
    })
}

export function getFiltered(criteria, i, callback) {
  let params = ''
  if (!criteria[0]) {
    params = `&status=${criteria[1]}&status=${criteria[2]}&status=${
      criteria[3]
    }`
  }
  axios
    .get(
      `${url}?_sort=appointment.start&_order=asc&_page=1&_limit=${i}${params}&appointment.start_gte=${new Date().getTime()}`
    )
    .then(res => {
      callback(res.data)
    })
    .catch(e => {
      console.log(e)
    })
}
export function getId(id, callback) {
  axios
    .get(`${url}/${id}`)
    .then(res => {
      callback(res)
    })
    .catch(e => {
      console.log(e)
      callback(e)
    })
}

export function getUser(callback) {
  axios
    .get(urlUser)
    .then(res => {
      callback(res)
    })
    .catch(e => {
      console.log(e)
    })
}
export function changeStatus(e, callback) {
  axios
    .put(`${url}/${e.id}`, e, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => {
      callback(res)
    })
    .catch(e => {
      console.log(e)
    })
}
export function addNewDate(e, callback) {
  axios
    .post(url, e, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => {
      callback(res)
    })
    .catch(e => {
      console.log(e)
    })
}
export function deleteUser(id, callback) {
  axios
    .delete(`${url}/${id}`)
    .then(res => {
      callback(res)
    })
    .catch(e => {
      console.log(e)
    })
}

export function randomAvatar(gender, callback) {
  axios
    .get(`${urlAvatar}${gender}`)
    .then(res => {
      callback(res.data.results[0].picture.medium)
    })
    .catch(e => {
      console.log(e)
    })
}

export function uploadImg(data, callback) {
  axios
    .post(` https://api.imgur.com/3/image`, data, {
      headers: { Authorization: 'Client-ID 49c2dfff60bcd5c' },
    })
    .then(res => {
      callback(res)
    })
    .catch(e => {
      console.log(e)
    })
}
