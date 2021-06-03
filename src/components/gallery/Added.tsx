import { Link } from 'react-router-dom';

const Added = () =>  (
		<div className="added">
			<p>Your hamster is added!
			</p>
			<Link to="/gallery" > <button>Back to Gallery</button> </Link>
		</div>
	)
	

export default Added