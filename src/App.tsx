import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Start from './components/Start';
import Battle from './components/battle/Battle';
import Gallery from './components/gallery/Gallery';
import InputForm from './components/gallery/InputForm';
import Statistics from './components/statistics/Statistics';
import History from './components/history/History';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

// import GalleryHamster from './components/gallery/GalleryHamster'
import './App.css';


function App() {

    return (
	    <Router>
		    <div className="App">
		    <header className="App-header">
			    <nav>
					<Header />
				    {/* <Link to="/"> Start </Link>
				    <Link to="/battle"> Battle </Link>
				    <Link to="/gallery"> Gallery </Link>
					<Link to="/statistics"> Statistics </Link>
					<Link to="/history"> History </Link> */}
			    </nav>
		    </header>
		    <main>
				<Switch>
					<Route path="/battle"> <Battle /> </Route>
					<Route path="/gallery"> <Gallery /> </Route>
					<Route path="/inputForm"> <InputForm /> </Route>
					<Route path="/statistics"> <Statistics /> </Route>
					<Route path="/history"> <History /> </Route>
					<Route path="/"> <Start /> </Route>
				</Switch>
		    </main>
			<footer>
				<Footer />
			</footer>
		    </div>
	  </Router>
    );
}

export default App;
