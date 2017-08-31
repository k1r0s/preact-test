import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header/header.comp';
import Home from './home/home.comp';
import UserBoard from './user-board/user-board.comp';
import Login from './login/login.comp';

export default class Main extends Component {

	state = {
		currentUser: null
	}

	//remove me
	componentDidMount() {
		this.handleLoginSuccess({
      "id": 4,
      "name": "Alex Mortinger",
      "email": "alex@asd.net",
      "password": "1234"
    })
	}

	handleLoginSuccess = user => {
		this.setState((old) => {
			old.currentUser = user;
			return old;
		});
	}

	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Header logged={!!this.state.currentUser}/>
				{!this.state.currentUser ?
					<Login success={this.handleLoginSuccess} />
					:
					<div class="main-container">
						<div class="wrap">
							<Router onChange={this.handleRoute}>
								<Home session={this.state.currentUser} path="/home" />
								<UserBoard session={this.state.currentUser} path="/" />
							</Router>
						</div>
					</div>
				}
			</div>
		);
	}
}
