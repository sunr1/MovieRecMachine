import React from 'react';
import { useHistory } from 'react-router-dom';
import { Menu } from "semantic-ui-react";

function Navbar() {
  const history = useHistory();

  return (
    <Menu style={{ position: 'fixed', top: 0, width: '100%', zIndex: 9999 }}>
      <h1>Movie Rec Machine</h1>

      <Menu.Item onClick={() => history.push('/')}>Home</Menu.Item>
      <Menu.Item onClick={() => history.push('/create')}>Create List</Menu.Item>
      <Menu.Item onClick={() => history.push('/lists')}>Browse Lists</Menu.Item>
    </Menu>
  )
}

export default Navbar;