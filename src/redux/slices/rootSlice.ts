import { createSlice } from '@reduxjs/toolkit';

export interface IngredientState {
    name: string,
    category: string,
    amount: string
}

const initialState: IngredientState = {
    name: '',
    category: '',
    amount: ''
}

const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        chooseName: (state, action) => { state.name = action.payload },
        chooseCategory: (state, action) => { state.category = action.payload },
        chooseAmount: (state, action) => { state.amount = action.payload }
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const {
    chooseName,
    chooseCategory,
    chooseAmount
} = rootSlice.actions;