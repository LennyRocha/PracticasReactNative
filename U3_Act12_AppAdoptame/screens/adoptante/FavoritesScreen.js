import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const FavoritesScreen = ({ navigation }) => {
  const { theme } = useTheme();
  

  const favorites = [
    {
      id: '1',
      name: 'Max',
      type: 'dog',
      breed: 'Golden Retriever',
      image: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_3004.jpg'
    },
    {
      id: '2',
      name: 'Luna',
      type: 'cat',
      breed: 'Siamés',
      image: 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg'
    }
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: theme.card }]}
      onPress={() => navigation.navigate('PetDetail', { pet: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={[styles.name, { color: theme.textColor }]}>{item.name}</Text>
        <Text style={[styles.breed, { color: theme.textColor }]}>{item.breed}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.textColor }]}>
            No tienes mascotas favoritas aún
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  breed: {
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default FavoritesScreen;