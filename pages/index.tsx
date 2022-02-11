import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { product } from "../interfaces/interfaces";
import Styles from "../styles/Index.module.scss";
import Carousel from "../components/Carousel";

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

  function getList(item: string) {
    let newList: Set<string> = new Set();

    switch (item) {
      case "brand":
        productList.forEach((product) => {
          newList.add(product.brand_name);
        });
        break;
      case "state":
        productList.forEach((product) => {
          newList.add(product.address.state);
        });
        break;
      case "city":
        productList.forEach((product) => {
          newList.add(product.address.city);
        });
        break;
      default:
        break;
    }
    return Array.from(newList);
  }

  const [filteredProducts, setFilteredProducts] = useState(productList);

  const [brandList, setBrandList] = useState(getList("brand"));
  const [stateList, setStateList] = useState(getList("state"));
  const [cityList, setCityList] = useState(getList("city"));

  const [showDropDown, setShowDropDown] = useState(false);
  const [dropDownMenu, setDropDownMenu] = useState([""]);

  function filter(element: string) {
    // Brand
    if (dropDownMenu.join() === brandList.join()) {
      // Update state list
      let filteredByBrand = productList.filter((e) => e.brand_name === element);
      let newStateList = new Set<string>();
      filteredByBrand.forEach((e) => {
        newStateList.add(e.address.state);
      });
      setStateList(Array.from(newStateList));

      // update productList for Carousel
      setFilteredProducts(productList.filter((p) => p.brand_name === element));

      setBrandList([element]);
      // State
    } else if (dropDownMenu.join() === stateList.join()) {
      // Update City list
      let filteredByState = productList.filter(
        (e) => e.address.state === element && brandList.includes(e.brand_name)
      );
      let newCityList = new Set<string>();
      filteredByState.forEach((e) => {
        newCityList.add(e.address.city);
      });
      setCityList(Array.from(newCityList));

      // Update product list
      setFilteredProducts(
        productList.filter(
          (p) =>
            brandList.includes(p.brand_name) &&
            p.address.state === element &&
            getList("city").includes(p.address.city)
        )
      );

      // City
    } else if (dropDownMenu.join() === cityList.join()) {
      // update Filtered Product List
      setFilteredProducts(
        productList.filter(
          (p) =>
            brandList.includes(p.brand_name) &&
            stateList.includes(p.address.state) &&
            p.address.city === element
        )
      );
    }
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

      <div className={Styles.container}>
        <Stack direction="horizontal" className={`align-items-start`}>
          <div
            className={`${Styles.itemsContainer} ${Styles.filtersContainer} col-1`}
          >
            <div className={Styles.filtersHeading}>Filters</div>
            <div className={`${Styles.itemList} ${Styles.filtersItemList}`}>
              <div
                className={`${Styles.filtersItem} ${Styles.item}`}
                onClick={() => {
                  setDropDownMenu(getList("brand"));
                  setShowDropDown(true);
                }}
              >
                Products {downArrow}
              </div>
              <div
                className={`${Styles.filtersItem} ${Styles.item}`}
                onClick={() => {
                  setDropDownMenu(stateList);
                  setShowDropDown(true);
                }}
              >
                State {downArrow}
              </div>
              <div
                className={`${Styles.filtersItem} ${Styles.item}`}
                onClick={() => {
                  setDropDownMenu(cityList);
                  setShowDropDown(true);
                }}
              >
                City {downArrow}
              </div>
            </div>
            <Row
              className={`${Styles.itemsContainer} ${Styles.dropdownMenu}`}
              style={{ display: showDropDown ? "flex" : "none" }}
            >
              {showDropDown &&
                dropDownMenu.map((element) => (
                  <Col
                    key={element}
                    className={`${Styles.item} ${Styles.dropdownItem}`}
                    onClick={() => {
                      filter(element);
                      setShowDropDown(false);
                    }}
                  >
                    {element}
                  </Col>
                ))}
            </Row>
          </div>

          <Stack className={`${Styles.content} my-3 my-md-0`}>
            <div className={Styles.title}>Edvora</div>
            <div className={Styles.subHeading}>Products</div>

            {brandList.map((brand) => (
              <div key={brand}>
                <Carousel
                  filteredProducts={filteredProducts}
                  brand={brand}
                />
              </div>
            ))}
          </Stack>
        </Stack>
      </div>
    </React.Fragment>
  );
};

export default Home;

export async function getStaticProps() {
  const response = await fetch("https://assessment-edvora.herokuapp.com/");
  const productList: product[] = await response.json();

  return { props: { productList } };
}
