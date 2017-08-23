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
				<Header displayLinks={!!this.state.currentUser}/>
				<div id="app-content">
				{!this.state.currentUser ?
					<Login success={this.handleLoginSuccess} />
					:
					<Router onChange={this.handleRoute}>
						<Home session={this.state.currentUser} path="/" />
						<UserBoard session={this.state.currentUser} path="/board/" />
					</Router>
				}
				</div>
			</div>
		);
	}
}
