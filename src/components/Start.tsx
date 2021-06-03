import { Link } from 'react-router-dom';

const Start =() => (
	<div>
		<h1>Welcome to Hamsterwars!</h1>
		<section>
			
		<Link to="/battle"><button> Battle </button> </Link>
		<p>You can select the cutest hamster here</p>
		<Link to="/gallery"><button >Gallery </button> </Link>
		<p>See all hamster´s information. You can also add and delete hamsters</p>
		<Link to="/statistics"><button> Statistics </button></Link>
		<p>You can see the 5 hamsters who won and lost the most</p>
		<Link to="/history"><button> History </button> </Link> 
		<p>View result from recent matches. You can also delete results</p>
		</section>
		
	</div>
);

export default Start;