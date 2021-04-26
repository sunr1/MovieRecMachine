import React, { useEffect, useState } from "react";
import { Button, Checkbox, Container, Form, Input, Table } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import axios from "axios";

function CreateList() {
  const [listData, setListData] = useState({
    name: '',
    description: ''
  })
  const [search, setSearch] = useState('');
  const [moviesList, setMoviesList] = useState<String[]>([]);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:8000/?page=${page}`)
      .then(res => {
        console.log('data', res.data);
        setMovies(res.data);
      })
      .catch((err) => {
        console.log('broken dawg', err);
      })
  }, [page]);

  function handleCheckChange(e: any, movieId: string) {
    console.log(movieId);

    if (moviesList.includes(movieId)) {
      setMoviesList(moviesList.filter(id => id !== movieId));
    } else {
      setMoviesList([
        ...moviesList,
        movieId
      ]);
    }
  }

  function handleChange(e: any) {
    setListData({
      ...listData,
      [e.target.name]: [e.target.value]
    });
  }

  function renderTableContents() {
    return movies.map((movie: any, i) => {
      let date = new Date(movie.release_date).toDateString();
      date = date.substring(4);

      return (
        <Table.Row>
          <Table.Cell>
            <Checkbox onChange={e => handleCheckChange(e, movie.id)} checked={moviesList.includes(movie.id)}/>
          </Table.Cell>
          <Table.Cell>
            <Link to={`/movie/${movie.id}`} target='_blank'>
              {movie.title}
            </Link>
          </Table.Cell>
          <Table.Cell>{movie.overview}</Table.Cell>
          <Table.Cell>{movie.popularity}</Table.Cell>
          <Table.Cell>{date}</Table.Cell>
          <Table.Cell>{movie.vote_average}</Table.Cell>
        </Table.Row>
      )
    });
  }

  function renderMovies() {
    if (movies.length === 0) {
      return null;
    }

    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Add</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Popularity</Table.HeaderCell>
            <Table.HeaderCell>Release Date</Table.HeaderCell>
            <Table.HeaderCell>Vote Average</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {renderTableContents()}
        </Table.Body>
      </Table>
    )
  }

  function pageBack() {
    if (page > 0) {
      setPage(page - 1);
    }
  }

  function pageNext() {
    setPage(page + 1);
  }

  async function createList() {
    const newList = await axios.post('http://localhost:8000/createList', listData)
    console.log('Made list:', listData.name);

    for (let i = 0; i < moviesList.length; i++) {
      const movieData = {
        listId: listData.name,
        movieId: moviesList[i]
      }
      const newMovie = await axios.post('http://localhost:8000/addMovieToList', movieData);

      console.log('Added movie:', newMovie);
    }
  }

  return (
    <Container>
      <Form onSubmit={createList} style={{ paddingTop: '1rem' }}>
        <Form.Field>
          <label>List Name</label>
          <input name='name' value={listData.name} onChange={handleChange} placeholder='Whiplash' />
        </Form.Field>
        <Form.Field>
          <label>List Description</label>
          <input name='description' value={listData.description} onChange={handleChange} placeholder='Whiplash' />
        </Form.Field>

        <div style={{ padding: '3rem 0' }}>
          <h2>Add Movies to List</h2>
          <Input icon={{ name: 'search' }}
                 iconPosition='left'
                 fluid
                 placeholder='Search for films...'
                 value={search}
                 onChange={e => setSearch(e.target.value)}
          />
          <Button onClick={pageBack}>{'<'} Page</Button>
          <Button onClick={pageNext}>Page {'>'}</Button>
          {renderMovies()}
        </div>

        <Button onClick={pageBack}>{'<'} Page</Button>
        <Button onClick={pageNext}>Page {'>'}</Button>

        <div style={{ padding: '1rem 0'}}>
          <Button primary type='submit'>Create List</Button>
        </div>
      </Form>
    </Container>
  )
}

export default CreateList;