import axios from 'axios'

export const Request = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 10000,
  headers: {'Accept': 'application/json'}
});

export const getUsers = _ => Request.get('users');

export const getComments = _ => Request.get('comments');

export const postComment = (comment) => {
  return Request.post('comments', comment);
}

export const putComment = (id, comment) => {
  return Request.put(`comments/${id}`, comment);
}
