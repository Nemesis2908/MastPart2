import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  home: undefined;
  Mainmenu: undefined;
  addmeal: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Mainmenu'>;

const handleLinkPress = async (url: string, errorMessage: string) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert('Error', errorMessage);
  }
};

const Mainmenu = ({ navigation }: { navigation: any }) => {
  const initialMenuItems = [
    { id: '1', name: 'Margherita Pizza', description: 'Fresh mozzarella, tomatoes, and basil.', course: "Main Dish", price: 'R200' },
    { id: '2', name: 'Classic Burger', description: 'Beef patty with lettuce, tomato, and our special sauce.', course: "Main Dish", price: 'R100' },
  ];

  const [menuItems, setMenuItems] = useState(initialMenuItems);

  const handleAddMeal = (newMeal: { name: string; description: string; course: string; price: string; }) => {
    setMenuItems(prevItems => [
      ...prevItems,
      {
        id: String(prevItems.length + 1), // Simple ID generation
        ...newMeal,
      },
    ]);
  };

  return (
    <ImageBackground
      source={require('../assets/simple-shape-background.jpg')}
      style={styles.backgroundImage}
      resizeMode="stretch">
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Menu</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('addmeal', { onAddMeal: handleAddMeal })}>
            <Text style={styles.addButtonText}>Add Meal</Text>
          </TouchableOpacity>
        </View>
        {menuItems.map((item) => (
          <View key={item.id} style={styles.menuItem}>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemDescription}>{item.course}</Text>
            </View>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#f15e09ff',
    textAlign: 'center',
  },
  menuItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 20,
    fontWeight: '600',
  },
  itemDescription: {
    fontSize: 20,
    color: '#000000ff',
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000ff',
    marginLeft: 10,
  },
  addButton: {
    position: 'absolute',
    right: 15,
    backgroundColor: '#f15e09ff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Mainmenu;