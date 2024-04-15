const locations = [
  {
    id: 1,
    name: "Hammamet",
    coordinate: {
      latitude: 36.4,
      longitude: 10.6167,
    },
    products: [
      {
        id: 1,
        name: "Product 1",
        description:
          "this a description for this shoesaaa aaaaaaaaa aaaaaaaaaaaaa aaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaa",
        image: require("../assets/vap.webp"),
        price: "$10",
        user: { name: "jalel kadri", phone: "56234865" },
      },
      {
        id: 2,
        name: "Product 2",
        description: "description for second product",
        image: require("../assets/icon.png"),
        price: "$20",
        user: { name: "ahmed ouled amor", phone: "52333194" },
      },
      {
        id: 3,
        name: "Product 3",
        description: "nnnn",
        image: require("../assets/icon.png"),
        price: "$30",
        user: { name: "hedi khlifi", phone: "65352453" },
      },
      {
        id: 4,
        name: "Product 4",
        description: "xxxxx",
        image: require("../assets/icon.png"),
        price: "$40",
        user: { name: "User Name", phone: "User Phone" },
      },
      // More products...
    ],
  },
  {
    id: 2,
    name: "Sousse",
    coordinate: {
      latitude: 35.8254,
      longitude: 10.6366,
    },
    products: [
      { id: 3, name: "Product 3", price: "$30" },
      { id: 4, name: "Product 4", price: "$40" },
    ],
  },
  {
    id: 3,
    name: "Tunis",
    coordinate: {
      latitude: 36.8065,
      longitude: 10.1815,
    },
    products: [
      { id: 5, name: "Product 5", price: "$50" },
      { id: 6, name: "Product 6", price: "$60" },
    ],
  },
  {
    id: 4,
    name: "Monastir",
    coordinate: {
      latitude: 35.7833,
      longitude: 10.8333,
    },
    products: [
      { id: 7, name: "Product 7", price: "$70" },
      { id: 8, name: "Product 8", price: "$80" },
    ],
  },
  {
    id: 5,
    name: "La Marsa",
    coordinate: {
      latitude: 36.886,
      longitude: 10.323,
    },
    products: [
      { id: 9, name: "Product 9", price: "$90" },
      { id: 10, name: "Product 10", price: "$100" },
    ],
  },
  {
    id: 6,
    name: "Sfax",
    coordinate: {
      latitude: 34.7452,
      longitude: 10.7613,
    },
    products: [
      { id: 11, name: "Product 11", price: "$110" },
      { id: 12, name: "Product 12", price: "$120" },
    ],
  },
  {
    id: 7,
    name: "Kairouan",
    coordinate: {
      latitude: 35.6781,
      longitude: 10.0963,
    },
    products: [
      { id: 13, name: "Product 13", price: "$130" },
      { id: 14, name: "Product 14", price: "$140" },
    ],
  },
  {
    id: 8,
    name: "Bizerte",
    coordinate: {
      latitude: 37.2744,
      longitude: 9.8739,
    },
    products: [
      { id: 15, name: "Product 15", price: "$150" },
      { id: 16, name: "Product 16", price: "$160" },
    ],
  },
  {
    id: 9,
    name: "Gabes",
    coordinate: {
      latitude: 33.8815,
      longitude: 10.0982,
    },
    products: [
      { id: 17, name: "Product 17", price: "$170" },
      { id: 18, name: "Product 18", price: "$180" },
    ],
  },
  {
    id: 10,
    name: "Djerba",
    coordinate: {
      latitude: 33.8073,
      longitude: 10.8451,
    },
    products: [
      { id: 19, name: "Product 19", price: "$190" },
      { id: 20, name: "Product 20", price: "$200" },
    ],
  },
  // More locations...
];

export default locations;
