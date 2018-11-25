import React from 'react';
import styled from 'styled-components';

import SearchBar from './SearchBar';

const StyledHeader = styled.div`
  padding-top: 20px;
  background: ${({ theme }) => theme.grey};
  color: ${({ theme }) => theme.ghostWhite};
  height: 180px;
  text-align: center;
  margin-bottom: 1em;

  /* @include mqMax(400px) {
    height: 150px;
    padding-top: 10px;
  }; */

  h1 {
    margin-bottom: 20px;
    font-size: 36px;
    color: ${({ theme }) => theme.ghostWhite};

    /* @include mqMax(360px) {
      font-size: 24px;
    };

    @include mqMax(700px) {
      font-size: 28px;
    };

    @include mqMax(900px) {
      font-size: 32px;
    }; */

    span {
      font-weight: 200;
    }
  }
`;

const Header = ({ handleSearch }) => (
  <StyledHeader>
    <h1>
      NASA&nbsp;
      <span>Media Library</span>
    </h1>
    <SearchBar handleSearch={handleSearch} />
  </StyledHeader>
);


export default Header;
