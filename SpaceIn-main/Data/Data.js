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
        id: 70,
        name: "Product 55",
        description: "ahmeddd",
        image: require("../assets/icon.png"),
        price: "$30",
        publishDate: "2024-04-15T03:20:00.000Z",
        status: true,
        user: { name: "ahmado", phone: "65352453" },
      },
      {
        id: 3,
        name: "Product 3",
        description: "nnnn",
        image: require("../assets/icon.png"),
        price: "$30",
        publishDate: "2024-04-15T03:20:00.000Z",
        status: true,
        user: { name: "hedi khlifi", phone: "65352453" },
      },
      {
        id: 4,
        name: "Product 4",
        description: "xxxxx",
        image: require("../assets/icon.png"),
        price: "$40",
        publishDate: "2024-04-15T04:45:00.000Z",
        status: true,
        user: { name: "User Name", phone: "User Phone" },
      },
      {
        id: 5,
        name: "Product 4",
        description: "xxxxx",
        image: require("../assets/icon.png"),
        price: "$40",
        publishDate: "2024-04-15T10:15:00.000Z",
        status: true,
        user: { name: "User Name", phone: "User Phone" },
      },
      {
        id: 6,
        name: "Product 4",
        description: "xxxxx",
        image: require("../assets/icon.png"),
        price: "$40",
        publishDate: "2024-04-15T12:00:00.000Z",
        status: true,
        user: { name: "User Name", phone: "User Phone" },
      },

      {
        id: 7,
        name: "Product 4",
        description: "xxxxx",
        image: require("../assets/icon.png"),
        price: "$40",
        publishDate: "2023-08-17T02:20:28.438Z",
        status: false,
        user: { name: "User Name", phone: "User Phone" },
      },
      {
        id: 8,
        name: "Product 4",
        description: "xxxxx",
        image: require("../assets/icon.png"),
        price: "$40",
        publishDate: "2024-03-06T04:20:00.000Z",
        status: true,
        user: { name: "User Name", phone: "User Phone" },
      },
      {
        id: 9,
        name: "Product 4",
        description: "xxxxx",
        image: require("../assets/icon.png"),
        price: "$40",
        publishDate: "2024-03-06T06:20:00.000Z",
        status: true,
        user: { name: "User Name", phone: "User Phone" },
      },
      {
        id: 10,
        name: "Product 4",
        description: "xxxxx",
        image: require("../assets/icon.png"),
        price: "$40",
        publishDate: "2024-03-06T07:20:00.000Z",
        status: true,
        user: { name: "User Name", phone: "User Phone" },
      },
      {
        id: 11,
        name: "Product 4",
        description: "xxxxx",
        image: require("../assets/icon.png"),
        price: "$40",
        publishDate: "2024-03-06T08:20:00.000Z",
        status: true,
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
      {
        id: 3,
        name: "Product 3",
        description: "xxxxx",
        image: require("../assets/icon.png"),
        price: "$30",
        publishDate: "2024-03-06T05:45:00.000Z",
        status: true,
        user: { name: "User Name", phone: "User Phone" },
      },
      {
        id: 4,
        name: "Product 4",
        description: "xxxxx",
        price: "$40",
        publishDate: "2024-03-06T14:00:00.000Z",
        status: true,
        user: { name: "User Name", phone: "User Phone" },
      },
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
      {
        id: 5,
        name: "Product 5",
        description: "xxxxx",
        image: require("../assets/icon.png"),
        price: "$50",
        publishDate: "2024-03-06T03:15:00.000Z",
        status: true,
        user: { name: "User Name", phone: "User Phone" },
      },
      {
        id: 6,
        name: "Product 6",
        description: "xxxxx",
        price: "$60",
        publishDate: "2024-03-06T05:00:00.000Z",
        status: true,
        user: { name: "User Name", phone: "User Phone" },
      },
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
