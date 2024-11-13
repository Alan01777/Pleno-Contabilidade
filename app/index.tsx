import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, Image, useWindowDimensions, Pressable, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, Linking } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as SecureStore from 'expo-secure-store';
import { Link, router } from 'expo-router';

type FormData = { email: string; password: string; };

export default function Index() {
    const styles = sheet();
    const [hidePass, setHidePass] = useState(true);
    const { register, handleSubmit, setValue } = useForm();
    const [loading, setLoading] = useState(false);
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const supportNumber = process.env.EXPO_PUBLIC_SUPPORT_NUMBER;
    const [loadingToken, setLoadingToken] = useState(true);
    const [loginPressed, setLoginPressed] = useState(false);

    useEffect(() => {
        register('email');
        register('password');
    }, [register]);

    useEffect(() => {
        SecureStore.getItemAsync('token').then(async token => {
            if (token) {
                try {
                    const response = await fetch(`${apiUrl}/api/auth/user`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Session expired');
                    }

                    const keys = ['DAS_data', 'COFINS_data', 'PARCELAMENTO_data', 'ICMS_data', 'PIS_data', 'FGTS_data', 'FOLHAS_data', 'CONTRATOS_data'];
                    for (const key of keys) {
                        if (key !== 'token') {
                            await SecureStore.deleteItemAsync(key);
                        }
                    }
                    console.log(token);
                    router.replace('/(home)');
                } catch (error) {
                    await SecureStore.deleteItemAsync('token');
                    router.replace('/');
                }
            }
            setLoadingToken(false);
        });
    }, []);

    const handleLogin: SubmitHandler<FormData> = async (data) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            console.log(responseData);
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error(responseData.message || 'Incorrect data');
                } else {
                    throw new Error('Server error');
                }
            }

            await SecureStore.setItemAsync('token', responseData.accessToken);
            router.navigate('/(home)');
        } catch (error) {
            Alert.alert(
                "Error",
                (error as Error).message || "An error occurred. Please try again.",
                [{ text: "OK" }],
                { cancelable: false }
            );
        } finally {
            setLoading(false);
        }
    };

    if (loadingToken) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loadingText}>Carregando</Text>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <View style={styles.logoContainer}>
                            <Image source={require('@/assets/images/icon.png')} style={styles.logo} />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder='Email' style={styles.textInput} onChangeText={text => setValue('email', text)} />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder='Senha'
                                secureTextEntry={hidePass}
                                style={styles.textInput}
                                onChangeText={text => setValue('password', text)}
                            />
                            <Ionicons
                                name={hidePass ? 'eye-off' : 'eye'}
                                size={20}
                                color="black"
                                onPress={() => setHidePass(!hidePass)}
                                style={styles.icon}
                            />
                        </View>
                        <View style={styles.forgotPasswordContainer}>
                            <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
                        </View>
                        <Pressable
                            style={[styles.loginButton, loginPressed && styles.loginPressed]}
                            onPressIn={() => setLoginPressed(true)}
                            onPressOut={() => setLoginPressed(false)}
                            onPress={handleSubmit(handleLogin)}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#FFFFFF" />
                            ) : (
                                <Text style={styles.loginButtonText}>Login</Text>
                            )}
                        </Pressable>
                    </View>
                    <View style={styles.askAccountContainer}>
                        <Pressable onPress={() => Linking.openURL(`https://wa.me/${supportNumber}`)}>
                            <Text>
                                <Text style={styles.askAccount}>Não é cadastrado? </Text>
                                <Text style={styles.askAccountHighlight}>Solicite seu cadastro</Text>
                            </Text>
                        </Pressable>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const sheet = () => {
    const { height } = useWindowDimensions();
    return StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: '#F8F8F8',
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            width: '80%',
            alignSelf: 'center',
        },
        logoContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: -RFPercentage(10),
            marginBottom: RFPercentage(5),
        },
        logo: {
            width: RFPercentage(35),
            height: RFPercentage(20),
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            width: '100%',
            borderRadius: 10,
            padding: 10,
            backgroundColor: '#fff',
            marginBottom: RFPercentage(2),
        },
        textInput: {
            flex: 1,
            fontSize: RFValue(18, height),
            aspectRatio: 6 / 1,
        },
        icon: {
            marginLeft: 10,
        },
        forgotPasswordContainer: {
            width: '100%',
            alignItems: 'flex-end',
            marginBottom: RFPercentage(2),
        },
        forgotPasswordText: {
            color: '#06067A',
            fontSize: RFValue(14, height),
            textDecorationLine: 'underline',
        },
        loginButton: {
            backgroundColor: '#06067A',
            height: RFPercentage(7),
            width: '95%',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
        },
        loginButtonText: {
            color: '#fff',
            fontSize: RFValue(20, height),
            fontWeight: 'bold',
        },
        askAccountContainer: {
            position: 'absolute',
            bottom: RFPercentage(2),
            alignItems: 'center',
            width: '100%',
        },
        askAccount: {
            color: '#969696',
        },
        askAccountHighlight: {
            color: '#06067A',
        },
        loginPressed: {
            backgroundColor: '#5858c7',
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 52,
            backgroundColor: '#333',
        },
        loadingText: {
            marginTop: 10,
            fontSize: 20,
            color: 'white',
        },
    });
};