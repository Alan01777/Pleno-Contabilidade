import React, { useEffect, useState } from 'react';
import { Image, View, Text, ActivityIndicator, Pressable, useWindowDimensions, StyleSheet, ScrollView, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function User() {
    const [user, setUser] = useState<any | undefined>(undefined);
    const { height } = useWindowDimensions();
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

    const handleLogout = async () => {
        try {
            router.replace('/');
            await SecureStore.deleteItemAsync('token');
        } catch (error) {
            Alert.alert(
                "Error",
                "Failed to log out. Please try again.",
                [{ text: "OK" }],
                { cancelable: false }
            );
        }
    };

    if (!user) {
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const abbreviateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <ScrollView>
            <SafeAreaProvider style={{ flex: 1, padding: RFPercentage(1), marginTop: RFPercentage(3) }}>
                <SafeAreaView>
                    <View style={styles.userCard}>
                        <View style={styles.userInfoContainer}>
                            <Image source={require('@/assets/images/icons/avatar.png')} style={styles.userAvatar} />
                            <View style={styles.userDetails}>
                                <Text style={styles.cardInfo}>{user.nome_fantasia}</Text>
                                <Text style={styles.cardInfo}>{user.cnpj}</Text>
                                <Text numberOfLines={1} style={styles.cardInfo}>
                                    {abbreviateText(user.endereco, 27)}
                                </Text>
                                <Text style={styles.cardInfo}>ME</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Pressable style={styles.navigationButton} onPress={() => router.navigate('/(home)/(user)/(perfil)')}>
                            <Text style={styles.label}>MEUS DADOS</Text>
                            <Ionicons name='person' size={40} color='black' />
                        </Pressable>
                    </View>

                    <View>
                        <Pressable style={styles.navigationButton} onPress={() => router.navigate('/(home)/(user)/(notificacoes)/notificacoes')}>
                            <Text style={styles.label}>NOTIFICAÇÕES</Text>
                            <Image source={require('@/assets/images/icons/notifications.png')} style={styles.navigationIcon} />
                        </Pressable>
                    </View>

                    <View>
                        <Pressable style={styles.navigationButton} onPress={(handleLogout)}>
                            <Text style={styles.label}>LOGOUT</Text>
                            <Ionicons name='log-out' size={40} color='black' />
                        </Pressable>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </ScrollView>
    );
}

const sheet = () => {
    const { height } = useWindowDimensions();
    return StyleSheet.create({
        userCard: {
            padding: RFPercentage(1),
            paddingBottom: RFPercentage(2.5),
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
            justifyContent: 'center',
        },
        cardInfo: {
            fontSize: RFPercentage(2),
            marginBottom: RFPercentage(0.4)
        },
        navigationButton: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: RFPercentage(1),
            paddingTop: RFPercentage(3),
            paddingBottom: RFPercentage(3),
            marginTop: RFPercentage(3),
            backgroundColor: '#fff',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        logoutButton: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: RFPercentage(1),
            paddingTop: RFPercentage(3),
            paddingBottom: RFPercentage(3),
            marginTop: RFPercentage(3),
            backgroundColor: '#fff', // Red color for logout button
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        label: {
            fontSize: RFPercentage(2.5),
            fontWeight: 'bold',
            flex: 1,
            marginLeft: RFPercentage(2)
        },
        navigationIcon: {
            width: RFPercentage(4),
            height: RFPercentage(4)
        }
    });
}