import type  {Question} from '../types';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


type  AddQuestionProps = {
    handleAddQuestion : (question: Question) => void
}