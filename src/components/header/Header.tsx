import { NavLink, Link } from 'react-router-dom';
import './header.css'
// import Logo from '../img/hamster.png'





const Header = () => (
	<div className="header">
		<h1><Link to="/"> Hamsterwars </Link></h1>
		{/* <img src="{logo}" /> */}
		{/* <img src={'/img/hamster.png'} /> */}
		{/* <img src='../../public/img/hamster-1.jpg' /> */}
		
		
		<nav>
			<NavLink to="/battle" activeClassName="active"> Battle </NavLink>
			<NavLink to="/gallery" activeClassName="active"> Gallery </NavLink>
			<NavLink to="/statistics" activeClassName="active"> Statistics </NavLink>
			<NavLink to="/history" activeClassName="active"> History </NavLink>
		</nav>
	</div>
);

export default Header;