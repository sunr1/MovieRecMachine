import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from "semantic-ui-react";
import axios from 'axios';

interface MovieType {
  listId: string
  description: string
  title: string
  overview: string
  vote_average: number
  popularity: number
  release_date: Date
}

interface ListType {
  description: string
  movies: MovieType[]
}

function BrowseLists() {
  const [lists, setLists] = useState<any>({});
  const [filter, setFilter] = useState<string>('date');
  const [listOrder, setListOrder] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/getLists')
      .then(res => {
        const movies = res.data;

        // Restructure data so that movies are grouped into objects by listId
        let userLists = {};
        movies.forEach((movie: object) => {
          // @ts-ignore
          if (userLists[movie.listId]) {
            // @ts-ignore
            userLists[movie.listId].movies.push(movie);
          } else {
            // @ts-ignore
            userLists[movie.listId] = {
              movies: [movie],
              // @ts-ignore
              description: movie.description
            };
          }
        })

        console.log('Got:', userLists);
        setLists(userLists);
        setLoading(false);
      });

    let orderBy = '';
    if (filter === 'date') {
      orderBy = 'date_created'
    } else if (filter === 'popularity') {
      orderBy = 'avg_pop'
    }

    axios.get(`http://localhost:8000/getListOrder?orderBy=${orderBy}`)
      .then(res => {
        const lists = res.data;
        let order: string[] = [];
        lists.forEach((list: { listId: string }) => {
          order.push(list.listId);
        });

        console.log(order);
        setListOrder(order);
      })
  }, [filter]);

  function handleFilterClick(e: any) {
    e.preventDefault();

    console.log(e.target.name);

    if (e.target.name === 'date') {
      setFilter('date');
    } else {
      setFilter('popularity');
    }
  }

  function listContent(movie: MovieType) {
    return (
      <Table.Row>
        <Table.Cell>{movie.title}</Table.Cell>
        <Table.Cell>{movie.overview}</Table.Cell>
        <Table.Cell>{movie.vote_average}</Table.Cell>
        <Table.Cell>{movie.popularity}</Table.Cell>
        <Table.Cell>{new Date(movie.release_date).toDateString()}</Table.Cell>
      </Table.Row>
    );
  }

  function renderLists(name: string, list: ListType) {
    console.log('List:', list);
    const { movies, description } = list;

    return (
      <div style={{ marginBottom: '4rem' }}>
        <h1>{name}</h1>
        <h4>{description}</h4>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Overview</Table.HeaderCell>
              <Table.HeaderCell>Vote Average</Table.HeaderCell>
              <Table.HeaderCell>Popularity</Table.HeaderCell>
              <Table.HeaderCell>Release Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {movies.map(movie => listContent(movie))}
          </Table.Body>
        </Table>
      </div>
    )
  }

  function renderWithFilters() {
    console.log('list order:', listOrder);
    switch (filter) {
      case 'date':
        console.log('lists:', lists);
        return listOrder.map((key: string) => renderLists(key, lists[key]));
      case 'popularity':
        return listOrder.map((key: string) => renderLists(key, lists[key]));
    }
  }

  return (
    <Container>
      <h1>User Movie Lists</h1>

      <h4>Sort By</h4>
      <Button toggle active={filter === 'date'} onClick={handleFilterClick} name='date'>
        Recent
      </Button>
      <Button toggle active={filter === 'popularity'} onClick={handleFilterClick} name='popularity'>
        Average Popularity
      </Button>

      <div style={{ paddingTop: '4rem' }}>
        {!loading && renderWithFilters()}
      </div>
    </Container>
  )
}

export default BrowseLists;