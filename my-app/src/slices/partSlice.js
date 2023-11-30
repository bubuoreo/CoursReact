import { createSlice } from '@reduxjs/toolkit'

export const partSlice = createSlice({
    name: 'partSelectionForPartDescription',
    initialState: {
        parts:[],
        current_part: {},
    },
    reducers: {
        update_selected_part: (state, action) => {
            state.current_part = action.payload
        },
        load_parts: (state, action) => {
            state.parts = action.payload
        },
    },
})

export const { update_selected_part, load_parts } = partSlice.actions

export default partSlice.reducer