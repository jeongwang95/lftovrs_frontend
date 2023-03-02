import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Papa from 'papaparse';

import {chooseApi1, chooseApi2 } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls, getIngredientCategory, getRecipes, getRecipeURL } from '../../api';
import { useGetData } from '../../custom-hooks';
import { store } from '../../redux/store';

interface IngredientFormProps {
    id?:string;
    data?:{}
}

export const NewIngredientForm = (props:IngredientFormProps) => {

    // used to make create request to the database
    const dispatch = useDispatch();

    let { ingredientData, getData } = useGetData();
    let ingredients = '';
    

    // used for parsing csv file
    const [CSVData, setCSVData] = useState([]);
    let commonConfig = { delimiter: "," };
    let fileInput =  require('../../assets/top-1k-ingredients.csv');

    // used for storing user's ingredient input from the add form
    const [value, setValue] = React.useState('')
    const [inputValue, setInputValue] = React.useState('')

    // used to store ingredient amount data from the add form
    const { register, handleSubmit } = useForm({defaultValues: {amount: ''}});

    // convert csv file into json object
    const parseData = () => {
        Papa.parse(
            fileInput,
            {
                ...commonConfig,
                header: true,
                download: true,
                complete: (result: any) => {
                    setCSVData(result.data);
                }
            }
        );
    }
    
    // useEffect hook used to make sure our parseData function only gets called once.
    useEffect(() => {
        parseData();
    },[]);

    const onSubmit = async (data:any, event:any) => {

        let id = '';
        CSVData.forEach(element => {
            if(element['ingredient'] == value) {
                id = element['id']
            }
        })

        const result = await getIngredientCategory(id)

        const newIngredient = {
            'name': value,
            'category': result.aisle.toLowerCase(),
            'amount': data.amount
        };

        // add the new ingredient to the databse
        await serverCalls.create(newIngredient)

        // once the list of ingredients are updated, we will make a get request to spoonacular API to retrieve the recipes that can be made from our ingredients
        // then we store the response in our store so the "Browse" page doesn't need to make another request to spoonacular API

        // from user's ingredient list database, get all of user's ingredient names and put it into a string
        ingredientData.forEach((element:any) => {
            ingredients += ',+' + element.name
        })
        ingredients = ingredients.replaceAll(' ', '-').substring(2);

        let response = await getRecipes(ingredients)

        // filter recipes that has 0 ingredient matches
        let recipes:any = []
        response.forEach((element:any) => {
            if (element.usedIngredientCount > 0 && element.usedIngredientCount > element.missedIngredientCount) {
                recipes.push(element)
            }
        })

        // iterate through recipes list and make a get request to spoonacular API to get recipe URL
        let recipeURLs:any = [];
        recipes.forEach((element:any) => {
            let urls = getRecipeURL(element.id)
            console.log(urls)
            recipeURLs.push(urls)
        })

        // set recipes and recipeURLs to our store so we can access this information from different components
        dispatch(chooseApi1(recipes))
        dispatch(chooseApi2(recipeURLs))

        console.log(store.getState())
        //window.location.reload()
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Name of Ingredient</label>
                    <Autocomplete
                        value={value}
                        disablePortal
                        onChange={(_, data) => setValue(data)}
                        inputValue={inputValue}
                        onInputChange={(_, data) => setInputValue(data)}
                        options={CSVData.map((option: any) => option.ingredient)}
                        sx={{ width: 300, marginTop: '.5rem', marginBottom: '1rem'}}
                        renderInput={(params) => <TextField {...params} label="Enter Ingredient Name" />}
                    />

                </div>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <Input {...register('amount')} name="amount" placeholder="Can Leave It Blank"/>
                </div>
                <Button sx={{marginTop: '1rem'}} variant='contained' type='submit'>Add</Button>
            </form>
        </div>
    )
}

export const UpdateIngredientForm = (props:IngredientFormProps) => {
    const { register, handleSubmit } = useForm({defaultValues: {amount: ''}})
    let { ingredientData, getData } = useGetData();

    // props.id returns the name of the ingredient, so we need to iterate through ingredients data to get the ingredient id.
    // the users can only update the amount of an ingredient so the variable: data only has one key: "amount".
    // so we need to update data by adding two keys: "name" and "category"
    const onSubmit = async (data:any, event:any) => {
        let id = '';
        
        ingredientData.forEach((element:any) => {
            if (element.name == props.id) {
                data['name'] = props.id;
                data['category'] = element.category
                id = element.id
            }
        })
        await serverCalls.update(id, data)
        window.location.reload()
        event.target.reset();

    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="amount">Change the Amount</label>
                    <Input {...register('amount')} name="amount" placeholder="Can Leave It Blank"/>
                </div>
                <Button sx={{marginTop: '1rem'}} variant='contained' type='submit'>Update</Button>
            </form>
        </div>
    )
}