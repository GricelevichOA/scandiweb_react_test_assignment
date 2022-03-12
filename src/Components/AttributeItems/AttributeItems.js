import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "./AttributeItems.scss";

class AttributeItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    };
  }

  setIndex(index) {
    this.setState({
      selectedIndex: index,
    });
  }

  onAttributeSelect(id, name, type, item) {
    const attribute = { id, name, type, item };
    this.props.setAttribute(attribute);
  }

  componentDidMount() {
    const attribute = {
      id: this.props.attr.id,
      name: this.props.attr.name,
      type: this.props.attr.type,
      item: this.props.attr.items[0],
    };
    // idk but it correctly works onli with timeout
    setTimeout(() => {
      this.props.setAttribute(attribute);
    }, 10);
  }

  render() {
    const { items, type, id, name } = this.props.attr;

    return (
      <>
        {items.map((item, i) => {
          return (
            <button
              key={item.id}
              className={`btngroup__button ${
                i === this.state.selectedIndex ? "btn-active" : ""
              }`}
              value={item.value}
              onClick={() => {
                this.setIndex(i);
                this.onAttributeSelect(id, name, type, item);
              }}
            >
              {type === "swatch" ? (
                <div
                  className="btn__swatch"
                  style={{
                    backgroundColor: item.value,
                    color: item.value,
                  }}
                >
                  color
                </div>
              ) : (
                item.value
              )}
            </button>
          );
        })}
      </>
    );
  }
}

AttributeItems.propTypes = {
  attr: PropTypes.object,
  setAttribute: PropTypes.func,
};

export default AttributeItems;
