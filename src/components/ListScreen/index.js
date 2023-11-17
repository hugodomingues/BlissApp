import { TextField, Typography, InputAdornment, Checkbox, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionsRedux, getSearchQuestions } from '../../reducers/questions';
import { Search } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import './styles.css';

const ListScreen = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.questions);

    const [searchWord, setSearchWord] = useState('');
    const [idChecked, setIdChecked] = useState('');

    const queryParams = new URLSearchParams(location.search);

    const param1 = queryParams.get('filter');

    useEffect(() => {
        if (param1) {
            setSearchWord(param1);
        }
    }, [param1]);

    useEffect(() => {
        //first time to populate questions
        if (questions.length === 0) {
            dispatch(getQuestionsRedux(10, 0, null));
        }
    }, [dispatch, questions]);

    useEffect(() => {
        if (searchWord) {
            dispatch(getSearchQuestions(null, null, searchWord));
        }
    }, [dispatch, searchWord]);

    const getMoreData = () => {
        dispatch(getQuestionsRedux(10, questions.length, null));
    };

    return (
        <div class="container">
            <div>
                <Typography>Questions Table</Typography>
            </div>

            <div style={{ height: 400, width: '100%' }}>
                <div>
                    {idChecked ? <Button variant="contained"> Show Details</Button> : null}

                    <TextField
                        label="With normal TextField"
                        value={searchWord}
                        onChange={(e) => setSearchWord(e.target.value)}
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: '350px' }}
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            dispatch(getQuestionsRedux(10, 0, null));
                            setSearchWord('');
                        }}
                    >
                        Dismiss Search
                    </Button>
                </div>
                <div>
                    {/* 20 in data length only to call more 10 items, if we want to show all the records the data length value is changed to something like allQuestionsCount*/}
                    <InfiniteScroll
                        dataLength={20}
                        next={getMoreData}
                        hasMore={questions.length === 20 ? false : true}
                        loader={<h4>Loading...</h4>}
                        endMessage={<div></div>}
                    >
                        <table>
                            <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>Question</td>
                                    <td>Choices</td>
                                    <td>Image</td>
                                </tr>
                            </thead>
                            <tbody>
                                {questions.map((question, key) => (
                                    <tr key={key}>
                                        <td>
                                            <Checkbox
                                                checked={idChecked === question.id}
                                                onChange={() => {
                                                    if (idChecked === question.id) {
                                                        setIdChecked('');
                                                    } else {
                                                        setIdChecked(question.id);
                                                    }
                                                }}
                                            />
                                            {question.id}
                                        </td>
                                        <td>{question.question}</td>
                                        <td>
                                            {question.choices.map((choice, idx) => (
                                                <span key={idx}> {choice.choice}</span>
                                            ))}
                                        </td>
                                        <td>
                                            <img src={question.thumb_url} alt="" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
};

export default ListScreen;
