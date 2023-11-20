import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionDetails, updateQuestionDetails } from '../../reducers/questions';
import { Button, Grid, Typography, FormControl, FormControlLabel, Radio, RadioGroup, Snackbar } from '@mui/material';

import './styles.css';
import SendEmailDialog from '../SendEmailDialog';
import { ArrowBackIos } from '@mui/icons-material';

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
                    <div className="header">
                        <ArrowBackIos onClick={() => navigate('/questions')} className="arrowBack" />
                        <h1>Details Page</h1>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => setSendEmailDialogOpen(true)}
                            className="shareButton"
                        >
                            Share Content
                        </Button>
                    </div>
                    <div>
                        <div className="questionDiv">
                            <Typography variant="h4">Question:</Typography>
                            <Typography variant="h6" style={{ marginLeft: 15 }}>
                                {question.question}
                            </Typography>
                        </div>

                        <div style={{ float: 'right' }}>
                            <img src={question.image_url} alt="" />
                        </div>
                    </div>
                    <div>
                        <FormControl>
                            <div className="ChoiceDiv">
                                <Typography variant="h4" style={{ marginRight: 15 }}>
                                    Choices:
                                </Typography>

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
                            </div>
                        </FormControl>
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
