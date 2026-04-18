import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import type { Quizz, QuizzData } from '../types';
import QuizzForm from './QuizzForm';

type EditQuizzProps = {
   quizz: QuizzData,
   handleUpdate: (id: number, updatedQuizz: Quizz) => void
}

export default function EditQuizz(props:EditQuizzProps) {

    const [open, setOpen] = useState(false);

    const [quizz, setQuizz] = useState<Quizz>({

        
        name:"",
        description: "",
        course: "",
        published: false,
        creationDate: "",
        questions: []

    });

    const handleOpen = () => {
        setQuizz({
            name: props.quizz.name,
            description: props.quizz.description,
            course: props.quizz.course,
            published: props.quizz.published,
            creationDate: props.quizz.creationDate,
            questions: props.quizz.questions
        });
        setOpen(true)
    };

    const handleClose = () => setOpen(false);

    const handleSubmit = () => {
        props.handleUpdate(props.quizz.id,quizz);
        handleClose();
    };

    return (
        <>
        <IconButton onClick={e => {handleOpen(); e.stopPropagation();}}>
                <EditIcon/>
            </IconButton>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Quiz</DialogTitle>

                <QuizzForm quizz={quizz} setQuizz={setQuizz} />

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}