import {
    TextField,
    InputAdornment,
    Checkbox,
    Button,
    Table,
    TableCell,
    TableRow,
    tableCellClasses,
    TableHead,
    TableBody,
    Snackbar,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionsRedux, getSearchQuestions } from '../../reducers/questions';
import { Search } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import './styles.css';
import { styled } from '@mui/material/styles';
import SendEmailDialog from '../SendEmailDialog';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const ListScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.questions);

    const [searchWord, setSearchWord] = useState('');
    const [idChecked, setIdChecked] = useState('');
    const [sendEmailDialogOpen, setSendEmailDialogOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

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
            dispatch(getSearchQuestions(undefined, undefined, searchWord));
        }
    }, [dispatch, searchWord]);

    const getMoreData = () => {
        dispatch(getQuestionsRedux(10, questions.length, null));
    };

    return (
        <div className="container">
            <div>
                <h1>Questions Table</h1>
            </div>

            <div style={{ height: 400, width: '100%' }}>
                <div className="buttonsDiv">
                    {idChecked ? (
                        <Button variant="contained" onClick={() => navigate(`/questions/${idChecked}`)}>
                            {' '}
                            Show Details
                        </Button>
                    ) : null}

                    {searchWord ? (
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => setSendEmailDialogOpen(true)}
                            className="shareButton"
                        >
                            Share Content
                        </Button>
                    ) : null}

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
                        <Table style={{ margin: 20, width: '80%' }} stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>ID</StyledTableCell>
                                    <StyledTableCell align="right">Question</StyledTableCell>
                                    <StyledTableCell align="right">Choices</StyledTableCell>
                                    <StyledTableCell align="right">Image</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {questions.map((question, key) => (
                                    <StyledTableRow key={key}>
                                        <StyledTableCell>
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
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{question.question}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            {question.choices.map((choice, idx) => (
                                                <span key={idx}> {choice.choice}</span>
                                            ))}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <img src={question.thumb_url} alt="" />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </InfiniteScroll>
                </div>
            </div>
            {sendEmailDialogOpen ? (
                <SendEmailDialog
                    onClose={() => setSendEmailDialogOpen(false)}
                    setOpenSnackbar={setOpenSnackbar}
                    searchWord={searchWord}
                />
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
        </div>
    );
};

export default ListScreen;
