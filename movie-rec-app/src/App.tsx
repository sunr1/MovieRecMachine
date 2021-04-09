import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import { Container, Table } from "semantic-ui-react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/')
      .then(res => {
        console.log('data', res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log('broken dawg', err);
      })
  }, []);

  function renderTable() {
    return data.map((movie: any, i) => (
      <Table.Row>
        <Table.Cell>{movie.mID}</Table.Cell>
        <Table.Cell>{movie.title}</Table.Cell>
        <Table.Cell>{movie.movieYear}</Table.Cell>
        <Table.Cell>{movie.director}</Table.Cell>
      </Table.Row>
    ))
  }

  return (
    <Container>
      <h1>Movie Rec Machine</h1>
      <h3>Send some recs my way bro</h3>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>mID</Table.HeaderCell>
            <Table.HeaderCell>title</Table.HeaderCell>
            <Table.HeaderCell>movieYear</Table.HeaderCell>
            <Table.HeaderCell>director</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {renderTable()}
        </Table.Body>
      </Table>
    </Container>
  );
}

export default App;
