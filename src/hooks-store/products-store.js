import { initStore } from "./store";

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

const configureStore = () => {
  const actions = {
    TOGGLE_FAV: (currState, id) => {
      const toggledIndex = currState.products.findIndex(
        (product) => product.id === id
      );
      const updatedProducts = [...currState.products];
      updatedProducts[toggledIndex] = {
        ...updatedProducts[toggledIndex],
        isFavorite: !updatedProducts[toggledIndex].isFavorite,
      };

      return { products: updatedProducts };
    },
  };
  initStore(actions, { products: DUMMY_PRODUCTS });
};

export default configureStore;
