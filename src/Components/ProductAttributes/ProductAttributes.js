import React, { Component } from "react";
import PropTypes from "prop-types";
import AttributeItems from "../AttributeItems/AttributeItems";
import "./ProductAttributes.scss";

export default class ProductAttributes extends Component {
  render() {
    const { attributes } = this.props;

    return (
      <div className="attributes">
        {attributes.map((attr) => {
          return (
            <div className="attributes__type" key={attr.id}>
              <div className="attributes__name">{attr.name}: </div>
              <AttributeItems
                setAttribute={this.props.setAttribute}
                attr={attr}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

ProductAttributes.propTypes = {
  attributes: PropTypes.array,
  setAttribute: PropTypes.func,
};
