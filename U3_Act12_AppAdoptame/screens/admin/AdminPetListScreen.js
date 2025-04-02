import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { dogsApi, catsApi } from '../../config/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AdminPetListScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      // Simulando datos para admin
      const dogsRes = await dogsApi.get('/breeds/image/random/5');
      const dogs = dogsRes.data.message.map((img, i) => ({
        id: `dog-${i}`,
        image: img,
        name: `Perro ${i+1}`,
        type: 'dog',
        breed: img.split('/')[4],
      }));

      const catsRes = await catsApi.get('/images/search?limit=5');
      const cats = catsRes.data.map((cat, i) => ({
        id: `cat-${i}`,
        image: cat.url,
        name: `Gato ${i+1}`,
        type: 'cat',
        breed: cat.breeds?.[0]?.name || 'Desconocido',
      }));

      setPets([...dogs, ...cats]);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las mascotas');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Eliminar Mascota',
      '¿Estás seguro de eliminar esta mascota?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          onPress: () => {
            setPets(pets.filter(pet => pet.id !== id));
            Alert.alert('Éxito', 'Mascota eliminada');
          }
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item, { backgroundColor: theme.card }]}>
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: theme.textColor }]}>{item.name}</Text>
        <Text style={[styles.breed, { color: theme.textColor }]}>
          {item.type === 'dog' ? 'Perro' : 'Gato'} - {item.breed}
        </Text>
      </View>
      
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.selections }]}
          onPress={() => navigation.navigate('AdminPetEdit', { pet: item })}
        >
          <Icon name="edit" size={20} color="#000" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#ff4444' }]}
          onPress={() => handleDelete(item.id)}
        >
          <Icon name="delete" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.buttonBackground }]}
        onPress={() => navigation.navigate('AdminPetEdit', { pet: null })}
      >
        <Text style={[styles.addButtonText, { color: theme.buttonText }]}>
          Añadir Nueva Mascota
        </Text>
      </TouchableOpacity>
      
      <FlatList
        data={pets}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshing={loading}
        onRefresh={fetchPets}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  addButton: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  breed: {
    fontSize: 14,
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default AdminPetListScreen;