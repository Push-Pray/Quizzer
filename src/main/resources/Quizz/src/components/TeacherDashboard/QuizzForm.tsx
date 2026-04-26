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
import Typography from "@mui/material/Typography";
import { fetchCategories } from "../../categoryapi";
import type { Quizz } from "../types"

type Category = {
    id: number;
    name: string;
}

type  QuizzFormType = {
    quizz: Quizz;
    setQuizz:React.Dispatch<React.SetStateAction<Quizz>>;
    mode?: "add" | "edit";
}

export default function QuizzForm(props:QuizzFormType){
    const [categories, setCategories] = useState<Category[]>([]);
    const isAddMode = props.mode === "add";

    useEffect(() => {
        fetchCategories()
            .then((data) => setCategories(Array.isArray(data) ? data : []))
            .catch((error) => console.error(error));
    }, []);

    return(
        <>
        <DialogContent sx={{ px: isAddMode ? { xs: 3, sm: 4 } : 3, pb: isAddMode ? 1 : 3 }}>
            <Stack spacing={isAddMode ? 2 : 2} sx={{mt: isAddMode ? 0.25 : 1}}>
            {isAddMode ? <Typography sx={{ fontWeight: 600, color: "#31425f", mb: -1 }}>Quiz Name</Typography> : null}
            <TextField
            required
            margin="dense"
            label={isAddMode ? undefined : "Name"}
            placeholder={isAddMode ? "" : undefined}
            value={props.quizz.name}
            onChange={e => props.setQuizz({...props.quizz, name:e.target.value})}
            multiline={false}
            minRows={1}
            sx={isAddMode ? {
                '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    backgroundColor: '#ffffff',
                },
                '& .MuiInputBase-input': {
                    py: 1.2,
                },
            } : undefined}
            />

            {isAddMode ? <Typography sx={{ fontWeight: 600, color: "#31425f", mb: -1 }}>Description</Typography> : null}
            <TextField
            required
            margin="dense"
            label={isAddMode ? undefined : "Description"}
            value={props.quizz.description}
            onChange={e => props.setQuizz({...props.quizz, description:e.target.value})}
            multiline={isAddMode}
            minRows={isAddMode ? 3 : 1}
            sx={isAddMode ? {
                '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    backgroundColor: '#ffffff',
                },
            } : undefined}
            />

            {isAddMode ? <Typography sx={{ fontWeight: 600, color: "#31425f", mb: -1 }}>Course Code</Typography> : null}
            <TextField
            required
            margin="dense"
            label={isAddMode ? undefined : "Course Code"}
            value={props.quizz.course}
            onChange={e => props.setQuizz({...props.quizz, course:e.target.value})}
            sx={isAddMode ? {
                '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    backgroundColor: '#ffffff',
                },
                '& .MuiInputBase-input': {
                    py: 1.2,
                },
            } : undefined}
            />

            {isAddMode ? <Typography sx={{ fontWeight: 600, color: "#31425f", mb: -1 }}>Category</Typography> : null}
            <FormControl fullWidth margin="dense">
                {isAddMode ? null : <InputLabel id="quizz-category-label">Category</InputLabel>}
                <Select
                    labelId="quizz-category-label"
                    value={props.quizz.category ?? ""}
                    displayEmpty={isAddMode}
                    label={isAddMode ? undefined : "Category"}
                    onChange={(e) => props.setQuizz({ ...props.quizz, category: e.target.value })}
                    sx={isAddMode ? {
                        borderRadius: 1.5,
                        backgroundColor: '#ffffff',
                        '& .MuiSelect-select': {
                            py: 1.2,
                        },
                    } : undefined}
                >
                    <MenuItem value="">
                        {isAddMode ? "Select a category" : <em>No category</em>}
                    </MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.name}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControlLabel
            sx={isAddMode ? { mt: 0.25 } : undefined}
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