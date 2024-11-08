import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FileComponent from '@/components/ged/file/fileComponent';
import * as SecureStore from 'expo-secure-store';
import { RFPercentage } from 'react-native-responsive-fontsize';

const documentacao = () => {
    const path = 'contabilidade/documentacao';
    const styles = sheet();
    const [fileData, setFileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const fetchData = async (refreshing = false) => {
        setIsLoading(true);
        if (refreshing) {
            setIsRefreshing(true);
        }

        try {
            const token = await SecureStore.getItemAsync('token');
            const userDataJson = await SecureStore.getItemAsync('user_data');

            if (!token || !userDataJson) {
                throw new Error('Token or user data not found');
            }

            const userData = JSON.parse(userDataJson);
            const userRazaoSocial = userData.razao_social;

            const fileResponse = await fetch(`${apiUrl}/api/files/${userRazaoSocial}/${path}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!fileResponse.ok) {
                throw new Error(`HTTP error! status: ${fileResponse.status}`);
            }

            const fileData = await fileResponse.json();
            setFileData(fileData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
            if (refreshing) {
                setIsRefreshing(false);
            }
        }
    };

    useEffect(() => {
        fetchData().catch(error => {
            console.error(error);
            setIsLoading(false);
        });
    }, []);

    return (
        <ScrollView refreshControl={
            <RefreshControl
                refreshing={isRefreshing}
                onRefresh={() => fetchData(true)}
            />
        }
        >
            <SafeAreaProvider style={{ flex: 1, padding: 10, marginTop: RFPercentage(3) }}>
                <SafeAreaView>

                    <View style={styles.container}>
                        {isLoading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>
                        ) : fileData && fileData.length > 0 ? (
                            <View style={styles.gridContainer}>
                                {fileData.map((file, index) => (
                                    <View key={index} style={styles.gridItem}>
                                        <FileComponent title={file.name} path={file.path} />
                                    </View>
                                ))}
                            </View>
                        ) : (
                            <View style={styles.noFileContainer}>
                                <Text style={styles.noFileText}>Nenhum arquivo encontrado</Text>
                            </View>
                        )}
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </ScrollView>
    );
};

const sheet = () => {
    const { width } = useWindowDimensions();
    const itemWidth = (width - 40) / 3;
    return StyleSheet.create({
        container: {
            padding: 10,
            paddingBottom: 25,
            backgroundColor: '#fff',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start', // Align items to the start
        },
        item: {
            width: itemWidth,
            marginBottom: 10,
        },
        gridContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            padding: 10,
        },
        gridItem: {
            width: '48%',
            marginBottom: 10,
        },
        noFileContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },
        noFileText: {
            fontSize: 18,
            color: 'gray',
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        },
    });
};

export default documentacao;