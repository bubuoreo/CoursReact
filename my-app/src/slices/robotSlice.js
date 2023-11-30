import { createSlice } from '@reduxjs/toolkit'

export const robotSlice = createSlice({
    name: 'robotSelectionForPartsDisplay',
    initialState: {
        robots:[],
        current_robot: {},
    },
    reducers: {
        update_selected_robot: (state, action) => {
            state.current_robot = action.payload
        },
        load_robots: (state, action) => {
            state.robots = action.payload
        },
    },
})

export const { update_selected_robot, load_robots } = robotSlice.actions

export default robotSlice.reducer