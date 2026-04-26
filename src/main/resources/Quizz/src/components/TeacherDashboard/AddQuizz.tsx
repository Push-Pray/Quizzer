import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
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
        category: "",
        published: false,
        creationDate: new Date().toISOString().split("T")[0],
        questions: []

    })

    const handleOpen = () => {
        setQuizz({
            name:"",
            description:"",
            course:"", 
            category: "",
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

         <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 3,
                        boxShadow: "0 12px 30px rgba(74, 111, 147, 0.18)",
                        width: "100%",
                        maxWidth: 760,
                        p: { xs: 0.5, sm: 1 },
                    },
                },
            }}
        >

            <DialogTitle
                sx={{
                    px: { xs: 3, sm: 4 },
                    pt: { xs: 2.5, sm: 3 },
                    pb: 0.5,
                    fontSize: "1.75rem",
                    fontWeight: 600,
                    color: "#14213d",
                }}
            >
                Add Quiz
            </DialogTitle>

            <QuizzForm quizz={quizz} setQuizz={setQuizz} mode="add"/>

            <DialogActions sx={{ px: { xs: 3, sm: 4 }, pb: { xs: 2.5, sm: 3 }, pt: 0.5, justifyContent: "flex-start" }}>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        px: 2.5,
                        py: 1,
                        fontWeight: 700,
                        background: "linear-gradient(135deg, #2563eb 0%, #0ea5c6 100%)",
                        boxShadow: "0 8px 16px rgba(37, 99, 235, 0.2)",
                    }}
                >
                    Save Quiz
                </Button>
                <Box sx={{ width: 12 }} />
                <Button
                    onClick={handleClose}
                    variant="outlined"
                    sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        px: 2.5,
                        py: 1,
                        fontWeight: 600,
                        borderColor: "#bfdbfe",
                        color: "#31425f",
                    }}
                >
                    Cancel
                </Button>
            </DialogActions>

        </Dialog>
        </>
    )
}