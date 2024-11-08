import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import FolderComponent from '@/components/ged/folder/folderComponent';

const menuItems = [
    { name: 'SIMPLES NACIONAL', route: '/(home)/(ged)/(fiscal)/(simples_nacional)/simples_nacional' },
    { name: 'PARCELAMENTO', route: '/(home)/(ged)/(fiscal)/(simples_nacional)/(parcelamento)/parcelamento' },
];

export default function Das() {
    const styles = sheet();

    return (
        <ScrollView>
            <SafeAreaProvider style={{ flex: 1, padding: 10, marginTop: RFPercentage(3) }}>
                <SafeAreaView>
                    <View style={styles.container}>
                        {menuItems.map((item, index) => (
                            <View key={index} style={styles.item}>
                                <FolderComponent title={item.name} path={item.route} />
                            </View>
                        ))}
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </ScrollView>
    );
}

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
    });
};