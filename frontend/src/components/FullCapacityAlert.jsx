import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"

export const FullCapacityAlert=() => {
    const {freeSpaceCount}=useSelector(state => state.parking)
    const {pathname}=useLocation()
    const pathnameAllowed=["/"]

    if(freeSpaceCount !== 0 || pathnameAllowed.includes(pathname)){
        return null
    }

    return (
        <div className="w-full bg-transparent px-6 py-3 mb-2">
            <div className="ml-auto w-fit bg-yellow-50 text-black px-5 py-3 rounded-xl shadow-lg border border-yellow-300">
                Parking Full — No spaces available
            </div>
        </div>
    )
}
