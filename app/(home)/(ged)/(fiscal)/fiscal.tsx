import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { RFPercentage } from 'react-native-responsive-fontsize';
import FolderComponent from '@/components/ged/folder/folderComponent';

const menuItems = [
    { name: 'COFINS', route: '/(home)/(ged)/(fiscal)/(cofins)/cofins' },
    { name: 'PIS', route: '/(home)/(ged)/(fiscal)/(pis)/pis' },
    { name: 'SIMPLES', route: '/(home)/(ged)/(fiscal)/(simples_nacional)/simples_nacional' },
    { name: 'IRPJ', route: '/(home)/(ged)/(fiscal)/(irpj)/irpj' },
    { name: 'CSLL', route: '/(home)/(ged)/(fiscal)/(csll)/csll' },
    { name: 'ICMS', route: '/(home)/(ged)/(fiscal)/(icms)/icms' },
    { name: 'NOTAS FISCAIS', route: '/(home)/(ged)/(fiscal)/(notas_fiscais)/notas' },
];

export default function Fiscal() {
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