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

    // console.log(CSVData)

    const onSubmit = async (data:any, event:any) => {

        let id = '';
        CSVData.forEach(element => {
            if(element['ingredient'] == value) {
                id = element['id']
            }
        })

        const result = await getIngredientCategory(id)

        // console.log(result.aisle.toLowerCase())
        // console.log(value)
        // console.log(data.amount)
        // console.log(id)

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
                    <Input {...register('amount')} name="amount" placeholder="Can Leave it Blank"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}

export const UpdateIngredientForm = (props:IngredientFormProps) => {
    const { register, handleSubmit } = useForm({ })

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        await serverCalls.update(props.id!, data)
        console.log(`Updated:${data} ${props.id}`)
        window.location.reload()
        event.target.reset();

    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <Input {...register('amount')} name="amount" placeholder="Enter the amount of ingredient or leave it blank"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}