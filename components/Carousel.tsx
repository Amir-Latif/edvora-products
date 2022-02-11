import React, { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { product } from "../interfaces/interfaces";
import Crs from "../styles/Carousel.module.scss";
import Styles from "../styles/Index.module.scss";

export default function Carousel({
  filteredProducts,
  brand,
}: {
  filteredProducts: product[];
  brand: string;
}) {
  const products = filteredProducts.filter((e) => e.brand_name === brand);
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(1);
  const [third, setThird] = useState(2);
  const [displayedList, setDisplayedList] = useState([products[0]]);

  useEffect(() => {
    
    switch (products.length) {
      case 1:
        setDisplayedList([products[first]]);
        break;
        case 2:
          setDisplayedList([products[second], products[second]]);
          break;
          default:
        setDisplayedList([products[first], products[second], products[third]]);
        break;
    }
  }, [first]);

  function nextItems() {
    switch (products.length) {
      case 1:
        !products[first + 1] ? setFirst(0) : setFirst(first + 1);
        break;
      case 2:
        !products[first + 2]
          ? setFirst(first + 2 - products.length)
          : setFirst(first + 2);
        !products[second + 2]
          ? setSecond(second + 2 - products.length)
          : setSecond(second + 2);
        break;
      default:
        !products[first + 3]
          ? setFirst(first + 3 - products.length)
          : setFirst(first + 3);
        !products[second + 3]
          ? setSecond(second + 3 - products.length)
          : setSecond(second + 3);
        !products[third + 3]
          ? setThird(third + 3 - products.length)
          : setThird(third + 3);
        break;
    }
  }

  return (
    <Stack direction="horizontal">
      <Stack>
        <div className={Styles.brand}>{brand}</div>
        <div className={`${Styles.itemsContainer} ${Crs.container}`}>
          <Stack
            direction="horizontal"
            className={`${Styles.itemList} d-flex justify-content-around m-3`}
          >
            {displayedList.map((p, i) => (
              <div
                key={i}
                className={`${Styles.item} ${Crs.item}`}
                style={{
                  marginRight: i === displayedList.length - 1 ? "0" : "1.25em",
                }}
              >
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
                    {new Date(p.date).toLocaleDateString().replaceAll("/", ":")}
                  </span>
                </div>
                <div className={Crs.description}>{p.discription}</div>
              </div>
            ))}
          </Stack>
        </div>
      </Stack>
      <img
        src="images/rightArrow.svg"
        alt="show next items"
        className={Crs.rightArrow}
        onClick={nextItems}
      />
    </Stack>
  );
}
