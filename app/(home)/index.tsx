import React, { useEffect, useState } from 'react';
import { Image, View, Text, ActivityIndicator, Pressable, useWindowDimensions, StyleSheet, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export default function Home() {
    const [user, setUser] = useState<any | undefined>(undefined);
    const styles = sheet();

    useEffect(() => {
        const fetchUser = async () => {
            const token = await SecureStore.getItemAsync('token');
            const apiUrl = process.env.EXPO_PUBLIC_API_URL;

            SecureStore.getItemAsync('token').then(token => {
            }).catch(error => {
                console.error('Error retrieving token:', error);
            });

            const userResponse = await fetch(`${apiUrl}/api/user`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const userData = await userResponse.json();
            setUser(userData);
        };

        fetchUser();
    }, []);

    if (!user) {
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const services = [
        { id: '1', icon: require('@/assets/images/icons/certidoes.png'), text: 'Certidões' },
        { id: '2', icon: require('@/assets/images/icons/faturamentos.png'), text: 'Faturamentos' },
        { id: '3', icon: require('@/assets/images/icons/documentacao.png'), text: 'Documentação' },
        { id: '4', icon: require('@/assets/images/icons/contrato.png'), text: 'Contratos' },
        { id: '5', icon: require('@/assets/images/icons/fgts.png'), text: 'FGTS' },
        { id: '6', icon: require('@/assets/images/icons/folhas.png'), text: 'Folhas' },
        { id: '7', icon: require('@/assets/images/icons/simples nacional.png'), text: 'Simples nacional' },
        { id: '8', icon: require('@/assets/images/icons/icms.png'), text: 'ICMS' },
        { id: '8', icon: require('@/assets/images/icons/pis cofins.png'), text: 'PIS/COFINS' },
        { id: '9', icon: require('@/assets/images/icons/irpj.png'), text: 'IRPJ' },
        { id: '10', icon: require('@/assets/images/icons/csll.png'), text: 'CSLL' },
        { id: '11', icon: require('@/assets/images/icons/solicitacao.png'), text: 'Solicitações' },
    ];

    return (
        <ScrollView>
            <SafeAreaProvider style={{ flex: 1, padding: 10, marginTop: RFPercentage(3) }}>
                <SafeAreaView>
                    <View style={styles.userCard}>
                        <View style={styles.userInfoContainer}>
                            <Image source={require('@/assets/images/icons/avatar.png')} style={styles.userAvatar} />
                            <Pressable style={styles.userDetails} onPress={() => console.log('ok')}>
                                <Text style={styles.cardInfo}>{user.nome_fantasia}</Text>
                                <Text style={styles.cardInfo}>{user.cnpj}</Text>
                                <Text style={styles.cardInfo}>ME</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.categoriesContainer}>
                        <Text style={styles.containerTitle}>
                            Categorias
                        </Text>
                        <View style={styles.buttonRow}>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.button,
                                    { opacity: pressed ? 0.5 : 1 }
                                ]}
                            >
                                <Image source={require('@/assets/images/icons/departamento_pessoal.png')} style={styles.buttonIcon} />
                                <Text style={styles.buttonText}>Pessoal</Text>
                            </Pressable>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.button,
                                    { opacity: pressed ? 0.5 : 1 }
                                ]}
                            >
                                <Image source={require('@/assets/images/icons/ged.png')} style={styles.buttonIcon} />
                                <Text style={styles.buttonText}>GED</Text>
                            </Pressable>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.button,
                                    { opacity: pressed ? 0.5 : 1 }
                                ]}
                            >
                                <Image source={require('@/assets/images/icons/departamento_fiscal.png')} style={styles.buttonIcon} />
                                <Text style={styles.buttonText}>Fiscal</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.allServicesContainer}>
                        <Text style={styles.containerTitle}>
                            Todos os serviços
                        </Text>
                        <FlatList
                            data={services}
                            renderItem={({ item }) => (
                                <Pressable
                                    style={({ pressed }) => [
                                        styles.button,
                                        { opacity: pressed ? 0.5 : 1 }
                                    ]}
                                >
                                    <Image source={item.icon} style={styles.buttonIcon} />
                                    <Text style={styles.buttonText}>{item.text}</Text>
                                </Pressable>
                            )}
                            horizontal={false}
                            scrollEnabled={false}
                            nestedScrollEnabled={false}
                            keyExtractor={item => item.id}
                            numColumns={3}
                            columnWrapperStyle={styles.buttonRow}
                        />
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </ScrollView>
    );
};

const sheet = () => {
    const { height } = useWindowDimensions();
    return StyleSheet.create({
        userCard: {
            padding: 10,
            paddingBottom: 25, // Add padding to the bottom
            backgroundColor: '#fff',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        userInfoContainer: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        userAvatar: {
            width: '20%', // Percentage-based width
            aspectRatio: 1, // Maintain aspect ratio
            borderRadius: 50, // Make it circular
            marginRight: RFPercentage(1.5)
        },
        userDetails: {
            justifyContent: 'center'
        },
        cardInfo: {
            fontSize: RFPercentage(2)
        },
        categoriesContainer: {
            marginTop: RFPercentage(3),
            padding: 10,
            paddingBottom: 25, // Add padding to the bottom
            backgroundColor: '#fff',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        containerTitle: {
            fontSize: RFPercentage(1.8),
            fontWeight: 'bold',
            marginLeft: RFPercentage(1)
        },
        buttonRow: {
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            flex: 1,
        },
        buttonIcon: {
            width: 50,
            height: 50,
            marginBottom: 5,
        },
        buttonText: {
            textAlign: 'center',
            fontSize: RFPercentage(2),
            fontWeight: 'bold'
        },
        allServicesContainer: {
            marginTop: RFPercentage(3),
            padding: 10,
            paddingBottom: 25, // Add padding to the bottom
            backgroundColor: '#fff',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        }
    });
}