import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import logo from '../trivia.png';
import './Header.css';

class Header extends Component {
  render() {
    const { name, score, profilePic } = this.props;
    return (
      <header className="header-header">
        <header className="header-sub-header">
          <h4
            data-testid="header-score"
          >
            {score}
          </h4>
          <img src={ logo } alt="logo" className="header-logo" />
          <div>
            <img
              src={ profilePic }
              alt="user profile icon"
              className="header-profile-pic"
              data-testid="header-profile-picture"
            />
            <div className="space" />
            <h4
              data-testid="header-player-name"
            >
              {name}
            </h4>
          </div>
        </header>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  profilePic: state.player.profilePic,
});

export default connect(mapStateToProps, null)(Header);
