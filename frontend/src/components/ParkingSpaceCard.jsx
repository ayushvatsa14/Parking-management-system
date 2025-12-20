import { useState } from "react"
import { updateSpace } from "../utils/updateSpace"
import { updateSpaces } from "../features/parking/parkingSlice"
import { useDispatch } from "react-redux"

export const ParkingSpaceCard=({space}) => {
    const [licenseNumber, setLicenseNumber]=useState("")
    const dispatch=useDispatch()

    const handleUpdate=async (space, status) => {
        try{
            const response=await updateSpace(space, status)

            if(response.data.success){
                dispatch(updateSpaces({
                        id: response.data.data.id,
                        availability: response.data.data.availability
                    })
                )
            }
        }
        catch(error){
            console.log(error.message)
        }
    }

    return (
    <div className="bg-richblack-800 rounded-xl border border-richblack-600 shadow-md p-5 transition-all duration-200 hover:scale-[1.1]">
        <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-bold text-yellow-50">
            Level {space.level}
        </h4>

        <span
            className={`h-3 w-3 rounded-full ${
            space.availability === "empty"
                ? "bg-green-400"
                : "bg-red-400"
            }`}
        />
        </div>

        <div className="space-y-2 text-[16px] font-semibold">
        <p className="text-pure-greys-200">
            Spot: <span className="text-pure-greys-25">{space.spot}</span>
        </p>

        <p className="text-pure-greys-200">
            Status:{" "}
            <span
            className={`font-medium ${
                space.availability === "empty"
                ? "text-green-400"
                : "text-red-400"
            }`}
            >
            {space.availability}
            </span>
        </p>
        </div>

        {space.availability === "empty" && (
        <div className="mt-4 space-y-2 ">
            <label className="block text-xs text-pure-greys-200 text-[16px] font-semibold">
            Vehicle license number
            </label>
            <input
            type="text"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            required
            className="w-full rounded-lg bg-richblack-900 px-3 py-2 text-pure-greys-25 border border-richblack-600 focus:border-yellow-50 outline-none transition"
            />
            <button
            disabled={!licenseNumber.trim()}
            onClick={() => handleUpdate(space, licenseNumber)}
            className="w-full rounded-lg bg-yellow-50 py-2 font-semibold text-richblack-900 hover:bg-yellow-25 transition"
            >
            Update
            </button>
        </div>
        )}

        {space.availability !== "empty" && (
        <button
            onClick={() => handleUpdate(space, "empty")}
            className="mt-4 w-full rounded-lg bg-red-500 py-2 font-semibold text-white hover:bg-red-600 transition"
        >
            Release
        </button>
        )}
    </div>
)
}