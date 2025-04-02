import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { flexDirection: "column", padding: 20 },
  section: { margin: 10, padding: 10, border: "1px solid black" },
  title: { fontSize: 20, textAlign: "center", marginBottom: 10 }
});

const PdfDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Mi Primer PDF en React</Text>
        <Text>¡Este es un documento generado en React con react-pdf!</Text>
      </View>
    </Page>
  </Document>
);

export default PdfDocument;