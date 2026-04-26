import { useEffect, useState } from "react";
import DialogContent from "@mui/material/DialogContent"
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField"
import { fetchCategories } from "../../categoryapi";
import type { Quizz } from "../types"

type Category = {
    id: number;
    name: string;
}

type  QuizzFormType = {
    quizz: Quizz;
    setQuizz:React.Dispatch<React.SetStateAction<Quizz>>
}

export default function QuizzForm(props:QuizzFormType){
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories()
            .then((data) => setCategories(Array.isArray(data) ? data : []))
            .catch((error) => console.error(error));
    }, []);

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

            <FormControl fullWidth margin="dense">
                <InputLabel id="quizz-category-label">Category</InputLabel>
                <Select
                    labelId="quizz-category-label"
                    value={props.quizz.category ?? ""}
                    label="Category"
                    onChange={(e) => props.setQuizz({ ...props.quizz, category: e.target.value })}
                >
                    <MenuItem value="">
                        <em>No category</em>
                    </MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.name}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

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