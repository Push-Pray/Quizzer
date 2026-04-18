import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";

export default function QuestionList() {

    const { id } = useParams();

    return(
         <div>
            <h2>Questions for Quizz {id}</h2>
            <Button variant="contained">
                Add
            </Button>
         </div>
    )
}