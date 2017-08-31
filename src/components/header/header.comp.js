import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './header.comp.css';
import { Icon, Button } from 'preact-mdl';

export default function Header (prop) {
	return (
		<header class={style.header}>
			<div class="wrap">
				{prop.logged ?
					<div class={style.menuContent}>
						<div class={style.buttonContainer}>
							<nav>
								<a><Icon white icon="people" /></a>
								<a><Icon icon="dehaze" /></a>
								<a><Icon icon="search" /></a>
							</nav>
						</div>
						<div class={style.buttonContainer}>
							<nav>
								<a><Icon icon="date range" /></a>
								<a><Icon icon="mail outline" /></a>
								<a profile>
									<img src="assets/profile_male_0.jpg"/>
									<span session-status></span>
								</a>
							</nav>
						</div>
					</div>
					:
					<h1>Mint Labs &copy;</h1>
				}
			</div>
		</header>
	);
}
