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

        return await response.json()
    },
    delete: async(id:string) => {
        const response = await fetch(`https://gravel-billowy-ash.glitch.me/api/ingredients/${token}/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        return await response.json()
    }
}

export const getRecipes = async (ingredients: string) => {
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&ingredients=${ingredients}&number=100&ranking=2&ignorePantry=true`,{
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
