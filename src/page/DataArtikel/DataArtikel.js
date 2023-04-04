import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Pagination from "../../component/Pagination";
import './style.css'
export default function DataArtikel() {

  const api = `http://89.116.228.164:5001/`;
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
        let res = await axios.get(api + 'cbn/v1/artikel/getAllArticle');
        setData(res.data);
        console.log(res.data);
    } catch (err) {
        console.log("err", err.response.status);
    }
};
useEffect(() => {
  getData();
}, []);



  return (
    <div className='container'>
      <div className='article-area'> 
        <div className="table-container">
        <table className="table">
      <thead>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
        </tr>
      </thead>
      <tbody>
        {data.map((artikel) => (
        <tr key={artikel._id}>
          <td>{artikel.judulArtikel}</td>
          <td>{artikel.isiArtikel}</td>
          <td>{artikel.kategori}</td>
        </tr>
      )  )}
      </tbody>
    </table>
    </div>
    </div>
    {/* <Pagination postPerPage={postsPerPage} totalPost={data.length} paginate={paginate} /> */}

    </div>
  )
}
