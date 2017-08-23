export class CustomStorage {
  static read(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static write(key, value) {
    localStorage.setItem(key, value ? JSON.stringify(value) : "");
  }

  static remove(key) {
    delete localStorage[key];
  }
}
