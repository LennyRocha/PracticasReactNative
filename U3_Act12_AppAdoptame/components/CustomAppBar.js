import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomAppBar = ({ title, isRoot, navigation }) => {
  const { theme } = useTheme();
  const nav = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: theme.headerBack }]}>
      {!isRoot && (
        <TouchableOpacity onPress={() => nav.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.buttonText} />
        </TouchableOpacity>
      )}
      <Text style={[styles.title, { color: theme.buttonText }]}>{title}</Text>
      {isRoot && (
        <TouchableOpacity onPress={() => nav.openDrawer()} style={styles.menuButton}>
          <Icon name="menu" size={24} color={theme.buttonText} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginLeft: -48, 
  },
  backButton: {
    marginRight: 16,
  },
  menuButton: {
    marginLeft: 'auto',
  },
});

export default CustomAppBar;