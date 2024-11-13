import React, { useEffect, useState } from 'react';
import { Image, View, Text, ActivityIndicator, Pressable, useWindowDimensions, StyleSheet, FlatList, Touchable, TouchableOpacity, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';


export default function perfil() {
    const [user, setUser] = useState<any | undefined>(undefined);
    const styles = sheet();
    const [isLoading, setIsLoading] = useState(false);


    const [form, setForm] = useState({
        razao_social: '',
        nome_fantasia: '',
        cnpj: '',
        email: '',
        telefone: '',
        password: '',
    });

    useEffect(() => {
        const fetchUser = async () => {
            const token = await SecureStore.getItemAsync('token');
            const apiUrl = process.env.EXPO_PUBLIC_API_URL;

            try {
                const userResponse = await fetch(`${apiUrl}/api/user`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const userData = await userResponse.json();
                setUser(userData);
            } catch (error) {
                console.error('Error retrieving user data:', error);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (user) {
            setForm({
                razao_social: user.razao_social || '',
                nome_fantasia: user.nome_fantasia || '',
                cnpj: user.cnpj || '',
                email: user.email || '',
                telefone: user.telefone || '',
                password: '',
            });
        }
    }, [user]);

    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const handleUpdate = async () => {
        setIsLoading(true);
        const token = await SecureStore.getItemAsync('token');
        const apiUrl = process.env.EXPO_PUBLIC_API_URL;
        try {
            const response = await fetch(`${apiUrl}/api/user/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                Alert.alert('Success', 'Data updated successfully!');
            } else {
                const errorData = await response.json();
                let errorMessage = 'Failed to update data.';

                if (typeof errorData === 'object' && errorData !== null) {
                    errorMessage = Object.values(errorData)
                        .flat()
                        .join('\n');
                } else if (typeof errorData.message === 'string') {
                    errorMessage = errorData.message;
                }

                Alert.alert('Error', errorMessage);
                console.log('Error ---', errorMessage);
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred. Please try again.');
            console.error('Update error:', error);
        } finally {
            setIsLoading(false);
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

    const renderInput = (label, value, onChange, isPassword = false) => (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={isPassword}
                />
                <TouchableOpacity>
                    <Ionicons name="pencil" size={20} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );

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

                    <View style={styles.container}>
                        <Text style={styles.title}>Para editar os seus dados, toque no item de sua escolha</Text>
                        {renderInput('Razão Social', form.razao_social, (text) => handleChange('razaoSocial', text))}
                        {renderInput('Nome Fantasia', form.nome_fantasia, (text) => handleChange('nomeFantasia', text))}
                        {renderInput('CNPJ', form.cnpj, (text) => handleChange('cnpj', text))}
                        {renderInput('Email', form.email, (text) => handleChange('email', text))}
                        {renderInput('Telefone', form.telefone, (text) => handleChange('telefone', text))}
                        {renderInput('Senha', form.password, (text) => handleChange('password', text), true)}
                        <View style={styles.updateButtonContainer}>
                            {isLoading ? (
                                <ActivityIndicator size="large" color="#007BFF" />
                            ) : (
                                <Pressable style={styles.updateButton} onPress={handleUpdate}>
                                    <Text style={styles.updateButtonText}>Update</Text>
                                </Pressable>
                            )}
                        </View>
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
            paddingBottom: RFPercentage(2.5), // Add padding to the bottom
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
            marginBottom: RFPercentage(0.4)
        },
        cardInfo: {
            fontSize: RFPercentage(2)
        },
        container: {
            marginTop: RFPercentage(3),
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            padding: 20,
            backgroundColor: '#fff',
            flex: 1,

        },
        title: {
            fontSize: RFPercentage(2),
            marginBottom: RFPercentage(5),
            textAlign: 'center',
            color: '#666',
        },
        inputContainer: {
            marginBottom: 15,
        },
        label: {
            fontSize: 12,
            color: '#666',
            marginBottom: 5,
        },
        inputWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: '#ccc',
            paddingBottom: 5,
        },
        input: {
            flex: 1,
            fontSize: 14,
            color: '#000',
        },
        updateButtonContainer: {
            alignItems: 'center',
            marginTop: 20,
        },
        updateButton: {
            backgroundColor: '#06067A',
            height: RFPercentage(7),
            width: '95%',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
        },
        updateButtonText: {
            color: '#fff',
            fontSize: RFValue(20, height),
            fontWeight: 'bold',
        },
    });
}