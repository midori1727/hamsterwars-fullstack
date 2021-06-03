import './battle.css';

const BattleResult = (props: any)=> {

	return (
		<div>
			<>
			<div className="battle-result">
				<h1>Battle Result</h1>
				<div className="battle-result-container">
					<section className="battle-result-card">
						<p>{props.hamster1.name}</p>
						<img src={`img/${props.hamster1.imgName}`} alt={props.hamster1.imgName}/>
						<p>Wins: {props.hamster1.wins}</p>
						<p>Defeats: {props.hamster1.defeats}</p>
						<p>Total matches: {props.hamster1.games}</p>
					</section>
					<section className="battle-result-card">
						<p>{props.hamster2.name}</p>
						<img src={`img/${props.hamster2.imgName}`} alt={props.hamster2.imgName}/>
						<p>Wins: {props.hamster2.wins}</p>
						<p>Defeats: {props.hamster2.defeats}</p>
						<p>Total matches: {props.hamster2.games}</p>
					</section>
				</div>
				<button className="battle-button" onClick={() => {props.setHideHamsters(false); props.setShowComponent(false); props.setRenderHamsters(!props.renderHamsters)}}>Try Battle again!</button>
			</div>
			</>
		</div>
	)
}

export default BattleResult