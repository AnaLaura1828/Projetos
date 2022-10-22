// import { Component } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
// import { getUser } from '../services/userAPI';
import { getUser } from '../services/userAPI';
import Mensagem from '../pages/Mensagem';

class Header extends React.Component {
   state = {
     user: null,
   };

  users = () => {
    const { user } = this.state;
    if (user === null) {
      getUser().then((resp) => this.setState({ user: resp }));
      return <Mensagem />;
    }
    return <p>{user.name}</p>;
  }

  render() {
    return (
      <header data-testid="header-component">
        <div data-testid="header-user-name">{this.users()}</div>
        <ul>
          <li>
            <Link data-testid="link-to-search" to="/search">Search</Link>

          </li>
          <li>
            <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>

          </li>
          <li>
            <Link data-testid="link-to-profile" to="/profile">Profile</Link>

          </li>

        </ul>
      </header>
    );
  }
}
export default Header;
