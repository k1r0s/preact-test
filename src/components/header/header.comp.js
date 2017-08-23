import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './header.comp.css';

export default function Header (prop) {
	return (
		<header class={style.header}>
			<h1>Mint Labs &copy;</h1>
			{prop.displayLinks &&
				<nav>
					<Link activeClassName={style.active} href="/">Home</Link>
					<Link activeClassName={style.active} href="/board/">Board</Link>
				</nav>
			}
		</header>
	);
}
