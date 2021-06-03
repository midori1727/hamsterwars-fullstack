import { useEffect, useState } from "react";
import './gallery.css'
import GalleryHamster from './GalleryHamster'
import { HamsterObject } from '../types/Types'
import { Link } from 'react-router-dom';


const Gallery =() => {
	const [ hamsters, setHamsters ] = useState< null | HamsterObject[] >(null)
	const [ selectedHamster, setSelectedHamster ] = useState< null | HamsterObject >(null) 
	const [ showHamsterInfo, setShowHamsterInfo ] = useState(false);
	const [ hideHamsters, setHideHamsters ] = useState(false);
	const [ renderHamsters, setRenderHamsters ] = useState(false)

	useEffect(() => {
		const fetchHamsters = async () => {
			try {
				const response = await fetch('/hamsters', { method: 'GET'})
				const data: HamsterObject[] = await response.json()
				setHamsters(data)	
			}
			catch (error) {
				return error
			}
		}
		fetchHamsters()
	}, [renderHamsters])

	const handleClick = (hamster : HamsterObject) => {
		setSelectedHamster(hamster)
		setShowHamsterInfo(true)
		setHideHamsters(true)
	}

	

	return (
		<div>
			<div className="gallery">
				<h1>
					Gallery
				</h1>
				{!showHamsterInfo
				&& <Link to="/inputForm"><button>Add your hamster here!</button></Link>
				}
				<ul className="galleryCard">
					{hamsters && !hideHamsters
					&& hamsters.map(hamster => (
						<li key={hamster.id} onClick={() => handleClick(hamster)}> <p>{hamster.name}</p> <img src={`img/${hamster.imgName}`} alt={hamster.imgName}/></li>))
					}
				</ul>
			</div>
			{showHamsterInfo
			&& <GalleryHamster 
				selectedHamster={selectedHamster}
				setHideHamsters={setHideHamsters} 
				setShowHamsterInfo={setShowHamsterInfo}
				renderHamsters={renderHamsters}
				setRenderHamsters={setRenderHamsters}/>}
		</div>
	)
};

export default Gallery;