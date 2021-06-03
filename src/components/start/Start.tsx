import { Link } from 'react-router-dom';
import './start.css'

const Start =() => (
	<div className="start">
		<h1>Welcome to Hamsterwars!</h1>
		<div className="start-section-wrapper">
			<section className="start-section">
				<Link to="/battle"><button> Battle </button> </Link>
				<p>You can select the cutest hamster here.</p>
			</section>
			<section className="start-section">
				<Link to="/gallery"><button >Gallery </button> </Link>
				<p>See all hamsters' information. You can also add and delete hamsters.</p>
			</section>
			<section className="start-section">
				<Link to="/statistics"><button> Statistics </button></Link>
				<p>You can see the top five winners and losers.</p>
			</section>
			<section className="start-section">
				<Link to="/history"><button> History </button> </Link> 
				<p>View results from recent matches. You can also delete results.</p>
			</section>
		</div>
		
		
	</div>
);

export default Start;