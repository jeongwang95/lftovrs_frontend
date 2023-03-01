let token: any;

// making requests to lftovrs database
export const serverCalls = {
    get: async () => {
        token = localStorage.getItem('token');
        console.log(token)
        const response = await fetch(`https://gravel-billowy-ash.glitch.me/api/ingredients/${token}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },

    create: async(data: any = {}) => {
        const response = await fetch(`https://gravel-billowy-ash.glitch.me/api/ingredients/${token}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error('Failed to Create new data on server')
        }

        return await response.json()
    },
    update: async (id:string, data:any = {}) => {
        const response = await fetch(`https://gravel-billowy-ash.glitch.me/api/ingredients/${token}/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    },
    delete: async(id:string) => {
        const response = await fetch(`https://gravel-billowy-ash.glitch.me/api/ingredients/${token}/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}

// cache recipes
const recipesMap: Map<string, any> = new Map();

export const getRecipesByIngredients = async (ingredients: string) => {
    if (!recipesMap.has(ingredients)) {
        recipesMap.set(ingredients, await getRecipes(ingredients));
        return recipesMap.get(ingredients)
    } else {
        return recipesMap.get(ingredients)
    }
}

export const getRecipes = async (ingredients: string) => {
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&ingredients=${ingredients}&number=100&ranking=2`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok){
        throw new Error('Failed to fetch data from server')
    }

    return await response.json()
}

// cache url links of recipes
const recipeURLMap: Map<string, any> = new Map();

export const getRecipeURLById = async (id: string) => {
    if (!recipeURLMap.has(id)) {
        recipeURLMap.set(id, await getRecipeURL(id));
        return recipeURLMap.get(id)
    } else {
        return recipeURLMap.get(id)
    }
}

export const getRecipeURL = async (id: string) => {
    const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&includeNutrition=false`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok){
        throw new Error('Failed to fetch data from server')
    }

    return await response.json()
}

// cache ingredient category
const categoryMap: Map<string, Promise<any>> = new Map();

export const getIngredientCategoryById = (id: string) => {
    if (!categoryMap.has(id)) {
        categoryMap.set(id, getIngredientCategory(id));
        return categoryMap.get(id)
    } else {
        return categoryMap.get(id)
    }
}

export const getIngredientCategory = async (id: string) => {
    const response = await fetch(`https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok){
        throw new Error('Failed to fetch data from server')
    }

    return await response.json()
}
