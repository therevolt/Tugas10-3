module.exports = (sequelize, Sequelize) => {
  const Produk = sequelize.define("produk", {
    nama_produk: {
      type: Sequelize.STRING,
    },
    keterangan: {
      type: Sequelize.STRING,
    },
    harga: {
      type: Sequelize.INTEGER,
    },
    jumlah: {
      type: Sequelize.INTEGER,
    },
  });

  return Produk;
};
