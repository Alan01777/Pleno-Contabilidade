import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { View, Image, StyleSheet, TouchableOpacity, Text, ActivityIndicator, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

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
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}

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
                onPress={() => console.log("perfil pressed")}
                icon={() => <Ionicons name="person" size={24} color="black" />}
            />
            <DrawerItem
                label="Solicitações"
                onPress={() => console.log("solicitações pressed")}
                icon={() => <Ionicons name="document-text" size={24} color="black" />}
            />
            <DrawerItem
                label="GED"
                onPress={() => console.log("ged pressed")}
                icon={() => <Ionicons name="folder" size={24} color="black" />}
            />
            <DrawerItem
                label="calendário"
                onPress={() => console.log("calendário pressed")}
                icon={() => <Ionicons name="calendar" size={24} color="black" />}
            />
            <DrawerItem
                label="Suporte"
                onPress={() => console.log("suporte pressed")}
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
            <Ionicons name="menu" size={30} color="black" />
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
            <Ionicons name="notifications" size={30} color="black" />
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
            backgroundColor: '#fff',
        },
        userAvatar: {
            width: '20%', // Percentage-based width
            aspectRatio: 1, // Maintain aspect ratio
            borderRadius: 50, // Make it circular
            marginBottom: '5%'
        },
        userDetails: {
            alignItems: 'center',
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
    });
};