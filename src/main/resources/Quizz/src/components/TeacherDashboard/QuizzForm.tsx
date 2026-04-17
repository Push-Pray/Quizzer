import DialogContent from "@mui/material/DialogContent"
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField"
import type { Quizz } from "../types"

type  QuizzFormType = {
    quizz: Quizz;
    setQuizz:React.Dispatch<React.SetStateAction<Quizz>>
}

export default function QuizzForm(props:QuizzFormType){
    return(
        <>
        <DialogContent>
            <Stack spacing={2} sx={{mt:1}}>
            <TextField
            required
            margin="dense"
            label="Name"
            value={props.quizz.name}
            onChange={e => props.setQuizz({...props.quizz, name:e.target.value})}
            />

            <TextField
            required
            margin="dense"
            label="Description"
            value={props.quizz.description}
            onChange={e => props.setQuizz({...props.quizz, description:e.target.value})}
            />

            <TextField
            required
            margin="dense"
            label="Course Code"
            value={props.quizz.course}
            onChange={e => props.setQuizz({...props.quizz, course:e.target.value})}
            />

            <FormControlLabel
            control={
                <Checkbox checked={props.quizz.published} onChange={e => props.setQuizz({
                    ...props.quizz, published: e.target.checked
                })
                }
                />
            }
            label="Published"
            />
            </Stack>
        </DialogContent>
        </>
    )
}