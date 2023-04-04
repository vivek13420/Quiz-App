import { Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const name = useSelector((store) => {
    return store.SetupReducer.name;
  });
  const category = useSelector((store) => store.SetupReducer.category);
  const difficulty = useSelector((store) => store.SetupReducer.difficulty);
  const numQuestions = useSelector((store) => store.SetupReducer.numQuestions);
  const score = useSelector((store) => store.SetupReducer.score);
  const navigate = useNavigate();

  console.log(score)

  return (
    <>
      <div>Results</div>
      <div>Your total Score is {score}</div>
      <Button onClick={() => navigate("/quiz")}>Fetch new questions</Button>
      <Button onClick={()=>navigate('/dashboard')} >See all rankings</Button>
    </>
  );
};

export default Results;
