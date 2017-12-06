import * as types from './mutation-types'
import axios from 'axios'

export const getUser = ({commit}) => {
  console.log('getUser called')
  axios.get('/isauth')
  .then(function (response) {
    commit(types.GET_USER, response.data)
  })
  .catch(function (error) {
  })
}

export const getCount = ({commit}) => {
  fetch(`/count`, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(json => commit(types.GET_COUNT, json))
}

export const incCount = ({commit}, countPayload) => {
  fetch(`/count`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ count: ++countPayload })
  })
  .then(response => response.json())
  .then(json => commit(types.INC_COUNT, json))
}

export const register = ({commit}, userPayload) => {
  fetch(`/users`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userPayload)
  })
  .then(response => response.json())
  .then(json => commit(types.REGISTER, json))
}

export const registerUser = ({commit}, userPayload) => {
  return new Promise((resolve, reject) => {
    fetch(`/users/register`, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userPayload)
    })
    .then(res => {
      resolve(res)
    })
    .then(err => {
      reject(err)
    })
  })
}

export const login = ({commit}) => {
  axios.get('/isauth')
  .then(function (response) {
    commit(types.LOGIN, response.data)
  })
  .catch(function (error) {
  })
}

export const logout = ({commit}) => {
  commit(types.LOGOUT)
}

export const addPost = ({commit}, postPayload) => {
  return new Promise((resolve, reject) => {
    fetch(`/posts/create`, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postPayload)
    })
    .then(res => {
      console.log("SUCCESS")
      resolve(res)
    })
    .then(err => {
      console.log("ERROR")
      reject(err)
    })
  })
}

export const getPosts = ({commit}, args) => {
  const path = "/posts/list/" + args
  axios.get(path)
  .then(function (response) {
    commit(types.ADD_POST, response.data)
  })
  .catch(function (error) {
    console.log(error)
  })
}

// get shortest friend path
export const getFriendPath = ({commit}, args) => {
  const path = 'users/list/friend/shortest/' +args[0] +'/' +args[1]
  axios.get(path)
  .then(function (response) {
    var responseList
    for (var i = 0; i < response.data.data.length; i++) {
      responseList.push(response.data.data[i].username)
    }
    commit(types.GET_FRIEND, responseList)
  })
  .catch(function (error) {
    console.log('getFriendPath error' +error)
  })
}