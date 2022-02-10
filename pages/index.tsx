import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { product } from "../interfaces/interfaces";
import Styles from "../styles/Index.module.scss";
import Carousel from "./components/Carousel";

const Home: NextPage<{ productList: product[] }> = ({ productList }) => {
  const downArrow = (
    <svg
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.09409 9.18994L0.816466 0.0488263L11.3717 0.0488253L6.09409 9.18994Z"
        fill="#A5A5A5"
      />
    </svg>
  );

  const [filteredList, setFilteredList] = useState([] as string[]);

  function filter(item: string) {
    const filteredList: Set<string> = new Set();
    switch (item) {
      case "brand":
        productList.forEach((product) => {
          filteredList.add(product.brand_name);
        });
        break;
      case "state":
        productList.forEach((product) => {
          filteredList.add(product.address.state);
        });
        break;
      case "city":
        productList.forEach((product) => {
          filteredList.add(product.address.city);
        });
        break;
      default:
        break;
    }

    return Array.from(filteredList);
  }

  return (
    <React.Fragment>
      <Head>
        <title>Edvora Products</title>
        <meta name="description" content="Edvora Products" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="http://fonts.cdnfonts.com/css/sf-pro-display"
        />{" "}
      </Head>

      <Container className={Styles.container}>
        <Row>
          <div
            className={`${Styles.itemsContainer} ${Styles.filtersContainer} col-1`}
          >
            <div className={Styles.filtersHeading}>Filters</div>
            <div className={`${Styles.itemList} ${Styles.filtersItemList}`}>
              <div
                className={`${Styles.filtersItem} ${Styles.item}`}
                onClick={() => setFilteredList(filter("brand"))}
              >
                Products {downArrow}
              </div>
              <div
                className={`${Styles.filtersItem} ${Styles.item}`}
                onClick={() => setFilteredList(filter("state"))}
              >
                State {downArrow}
              </div>
              <div
                className={`${Styles.filtersItem} ${Styles.item}`}
                onClick={() => setFilteredList(filter("city"))}
              >
                City {downArrow}
              </div>
            </div>
            <Row
              className={`${Styles.itemsContainer} ${Styles.dropdownMenu}`}
              style={{ display: filteredList.length > 0 ? "flex" : "none" }}
            >
              {filteredList.length > 0 &&
                filteredList.map((element) => (
                  <Col
                    key={element}
                    className={`${Styles.item} ${Styles.dropdownItem}`}
                  >
                    {element}
                  </Col>
                ))}
            </Row>
          </div>

          <Col className={`${Styles.content} my-3 my-md-0`}>
            <div className={Styles.title}>Edvora</div>
            <div className={Styles.subHeading}>Products</div>

            {filter("brand").map((brand) => (
              <div key={brand}>
                <Carousel productList={productList} brand={brand} />
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Home;

export async function getStaticProps() {
  const response = await fetch("https://assessment-edvora.herokuapp.com/");
  const productList: product[] = await response.json();

  return { props: { productList } };
}
