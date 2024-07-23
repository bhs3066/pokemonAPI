import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import typeColor from "../data/typeColor.json"; // JSON 파일을 불러옴
import typeKorean from "../data/typeKorean.json";
import { useParams } from "react-router-dom";
import generationData from "../data/generationData.json"; // JSON 파일을 import
import logoImg from "../img/logo.png"; // src의 이미지 폴더는 import해서 사용

const List = () => {
  const { generation } = useParams(); // URL 파라미터에서 generation 값을 읽어옴

  const baseURL = `https://pokeapi.co/api/v2`;

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      // 구조 분해 할당
      const { start, end } = generationData[generation] || { start: 1, end: 1 };
      try {
        const requests = [];
        for (let i = start; i <= end; i++) {
          const speciesRequest = axios.get(`${baseURL}/pokemon-species/${i}`);
          const imgRequest = axios.get(`${baseURL}/pokemon/${i}`);
          requests.push(Promise.all([speciesRequest, imgRequest]));
        }

        const responses = await Promise.all(requests);
        const instantData = responses.map(([speciesResponse, imgResponse]) => ({
          speciesData: speciesResponse.data,
          imgData: imgResponse.data,
        }));

        setData(instantData);
        console.log(instantData);
      } catch (error) {
        console.error("Failed to fetch Pokémon data:", error);
      }
    };

    getData();
  }, []);

  // 데이터 로딩 중일때 대기 화면
  if (data.length === 0)
    return (
      <Loading>
        <LoadingCircle></LoadingCircle>
        <p> Loading...</p>
      </Loading>
    );

  const renderPokemonList = () => {
    return data.map((pokemon, index) => (
      <CardBox>
        <PokemonImage
          src={pokemon.imgData.sprites.front_default}
          alt="Pokemon"
        />
        <CardeExplanation>
          <div>{pokemon.speciesData.names[2].name}</div>
          <div>
            {/* map을 통해 types의 개수만큼 타입을 출력  */}
            {pokemon.imgData.types?.map((type, index) => (
              <TypeBox key={index} color={typeColor[type.type.name]}>
                {typeKorean[type.type.name]}
              </TypeBox>
            ))}
          </div>
        </CardeExplanation>
      </CardBox>
    ));
  };

  // ? 을 통해 옵셔널 체이닝 연산자로 데이터가 없으면 예외를 반환하지 않고 undefined를 반환하게 한다
  return (
    <Container>
      <Logo src={logoImg}></Logo>
      <p>{generation}세대 도감</p>
      <Filter>타입 필터</Filter>
      <ListContainer>{renderPokemonList()}</ListContainer>
    </Container>
  );
};

export default List;

const Loading = styled.div`
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #0002;
  position: fixed;
`;

const LoadingCircle = styled.div`
  width: 40px;
  height: 40px;
  border: 5px solid #3498db;
  border-top: 5px solid transparent;
  border-radius: 50%;
  animation: rotate 1s linear infinite;
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Container = styled.div`
  p {
    text-align: center;
    font-size: 3rem;
    font-weight: bold;
  }
`;

const Logo = styled.img`
  display: block;
  margin: 0 auto;
`;

const Filter = styled.div``;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 270px);
  row-gap: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const PokemonImage = styled.img`
  width: 120px;
  height: 120px;
  background-color: #ececec;
  border-radius: 8px;
`;

const CardeExplanation = styled.div`
  width: 80px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  font-weight: bold;
`;

const TypeBox = styled.div`
  background-color: ${(props) => props.color || "#fff"};
  text-align: center;
  width: 50px;
  border-radius: 4px;
  padding: 5px 10px;
  margin: 2px 0;
  color: #fff;
  font-weight: bold;
  text-transform: capitalize;
`;
