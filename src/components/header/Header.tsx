import { NavLink, Link } from 'react-router-dom';
import './header.css'
import logo from '../img/hamster.png' 

const Header = () => (
	<div className="header">
		<section className="header-title">
		<h1><Link to="/"> Hamsterwars </Link></h1>
		<img src={logo} alt='hamster-logo' />
		</section>
		
		<nav className="nav-link">
			<NavLink to="/battle" activeClassName="active"> Battle </NavLink>
			<NavLink to="/gallery" activeClassName="active"> Gallery </NavLink>
			<NavLink to="/statistics" activeClassName="active"> Statistics </NavLink>
			<NavLink to="/history" activeClassName="active"> History </NavLink>
		</nav>
	</div>
);

export default Header;