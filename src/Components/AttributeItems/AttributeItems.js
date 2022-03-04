import React, { Component, Fragment } from "react";
import "./AttributeItems.scss";

export default class AttributeItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: "",
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
