import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PetDetailScreen = ({ route, navigation }) => {
  const { pet } = route.params;
  const { theme } = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAdoption = () => {
    Alert.alert(
      'Adoptar Mascota',
      `¿Estás seguro que quieres adoptar a ${pet.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sí, adoptar', onPress: () => Alert.alert('Solicitud enviada', 'Nos pondremos en contacto contigo') },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image source={{ uri: pet.image }} style={styles.image} />
      
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: theme.textColor }]}>{pet.name}</Text>
        <Text style={[styles.detail, { color: theme.textColor }]}>
          <Text style={styles.label}>Tipo:</Text> {pet.type === 'dog' ? 'Perro' : 'Gato'}
        </Text>
        <Text style={[styles.detail, { color: theme.textColor }]}>
          <Text style={styles.label}>Raza:</Text> {pet.breed}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.adoptButton, { backgroundColor: theme.buttonBackground }]}
          onPress={handleAdoption}
        >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>Solicitar Adopción</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.favoriteButton, { backgroundColor: isFavorite ? theme.selections : theme.card }]}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Icon 
            name={isFavorite ? 'favorite' : 'favorite-border'} 
            size={24} 
            color={isFavorite ? '#000' : theme.textColor} 
          />
          <Text style={[styles.favoriteText, { color: isFavorite ? '#000' : theme.textColor }]}>
            {isFavorite ? 'En favoritos' : 'Añadir a favoritos'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
  },
  buttonsContainer: {
    marginTop: 20,
  },
  adoptButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  favoriteButton: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default PetDetailScreen;