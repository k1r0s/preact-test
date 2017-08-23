import board from "../src/services/Board.repo.js";
import { Request } from "../src/services/Request.js";
import moxios from "moxios"

const boardInstance = board();

describe("board.repo unit tests", () => {

  beforeEach(done => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    moxios.install(Request)
    done()
  })

  afterEach(done => {
    moxios.uninstall(Request)
    done()
  })


  it("should return all comments", (done) => {
    //
    // expect(1).toBe(1);
    // return done();

    moxios.stubRequest(/users/, {
      status: 200,
      response: [
        {
          "id": 3,
          "name": "Philip",
          "email": "pip@asd.net",
          "password": "1234"
        }
      ]
    })

    moxios.stubRequest(/comments/, {
      status: 200,
      response: [
        {
          "id": 1252,
          "authorId": 3,
          "timestamp": 1503415529819,
          "content": "Hey guys, Philip here!"
        }
      ]
    })

    boardInstance.readComments()
    .then(comments => {
      expect(comments.length).toBe(1);
      expect(comments[0].authorId).toBe(3);
      expect(comments[0].content).toContain("Philip here!");
      expect("author" in comments[0]).toBe(true);
      expect(comments[0].author.email).toContain("asd.net");
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    })
  })
})
