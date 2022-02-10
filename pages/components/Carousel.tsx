import { Stack } from "react-bootstrap";
import {
  carouselProps,
  carouselState,
} from "../../interfaces/interfaces";
import Crs from "../../styles/Carousel.module.scss";
import Styles from "../../styles/Index.module.scss";

import React, { Component } from "react";

export default class Carousel extends Component<carouselProps, carouselState> {
  constructor(props: carouselProps) {
    super(props);

    this.state = {
      first: 0,
      second: 1,
      displayedList: [this.props.filteredProducts[this.state.first]],
      desktopView: false,
      filteredProducts : this.props.filteredProducts
    };
  }

  //   Listen to the screen size
  componentDidMount() {
    if (window.matchMedia("(min-width: 1366px)").matches) {
      this.setState({ desktopView: true });
      this.setState({
        displayedList: [
          this.props.filteredProducts[this.state.first],
          this.props.filteredProducts[this.state.second],
        ],
      });
    }
  }


  render() {
    return (
      <React.Fragment>
        {this.props.brandList.map((brand) => (
          <div key={brand}>
            <div className={Styles.brand}>{brand}</div>
            <Stack direction="horizontal">
              <div className={`${Styles.itemsContainer} ${Crs.container}`}>
                <div className={`${Styles.itemList} d-flex`}>
                  {this.state.displayedList.map((p, i) => (
                    <div key={i} className={`${Styles.item} ${Crs.item}`}>
                      <img src={p.image} className={`${Crs.image} d-block`} />
                      <div>
                        <div className={Crs.productName}>{p.product_name}</div>
                        <div className={Crs.brandName}>{p.brand_name}</div>
                        <div className="d-flex align-items-baseline">
                          <div className={Crs.dollar}>
                            <img src="images/dollar.svg" alt="dollar sign" />
                          </div>{" "}
                          <div className={Crs.price}>{p.price}</div>
                        </div>
                      </div>
                      <div className={Crs.location}>{p.address.state}</div>
                      <div>
                        <span className={Crs.date}>Date: </span>
                        <span className={Crs.dateValue}>
                          {new Date(p.date)
                            .toLocaleDateString()
                            .replaceAll("/", ":")}
                        </span>
                      </div>
                      <div className={Crs.description}>{p.discription}</div>
                    </div>
                  ))}
                </div>
              </div>
              <img
                src="images/rightArrow.svg"
                alt="show next items"
                className={Crs.rightArrow}
                onClick={() => {
                  if (this.state.desktopView) {
                    this.state.first === this.props.filteredProducts.length - 1
                      ? this.setState({ first: 0 })
                      : this.setState({ first: this.state.first + 1 });
                    this.state.second === this.props.filteredProducts.length - 1
                      ? this.setState({ second: 0 })
                      : this.setState({ second: this.state.second + 1 });
                    this.setState({
                      displayedList: [
                        this.props.filteredProducts[this.state.first],
                        this.props.filteredProducts[this.state.second],
                      ],
                    });
                  } else {
                    this.state.first === this.props.filteredProducts.length - 1
                      ? this.setState({ first: 0 })
                      : this.setState({ first: this.state.first + 1 });
                    this.setState({
                      displayedList: [
                        this.props.filteredProducts[this.state.first],
                      ],
                    });
                  }
                }}
              />
            </Stack>
          </div>
        ))}
      </React.Fragment>
    );
  }
}
