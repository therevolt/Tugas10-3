module.exports = (app) => {
  const produk = require("../controllers/produk.controllers");

  let router = require("express").Router();

  // Create a new post
  router.post("/", produk.create);

  router.put("/:id", produk.update);

  //Retrieve all post
  router.get("/", produk.findAll);

  //Retrieve single post
  router.get("/:id", produk.findOne);

  //Delete single post
  router.delete("/:id", produk.detele);

  // //Delete all post
  // router.delete("/", posts.deleteAll);

  // //Find published post
  // router.get("/post/published", posts.findAllPublished);

  app.use("/api/arkademy", router);
};
