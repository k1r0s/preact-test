import { h, render } from 'preact';
import { Request } from "../src/services/Request.js";
import moxios from "moxios"

import UserBoard from '../src/components/user-board/user-board.comp';

describe("<UserBoard /> e2e tests", () => {

  let scratch = null;
  let fakeSession = {
    "id": 2,
    "name": "John",
    "email": "john@asd.net",
    "password": "1234"
  }

  beforeEach(done => {
    scratch = document.createElement('div');
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    moxios.install(Request)
    done()
  });

  afterEach(done => {
    moxios.uninstall(Request)
    done()
  })

  it("should display a comment from philip", (done) => {

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

    let component = null;
    render(<UserBoard ref={ref => component = ref} session={fakeSession} />, scratch);

    sleep(3).then(_ => {

			expect(scratch.innerHTML).toContain("Philip here");
      expect(component.state.comments).toBeInstanceOf(Array)
      done();
    });

  })

})
