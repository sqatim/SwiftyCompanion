import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { useLocation } from "react-router-native";
import styled from "styled-components/native";
import SelectList from "react-native-dropdown-select-list";
import Header from "./Header";
import { useAuthContext } from "./AuthProviderContext";

const typeEnum = {
  PROJECTS: "PROJECTS",
  SKILLS: "SKILLS",
};

const selectCursus = (cursus) => {
  const cursusTmp = [];
  cursus.map((element, key) => {
    cursusTmp.push({ key: element.cursus.name, value: element.cursus.name });
  });
  return cursusTmp;
};

const selectTypes = () => [
  { key: "PROJECTS", value: "PROJECTS" },
  { key: "SKILLS", value: "SKILLS" },
];
const renderItem = ({ item }) => {
  if (typeof item.final_mark == "number")
    return (
      <ProjectStyle>
        <ProjectTitleStyle>{item.project.name}</ProjectTitleStyle>
        <ProjectNoteStyle status={item.status} finalMark={item.final_mark}>
          {item.final_mark}
        </ProjectNoteStyle>
      </ProjectStyle>
    );
  else return null;
};
const renderSkill = ({ item }) => {
  return (
    <ProjectStyle>
      <ProjectTitleStyle>{item.name}</ProjectTitleStyle>
      <ProjectNoteStyle status={item.status} finalMark={item.final_mark}>
        {item.level}
      </ProjectNoteStyle>
    </ProjectStyle>
  );
};

export default function User({ navigation, route }) {
  const userData = route.params;
  const data = selectCursus(userData.cursus);
  const types = selectTypes();
  // console.log("cursus:",userData.cursus[0]);
  const [selected, setSelected] = React.useState(
    userData.cursus[0]?.cursus?.name
  );
  const [skills, setSkills] = useState([]);
  const [typeSelected, setTypeSelected] = useState();
  const [level, setLevel] = useState(0);
  const [percentage, setPercentage] = useState("0");
  let { state } = useAuthContext();
  let percentageSplited = null;
  useEffect(() => {
    // console.log(userData);
    const result = userData.cursus.find(
      (element) => element.cursus.name == selected
    );
    setSkills((prev) => result?.skills);
    setLevel(result?.level);
    percentageSplited = result?.level.toString().split(".");
    if (percentageSplited && percentageSplited[1])
      setPercentage(result.level.toString().split(".")[1]);
    else {
      setPercentage(null);
    }
  }, [selected]);

  return (
    <FlatListStyle
      ListHeaderComponent={
        <>
          <Header navigation={navigation} />
          <ContainerStyle>
            <WrapperStyle>
              <PictureStyle source={{ uri: userData.picture }}></PictureStyle>
              <DetailsContainerStyle>
                <DetailStyle>
                  <DetailTextStyle>Login</DetailTextStyle>
                  <DetailTextStyle>{userData.login}</DetailTextStyle>
                </DetailStyle>
                <DetailStyle>
                  <DetailTextStyle>Wallet</DetailTextStyle>
                  <DetailTextStyle>{userData.wallet} ₳</DetailTextStyle>
                </DetailStyle>
                <DetailStyle>
                  <DetailTextStyle>Location</DetailTextStyle>
                  <DetailTextStyle>
                    {userData.location || "Unavailable"}
                  </DetailTextStyle>
                </DetailStyle>
                <DetailStyle>
                  <DetailTextStyle>Evaluation points</DetailTextStyle>
                  <DetailTextStyle>{userData.correction}</DetailTextStyle>
                </DetailStyle>
              </DetailsContainerStyle>
            </WrapperStyle>
            <CursusStyle>
              {userData.cursus[0] && (
                <SelectStyle>
                  <SelectList
                    setSelected={setSelected}
                    data={data}
                    search={false}
                    boxStyles={{ backgroundColor: !state.light && "#fff" }}
                    dropdownStyles={{ backgroundColor: !state.light && "#fff" }}
                    defaultOption={{
                      key: userData.cursus[0].cursus.name,
                      value: userData.cursus[0].cursus.name,
                    }}
                  />
                </SelectStyle>
              )}
              {percentage && (
                <LevelBarStyle>
                  <PercentageBarStyle
                    percentage={percentage}
                  ></PercentageBarStyle>
                  <LevelTextStyle>level: {level}%</LevelTextStyle>
                </LevelBarStyle>
              )}
            </CursusStyle>
            <SelectStyle>
              <SelectList
                setSelected={setTypeSelected}
                boxStyles={{ backgroundColor: !state.light && "#fff" }}
                dropdownStyles={{ backgroundColor: !state.light && "#fff" }}
                data={types}
                search={false}
                defaultOption={{
                  key: "PROJECTS",
                  value: "PROJECTS",
                }}
              />
            </SelectStyle>
          </ContainerStyle>
        </>
      }
      data={typeSelected == "PROJECTS" ? userData.projects : skills}
      keyExtractor={(item) => item.id}
      renderItem={typeSelected == "PROJECTS" ? renderItem : renderSkill}
    />
  );
}

const ContainerStyle = styled.View`
  width: 100%;
  /* background-color: white; */
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

const DetailTextStyle = styled.Text`
  color: ${({ theme }) => theme.color};
`;

const LevelBarStyle = styled.View`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: 0.4px solid #000;
  margin: 15px 0 0;
  background-color: ${({ theme }) => theme.levelBackground};
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
  color: ${({ theme }) => theme.levelColor};
  text-align: center;
  position: absolute;
  left: 40%;
  top: 25%;
  height: 100%;
  /* transform: translateY(50%); */
`;

const ProjectStyle = styled.View`
  width: 100%;
  justify-content: space-between;
  padding: 15px;
  background-color: #e9f3f8;
  margin: 15px 0;
  border-radius: 8px;
`;
const ProjectTitleStyle = styled.Text`
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 16px;
`;
const ProjectNoteStyle = styled.Text`
  color: ${({ status, finalMark }) => {
    // console.log("finalMark:", finalMark);
    if (status == "in_progress") return "yellow";
    else if ((status = "finished" && finalMark == 0)) return "red";
    else return "green";
  }};
  align-self: flex-end;
  font-weight: 500;
  font-size: 18px;
`;

const CursusStyle = styled.View`
  /* flex-direction: row; */
`;

const TestStyle = styled.View`
  height: 50px;
`;

const SelectStyle = styled.View`
  /* width: 125px; */
  margin-top: 15px;
`;

const FlatListStyle = styled.FlatList`
  background-color: ${({ theme }) => theme.background};
  padding: 0 15px;
`;
