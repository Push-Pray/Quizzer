import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import type { Quizz } from '../types';
import QuizzForm from './QuizzForm';


type AddQuizzProps = {
    handleAddQuizz : (quizz: Quizz) => void;
}

export default function AddQuizz(props: AddQuizzProps){
    
    const [open,setOpen]= useState(false);

    const [quizz,setQuizz] = useState<Quizz>({

        name:"",
        description:"",
        course:"", 
        published: false,
        creationDate: new Date().toISOString().split("T")[0]

    })

    const handleOpen = () => {
        setQuizz({
            name:"",
            description:"",
            course:"", 
            published: false,
            creationDate: new Date().toISOString().split("T")[0]
        })
        setOpen(true)
    }

    const handleClose = () => setOpen(false);

    const handleSubmit = () => {

        props.handleAddQuizz(quizz);
        handleClose();
    };

    return(
        <>
        <Button onClick={handleOpen}>Add Quizz</Button>

         <Dialog open={open} onClose={handleClose}>

            <DialogTitle>Add Quizz</DialogTitle>

            <QuizzForm quizz={quizz} setQuizz={setQuizz}/>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>

        </Dialog>
        </>
    )
}