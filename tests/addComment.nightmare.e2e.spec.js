var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe("e2e addComment test", () => {
  beforeEach(() => {
    nightmare
      .goto('http://localhost:3000/')

  })

  it("should add a comment", (done) => {
    nightmare
    .type('#email', 'anna@asd.net')
    .type('#pass', '1234')
    .click('#app-content button')
    .wait('a[href="/board/"]')
    .click('a[href="/board/"]')
    .wait('#newCommentText')
    .type('#newCommentText', "this is a test")
    .click('[new-comment] button')
    .wait('ul li.mdl-list__item')
    .evaluate(() => {
      return Array.prototype.slice.call(document.querySelectorAll("li.mdl-list__item [comment-item-content]"))
      .map(element => element.innerHTML)
    })
    .end()
    .then((result) => {
      expect(result.length).toBe(1);
      expect(result).toContain("this is a test");
      done();
    })
    .catch((error) => {
      throw error;
    });

  })
})
