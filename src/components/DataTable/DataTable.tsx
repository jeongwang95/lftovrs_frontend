import React, {useState} from 'react';
import { DataGrid, GridColDef, GridSelectionModel, GridToolbarFilterButton } from '@mui/x-data-grid';
import { serverCalls } from '../../api';
import { useGetData, useGetRecipeData } from '../../custom-hooks';
import { Button,Dialog,
        DialogActions,
        DialogContent,
        DialogTitle } from '@mui/material'; 
import { UpdateIngredientForm } from '../../components/IngredientForm';
import CloseIcon from '@mui/icons-material/Close';


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
            window.location.reload()
        } else {
            setError(true)
        }
        
    }

    return (
        <div style={{ height: '30rem', width: 'inherit'}}>
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

            <Button onClick={handleOpen}>Update</Button>
            <Button variant="contained" onClick={deleteData}>Delete</Button>

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