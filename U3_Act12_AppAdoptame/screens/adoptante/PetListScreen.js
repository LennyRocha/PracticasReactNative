import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { dogsApi, catsApi } from '../../config/api';

const PetListScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        // Obtener perros
        const dogsRes = await dogsApi.get('/breeds/image/random/10');
        const dogs = dogsRes.data.message.map((img, i) => ({
          id: `dog-${i}`,
          image: img,
          name: `Perro ${i+1}`,
          type: 'dog',
          breed: img.split('/')[4],
        }));

        // Obtener gatos
        const catsRes = await catsApi.get('/images/search?limit=10');
        const cats = catsRes.data.map((cat, i) => ({
          id: `cat-${i}`,
          image: cat.url,
          name: `Gato ${i+1}`,
          type: 'cat',
          breed: cat.breeds?.[0]?.name || 'Desconocido',
        }));

        setPets([...dogs, ...cats]);
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const filteredPets = filter === 'all' ? pets : pets.filter(pet => pet.type === filter);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.card }]}
      onPress={() => navigation.navigate('PetDetail', { pet: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={[styles.name, { color: theme.textColor }]}>{item.name}</Text>
      <Text style={[styles.breed, { color: theme.textColor }]}>{item.breed}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.filterContainer}>
        {['all', 'dog', 'cat'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterButton,
              filter === type && { backgroundColor: theme.selections }
            ]}
            onPress={() => setFilter(type)}
          >
            <Text style={{ color: filter === type ? '#000' : theme.textColor }}>
              {type === 'all' ? 'Todos' : type === 'dog' ? 'Perros' : 'Gatos'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredPets}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    borderRadius: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  breed: {
    fontSize: 14,
  },
});

export default PetListScreen;