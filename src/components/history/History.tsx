import { useEffect, useState } from "react";
import { HamsterObject, MatchObject } from '../types/Types'
import './history.css'

const History = () => {

	const [ latestMatches, setLatestMatches ] = useState < null | MatchObject[] >(null)
    const [ matchWinners, setMatchWinners ] = useState< null | HamsterObject[] >(null)
	const [ matchLosers, setMatchLosers ] = useState< null | HamsterObject[] >(null)
	const [ removed, setRemoved ] = useState<boolean>(false)
	useEffect(() => {

		const getWinnerAndLoser = async () => {

			try {

				//GET alla matches
				const response = await fetch('/matches', { method: 'GET'});
				const data = await response.json();
				//Hämta senaste 5 matcher
				const latest: MatchObject[] = data.slice(-5)
				setLatestMatches(latest)
				console.log(latest);

				//Hämta winnerId
				const winnerIds = latest.map(winner => winner.winnerId)
				console.log(winnerIds);
				//Get hamsterObjekt med winnerId
				const winnerResponse = await Promise.all(winnerIds.map(async id => fetch(`/hamsters/${id}`, { method: 'GET'}))) 
				console.log(winnerResponse);
				const winnerData = await Promise.all(winnerResponse.map(r => r.json()))
				setMatchWinners(winnerData)
				
				//Hämta loserId
				const loserIds = latest.map(loser => loser.loserId)
				console.log(loserIds);
				//Get hamsterObjekt med loserId
				const loserResponse = await Promise.all(loserIds.map(async id => fetch(`/hamsters/${id}`, { method: 'GET'}))) 
				const loserData = await Promise.all(loserResponse.map(r => r.json()))
				setMatchLosers(loserData)
				
			} catch (error) {
				console.log(error);
				
			}
		}
		getWinnerAndLoser()
	},[removed])


	//DELETE match
	const removeMatch = async (index: number) => {
		if(latestMatches){
			let match = latestMatches[index]
			console.log(match.id);
			const removeMatchRequest = {
						method: 'DELETE'
					}
			const removeRes = await fetch(`/matches/${match.id}`, removeMatchRequest)
			const removeMatchData = await removeRes.text()
			console.log(removeMatchData);
			setRemoved(true)
		}
	}

	const showHistory = () => {
		setRemoved(false)
	}

	
	return(
		<div className="history-wrapper">
			{!removed
			? 
			<>
			<h1>History</h1>
			<p>Here you can see the latest matches!</p>
			<p>You can also remove matches</p>
			<div className="History">
				<ul className="History-card winner">
					{matchWinners
					? 
					matchWinners.map((winner, index) => (
						<li key={winner.name}>
							<p>Winner: {winner.name}</p>
							<img src={`img/${winner.imgName}`} alt={winner.imgName}/>
							<button  onClick={() => removeMatch(index)}>Remove</button>
						</li>
					))
					: <p>There is no battle history yet. Please go to Battle!</p>
					}
				</ul>
				<ul className="History-card loser">
					{matchLosers
					?
					matchLosers.map((loser, index)=> (
						<li key={loser.name}>
							<p>Loser: {loser.name}</p>
							<img src={`img/${loser.imgName}`} alt={loser.imgName}/>
						</li>
					))
					: <p>There is no battle history yet. Please go to Battle!</p>
					}
				</ul>
			</div>
			</>
			:
			<div className="removed">
				<p>The match had been removed!</p>
				<button onClick={showHistory}>Back to History</button>
			</div>
			}
		</div>
	)
};

export default History;