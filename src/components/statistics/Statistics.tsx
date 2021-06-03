
import { useState, useEffect } from "react";
import { HamsterObject } from '../types/Types'
import './statistics.css'

const Statistics = () => {

	const [ winnerHamsters, setWinnerHamsters ] = useState< null | HamsterObject[] >(null)
	const [ loserHamsters, setLoserHamsters ] = useState< null | HamsterObject[] >(null)

	useEffect (() => {
		const getHamsters = async () => {
			try {
				const response1 = await fetch('/winners', { method: 'GET'});
				const data1 = await response1.json();
				const response2 = await fetch('/losers', { method: 'GET'});
				const data2 = await response2.json();
				setWinnerHamsters(data1)
				setLoserHamsters(data2)
				
			} catch (error) {
				console.log(error);
					
			}
		}
		getHamsters()

	},[])

	return(
		<div className="statistics-wrapper">
			<h1>Statistics</h1>
			<div className="statistics">
				<ul className="statistics-hamster-card">
					<p>Top Winners</p>
					{winnerHamsters
					? 
					winnerHamsters.map( winner => (
						<li key={winner.name}>
							<p>{winner.name}</p>
							<img src={`img/${winner.imgName}`} alt={winner.imgName}/>
							<p>Won: {winner.wins} times</p>
						</li>
					))
					
					: <p>There is no winner hamster yet. Please go to Battle!</p>
					
					}
				</ul>
				<ul className="statistics-hamster-card">
					<p>Top Losers</p>
					{loserHamsters
					? loserHamsters.map( loser => (
						<li key={loser.name}>
							<p>{loser.name}</p> 
							<img src={`img/${loser.imgName}`} alt={loser.imgName}/>
							<p>Lost: {loser.defeats} times</p>
							</li>
					))
					: <p>There is no loser hamster yet. Please go to Battle!</p>
					}
				</ul>
			</div>
		
			{/* {winnerHamsters ?<section className="topFive">
          <h2>Top five winners</h2>
          {winnerHamsters.map(winner => (
              <p key={winner.id}>
                  {winner.name}  <br/> <img src={`img/${winner.imgName}`} alt={winner.imgName}/>  <br/> Has won {winner.wins} battles <br/> Played {winner.games} games.
              </p>
          ))}
        </section>
        : 'no data'
      }

{loserHamsters ?<section className="topFive">
          <h2>Top five losers</h2>
          
          {loserHamsters.map(loser => (
              <p key={loser.id}>
                  {loser.name}  <br/> <img src={`img/${loser.imgName}`} alt={loser.imgName}/>  <br/> Total defeats: {loser.defeats} <br/> Total games: {loser.games}
              </p>
          ))}
        
        </section>
        : 'no data'
      } */}
			
			{/* <ul className="statistics-hamster-card">
				{winnerHamsters
				? 
				winnerHamsters.map( winner => (
					<li key={winner.id}><p>{winner.name}</p> <img src={`img/${winner.imgName}`} alt={winner.imgName}/></li>
				))
				
				: <p>There is no winner hamster yet. Please go to Battle!</p>
				
				}
			</ul> */}
			
			{/* <p>Losers</p> */}
			{/* <ul className="statistics-hamster-card">
				{loserHamsters
				? loserHamsters.map( loser => (
					<li key={loser.id}><p>{loser.name}</p> <img src={`img/${loser.imgName}`} alt={loser.imgName}/></li>
				))
				: <p>There is no loser hamster yet. Please go to Battle!</p>
				}
			</ul>
		     */}
		</div>
	)
};

export default Statistics;