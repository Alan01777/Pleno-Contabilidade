import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Linking } from 'react-native';


const supportNumber = process.env.EXPO_PUBLIC_SUPPORT_NUMBER;
const fiscalNumber = process.env.EXPO_PUBLIC_FISCAL_NUMBER;
const pessoalNumber = process.env.EXPO_PUBLIC_PESSOAL_NUMBER;

// Sample Data for Support Contacts
const supportContacts = [
  { id: '1', title: 'Pleno Contabilidade - Suporte', hours: 'seg à sex, das 08:00 às 12:00 e das 14:00 às 17:00', number: supportNumber },
  { id: '2', title: 'Pleno Contabilidade - Fiscal', hours: 'seg à sex, das 08:00 às 12:00 e das 14:00 às 17:00', number: fiscalNumber },
  { id: '3', title: 'Pleno Contabilidade - Pessoal', hours: 'seg à sex, das 08:00 às 12:00 e das 14:00 às 17:00', number: pessoalNumber },
];

const SupportScreen = () => {

  return (
    <View style={styles.container}>
      <FlatList
        data={supportContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Image source={require('@/assets/images/icons/whatsapp.png')} style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.hours}>{item.hours}</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={() =>Linking.openURL(`https://wa.me/${item.number}`)}>
                <Text style={styles.buttonText}>Conversar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  hours: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SupportScreen;