import React, { useState } from "react";
import { View, Button, Alert } from "react-native";
import { shareAsync } from "expo-sharing";
import { printToFileAsync } from "expo-print";

const App = () => {
  const [pdfUri, setPdfUri] = useState(null);

  const generatePdf = async () => {
    try {
      const html = `
        <h1 style="text-align: center;">Mi Primer PDF en React Native</h1>
        <p>¡Este PDF fue generado en React Native con Expo!</p>
      `;

      const file = await printToFileAsync({ html, base64: false });
      setPdfUri(file.uri);
      Alert.alert("PDF generado", "¡El PDF ha sido creado con éxito!");
    } catch (error) {
      console.error("Error generando PDF:", error);
    }
  };

  const downloadPdf = async () => {
    if (!pdfUri) {
      Alert.alert("Error", "Primero genera el PDF");
      return;
    }

    await shareAsync(pdfUri);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Generar PDF" onPress={generatePdf} />
      <Button title="Descargar PDF" onPress={downloadPdf} disabled={!pdfUri} />
    </View>
  );
};

export default App;
