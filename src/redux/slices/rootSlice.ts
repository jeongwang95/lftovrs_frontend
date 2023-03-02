import { createSlice } from '@reduxjs/toolkit';

interface RecipeState {
    recipes: any
}

const initialState: RecipeState = {
    recipes: []
}

const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        chooseRecipes: (state, action) => { state.recipes = action.payload }
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const {
    chooseRecipes
} = rootSlice.actions;