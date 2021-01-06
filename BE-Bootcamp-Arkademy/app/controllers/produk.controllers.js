const db = require("../models");
const Post = db.produk;
const Op = db.Sequelize.Op;

//Create
exports.create = (req, res) => {
  //Validate requests
  if (!req.body.nama_produk) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  const post = {
    nama_produk: req.body.nama_produk,
    keterangan: req.body.keterangan,
    harga: req.body.harga,
    jumlah: req.body.jumlah,
  };

  // Post Produk
  Post.create(post)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while creating post",
      });
    });
};

//Retrieve All
exports.findAll = (req, res) => {
  const nama_produk = req.query.nama_produk;
  let condition = nama_produk
    ? { nama_produk: { [Op.like]: `%${nama_produk}%` } }
    : null;

  Post.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while find produk",
      });
    });
};

//Find a single
exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then((data) => {
      data
        ? res.send(data)
        : res.status(404).send({
            message: "Not Found with id=" + id,
          });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error get produk id=" + id,
      });
    });
};

// Update Produk
exports.update = (req, res) => {
  const id = req.params.id;

  Post.update(req.body, {
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Produk was updated successfully",
        });
      } else {
        res.send({
          message: "Cannot update Produk",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Produk",
      });
    });
};

//Delete a post
exports.detele = (req, res) => {
  const id = req.params.id;

  Post.destroy({
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Produk was deleted successfully",
        });
      } else {
        res.send({
          message: "Cannot delete Produk",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error when delete Produk",
      });
    });
};
