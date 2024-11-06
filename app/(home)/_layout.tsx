import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { View, Image, StyleSheet, TouchableOpacity, Text, ActivityIndicator, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

export default function Layout() {
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

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer drawerContent={(props) => <CustomDrawerContent {...props} user={user} />}>
                <Drawer.Screen
                    name="index" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Home',
                        title: '',
                        headerLeft: () => <NavigationIcon />,
                        headerTitle: () => <Logo />,
                        headerRight: () => <NotificationIcon />,
                        headerTitleAlign: 'center', // Ensure the title is centered
                        headerShown: true,
                        headerStyle: {
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 10,
                        },
                    }}
                />
                <Drawer.Screen
                    name="(user)/index" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Usuário',
                        title: 'USUÁRIO',
                        headerLeft: () => <GoBackButton />,
                        headerTitleAlign: 'center', // Ensure the title is centered
                        headerStyle: {
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 10,
                        },
                    }}
                />
                <Drawer.Screen
                    name="(user)/(perfil)/index" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Perfil',
                        title: 'MEUS DADOS',
                        headerLeft: () => <GoBackButton />,
                        headerTitleAlign: 'center', // Ensure the title is centered
                        headerStyle: {
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 10,
                        },
                    }}
                />
                <Drawer.Screen
                    name="(solicitacoes)/index" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Solicitacoes',
                        title: 'SOLICITAÇÕES',
                        headerLeft: () => <GoBackButton />,
                        headerTitleAlign: 'center', // Ensure the title is centered
                        headerStyle: {
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 10,
                        },
                    }}
                />
                <Drawer.Screen
                    name="(ged)/index" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Ged',
                        title: 'GED',
                        headerLeft: () => <GoBackButton />,
                        headerTitleAlign: 'center', // Ensure the title is centered
                        headerStyle: {
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 10,
                        },
                    }}
                />
                <Drawer.Screen
                    name="(calendario)/index" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Calendario',
                        title: 'CALENDÁRIO',
                        headerLeft: () => <GoBackButton />,
                        headerTitleAlign: 'center', // Ensure the title is centered
                        headerStyle: {
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 10,
                        },
                    }}
                />
                <Drawer.Screen
                    name="(suporte)/index" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Suporte',
                        title: 'SUPORTE',
                        headerLeft: () => <GoBackButton />,
                        headerTitleAlign: 'center', // Ensure the title is centered
                        headerStyle: {
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 10,
                        },
                    }}
                />
                <Drawer.Screen
                    name="(categorias)/(fiscal)/index" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Fiscal',
                        title: 'FISCAL',
                        headerLeft: () => <GoBackButton />,
                        headerTitleAlign: 'center', // Ensure the title is centered
                        headerStyle: {
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 10,
                        },
                    }}
                />
                <Drawer.Screen
                    name="(categorias)/(pessoal)/index" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Pessoal',
                        title: 'PESSOAL',
                        headerLeft: () => <GoBackButton />,
                        headerTitleAlign: 'center', // Ensure the title is centered
                        headerStyle: {
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 10,
                        },
                    }}
                />
                <Drawer.Screen
                    name="(categorias)/(geral)/index" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Geral',
                        title: 'GERAL',
                        headerLeft: () => <GoBackButton />,
                        headerTitleAlign: 'center', // Ensure the title is centered
                        headerStyle: {
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 10,
                        },
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}

const GoBackButton = () => {
    const navigation = useNavigation();
    const styles = sheet();

    return (
        <TouchableOpacity style={styles.goBackButtonContainer} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
    );
};

const CustomDrawerContent = (props) => {
    const { user } = props;
    const styles = sheet();

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerHeader}>
                <Image source={require('@/assets/images/icons/avatar.png')} style={styles.userAvatar} />
                {user ? (
                    <View style={styles.userDetails}>
                        <Text style={styles.userName}>{user.nome_fantasia}</Text>
                        <Text style={styles.userEmail}>{user.cnpj}</Text>
                    </View>
                ) : (
                    <ActivityIndicator size="small" color="#0000ff" />
                )}
            </View>
            <DrawerItem
                label="Home"
                onPress={() => props.navigation.navigate('index')}
                icon={() => <Ionicons name="home" size={24} color="black" />}
            />
            <DrawerItem
                label="Perfil"
                onPress={() => props.navigation.navigate('(user)/index')}
                icon={() => <Ionicons name="person" size={24} color="black" />}
            />
            <DrawerItem
                label="Solicitações"
                onPress={() => props.navigation.navigate('(solicitacoes)/index')}
                icon={() => <Ionicons name="document-text" size={24} color="black" />}
            />
            <DrawerItem
                label="GED"
                onPress={() => props.navigation.navigate('(ged)/index')}
                icon={() => <Ionicons name="folder" size={24} color="black" />}
            />
            <DrawerItem
                label="calendário"
                onPress={() => props.navigation.navigate('(calendario)/index')}
                icon={() => <Ionicons name="calendar" size={24} color="black" />}
            />
            <DrawerItem
                label="Suporte"
                onPress={() => props.navigation.navigate('(suporte)/index')}
                icon={() => <Ionicons name="headset" size={24} color="black" />}
            />
        </DrawerContentScrollView>
    );
};

const NavigationIcon = () => {
    const navigation = useNavigation();
    const styles = sheet();

    return (
        <TouchableOpacity style={styles.navigationIconContainer} onPress={() => navigation.openDrawer()}>
            <Image source={require('@/assets/images/icons/menu.png')} style={styles.navigationIcon} />
        </TouchableOpacity>
    );
};

const Logo = () => {
    const styles = sheet();
    return (
        <View style={styles.logoContainer}>
            <Image
                source={require('@/assets/images/icon.png')} // Replace with your logo path
                style={styles.logo}
            />
        </View>
    );
};

const NotificationIcon = () => {
    const styles = sheet();
    return (
        <TouchableOpacity style={styles.notificationIconContainer}>
            <Image source={require('@/assets/images/icons/notifications.png')} style={styles.navigationIcon} />
        </TouchableOpacity>
    );
};

const sheet = () => {
    const { height } = useWindowDimensions();
    return StyleSheet.create({
        navigationIconContainer: {
            marginLeft: 10,
        },
        logoContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: 0,
            right: 0,
        },
        logo: {
            width: RFPercentage(3), // Adjust the width as needed
            aspectRatio: 1 / 4, // Adjust the height as needed
            resizeMode: 'contain', // Ensure the logo maintains its aspect ratio
        },
        notificationIconContainer: {
            marginRight: 10,
        },
        drawerHeader: {
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#F5F5F5',
        },
        userAvatar: {
            width: RFPercentage(12), // Adjust the width to a fixed size
            height: RFPercentage(12), // Adjust the height to a fixed size
            borderRadius: 50,
            marginRight: RFPercentage(1.5),
            resizeMode: 'cover' // Ensure the image covers the area
        },
        userDetails: {
            alignItems: 'center',
        },
        goBackButtonContainer: {
            marginLeft: 10,
        },
        userName: {
            fontSize: RFPercentage(2.5),
            fontWeight: 'bold',
            marginBottom: 5,
        },
        userEmail: {
            fontSize: RFPercentage(2),
            color: 'gray',
        },
        navigationIcon: {
            width: RFPercentage(4),
            height: RFPercentage(4)
        }
    });
};