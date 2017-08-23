import { getUsers, getComments, postComment, putComment } from './Request';

class BoardRepository {

  users = []

  static mapUsers = (comments, users) => {
    return comments.map(comment => {
      comment.author = users.find(user => comment.authorId === user.id);
      return comment;
    })
  }

  readComments() {
    return new Promise((resolve, reject) => {
      if(!this.users.length) {
        this.readUsers().then(_ => this.readComments().then(resolve))
      } else {
        this.readBoard().then(resolve)
      }
    });
  }

  readBoard() {
    return new Promise((resolve, reject) => {
      getComments().then(({ data }) => resolve(BoardRepository.mapUsers(data, this.users)))
    });
  }

  createComment(authorId, content) {
    return postComment({
      authorId,
      timestamp: Date.now(),
      content
    })
  }

  updateComment(comment, newContent) {
    return putComment(comment.id, {
      authorId: comment.authorId,
      timestamp: comment.timestamp,
      content: newContent
    })
  }

  readUsers() {
    return getUsers()
    .then(({data}) => this.users = data)
  }
}

let instance;

export default function board () {
  if(instance) return instance;
  else return instance = new BoardRepository
}
