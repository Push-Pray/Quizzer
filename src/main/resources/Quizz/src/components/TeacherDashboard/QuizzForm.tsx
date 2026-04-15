import DialogContent from "@mui/material/DialogContent"
import TextField from "@mui/material/TextField"
import type { Quizz } from "../types"

type  QuizzFormType = {
    quizz: Quizz;
    setQuizz:React.Dispatch<React.SetStateAction<Quizz>>
}

export default function QuizzForm(props:QuizzFormType){
    return(
        <DialogContent>

            <TextField
            required
            margin="dense"
            label="name"
            value={props.quizz.name}
            onChange={e => props.setQuizz({...props.quizz, name:e.target.value})}
            />

            <TextField
            required
            margin="dense"
            label="description"
            value={props.quizz.description}
            onChange={e => props.setQuizz({...props.quizz, description:e.target.value})}
            />

            <TextField
            required
            margin="dense"
            label="coursecode"
            value={props.quizz.name}
            onChange={e => props.setQuizz({...props.quizz, coursecode:e.target.value})}
            />
        </DialogContent>
    )
}