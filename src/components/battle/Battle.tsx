import { useEffect, useState } from "react";
import BattleResult from './BattleResult';
import './battle.css';
import { HamsterObject, MatchObject } from '../types/Types'

const Battle = () => {

	const [ hamster1, setHamster1 ] = useState< null | HamsterObject >(null);
	const [ hamster2, setHamster2 ] = useState< null | HamsterObject >(null);
	const [ match, setMatch ] =useState< null | MatchObject >(null) 
	const [ showComponent, setShowComponent ] = useState<boolean>(false);
	const [ hideHamsters, setHideHamsters ] = useState<boolean>(false);
	const [ renderHamsters, setRenderHamsters ] = useState<boolean>(false)


	//Get random hamsters
	useEffect (() => {
		const getRandomHamsters = async () => {
			try {
				const response1 = await fetch('/hamsters/random', { method: 'GET'});
				const data1 = await response1.json();
				console.log(data1);
				
				const response2 = await fetch('/hamsters/random', { method: 'GET'});
				const data2 = await response2.json();
				console.log(data2);
				
				
				if(data1 !== data2 ) {
					setHamster1(data1)
					setHamster2(data2)
				}
				
			} catch (error) {
				console.log(error);
				
			}
		}
		getRandomHamsters()

	},[renderHamsters])


	//Körs updateWinsDefeats, sätta BattleResultComponent true, hideHamsters true
	const updateHamsterdata  =  async (winner: HamsterObject, loser: HamsterObject) => {
		// updateWinsDefeats(winner, loser);
		UpdateWins(winner)
		updateLoser(loser)
		postMatch(winner, loser)
		setShowComponent(true);
		setHideHamsters(true);	
	}

	//PUT +1 wins och games på hamster objekt
	const UpdateWins =async ( winner : HamsterObject) => {
		const winnerRequest = {
			method : 'PUT',
			headers: { 'Content-Type' : 'application/json', 'Accept': 'application/json', },
			body: JSON.stringify( { "wins": winner.wins + 1, "games": winner.games + 1} )
		}
		console.log('winner is ' + winner);
		console.log(JSON.stringify(winner));
		
		const winnerResponse = await fetch(`/hamsters/${winner.id}`, winnerRequest);
		const winnerData = await winnerResponse.text();
		console.log(winnerData);
		
		if(hamster1 != null && hamster1.id === winner.id ){
			setHamster1({...hamster1, "wins": hamster1.wins + 1, "games": hamster1.games + 1} as HamsterObject);
		} else if (hamster2 != null && hamster2.id === winner.id ){
			setHamster2({...hamster2, "wins": hamster2.wins + 1, "games": hamster2.games + 1} as HamsterObject);
		}
	}

	//PUT +1 defeats och games på hamster objekt
	const updateLoser = async ( loser : HamsterObject ) => {
		const loserRequest = {
			method : 'PUT',
			headers: { 'Content-Type' : 'application/json', 'Accept': 'application/json', },
			body: JSON.stringify( { "defeats": loser.defeats + 1, "games": loser.games + 1} )
		}
		console.log('loser is ' + loser);
		
		const loserResponse = await fetch(`/hamsters/${loser.id}`, loserRequest);
		const loserData = await loserResponse.text();
		console.log(loserData);
		
		if(hamster2 != null  &&  hamster2.id === loser.id){
			setHamster2({...hamster2, "defeats": hamster2.defeats + 1, "games": hamster2.games + 1} as HamsterObject);
		} else if(hamster1 != null && hamster1.id === loser.id){
			setHamster1({...hamster1, "defeats": hamster1.defeats + 1, "games": hamster1.games + 1} as HamsterObject);
		}
	}


	//POST match(winner och loser i matchobjekt)
	const postMatch = async ( winner : HamsterObject , loser: HamsterObject) => {
		const matchRequest = {
			method : 'POST',
			headers: { 'Content-Type' : 'application/json', 'Accept': 'application/json', },
			body: JSON.stringify( { "winnerId": winner.id, "loserId": loser.id } )
		}
		console.log('winner is ' + winner.name + ' loser is ' + loser.name);
		
		const matchResponse = await fetch(`/matches`, matchRequest);
		const matchData = await matchResponse.text();
		// setMatch(matchData)
		console.log('match data is: ' + matchData);
		
		setMatch({ "winnerId": winner.id, "loserId": loser.id } as MatchObject);
		console.log('winner is: ' + winner.name + ' loser is ' + loser.name);
		console.log('match is ' + match);
	
	}

	
	return (
		<div className="battle">
				{hamster1 && hamster2 && !hideHamsters
				&& 
				<>
				<div className="battle-title">
					<h1>Battle</h1>
					<h2>Choose the cutest hamster!</h2>
				</div>
				<div className="Battle-hamster-card">
				<section 
					className="hamster-card"
					onClick={() => updateHamsterdata(hamster1, hamster2)}>
						<p>{hamster1.name}</p><img src={`img/${hamster1.imgName}`} alt={hamster1.imgName}/>
				</section> 
				
				<section 
					className="hamster-card"
					onClick={() => updateHamsterdata(hamster2, hamster1)}>
						<p>{hamster2.name}</p> <img src={`img/${hamster2.imgName}`} alt={hamster2.imgName}/>
				</section>
				</div>
				</> 
				}
				{showComponent
				&&  <BattleResult 
					hamster1={hamster1} 
					hamster2={hamster2} 
					setHideHamsters={setHideHamsters} 
					setShowComponent={setShowComponent}
					setRenderHamsters={setRenderHamsters}
					renderHamsters={renderHamsters}
					/>
				}		
		</div>
	)
}

export default Battle;