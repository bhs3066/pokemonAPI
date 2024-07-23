import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  const navigate = useNavigate();

  const handleChoice = (generation) => {
    // URL 파라미터를 사용하여 이동
    navigate(`/list/${generation}`);
  };

  return (
    <HomeDom>
      <Choice onClick={() => handleChoice(1)}>1세대</Choice>
      <Choice onClick={() => handleChoice(2)}>2세대</Choice>
      <Choice onClick={() => handleChoice(3)}>3세대</Choice>
      <Choice onClick={() => handleChoice(4)}>4세대</Choice>
    </HomeDom>
  );
};

export default Home;

const HomeDom = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #606060;
`;

const Choice = styled.button`
  width: 200px;
  height: 50px;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  border: none;
`;
