import React, { useState, useEffect } from 'react';
import { serverCalls, getRecipes } from '../api';

export const useGetData = () => {
    const [ingredientData, setData] = useState<any>([]);

    async function handleDataFetch(){
        const result = await serverCalls.get();
        setData(result)
    }

    // Introducing the useEffect Hook to add our data to react State
    useEffect( () => {
        handleDataFetch();
    }, [])

    return {ingredientData, getData:handleDataFetch}
}

// hook to get recipes that can be made with ingredients
export const useGetRecipeData = (ingredients: string) => {
    const [recipeData, setData] = useState<any>([]);

    async function handleDataFetch(){
        const result = await getRecipes(ingredients)
        setData(result)
    }

    useEffect( () => {
        handleDataFetch();
    }, [])

    return {recipeData, getRecipeData:handleDataFetch}
}
