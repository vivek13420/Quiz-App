import { Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import { addScore, resetScore } from "../Redux/SetupReducer/action";

const Quiz = () => {
  const name = useSelector((store) => {
    return store.SetupReducer.name;
  });
  const category = useSelector((store) => store.SetupReducer.category);
  const difficulty = useSelector((store) => store.SetupReducer.difficulty);
  const numQuestions = useSelector((store) => store.SetupReducer.numQuestions);
  const score = useSelector((store) => store.SetupReducer.score);
  const [questions, setQuestions] = useState([]);
  const dispatch = useDispatch();
  const [quesNum, setQuesNum] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setselectedAnswer] = useState(false);
  const [hasOnClick, setHasOnClick] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getquestions = async () => {
    let res = await axios.get(
      `https://opentdb.com/api.php?amount=${numQuestions}&category=${
        category == "General Knowledge" ? 9 : category == "Sports" ? 21 : 22
      }&difficulty=${difficulty}&type=multiple`
    );

    setQuestions(res.data.results);
    // console.log(res.data.results);
  };

  const handleChangeBtn = (val) => {
    setQuesNum(quesNum + val);
    setHasOnClick(true);
    setselectedAnswer(false);
  };

  useEffect(() => {
    getquestions();
    dispatch(resetScore());
  }, []);

  const question = questions[quesNum];
  const correct_answer = question && question.correct_answer;

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  useEffect(() => {
    if (!question) {
      return;
    }
    let answers = [...question.incorrect_answers];
    answers.splice(
      getRandomInt(question.incorrect_answers.length),
      0,
      question.correct_answer
    );

    setOptions(answers);
  }, [question]);

  const handleSelectedAnswer = (theselectedAnswer, e) => {
    setHasOnClick(false);
    setselectedAnswer(true);
    const liElements = document.querySelectorAll(".option");
    if (theselectedAnswer == correct_answer) {
      // e.target.className = "selected-correct";
      e.currentTarget.classList.add("selected-correct");
      dispatch(addScore());
    } else {
      liElements.forEach((e) => {
        // console.log(e.innerText);
        if (e.innerText == correct_answer) {
          e.classList.add("selected-correct");
        }
      });
      // e.target.className = "selected-incorrect";
      e.currentTarget.classList.add("selected-incorrect");

      // alert("wrong Answer");
    }

    // setTimeout(() => {
    //   setQuesNum(quesNum + 1);
    // }, 2000);
  };

  const postData = async () => {
    let data = {
      name,
      category,
      difficulty,
      numQuestions,
      score,
    };

    let res = await axios.post("http://localhost:3000/users", data);
  };

  const handleSubmitBtn = () => {
    postData();
    navigate("/results");
  };

  if (!questions.length) {
    return (
      <div>
        <ClipLoader
          color="red"
          size={65}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "80%" }}>
      <h1>
        Q{quesNum + 1}: {questions[quesNum]?.question}
      </h1>
      <span>Score:{score}</span>
      <ul className="option-div">
        {options &&
          options.map((item) => (
            <li
              onClick={(e) => {
                if (hasOnClick) handleSelectedAnswer(item, e);
                else return;
              }}
              className="option"
              key={item}
              value={item}
            >
              {item}
            </li>
          ))}
      </ul>

      <Button
        isDisabled={quesNum == numQuestions - 1 ? true : false}
        onClick={() => handleChangeBtn(1)}
      >
        Next
      </Button>
      <Button
        isDisabled={quesNum < numQuestions - 1 ? true : false}
        onClick={handleSubmitBtn}
      >
        Submit
      </Button>
    </div>
  );
};

export default Quiz;
