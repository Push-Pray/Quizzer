import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
/*import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";*/
import type { Question } from "../types";


type  QuestionFormType = {
    question: Question;
    setQuestion:React.Dispatch<React.SetStateAction<Question>>
}

export default function QuestionForm(props:QuestionFormType){
    return(
        <>
        <DialogContent>
            <Stack spacing={2} sx={{mt:1}}>
            <TextField
            required
            margin="dense"
            label="text"
            value={props.question.text}
            onChange={e => props.setQuestion({...props.question, text:e.target.value})}
            />

            

           

            
            </Stack>
        </DialogContent>
        </>
    )
}