export interface product {
  product_name: string;
  brand_name: string;
  price: number;
  address: { state: string; city: string };
  discription: string;
  date: string;
  time: string;
  image: string;
}

export interface carouselProps {
  filteredProducts: product[];
  brandList: string[];
}

export interface carouselState {
  first: number;
  second: number;
  displayedList: product[];
  desktopView: boolean;
  filteredProducts : product[]
}
