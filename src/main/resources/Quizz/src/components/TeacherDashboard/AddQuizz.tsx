import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import type { Quizz } from '../types';
import QuizzForm from './QuizzForm';


type AddQuizzProps = {
    handleAddQuizz : (quizz: Quizz) => Promise<boolean>;
}

export default function AddQuizz(props: AddQuizzProps){
    
    const [open,setOpen]= useState(false);

    const [quizz,setQuizz] = useState<Quizz>({

        name:"",
        description:"",
        course:"", 
        published: false,
        creationDate: new Date().toISOString().split("T")[0],
        questions: []

    })

    const handleOpen = () => {
        setQuizz({
            name:"",
            description:"",
            course:"", 
            published: false,
            creationDate: new Date().toISOString().split("T")[0],
            questions: []
        })
        setOpen(true)
    }

    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        const saved = await props.handleAddQuizz(quizz);
        if (saved) {
            handleClose();
        }
    };

    return(
        <>
        <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
                borderRadius: 3,
                px: 2.5,
                py: 1.15,
                textTransform: "none",
                fontWeight: 700,
                fontSize: "1rem",
                boxShadow: "0 12px 24px rgba(0, 126, 167, 0.18)",
                background: "linear-gradient(135deg, #2e7cf6 0%, #0ea5c6 100%)",
                '&:hover': {
                    background: "linear-gradient(135deg, #256ee0 0%, #0c95b2 100%)",
                    boxShadow: "0 14px 28px rgba(0, 126, 167, 0.24)",
                },
            }}
        >
            Add New Quiz
        </Button>

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