const adminAuth = (req, res, next) => {
  console.log("middleware");
  let token = "xyz";
  let authentication = token === "xyz";
  if(!authentication){
     return res.send("Invalid request");
  } else{
    next();
  }
}

module.exports = adminAuth