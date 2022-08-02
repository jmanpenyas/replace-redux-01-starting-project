import React, { useState } from "react";
const DUMMY_PRODUCTS = [
  {
    id: "p1",
    title: "Red Scarf",
    description: "A pretty red scarf.",
    isFavorite: false,
  },
  {
    id: "p2",
    title: "Blue T-Shirt",
    description: "A pretty blue t-shirt.",
    isFavorite: false,
  },
  {
    id: "p3",
    title: "Green Trousers",
    description: "A pair of lightly green trousers.",
    isFavorite: false,
  },
  {
    id: "p4",
    title: "Orange Hat",
    description: "Street style! An orange hat.",
    isFavorite: false,
  },
];
export const ProductsContext = React.createContext({
  products: [],
  toggleFav: (id) => {},
});

export const ProductsProvider = (props) => {
  const [products, setProducts] = useState(DUMMY_PRODUCTS);
  const toggleFavourite = (id) => {
    setProducts((currentProductList) => {
      const toggledIndex = currentProductList.findIndex(
        (product) => product.id === id
      );
      const updatedProducts = [...currentProductList];
      updatedProducts[toggledIndex] = {
        ...updatedProducts[toggledIndex],
        isFavorite: !updatedProducts[toggledIndex].isFavorite,
      };

      return updatedProducts;
    });
  };
  return (
    <ProductsContext.Provider
      value={{ products: products, toggleFav: toggleFavourite }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};
