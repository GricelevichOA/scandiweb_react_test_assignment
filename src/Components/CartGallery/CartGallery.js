import React, { Component } from "react";
import PropTypes from "prop-types";
import arrow_left from "../../Images/arrow_left.svg";
import arrow_right from "../../Images/arrow_right.svg";
import "./CartGallery.scss";

export default class CartGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgIndex: 0,
    };
  }

  onIndexIncrease() {
    if (this.state.imgIndex < this.props.gallery.length - 1) {
      this.setState({
        imgIndex: this.state.imgIndex + 1,
      });
    } else {
      this.setState({
        imgIndex: 0,
      });
    }
  }

  onIndexDecrease() {
    if (this.state.imgIndex === 0) {
      this.setState({
        imgIndex: this.props.gallery.length - 1,
      });
    } else {
      this.setState({
        imgIndex: this.state.imgIndex - 1,
      });
    }
  }

  render() {
    const { gallery } = this.props;
    return (
      <div className="g">
        {gallery.length > 1 ? (
          <button
            className="g__button btn-left"
            onClick={() => {
              this.onIndexDecrease();
            }}
          >
            <img src={arrow_left} alt="arrow_left" />
          </button>
        ) : null}

        <div className="g__image">
          <img src={gallery[this.state.imgIndex]} alt={this.state.imgIndex} />
        </div>
        {gallery.length > 1 ? (
          <button
            className="g__button btn-right"
            onClick={() => {
              this.onIndexIncrease();
            }}
          >
            <img src={arrow_right} alt="arrow_right" />
          </button>
        ) : null}
      </div>
    );
  }
}

CartGallery.propTypes = {
  gallery: PropTypes.array,
};
