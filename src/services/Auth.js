import { getUsers } from './Request';
import { CustomStorage } from './Memo.js';

export class Auth {
  static SESSION_KEY = 'lastSession';

  static isLogged() {
    return !!CustomStorage.read(Auth.SESSION_KEY);
  }

  static doLogin(email, pass) {
    return new Promise(function(resolve, reject) {
      getUsers().then(({ data }) => {
        const user = data.find(user => user.email === email && user.password === pass);
        if (user) {
          CustomStorage.write(Auth.SESSION_KEY, user);
          resolve(user);
        } else {
          reject(new Error('Incorrect user or password, please try again'));
        }
      });
    });
  }

  static logOut() {
    CustomStorage.remove(Auth.SESSION_KEY);
  }
}
