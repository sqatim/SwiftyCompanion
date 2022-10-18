import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { useLocation } from "react-router-native";
import styled from "styled-components/native";
import SelectList from "react-native-dropdown-select-list";

const selectCursus = (cursus) => {
  const cursusTmp = [];
  cursus.map((element, key) => {
    console.log("level", element.level);
    cursusTmp.push({ key: element.cursus.name, value: element.cursus.name });
  });
  console.log("cursusTmp:", cursusTmp);
  return cursusTmp;
};

export default function User() {
  const { state } = useLocation();
  const [selected, setSelected] = React.useState(state.cursus[0].cursus.name);
  const data = selectCursus(state.cursus);
  const [level, setLevel] = useState(0);
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    console.log("selected:", selected);
    const result = state.cursus.find(
      (element) => element.cursus.name == selected
    );
    setLevel(result.level);
    setPercentage(result.level.toString().split(".")[1]);
  }, [selected]);
  return (
    <ContainerStyle>
      <WrapperStyle>
        <PictureStyle source={{ uri: state.picture }}></PictureStyle>
        <DetailsContainerStyle>
          <DetailStyle>
            <DetailTextStyle>Login</DetailTextStyle>
            <DetailTextStyle>{state.login}</DetailTextStyle>
          </DetailStyle>
          <DetailStyle>
            <DetailTextStyle>Wallet</DetailTextStyle>
            <DetailTextStyle>{state.wallet} ₳</DetailTextStyle>
          </DetailStyle>
          <DetailStyle>
            <DetailTextStyle>Location</DetailTextStyle>
            <DetailTextStyle>{state.location || "Unavailable"}</DetailTextStyle>
          </DetailStyle>
          <DetailStyle>
            <DetailTextStyle>Evaluation points</DetailTextStyle>
            <DetailTextStyle>{state.correction}</DetailTextStyle>
          </DetailStyle>
        </DetailsContainerStyle>
      </WrapperStyle>
      <CursusStyle>
        <SelectStyle>
          <SelectList
            setSelected={setSelected}
            data={data}
            search={false}
            defaultOption={{
              key: state.cursus[0].cursus.name,
              value: state.cursus[0].cursus.name,
            }}
          />
        </SelectStyle>
        <LevelBarStyle>
          <PercentageBarStyle percentage={percentage}></PercentageBarStyle>
          <LevelTextStyle>level: {level}%</LevelTextStyle>
        </LevelBarStyle>
      </CursusStyle>
      <Text>User</Text>
    </ContainerStyle>
  );
}

const ContainerStyle = styled.View`
  width: 100%;
  /* align-items: center; */
  flex: 1;
  padding: 15px;
`;

const PictureStyle = styled.Image`
  width: 125px;
  height: 100%;
  /* margin-right: 10px; */
  border-radius: 50px;
`;
const WrapperStyle = styled.View`
  width: 100%;
  height: 155px;
  flex-direction: row;
  justify-content: space-between;
`;

const DetailsContainerStyle = styled.View`
  height: 100%;
  justify-content: space-around;
`;

const DetailStyle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 220px;
`;

const DetailTextStyle = styled.Text``;

const LevelBarStyle = styled.View`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: 0.4px solid #000;
  margin: 15px 0;
  background-color: #252c2a;
  overflow: hidden;
  position: relative;
`;
const PercentageBarStyle = styled.View`
  height: 100%;
  background-color: #01babc;
  justify-content: center;
  width: ${({ percentage }) => percentage + "%"};
`;

const LevelTextStyle = styled.Text`
  color: #fff;
  text-align: center;
  position: absolute;
  left: 40%;
  top: 25%;
  height: 100%;
  /* transform: translateY(50%); */
`;

const CursusStyle = styled.View`
  /* flex-direction: row; */
`;

const SelectStyle = styled.View`
  /* width: 125px; */
  margin-top: 15px;
`;