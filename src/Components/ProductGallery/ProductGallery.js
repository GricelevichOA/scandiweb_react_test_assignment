import React, { Component } from "react";
import "./ProductGallery.scss";

export default class ProductGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageIndex: 0,
    };
  }

  onIndexChange(index) {
    this.setState({
      imageIndex: index,
    });
  }

  render() {
    const { gallery } = this.props;

    return (
      <div className="gallery">
        <div className="gallery__mini">
          {gallery.map((img, index) => {
            return (
              <div className="gallery__mini-image" key={index}>
                <img
                  src={img}
                  alt={index}
                  onMouseEnter={() => this.onIndexChange(index)}
                ></img>
              </div>
            );
          })}
        </div>

        <div className="gallery__main">
          <img
            src={gallery[this.state.imageIndex]}
            alt={this.state.imageIndex}
          ></img>
        </div>
      </div>
    );
  }
}
