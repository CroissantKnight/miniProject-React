const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const mysql2 = require("mysql2");
const mysql = require("mysql2/promise");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");
// const { default: App } = require("../React_form/src/App");
console.log("================= start =================");
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
let conn;
let port = 3001;
const secret = "thiismysecret";
let users = [];
let counter = 1;
let getCouner = 1;
const initMySQL = async () => {
  try {
    conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "db_form_update",
    });
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    conn = null; // Explicitly set conn to null on error
  }
};

const startServer = async () => {
  await initMySQL();

  if (!conn) {
    console.error("Failed to connect to the database. Exiting...");
    process.exit(1); // Exit the process with a failure code
  }

  app.post("/api/then", async (req, res) => {
    if (!conn) {
      console.error("Database connection not established at request time");
      res.status(500).send("Database connection not established");
      return;
    }

    try {
      const [results, fields] = await conn.query("SELECT * FROM tb_test");
      res.json(results);
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).send("Error executing query");
    }
  });
};

///////////////////////////////////////////////////////////////////////////////
// ! for test app.get,put,delete
// * test app.get
app.get("/testget", (req, res) => {
  res.json({ users });
});
// * test app.post
app.post("/testpost", (req, res) => {
  let user = req.body;
  user.id = counter;
  counter += 1;
  users.push(user);

  res.json({
    message: "successfull somthin",
    data: user,
  });
});
// * test app.put
app.put("/testput/:id", (req, res) => {
  let id = req.params.id;
  let updateUser = req.body;
  let selectedIndex = users.findIndex((user) => {
    if (user.id == id) {
      return true;
    } else {
      return false;
    }
  });
  users[selectedIndex] = updateUser;
  res.json({
    message: "update user complete!",
    data: {
      user: updateUser,
      indexUpdate: selectedIndex,
    },
  });
  res.send(selectedIndex + "");
});

app.get("/send", (req, res) => {
  res.json({ message: "Hello to send page" });
  console.log("send : connected done");
});

app.get("/easy", async (req, res) => {
  const [results, fields] = await conn.query("SELECT * FROM tb_good");
  res.json(results);
});

app.get("/api/get/normal", async (req, res) => {
  console.log(conn);
  if (!conn) {
    console.error("Database connection not established at request time");
    res.status(500).send("Database connection not established");
    return;
  }

  try {
    const [results, fields] = await conn.query("SELECT * FROM tb_good");
    res.json(results);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Error executing query");
  }
});

// ! Rest api
// *test login by app.post
app.post("/api/post/login", async (req, res) => {
  if (!conn) {
    console.error("Database connection not established at request time");
    res.status(500).send("Database connection not established");
    return;
  }

  const { email, password } = req.body;

  try {
    const [results] = await conn.query(
      "SELECT * FROM tb_good WHERE email = ?",
      [email]
    );

    if (results.length === 0) {
      return res
        .status(400)
        .send({ message: "lenght Invalid email or password" });
    }

    const user = results[0];
    console.log(user);

    if (user.password !== password) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    if (user.permission == "admin") {
      const token = jwt.sign({ email, role: "admin" }, secret, {
        expiresIn: "12h",
      });
      res.json({
        message: "Login successful you are admin",
        token: token,
        permissions: results[0].permission,
      });
      console.log(token);
    } else {
      const token = jwt.sign({ email, role: "user" }, secret, {
        expiresIn: "12h",
      });
      res.json({
        message: "Login successful you are user",
        token: token,
        permissions: results[0].permission,
      });
      console.log(token);
    }
    // res.send({ message: "Login successful", });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Error executing query");
  }
});

// * test fetch user data app.get
app.get("/api/get/still-login", async (req, res) => {
  try {
    const authoHeader = req.headers["authorization"];
    let authoToken;
    if (authoHeader) {
      authoToken = authoHeader.split(" ")[1];
    }
    console.log("======hooked token======", authoToken);
    const user = jwt.verify(authoToken, secret);
    console.log("user", user);
    const [checkExistance] = await conn.query(
      "SELECT * FROM tb_good WHERE  email = ?",
      user.email
    );
    if (!checkExistance[0]) {
      throw { message: "user not found" };
    }
    // authentication is quite sure
    const [results] = await conn.query(
      "SELECT * FROM tb_good WHERE  email = ?",
      user.email
    );
    res.json({
      message: "you still signin",
      user: results[0],
    });
    // res.send(user);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "authentication failed", error });
  }
});

app.put("/api/put/login");
// *start true back-end
// *insert-user
app.post("/api/post/insert-user", async (req, res) => {
  if (!conn) {
    console.error("Database connection not established at request time");
    res.status(500).send("Database connection not established");
    return;
  }

  const user = req.body;

  try {
    console.log("start create user");
    const results = await conn.query("INSERT INTO db_user SET ?", user);
    console.log("query comleted");
    console.log(user);
    console.log("start sen response");
    res.json({
      message: "User created successfully",
      data: results[0],
    });
    console.log("progress end");
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Error executing query");
  }
});

// *insert-data
app.post("/api/post/insert-data", async (req, res) => {
  if (!conn) {
    console.error("Database connection not established at request time");
    res.status(500).send("Database connection not established");
    return;
  }

  const data = req.body;

  try {
    const results = await conn.query("INSERT INTO db_base SET ?", data);
    console.log(data);
    res.json({
      message: "Data created successfully",
      data: results[0],
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Error executing query");
  }
});

// *update-user
app.put("/api/put/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let updateUser = req.body;
    const results = await conn.query("UPDATE db_user SET ? WHERE user_id = ?", [
      updateUser,
      id,
    ]);

    res.json({
      message: "Update successfully",
      data: results[0],
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Error executing query");
  }
});

// *delete-user
app.delete("/api/delete/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query(
      "DELETE from db_user WHERE user_id = ?",
      id
    );

    res.json({
      message: "Update successfully",
      data: results[0],
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Error executing query");
  }
});
// ตัวอย่าง create token jwt เพื่อเก็บidentity
// const token = jwt.sign({ email, role: "admin" }, secret, { expires: "1h" });
/////////////////////////////////////////////////////////////////////////////////
// start form for admin page and user page
app.get("/api/get/predata", async (req, res) => {
  try {
    const [results, fields] = await conn.query("SELECT * FROM tb_predata");
    res.json(results);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "fetch data", error });
  }
  console.log("app.get/api/get/predata");
});

/////////////////////////////////////////////////////////////////////////////////
app.listen(port, async (req, res) => {
  await initMySQL();
  console.log("listening on port : " + port);
});


