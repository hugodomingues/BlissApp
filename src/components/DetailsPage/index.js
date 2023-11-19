import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionDetails, updateQuestionDetails } from '../../reducers/questions';
import {
    Button,
    Grid,
    Typography,
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup,
    Snackbar,
} from '@mui/material';

import './styles.css';
import SendEmailDialog from '../SendEmailDialog';

const DetailsPage = () => {
    const { questionId } = useParams();
    const dispatch = useDispatch();
    const question = useSelector((state) => state.questions.questionDetails);

    const [sendEmailDialogOpen, setSendEmailDialogOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (questionId) {
            //get question Details
            dispatch(getQuestionDetails(questionId));
        }
    }, [questionId, dispatch]);

    const handleChangeChoice = (value) => {
        const auxQuestion = {
            ...question,
            choices: question.choices.map((data) => {
                if (data.choice === value) {
                    return { ...data, votes: data.votes + 1 };
                } else {
                    return data;
                }
            }),
        };

        dispatch(updateQuestionDetails(questionId, auxQuestion));
    };

    return (
        <Grid container>
            {question ? (
                <div className="container">
                    <div>
                        <h1>Detail Page</h1>
                    </div>
                    <div>
                        <div style={{ display: 'flex' }}>
                            <Typography>Question:</Typography>
                            <Typography style={{ marginLeft: 15 }}>{question.question}</Typography>
                        </div>

                        <div style={{ float: 'right' }}>
                            <img src={question.image_url} alt="" />
                        </div>
                    </div>
                    <div>
                        <FormControl>
                            <FormLabel>Choices</FormLabel>
                            <RadioGroup
                                defaultValue=""
                                name="radio-buttons-group"
                                onChange={(e) => handleChangeChoice(e.target.value)}
                            >
                                {question.choices.map((data, key) => (
                                    <FormControlLabel
                                        value={data.choice}
                                        control={<Radio />}
                                        label={data.choice}
                                        key={key}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="footer">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/questions')}
                            className="backButton"
                        >
                            Back
                        </Button>
                        <Button variant="contained" color="success" onClick={() => setSendEmailDialogOpen(true)}>
                            Share Content
                        </Button>
                    </div>
                </div>
            ) : null}
            {sendEmailDialogOpen ? (
                <SendEmailDialog onClose={() => setSendEmailDialogOpen(false)} setOpenSnackbar={setOpenSnackbar} />
            ) : null}
            {openSnackbar ? (
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={openSnackbar}
                    onClose={() => setOpenSnackbar(false)}
                    message="Email sended"
                    autoHideDuration={6000}
                />
            ) : null}
        </Grid>
    );
};

export default DetailsPage;
