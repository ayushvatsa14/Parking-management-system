import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchParkingSpaces } from "../utils/fetchParkingSpaces"
import { setSpaces } from "../features/parking/parkingSlice"
import { ParkingSpaceCard } from "../components/ParkingSpaceCard"

export const LevelSpace=() => {
    const dispatch=useDispatch()
    const {spaces, fetched}=useSelector(state => state.parking)
    const [currentLevel, setCurrentLevel]=useState(0)

    useEffect(() => {
        const loadSpaces=async () => {
            if(fetched){
                return
            }

            try{
                const response=await fetchParkingSpaces()

                if(!response.data.success){
                    console.log(response.message)
                }
                else{
                    dispatch(setSpaces(response.data.data))
                }
            }
            catch(error){
                console.log(error.message)
            }

        }
        
        loadSpaces()
    }, [dispatch, fetched])

    const handleUpdate=(e) => {
        e.preventDefault()
    }

    return (
        <div>
            <label htmlFor="level">Select a level:</label>
            <select 
                name="level"
                id="level"

                onChange={e => setCurrentLevel(Number(e.target.value))}
            >
                <option value="0">Select Level</option>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
            </select>

            {currentLevel !== 0 
                && 
            spaces.filter(space => space.level===currentLevel).map((space) => (
                <ParkingSpaceCard key={space.id} space={space} handleUpdate={handleUpdate} />
            ))}
        </div>
    )
}