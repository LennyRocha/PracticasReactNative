import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AdminPetEditScreen = ({ route, navigation }) => {
  const { pet } = route.params || {};
  const { theme } = useTheme();
  
  const [form, setForm] = useState({
    name: pet?.name || '',
    breed: pet?.breed || '',
    type: pet?.type || 'dog',
    image: pet?.image || '',
  });

  const handleSave = () => {
    if (!form.name || !form.breed) {
      Alert.alert('Error', 'Nombre y raza son obligatorios');
      return;
    }

    Alert.alert(
      'Guardar Cambios',
      pet ? '¿Actualizar mascota?' : '¿Crear nueva mascota?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Guardar', 
          onPress: () => {
            Alert.alert('Éxito', pet ? 'Mascota actualizada' : 'Mascota creada');
            navigation.goBack();
          }
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            form.type === 'dog' && { backgroundColor: theme.selections },
            { borderColor: theme.textColor }
          ]}
          onPress={() => setForm({...form, type: 'dog'})}
        >
          <Icon name="pets" size={20} color={form.type === 'dog' ? '#000' : theme.textColor} />
          <Text style={{ color: form.type === 'dog' ? '#000' : theme.textColor, marginLeft: 5 }}>
            Perro
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.typeButton,
            form.type === 'cat' && { backgroundColor: theme.selections },
            { borderColor: theme.textColor }
          ]}
          onPress={() => setForm({...form, type: 'cat'})}
        >
          <Icon name="pets" size={20} color={form.type === 'cat' ? '#000' : theme.textColor} />
          <Text style={{ color: form.type === 'cat' ? '#000' : theme.textColor, marginLeft: 5 }}>
            Gato
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.label, { color: theme.textColor }]}>Nombre:</Text>
      <TextInput
        style={[styles.input, { backgroundColor: theme.card, color: theme.textColor }]}
        value={form.name}
        onChangeText={(text) => setForm({...form, name: text})}
        placeholderTextColor={theme.textColor}
      />

      <Text style={[styles.label, { color: theme.textColor }]}>Raza:</Text>
      <TextInput
        style={[styles.input, { backgroundColor: theme.card, color: theme.textColor }]}
        value={form.breed}
        onChangeText={(text) => setForm({...form, breed: text})}
        placeholderTextColor={theme.textColor}
      />

      <Text style={[styles.label, { color: theme.textColor }]}>URL de la imagen:</Text>
      <TextInput
        style={[styles.input, { backgroundColor: theme.card, color: theme.textColor }]}
        value={form.image}
        onChangeText={(text) => setForm({...form, image: text})}
        placeholderTextColor={theme.textColor}
        keyboardType="url"
      />

      {form.image && (
        <Image 
          source={{ uri: form.image }} 
          style={styles.previewImage} 
          resizeMode="cover"
        />
      )}

      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: theme.buttonBackground }]}
        onPress={handleSave}
      >
        <Text style={[styles.saveButtonText, { color: theme.buttonText }]}>
          {pet ? 'Actualizar Mascota' : 'Crear Mascota'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 15,
  },
  saveButton: {
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminPetEditScreen;