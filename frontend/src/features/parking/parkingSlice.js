import { createSlice } from "@reduxjs/toolkit"

const initialState={
    spaces: [],
    freeSpaceCount: 0,
    fetched: false
}

const parkingSlice=createSlice({
    name: "parking",
    initialState,
    reducers: {
        setSpaces: (state, action) => {
            state.spaces=action.payload.spaces
            state.fetched=action.payload.fetched
            state.freeSpaceCount=action.payload.count
        },

        updateSpaces: (state, action) => {
            const position=state.spaces.findIndex((space) => {
                return space.id===action.payload.id
            })

            if(position !== -1){
                state.spaces[position].availability=action.payload.availability
            }

            const value=action.payload.availability==="empty" ? 1 : -1
            state.freeSpaceCount += value
        }
    }
})

export const {setSpaces, updateSpaces}=parkingSlice.actions
export default parkingSlice.reducer