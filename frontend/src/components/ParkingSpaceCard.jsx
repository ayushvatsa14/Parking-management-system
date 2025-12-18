import { useState } from "react"

export const ParkingSpaceCard=({space, handleUpdate}) => {
    const [licenseNumber, setLicenseNumber]=useState("")

    return (
        <div className="parking-card">
            <h4>Level {space.level}</h4>
            <p>Spot: {space.spot}</p>
            <p>Status: {space.availability}</p>

            {space.availability==="empty" && (
                <div>
                    <label>Vehicle license number</label>
                    <input 
                        type="text"
                        value={licenseNumber}

                        onChange={(e) => {
                            setLicenseNumber(e.target.value)
                        }}
                        
                        required
                    />

                    <button
                        disabled={!licenseNumber.trim()}
                        onClick={() => handleUpdate(space.id, licenseNumber)}
                    >
                        Update
                    </button>
                </div>
            )}

            {space.availability !== "empty" && (
                <button onClick={() => handleUpdate(space.id)}>
                    Release
                </button>
            )}
        </div>
  )
}