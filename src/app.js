const express = require("express");

const app = express();
const port = 8000;

app.use("/checking",(req, res) => {
   console.log("this is global checkpoint....")
})

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
