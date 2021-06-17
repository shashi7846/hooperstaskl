const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
const DB ="Hooperstask"

app.use(express.json());
app.use(cors())


const URL="mongodb+srv://students:students123@cluster0.0tegi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const port = process.env.PORT|| 8000;

let data = [];
//Get students

app.get("/students", async function (req, res) {
  try {
    let connection = await mongodb.connect(URL);
    let db = connection.db(DB);
    let students = await db.collection("students").find().toArray();
    await connection.close();
    res.json(students);
  } catch (error) {
    console.log(erroe);
  } 
});

//Get student by id

app.get("/student/:id", async function (req, res) {
    try {
      let connection = await mongodb.connect(URL);
      let db = connection.db(DB);
      let student = await db.collection("students").findOne({ _id: mongodb.ObjectID(req.params.id) });
      await connection.close();
      res.json(student);
    } catch (error) {
      console.log(error);
    } 
  });

  //Get colleges by id

  app.get("/college/:id", async function (req, res) {
    try {
      let connection = await mongodb.connect(URL);
      let db = connection.db(DB);
      let college = await db.collection("colleges").findOne({ _id: mongodb.ObjectID(req.params.id) });
      await connection.close();
      res.json(college);
    } catch (error) {
      console.log(error);
    } 
  });

  //Get colleges 

app.get("/colleges", async function (req, res) {
    try {
      let connection = await mongodb.connect(URL);
      let db = connection.db(DB);
      let colleges = await db.collection("colleges").find().toArray();
      await connection.close();
      res.json(colleges);
    } catch (error) {
      console.log(erroe);
    } 
  });

app.post("/student", async function (req, res) {
    // req.body.id = students.length + 1;
    // students.push(req.body);
    // steps
    try {
      //1.connect to db server
  
      let connection = await mongodb.connect(URL);
  
      //2.select the particular db
      let db = connection.db(DB);
  
      //3.do crud operation
      await db.collection("students").insertOne(req.body);
  
      //4. close the connection
      await connection.close();
      res.json({
        message: "Student Created",
      });
    } catch (error) {
      console.log(error);
    }
    console.log(req.body)
  });

  app.post("/college", async function (req, res) {
   
    try {
     
      let connection = await mongodb.connect(URL);
  let db = connection.db(DB);
  await db.collection("colleges").insertOne(req.body);
  await connection.close();
  res.json({
      message:"college entered",
  });
    }catch(error){
        console.log(error)
    }
});


app.post("/register", async function (req, res) {
    try {
        let connection = await mongodb.connect(URL);
        let db = connection.db(DB);

        let uniqueEmail = await db.collection("users").findOne({ email: req.body.email });

        if (uniqueEmail) {
            res.status(401).json({
                message: "email already exist"
            })
        } else {
            let salt = await bcrypt.genSalt(10);

            let hash = await bcrypt.hash(req.body.password, salt);

            req.body.password = hash;

            let users = await db.collection("users").insertOne(req.body);

            await connection.close();
            res.json({
                message: "User Registerd"
            })
        }
    } catch (error) {
        console.log(error)
    }
})




app.get("/",(req,res)=>res.status(200).send("hello"));
 

app.listen(port,()=>console.log(`it is listining on ${port}`));