import { h } from 'preact';
import style from './home.comp.css';

export default function Home ({ session }) {
	return (
		<div class={style.def}>
			<h4>Welcome back {session.name}</h4>
		</div>
	);
}
