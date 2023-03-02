import { createSlice } from '@reduxjs/toolkit';

export interface IngredientState {
    api1: any,
    api2: any
}

const initialState: IngredientState = {
    api1: [],
    api2: []
}

const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        chooseApi1: (state, action) => { state.api1 = action.payload },
        chooseApi2: (state, action) => { state.api2 = action.payload },
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const {
    chooseApi1,
    chooseApi2
} = rootSlice.actions;