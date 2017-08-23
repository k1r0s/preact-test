import { h, Component } from 'preact';
import { Auth } from '../../services/Auth'
import mdl from 'material-design-lite/material';
import { Button, TextField, Layout, LayoutSpacer } from 'preact-mdl';

import style from './login.comp.css';

export default class Login extends Component {

  state = {
    email: "",
    pass: ""
  }

  handleChange = event => {
    const key = event.target.getAttribute('id');
    const value = event.target.value;

    this.setState(function (old) {
      old[key] = value;
      return old;
    });
  }


  submit = _ => {

    Auth.doLogin(this.state.email, this.state.pass)
    .then(this.props.success)
    .catch((err) => console.warn(err))
  }

	render() {
		return (
			<Layout.Content class={style.main}>

        <TextField
          id='email'
          onChange={this.handleChange}
          value={this.state.email}
          placeholder="Email"
          type="text"
        />

        <LayoutSpacer/>

        <TextField
          id='pass'
          autoComplete='off'
          onChange={this.handleChange}
          value={this.state.pass}
          placeholder="Password"
          type="password"
        />

        <LayoutSpacer/>

        <Button
          colored
          onClick={this.submit}
        >Log me in!</Button>

			</Layout.Content>
		);
	}
}
