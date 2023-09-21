import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DataMotivasi = () => {
  let [motivasiData, setMotivasiData] = useState([]);
  useEffect(() => {
    fetch("http://www.vigenesia.org/api/Get_motivasi")
      .then((response) => response.json())
      .then((data) => {
        setMotivasiData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDeleteClick = (id) => {
    // Kirim permintaan DELETE ke API dengan ID motivasi
    fetch(`http://www.vigenesia.org/api/dev/DELETEmotivasi/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal menghapus data");
        }
        // Jika berhasil, hapus data dari state lokal
        setMotivasiData(motivasiData.filter((motivasi) => motivasi.id !== id));
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat menghapus data:", error);
      });
  };

  return (
    <div className="container-fluid">
      <h4 className="text-center mt-3">
        Get Data dari {""}
        <Link
          to="http://www.vigenesia.org/api/Get_motivasi"
          style={{
            textDecoration: "none",
            color: "#212529",
          }}
          target="blank"
        >
          Vigenesia
        </Link>
      </h4>
      <div className="container p-5">
        <table className="table table-striped mt-5">
          <thead>
            <tr>
              <th className="border">No</th>
              <th className="border">Motivasi</th>
              <th className="border">Id User</th>
              <th className="border">Tgl Input</th>
              <th className="border">Tgl Update</th>
              <th className="border">Aksi</th>{" "}
              {/* Tambah kolom untuk tombol delete */}
            </tr>
          </thead>
          <tbody>
            {motivasiData.map((motivasi, index) => (
              <tr key={motivasi.id}>
                <td className="border">{index + 1}</td>
                <td className="border">{motivasi.isi_motivasi}</td>
                <td className="border">{motivasi.iduser}</td>
                <td className="border">{motivasi.tanggal_input}</td>
                <td className="border">{motivasi.tanggal_update}</td>
                <td className="border">
                  <button
                    onClick={() => handleDeleteClick(motivasi.id)} // Panggil fungsi handleDeleteClick dengan ID motivasi sebagai argumen
                    className="btn btn-danger"
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
  );
};

export default DataMotivasi;
