import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'User',
  // Define initial state of the reducer/slice
  initialState: {
    user: {
      id: 0,
      login: '',
      pwd: '',
      account: 0,
      lastName: '',
      email: '',
      surName: '',
      cardLisdt: [],

      // ... autres propriétés
    },
  },
  // Define the reducers 
  reducers: {
    update_user_action: (state, action) => {
        state.user = action.payload

    },
    submit_user_action: (state, action) => {
        state.submitted_user = action.payload.user
    },
}
})

// Action creators are generated for each case reducer function
export const { update_user_action,submit_user_action } = userSlice.actions

export default userSlice.reducer
