import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import GalleryItem from './GalleryItem';

const StyledGalleryGrid = styled.div`
  column-gap: 1em;
  line-height: 0;
  padding: 0;

  @media screen and (min-width: 360px) {
    column-count: 2;
  }

  @media screen and (min-width: 700px) {
    column-count: 3;
  }

  @media screen and (min-width: 900px) {
    column-count: 4;
  }

  @media screen and (min-width: 1200px) {
    column-count: 5;
  }
`;

const GalleryGrid = ({ items, openGalleryModal }) => (
  <StyledGalleryGrid>
    {items.map((item) => {
      const [itemData] = item.data;
      let imageThumbnail;
      if (item.links) {
        [imageThumbnail] = item.links;
      }
      return (
        <GalleryItem
          key={itemData.nasa_id}
          itemData={itemData}
          imageThumbnail={imageThumbnail}
          openGalleryModal={openGalleryModal}
        />
      );
    })}
  </StyledGalleryGrid>
);

GalleryGrid.propTypes = {
  items: PropTypes.array.isRequired,
  openGalleryModal: PropTypes.func.isRequired,
};

export default GalleryGrid;
