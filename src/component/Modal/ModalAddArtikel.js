import React, { useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from '../Loading'
import "./ModalAdd.css";
function ModalAddArtikel() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [file, setFile] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [kategori, setKategori] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");
  const api = `http://localhost:5001`;

  const navigate = useNavigate();
  const token = localStorage.getItem("user");
  const addArticle = async (e) => {
    e.preventDefault();


    if (!judul || !isi || !file || !kategori || !tag) {
      setError("Please fill all the required fields.");
      return;
    }
    let formData = new FormData();
    formData.append("judulArtikel", judul);
    formData.append("isiArtikel", isi);
    formData.append("kategori", kategori);
    formData.append("tag", tag);
    formData.append("image", file);


    try {
      // loading start
      setShowLoading(true);
      await axios
        .post(`${api}/cbn/v1/artikel/addOneArticle`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          },
        })
        
        setShowLoading(false);


      navigate("/dataartikel");
      window.location.reload();
    } catch (err) {
      console.log(err);
      setError("Failed to add the article. Please try again.");
      setShowLoading(false); 
    }
  };

  return (

    
    <>
   {showLoading && <Loading />}
      <Button variant="primary" onClick={handleShow}>
        Add Data{" "}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-input">
            <Form>
              <Row>
                <Col>
                  <Form.Control
                    placeholder="Judul Artikel"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="Tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Select
                    aria-label="Default select example"
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                  >
                    <option>Pilih kategori</option>
                    <option value="artikel">Artikel</option>
                    <option value="news">News</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row className="row-3">
                <Form.Control
                  as="textarea"
                  placeholder="Isi Artikel"
                  rows={5}
                  value={isi}
                    onChange={(e) => setIsi(e.target.value)}
                />
              </Row>
              <Row className="row-3">
                <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
              </Row>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addArticle} >Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalAddArtikel;
