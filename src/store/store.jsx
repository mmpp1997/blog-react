import { createSlice, configureStore } from '@reduxjs/toolkit'

const toggleUpdateSlice = createSlice({
    name: 'updateCount',
    initialState: {
        toggle: false
    },
    reducers: {
        change: state => {
            state.toggle = !state.toggle
        }
    }
})

export const { change } = toggleUpdateSlice.actions

const store = configureStore({
  reducer: toggleUpdateSlice.reducer
})

store.subscribe(() => console.log(store.getState()))
export default store;