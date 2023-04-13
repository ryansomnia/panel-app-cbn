import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ModalAddArtikel from "../../component/Modal/ModalAddArtikel";
import Swal from "sweetalert2";
import "./style.css";
export default function DataArtikel() {
  const api = `http://localhost:5001/`;
  const [data, setData] = useState([]);
  // const [dataOne, setDataOne] = useState([]);

  const getData = useCallback(async () => {
    try {
      const token = localStorage.getItem("user"); // get JWT token from localStorage
      let res = await axios.get(api + "cbn/v1/artikel/getAllArticle", {
        headers: { Authorization: `Bearer ${token}` }, // add Authorization header with token
      });
      setData(res.data.data);
    } catch (err) {
      console.log("err", err.response.status);
    }
  }, [api]);

  const handleDelete =  (id) => {
    console.log(id);
    try {
      const token = localStorage.getItem("user"); // get JWT token from localStorage
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Data yang dihapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus data!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(api + "cbn/v1/artikel/deleteOneArticle",{ id: id },
              {
                headers: { Authorization: `Bearer ${token}` }, // add Authorization header with token
              }
            )
            .then(() => {
              Swal.fire("Terhapus!", "Data sudah berhasil dihapus.", "success");
              getData();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    } catch (err) {
      console.log("err", err.response.status);
    }
  };
  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="container">
      <div className="section-1">
        <div className="title">
          <h1>Data Artikel</h1>
        </div>
        <div className="search-add">
          <div className="search">
            <input placeholder="Cari Judul ..."></input>
            <button>Cari</button>
          </div>
          <div className="add">
            <ModalAddArtikel />
          </div>
        </div>
        <div className="article-area">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Isi</th>
                  <th>Type</th>
                  <th>Waktu Pembuatan</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((artikel) => (
                  <tr key={artikel._id}>
                    <td>{artikel.judulArtikel}</td>
                    <td className="isi">
                      {
                        // const shortText = text.slice(0, 20) + "..."
                        artikel.isiArtikel.slice(0, 100) + "..."
                      }
                    </td>
                    <td>{artikel.kategori}</td>
                    <td>{artikel.waktuPembuatan}</td>
                    <td>
                      <img className="image" src={artikel.url} alt="img"></img>
                    </td>
                    <td className="action">
                      <button className="edit">Edit</button>
                      <button
                        className="hapus"
                        onClick={() => handleDelete(artikel._id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* <Pagination postPerPage={postsPerPage} totalPost={data.length} paginate={paginate} /> */}
      </div>
    </div>
  );
}
