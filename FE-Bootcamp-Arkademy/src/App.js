import { Card, Navbar, Nav, Form, Button, Modal, Alert } from "react-bootstrap";
import { React, useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [keranjang, setKeranjang] = useState(null);
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState({
    type: "success",
    show: false,
    text: "",
  });
  const [input, setInput] = useState({
    nama_produk: "",
    keterangan: "",
    jumlah: 0,
    harga: 0,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  if (alert) {
    setTimeout(() => {
      setAlert(false);
    }, 10000);
  }

  const handleAddCart = () => {
    if (keranjang === null) {
      setKeranjang(1);
    } else {
      setKeranjang(keranjang + 1);
    }
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setInput({ ...input, ...{ [id]: value } });
  };

  const handleEdit = (e, id) => {
    setInput(data[id]);
  };

  const handleDelete = (e, id) => {
    Axios.delete(`http://localhost:8080/api/arkademy/${id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(`http://localhost:8080/api/arkademy/${id}`);
          setAlert({
            type: "info",
            show: true,
            text: "Sukses Menghapus Data! (Auto Close 10s)",
          });
          setData(null);
        }
      })
      .catch(() => {
        setAlert({
          type: "danger",
          show: true,
          text: "Gagal Menghapus Data! (Auto Close 10s)",
        });
        setData(null);
      });
  };

  const handleSubmit = () => {
    if (input !== null) {
      if (input.id) {
        Axios.put("http://localhost:8080/api/arkademy/" + input.id, input)
          .then((res) => {
            if (res.status === 200) {
              setAlert({
                type: "success",
                show: true,
                text: "Sukses Mengupdate Data! (Auto Close 10s)",
              });
              setData(null);
              setShow(false);
            }
          })
          .catch(() => {
            setAlert({
              type: "danger",
              show: false,
              text: "Gagal Mengupdate Data! (Auto Close 10s)",
            });
          });
      } else {
        Axios.post("http://localhost:8080/api/arkademy/", input)
          .then((res) => {
            if (res.status === 200) {
              setAlert({
                type: "success",
                show: true,
                text: "Sukses Menambah Data! (Auto Close 10s)",
              });
              setData(null);
              setShow(false);
            }
          })
          .catch(() => {
            setAlert({
              type: "danger",
              show: false,
              text: "Gagal Menambah Data! (Auto Close 10s)",
            });
          });
      }
    }
  };

  useEffect(() => {
    if (data === null) {
      Axios.get("http://localhost:8080/api/arkademy/").then((res) => {
        setData(res.data);
      });
    }
  });

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal For Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nama_produk">
              <Form.Control
                type="text"
                placeholder="Nama Produk"
                onChange={handleInput}
                value={input.nama_produk}
              />
            </Form.Group>

            <Form.Group controlId="keterangan">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Keterangan"
                onChange={handleInput}
                value={input.keterangan}
              />
            </Form.Group>

            <Form.Group controlId="jumlah">
              <Form.Control
                type="number"
                placeholder="Jumlah Produk"
                onChange={handleInput}
                value={input.jumlah}
              />
            </Form.Group>

            <Form.Group controlId="harga">
              <Form.Control
                type="number"
                placeholder="Harga Produk"
                onChange={handleInput}
                value={input.harga}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Test Bootcamp Arkademy</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={handleShow}>Tambah Produk</Nav.Link>
        </Nav>
        <Form inline>
          <Button variant="primary">
            Keranjang {keranjang !== null && `(${keranjang})`}
          </Button>
        </Form>
      </Navbar>
      <Alert
        variant={alert.type}
        onClose={() => setAlert({ type: "success", show: false, text: "" })}
        show={alert.show}
      >
        {alert.text}
      </Alert>
      <div className="container" style={{ marginTop: "10px" }}>
        {data !== null &&
          data.map((item, i) => {
            return (
              <Card style={{ width: "18rem", margin: "10px 10px" }}>
                <Card.Img
                  variant="top"
                  src="https://cdn.business2community.com/wp-content/uploads/2013/09/best-press-release-example.jpg"
                />
                <Card.Body>
                  <Card.Title>{item.nama_produk}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Jumlah: {item.jumlah} | Harga : Rp. {item.harga}
                  </Card.Subtitle>
                  <Card.Text>{item.keterangan}</Card.Text>
                  <div className="produk">
                    <div className="kiri">
                      <Card.Link href="#">Beli Sekarang</Card.Link>
                      <br />
                      <Card.Link href="#" onClick={handleAddCart}>
                        (+) Keranjang
                      </Card.Link>
                    </div>
                    <div className="kanan">
                      <Card.Link
                        href="#"
                        onClick={(e) => {
                          handleEdit(e, i);
                          setShow(true);
                        }}
                      >
                        Edit Data
                      </Card.Link>
                      <br />
                      <Card.Link
                        href="#"
                        onClick={(e) => {
                          handleDelete(e, item.id);
                        }}
                      >
                        Delete Data
                      </Card.Link>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </>
  );
}

export default App;
