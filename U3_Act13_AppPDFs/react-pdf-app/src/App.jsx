import React from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PdfDocument from "./PdfDocument";

const App = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Generar PDF en React</h1>
      <PDFDownloadLink document={<PdfDocument />} fileName="documento.pdf">
        {({ loading }) => (loading ? "Generando..." : "Descargar PDF")}
      </PDFDownloadLink>

      <h2>Vista Previa:</h2>
      <PDFViewer style={{ width: "100%", height: "500px" }}>
        <PdfDocument />
      </PDFViewer>
    </div>
  );
};

export default App;
