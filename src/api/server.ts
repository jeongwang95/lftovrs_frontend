let token = `1`

// making requests to lftovrs database
export const serverCalls = {
    get: async () => {
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

export const getRecipes = async (ingredients: string) => {
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=684d49ed37d146bcbf3c03e3359161de&ingredients=${ingredients}&number=100&ranking=2`,{
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