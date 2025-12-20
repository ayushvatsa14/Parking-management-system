import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSpaces } from "../features/parking/parkingSlice"
import { fetchParkingSpaces } from "../utils/fetchParkingSpaces"
import { ParkingSpaceCard } from "../components/ParkingSpaceCard"
import { Loading } from "../components/Loading"

export const AllSpaces=() => {
  const dispatch=useDispatch()
  const { spaces, fetched }=useSelector((state) => state.parking)
  const [loading, setLoading]=useState(false)

  useEffect(() => {
    const loadSpaces = async () => {
      if(fetched){
        return
      }

      try {
        setLoading(true)
        const response=await fetchParkingSpaces()

        if(!response.data.success){
          console.log(response.data.message)
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
      } catch (error) {
        console.log(error?.response?.data.message)
      } finally {
        setLoading(false)
      }
    }

    loadSpaces()
  }, [dispatch, fetched])

  return (
    <div className="relative min-h-[50vh] pb-8">
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-richblack-900/50">
          <Loading />
        </div>
      )}

      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${loading ? "opacity-50 pointer-events-none" : ""}`}>
        {spaces.map((space) => (
          <ParkingSpaceCard key={space.id} space={space} />
        ))}
      </div>
    </div>
  )
}