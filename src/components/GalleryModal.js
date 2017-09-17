import React from 'react';
import '../styles/css/GalleryModal.css';

import LoadingSpinner from './LoadingSpinner';

class GalleryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      assetData: {},
    };

    this.getModalContent = this.getModalContent.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  // Perfom another api call to get the info for the modal
  async getModalContent() {
    const modalData = this.props.modalDataObj;
    let metaUrl = `https://images-api.nasa.gov/asset/${modalData.modalNasaId}`;
    metaUrl = metaUrl.replace(/ /g, '%20');

    // fetch the data to display in the modal
    const response = await fetch(metaUrl);
    let assetData = await response.json();
    assetData = assetData.collection;

    const assetObj = {};
    if (modalData.modalType.toLowerCase() === 'image') {
      // Get a better quality image
      assetObj.imageHref = assetData.items[0].href;
    } else if (modalData.modalType.toLowerCase() === 'video') {
      // Get the video link and video thumbnail to display
      assetObj.subsHref = [];
      const vidThumb = [];
      assetData.items.forEach((vid) => {
        if (vid.href.endsWith('orig.mp4')) {
          assetObj.vidHref = vid.href;
        } else if (vid.href.endsWith('.png') || vid.href.endsWith('.jpg')) {
          vidThumb.push(vid.href);
        } else if (vid.href.endsWith('.srt') || vid.href.endsWith('.vtt')) {
          assetObj.subsHref.push(vid.href);
        }
      });
      assetObj.vidThumb = vidThumb[Math.floor(vidThumb.length / 2)];
    } else {
      // get the audio link
      assetObj.audioHref = assetData.items.find((aud) => {
        if (aud.href.endsWith('128k.mp3') || aud.href.endsWith('128k.m4a')) {
          return aud.href;
        }
        return null;
      });
    }
    this.setState({
      loading: false,
      assetData: assetObj,
    });
  }


  // when close button or backdrop is clicked reset state,
  closeModal(e) {
    if (e.target.className === 'modal-wrapper' || e.target.className === 'modal-close-button') {
      this.props.closeModal();
      this.setState({
        loading: true,
        assetData: {},
      });
    }
  }


  // Creates the modal 
  renderModal() {
    let modalContent;
    if (this.state.loading) {
      // the modal is in a loading state, render loading spinner
      modalContent = (
        <div className="modalLoading">
          {/* <LoadingSpinner /> */}
        </div>
      );
      // fetch the data needed
      this.getModalContent();
    } else {
      const data = this.state.assetData;
      // display the modal
      modalContent = (
        <div className="modal-wrapper" onClick={e => this.closeModal(e)}>
          <div className="modal-content">
            <span
              role="button"
              tabIndex={0}
              className="modal-close-button"
              onClick={this.closeModal}
            >
              &times;
            </span>
            <div className="modal-flex">
              <div className="modal-image">
                {/* Create the image modal */}
                {this.props.modalDataObj.modalType === 'image' ?
                  <img alt={this.props.modalDataObj.modalTitle} src={data.imageHref} /> : null}

                {/* Create the video modal element */}
                {this.props.modalDataObj.modalType === 'video' ?
                  <video controls poster={data.vidThumb}>
                    <source src={data.vidHref} />
                    {data.subsHref.forEach(sub =>
                      <track src={sub} kind="subtitles" />,
                    )}
                    Please use a more modern browser to play this video.
                  </video> : null}

                {/* Create the audio modal */}
                {this.props.modalDataObj.modalType === 'audio' ?
                  <audio controls>
                    <source src={data.audioHref.href} type="audio/mp4" />
                    Please use a more modern browser to play this audio.
                  </audio> : null
                }
              </div>
              {/* Render the description for the media item */}
              <div className="modal-text">
                <h2>{this.props.modalDataObj.modalTitle}</h2>
                <p>{this.props.modalDataObj.modalDescription}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return modalContent;
  }


  render() {
    if (this.props.isModalOpen === false) {
      // If modal is not open do not render
      return null;
    }
    return this.renderModal();
  }
}

export default GalleryModal;
