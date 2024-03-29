import { createSlice, configureStore } from '@reduxjs/toolkit'

const toggleUpdateSlice = createSlice({
    name: 'updateCount',
    initialState: {
        loggedIn:false,
        toggle: false,
        toggleAlert: false,
        currentUser:{}
    },
    reducers: {
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload;
        },
        change: state => {
            state.toggle = !state.toggle;
        },
        changeAlert: (state, action) => {
            state.toggleAlert = action.payload;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }

    }
})

export const {setLoggedIn, change,changeAlert, setCurrentUser} = toggleUpdateSlice.actions

const store = configureStore({
  reducer: toggleUpdateSlice.reducer
})

export default store;