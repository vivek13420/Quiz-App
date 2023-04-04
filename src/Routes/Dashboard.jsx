import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  const getData = async () => {
    let res = await axios.get(
      "http://localhost:3000/users?_sort=score&_order=desc"
    );
    console.log(res.data);
    setData(res.data);
  };

  const handleClick = ()=>{
    navigate('/')
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Category</Th>
              <Th>Difficulty</Th>
              <Th>No. Of Questions</Th>
              <Th>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.map((item) => {
                return (
                  <Tr key={item.id}>
                    <Td>{item.name} </Td>
                    <Td>{item.category}</Td>
                    <Td>{item.difficulty}</Td>
                    <Td>{item.numQuestions}</Td>
                    <Td>{item.score}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
      <Button onClick={handleClick} >Go to Setup</Button>
    </>
  );
};

export default Dashboard;
