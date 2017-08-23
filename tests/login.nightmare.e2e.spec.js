var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });
import db from '../src/db.json'


describe("e2e login test", () => {
  beforeEach(() => {
    nightmare
      .goto('http://localhost:3000/')

  })

  it("should log in anna@asd.net with 1234 as password", (done) => {
    nightmare
    .type('#email', 'anna@asd.net')
    .type('#pass', '1234')
    .click('#app-content button')
    .wait('h4')
    .evaluate(function () {
        return document.querySelector('h4').innerHTML;
    })
    .end()
    .then(function (result) {
      expect(result).toBe("Welcome back Anna");
      done();
    })
    .catch(function (error) {
      throw error;
    });

  })
})
