import  app  from "./app.js";
import connectToDB from "./src/config/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = 8080;

app.listen(PORT, () => {
  console.log("server running");
  
})
 connectToDB();

