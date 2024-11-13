import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Linking, SafeAreaView } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { SafeAreaProvider } from 'react-native-safe-area-context';


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
    <SafeAreaProvider style={{ flex: 1, padding: RFPercentage(1), marginTop: RFPercentage(3) }}>
      <SafeAreaView>
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
                  <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(`https://wa.me/${item.number}`)}>
                    <Text style={styles.buttonText}>Conversar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: RFPercentage(1),
    paddingBottom: RFPercentage(2.5),
    backgroundColor: '#fff',
    borderRadius: RFPercentage(1.25),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: RFPercentage(0.25) },
    shadowOpacity: 0.25,
    shadowRadius: RFPercentage(0.48),
    elevation: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Align items to the start
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: RFPercentage(1.5),
    padding: RFPercentage(2),
    marginVertical: RFPercentage(1),
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: RFPercentage(5),
    height: RFPercentage(5),
    marginRight: RFPercentage(1.5),
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: RFPercentage(2),
    fontWeight: '600',
    color: '#333',
    marginBottom: RFPercentage(0.5),
  },
  hours: {
    fontSize: RFPercentage(1.75),
    color: '#555',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: RFPercentage(1),
    paddingHorizontal: RFPercentage(2),
    borderRadius: RFPercentage(1),
  },
  buttonText: {
    color: '#fff',
    fontSize: RFPercentage(1.75),
    fontWeight: '600',
  },
});

export default styles;

export default SupportScreen;