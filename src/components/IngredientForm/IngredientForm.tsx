import React, {useState, useEffect} from 'react';
import { useDispatch, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Papa from 'papaparse';

import { chooseName,
        chooseCategory,
        chooseAmount } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls, getIngredientCategory } from '../../api';
import { useGetData } from '../../custom-hooks';


interface IngredientFormProps {
    id?:string;
    data?:{}
}

export const NewIngredientForm = (props:IngredientFormProps) => {

    // used to make create request to the database
    const dispatch = useDispatch();
    const store = useStore();

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

        dispatch(chooseName(value)); // ingredient name
        dispatch(chooseCategory(result.aisle.toLowerCase())); // ingredient category
        dispatch(chooseAmount(data.amount)); // ingredient amount
        await serverCalls.create(store.getState())
        window.location.reload()
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
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Enter Ingredient Name" />}
                    />

                </div>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <Input {...register('amount')} name="amount" placeholder="Can Leave It Blank"/>
                </div>
                <Button type='submit'>Submit</Button>
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
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}