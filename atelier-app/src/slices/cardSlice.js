import { createSlice } from '@reduxjs/toolkit'

export const cardSlice = createSlice({
  name: 'Card',
  // Define initial state of the reducer/slice
  initialState: {
    card: {
  "name": "bulbi",
  "description": "dd",
  "family": "dd",
  "affinity": "152",
  "imgUrl": "http://medias.3dvf.com/news/sitegrab/gits2045.jpg",
  "smallImgUrl": "https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg",
  "id": 150,
  "energy": 10,
  "hp": 58,
  "defence": 48,
  "attack": 63,
  "price": 20,
  "userId": null
},
  },
  // Define the reducers 
  reducers: {
    update_user_action: (state, action) => {
        console.log(action)
        state.user = action.payload

    },
    submit_user_action: (state, action) => {
        console.log("User to Submit");
        console.log(action.payload.user);
        state.submitted_user = action.payload.user
    },
}
})

// Action creators are generated for each case reducer function
export const { update_user_action,submit_user_action } = userSlice.actions

export default userSlice.reducer
