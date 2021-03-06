import React, { Component } from "react";
import "./DropDown.scss";
import PropTypes from "prop-types";
import arrowUp from "../../Images/arrow_up.svg";
import arrowDown from "../../Images/arrow_down.svg";

export default class DropDown extends Component {
  constructor(props) {
    super(props);

    this.box = React.createRef();

    this.state = {
      currenciesList: [...this.props.currencies.currencies],
      currentCurrency: {},
      isOpen: false,
    };
  }

  componentDidMount() {
    this.setState({
      currentCurrency: {
        ...this.state.currenciesList.find(
          (c) => c.label === this.props.currCurrency
        ),
      },
    });
    document.addEventListener("click", this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  }

  handleOutsideClick = (e) => {
    if (this.box.current && !this.box.current.contains(e.target)) {
      this.setState({
        isOpen: false,
      });
    }
  };

  setCurrentCurrency(curr) {
    this.setState({
      currentCurrency: curr,
      isOpen: false,
    });
    this.props.changeCurrency(curr.label);
  }

  toggleMenu() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div className="dd" ref={this.box}>
        <button
          className="dd__header"
          onClick={() => {
            this.toggleMenu();
          }}
        >
          {this.state.currentCurrency.symbol}
          {this.state.isOpen ? (
            <img src={arrowUp} alt="up"></img>
          ) : (
            <img src={arrowDown} alt="up"></img>
          )}
        </button>
        {this.state.isOpen ? (
          <div className="dd__menu">
            {this.state.currenciesList.map((c) => {
              return (
                <button
                  className="dd__item"
                  key={c.label}
                  onClick={() => {
                    this.setCurrentCurrency(c);
                  }}
                >
                  {c.symbol}
                  {c.label}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

DropDown.propTypes = {
  currCurrency: PropTypes.string,
  changeCurrency: PropTypes.func,
  currencies: PropTypes.object,
};
