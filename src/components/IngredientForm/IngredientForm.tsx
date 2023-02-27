import React from 'react';
import { useDispatch, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { chooseName,
        chooseCategory,
        chooseAmount } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

// const csv = require('csv-parser')
// const fs = require('fs')
// const top1kIngredients: any[] = [];

// fs.createReadStream('../../assets/top-1k-ingredients.csv')
//     .pipe(csv())
//     .on('data', (data: any) => top1kIngredients.push(data))
//     .on('end', () => {
//         console.log(top1kIngredients);
// });


interface IngredientFormProps {
    id?:string;
    data?:{}
}

// export const NewIngredientForm = (props:IngredientFormProps) => {

//     const dispatch = useDispatch();
//     let { ingredientData, getData } = useGetData();
//     const store = useStore()
//     const { register, handleSubmit } = useForm({ })

//     const onSubmit = async (data:any, event:any) => {
//         console.log(props.id)

//         dispatch(chooseName(data.name))
//         // dispatch(chooseCategory(category))
//         dispatch(chooseAmount(data.amount))
//         await serverCalls.create(store.getState())
//         window.location.reload()
//     }

//     return (
//         <div>
//             <form onSubmit = {handleSubmit(onSubmit)}>
//                 <div>
//                     <label htmlFor="name">Name of Ingredient</label>
//                     {/* <Autocomplete
//                         disablePortal
//                         id="ingredient-name"
//                         options={top1kIngredients.map((option) => option.ingredient)}
//                         sx={{ width: 300 }}
//                         renderInput={(params) => <TextField {...params} label="Enter ingredient name" />}
//                         {...register('name')}
//                     /> */}
//                 </div>
//                 <div>
//                     <label htmlFor="amount">Amount</label>
//                     <Input {...register('amount')} name="amount" placeholder="Enter the amount of ingredient or leave it blank"/>
//                 </div>
//                 <Button type='submit'>Submit</Button>
//             </form>
//         </div>
//     )
// }

// export const UpdateIngredientForm = (props:IngredientFormProps) => {
//     const { register, handleSubmit } = useForm({ })

//     const onSubmit = async (data:any, event:any) => {
//         console.log(props.id)

//         await serverCalls.update(props.id!, data)
//         console.log(`Updated:${data} ${props.id}`)
//         window.location.reload()
//         event.target.reset();

//     }

//     return (
//         <div>
//             <form onSubmit = {handleSubmit(onSubmit)}>
//                 <div>
//                     <label htmlFor="amount">Amount</label>
//                     <Input {...register('amount')} name="amount" placeholder="Enter the amount of ingredient or leave it blank"/>
//                 </div>
//                 <Button type='submit'>Submit</Button>
//             </form>
//         </div>
//     )
// }