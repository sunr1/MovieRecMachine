import React, { useEffect, useState } from "react";
import { Container, Table, Input, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import axios from "axios";

function Home() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState(data);
  const [page, setPage] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:8000/?page=${page}`)
      .then(res => {
        console.log('data', res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log('broken dawg', err);
      })
  }, [page]);

  useEffect(() => {
    const searchTerm = search.toLowerCase().trim();

    // @ts-ignore
    setDisplay(data.filter(movie => movie.title.toLowerCase().trim().includes(searchTerm)));
  }, [data, search]);

  function renderTable() {
    return display.map((movie: any, i) => (
      <Table.Row>
        <Table.Cell>{movie.id}</Table.Cell>
        <Table.Cell>
          <Link to={`/movie/${movie.id}`}>
            {movie.title}
          </Link>
        </Table.Cell>
        <Table.Cell>{movie.overview}</Table.Cell>
        <Table.Cell>{movie.vote_average}</Table.Cell>
        <Table.Cell>{movie.popularity}</Table.Cell>
      </Table.Row>
    ))
  }

  console.log(search);

  return (
    <Container textAlign='center'>
      <div style={{ padding: '2rem' }}>
        <Input icon={{ name: 'search' }}
               iconPosition='left'
               fluid
               placeholder='Search for films...'
               value={search}
               onChange={e => setSearch(e.target.value)}
        />

        <Button onClick={() => setPage(page + 1)}>Page</Button>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Overview</Table.HeaderCell>
              <Table.HeaderCell>Vote Average</Table.HeaderCell>
              <Table.HeaderCell>Popularity</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {renderTable()}
          </Table.Body>
        </Table>
      </div>
    </Container>
  )
}

export default Home;