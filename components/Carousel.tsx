import React, { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { product } from "../interfaces/interfaces";
import Crs from "../styles/Carousel.module.scss";
import Styles from "../styles/Index.module.scss";

export default function Carousel({
  filteredProducts,
  brandList,
}: {
  filteredProducts: product[];
  brandList: string[];
}) {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(1);
  const [displayedList, setDisplayedList] = useState([filteredProducts[0]]);

  const [desktopView, setDesktopView] = useState(false);

  //   Listen to the screen size
  useEffect(() => {
    if (window.matchMedia("(min-width: 1366px)").matches) {
      setDesktopView(true);
      setDisplayedList([filteredProducts[0], filteredProducts[1]]);
    }
  }, [desktopView]);

  return (
    <React.Fragment>
      {brandList.map((brand) => (
        <div key={brand}>
          <div className={Styles.brand}>{brand}</div>
          <Stack direction="horizontal">
            <div className={`${Styles.itemsContainer} ${Crs.container}`}>
              <div className={`${Styles.itemList} d-flex`}>
                {displayedList.map((p, i) => (
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
                if (desktopView) {
                  first === filteredProducts.length - 1
                    ? setFirst(0)
                    : setFirst(first + 1);
                  second === filteredProducts.length - 1
                    ? setSecond(0)
                    : setSecond(second + 1);
                  setDisplayedList([
                    filteredProducts[first],
                    filteredProducts[second],
                  ]);
                } else {
                  first === filteredProducts.length - 1
                    ? setFirst(0)
                    : setFirst(first + 1);
                  setDisplayedList([filteredProducts[first]]);
                }
              }}
            />
          </Stack>
        </div>
      ))}
    </React.Fragment>
  );
}
