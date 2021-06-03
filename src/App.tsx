import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Start from './components/start/Start';
import Battle from './components/battle/Battle';
import Gallery from './components/gallery/Gallery';
import InputForm from './components/gallery/InputForm';
import Statistics from './components/statistics/Statistics';
import History from './components/history/History';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './App.css';


function App() {

    return (
	    <Router>
		    <div className="App">
		    <header className="App-header">
			    <nav>
					<Header />
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
