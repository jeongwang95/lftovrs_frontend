import React, {useState, useEffect} from 'react';
import { useDispatch, useStore } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Papa from 'papaparse';

import { chooseName,
        chooseCategory,
        chooseAmount } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { parse } from 'path';

interface IngredientFormProps {
    id?:string;
    data?:{}
}

export const NewIngredientForm = (props:IngredientFormProps) => {

    const dispatch = useDispatch();
    const store = useStore();
    const { register, control, handleSubmit } = useForm({});

    const [CSVData, setCSVData] = useState([]);
    let commonConfig = { delimiter: "," };
    let fileInput =  require('../../assets/top-1k-ingredients.csv');

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

    console.log(CSVData)

    const onSubmit = async (data:any, event:any) => {
        console.log(data.name)
        console.log(data.amount)

        // dispatch(chooseName(data.name));
        // dispatch(chooseAmount(data.amount));

        let id;
        CSVData.forEach(element => {
            if(element['ingredient'] == data.name) {
                id = element['id']
            }
        })

        console.log(id)
        // dispatch(chooseCategory(category))
        // await serverCalls.create(store.getState())
        // window.location.reload()
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Name of Ingredient</label>
                    <Autocomplete
                        disablePortal
                        id="ingredient-name"
                        options={CSVData.map((option: any) => option.ingredient)}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Enter ingredient name" />}
                    />
                </div>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <Input {...register('amount')} name="amount" placeholder="Enter the amount of ingredient or leave it blank"/>
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