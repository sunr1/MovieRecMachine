import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from "semantic-ui-react";

function BrowseLists() {
  const [lists, setLists] = useState([]);
  const [filter, setFilter] = useState<string>('date');

  useEffect(() => {
    // Todo: API call pulling lists
  }, []);

  useEffect(() => {
    // Todo: Sort lists by new filter
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

  function listContent() {
    return (
      <Table.Row>
        <Table.Cell>Movie</Table.Cell>
      </Table.Row>
    )
  }

  function renderLists() {
    return (
      <div style={{ marginBottom: '4rem' }}>
        <h1>List Name</h1>
        <h4>List Description</h4>
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
            {listContent()}
          </Table.Body>
        </Table>
      </div>
    )
  }

  return (
    <Container>
      <h1>User Movie Lists</h1>

      <h4>Sort By</h4>
      <Button toggle active={filter === 'date'} onClick={handleFilterClick} name='date'>
        Date Created
      </Button>
      <Button toggle active={filter === 'popularity'} onClick={handleFilterClick} name='popularity'>
        Average Popularity
      </Button>

      <div style={{ paddingTop: '4rem' }}>
        {renderLists()}
      </div>
    </Container>
  )
}

export default BrowseLists;