const express = require("express");
var { createHandler } = require("graphql-http/lib/use/express");
var { buildSchema } = require("graphql");
var { ruruHTML } = require("ruru/server");
const { check, validationResult } = require("express-validator");
const users = require("./assets/users.json");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/login", (req, res) => {
  res.render("./login");
});

app.post(
  "/login",
  [
    check("username", "Email error").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.json(errors);
    else {
      const username = req.body.username;
      res.json({
        username: username,
      });
    }
  }
);

// ===================== GraphQL ===================
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

var schema = buildSchema(`type Geo {
  lat: String
  lng: String
}

type Address {
  street: String
  suite: String
  city: String
  zipcode: String
  geo: Geo
}

type Company {
  name: String
  catchPhrase: String
  bs: String
}

type User {
  id: Int
  name: String
  username: String
  email: String
  address: Address
  phone: String
  website: String
  company: Company
}

type Query {
  user(id: Int!): User
  users: [User]
}
`);

var root = {
  users() {
    return users;
  },
  user({ id }) {
    return users.find((user) => user.id === id);
  },
};

app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

app.listen(5000);
