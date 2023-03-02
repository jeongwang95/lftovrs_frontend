import React, {useState} from 'react';
import { DataGrid, GridColDef, GridSelectionModel, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';

import { chooseRecipes } from '../../redux/slices/rootSlice';
import { serverCalls, getRecipes } from '../../api';
import { useGetData } from '../../custom-hooks';
import { Button,
        Box,
        Dialog,
        DialogActions,
        DialogContent,
        DialogTitle } from '@mui/material'; 
import { UpdateIngredientForm } from '../../components/IngredientForm';
import CloseIcon from '@mui/icons-material/Close';
import { store } from '../../redux/store';


const columns: GridColDef[] = [
    { 
        field: 'category', 
        headerName: 'Category', 
        width: 400,
        editable: true 
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 400,
        editable: true
    },
    {
        field: 'amount',
        headerName: 'Amount',
        width: 400,
        editable: true
    }
];

export const DataTable = () => {
    let { ingredientData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [error, setError] = useState(false);
    let [rowData, setRowData] = useState<any>([]);
    let [gridData, setData] = useState<GridSelectionModel>([])
    let [pageSize, setPageSize] = React.useState<number>(10);
    const dispatch = useDispatch();

    // if an ingredient isnt selected, show error message
    let handleOpen = () => {
        if (rowData.length > 0) {
            setOpen(true)
            console.log(rowData[0].name)
        } else {
            setError(true)
        }
    }

    let handleClose = () => {
        setOpen(false)
        setError(false)
    }

    // if ingredient(s) isnt selected, show error message
    // else delete ingredient(s)
    let deleteData = async () => {
        if (rowData.length > 0) {
            rowData.forEach(async (ingredient: any) => {
                await serverCalls.delete(ingredient.id);
            })
            await getData()

            // once the list of ingredients are updated, we will make a get request to spoonacular API to retrieve the recipes that can be made from our ingredients
            // then we store the response in our store so the "Browse" page doesn't need to make another request to spoonacular API

            // from user's ingredient list database, get all of user's ingredient names and put it into a string
            let ingredients = '';
            ingredientData.forEach((element:any) => {
                ingredients += ',+' + element.name
            })
            ingredients = ingredients.replaceAll(' ', '-').substring(2);

            let response = await getRecipes(ingredients)

            // filter recipes that has 0 ingredient matches and exclude recipes where missed ingredient count is greater than used ingredient count
            // then make an object of datas we are going to use then add the object to "recipeInfo" array
            let recipeInfo:any = [];
            await response.forEach((element:any) => {
                if (element.usedIngredientCount > 0 && element.usedIngredientCount > element.missedIngredientCount) {
                    let title = element.title.replaceAll(' ', '-');
                    title = title.toLowerCase()
                    let recipe = {
                        'img': element.image,
                        'title': element.title,
                        'used': element.usedIngredientCount,
                        'missed': element.missedIngredientCount,
                        'url': `https://spoonacular.com/${title}-${element.id}`
                    }
                    recipeInfo.push(recipe)
                }
            })

            localStorage.setItem(localStorage.getItem('token') || '', JSON.stringify(recipeInfo))
            dispatch(chooseRecipes(recipeInfo))
            window.location.reload()
        } else {
            setError(true)
        }
        
    }

    return (
        <div style={{ height: '35.7rem', width: 'inherit'}}>
            <DataGrid 
                    rows={ingredientData}
                    getRowId={(row) => row.name}
                    getRowHeight={() => 'auto'} 
                    columns={columns} 
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[10, 20, 40]}
                    pagination
                    components={{ Toolbar: GridToolbarFilterButton }}
                    checkboxSelection 
                    onSelectionModelChange = {(ids) => {
                        setData(ids);
                        const selectedIDs = new Set(ids);
                        const selectedRows = ingredientData.filter((row: any) =>
                            selectedIDs.has(row.name)
                        );
                        setRowData(selectedRows)
                    }}
                    {...ingredientData}  
            />

            <Box sx={{marginTop:"2.5rem", display:"flex", justifyContent:"flex-end"}}>
                <Button sx={{marginRight:"1rem"}} variant="contained" onClick={handleOpen}>Update</Button>
                <Button variant="contained" color="error" onClick={deleteData}>Remove</Button>
            </Box>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Ingredient: {gridData[0]}</DialogTitle>
                <DialogContent>
                    <UpdateIngredientForm id={`${gridData[0]}`}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick = {handleClose} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={error} onClose={handleClose} aria-labelledby="form-dialog-error">
                <DialogActions>
                    <CloseIcon onClick={handleClose} color="primary" />
                </DialogActions>
                <DialogTitle id="form-dialog-error">Please select an ingredient to make changes.</DialogTitle>
            </Dialog>
        </div>
    );
}