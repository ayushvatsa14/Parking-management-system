import { createSlice } from "@reduxjs/toolkit"

const initialState={
    spaces: [],
    fetched: false
}

const parkingSlice=createSlice({
    name: "parking",
    initialState,
    reducers: {
        setSpaces: (state, action) => {
            state.spaces=action.payload
            state.fetched=true
        },

        updateSpaces: (state, action) => {
            const position=state.spaces.findIndex((space) => {
                return space.id===action.payload.id
            })

            if(position !== -1){
                state.spaces[position]=action.payload.space
            }
        }
    }
})

export const {setSpaces, updateSpaces}=parkingSlice.actions
export default parkingSlice.reducer