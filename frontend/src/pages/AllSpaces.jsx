import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSpaces } from "../features/parking/parkingSlice"
import { fetchParkingSpaces } from "../utils/fetchParkingSpaces"
import { ParkingSpaceCard } from "../components/ParkingSpaceCard"

export const AllSpaces=() => {
    const dispatch=useDispatch()
    const {spaces, fetched}=useSelector(state => state.parking)

    useEffect(() => {
        const loadSpaces=async () => {
            if(fetched){
                return
            }
            
            try{
                const response=await fetchParkingSpaces()
                
                if(!response.data.success){
                    //showError(response.message)
                    console.log(response.message)
                }
                else{
                    dispatch(setSpaces(response.data.data))
                    //console.log(fetched)
                }
            }
            catch(error){
                //showError(error.message)
            }

        }

        loadSpaces()
    }, [dispatch, fetched])

    const handleUpdate=(e) => {
        e.preventDefault()
    }

    return (
        <div>
            {spaces.map((space) => (
                <ParkingSpaceCard key={space.id} space={space} handleUpdate={handleUpdate} />
            ))}
        </div>
    )
}