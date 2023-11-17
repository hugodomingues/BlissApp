import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionDetails } from '../../reducers/questions';
import { Button, Grid, Typography } from '@mui/material';

import './styles.css';

const DetailsPage = () => {
    const { questionId } = useParams();
    const dispatch = useDispatch();
    const question = useSelector((state) => state.questions.questionDetails);

    const navigate = useNavigate();

    useEffect(() => {
        if (questionId) {
            //get question Details
            dispatch(getQuestionDetails(questionId));
        }
    }, [questionId, dispatch]);

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
                        <Typography>Choices</Typography>
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
                        <Button variant="contained" color="success">
                            Share Content
                        </Button>
                    </div>
                </div>
            ) : null}
        </Grid>
    );
};

export default DetailsPage;
