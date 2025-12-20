import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchParkingSpaces } from "../utils/fetchParkingSpaces"
import { setSpaces } from "../features/parking/parkingSlice"
import { ParkingSpaceCard } from "../components/ParkingSpaceCard"

export const EmptySpaces=() => {
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
                    let count=0

                    response.data.data.forEach((space) => {
                        count += space.availability==="empty" ? 1 : 0
                    })

                    dispatch(setSpaces({
                        spaces: response.data.data,
                        fetched: true,
                        count: count
                    }))
                }
            }
            catch(error){
                console.log(error.message)
            }

        }
        
        loadSpaces()
    }, [dispatch, fetched])

    return (
        <div className="min-h-[80vh] px-6 pb-8">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <label
                htmlFor="level"
                className="text-pure-greys-200 font-medium mb-2 sm:mb-0"
                >
                Select a level:
                </label>
                <select
                name="level"
                id="level"
                className="rounded-md bg-richblack-900 px-4 py-2 text-pure-greys-25 border border-richblack-600 focus:border-yellow-50 outline-none transition"
                onChange={(e) => setCurrentLevel(Number(e.target.value))}
                >
                <option value="0">Select Level</option>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
                </select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentLevel===0 &&
                spaces
                    .filter((space) => space.availability==="empty")
                    .map((space) => <ParkingSpaceCard key={space.id} space={space} />)}

                {currentLevel !== 0 &&
                spaces
                    .filter(
                    (space) =>
                        space.level === currentLevel && space.availability==="empty"
                    )
                    .map((space) => <ParkingSpaceCard key={space.id} space={space} />)}
            </div>
        </div>
    )
}