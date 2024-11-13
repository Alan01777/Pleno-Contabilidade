import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import FolderComponent from '@/components/ged/folder/folderComponent';

const menuItems = [
    { name: 'FISCAL', route: '/(home)/(ged)/(fiscal)/fiscal' },
    { name: 'PESSOAL', route: '/(home)/(ged)/(pessoal)/pessoal' },
    { name: 'CONTABIL', route: '/(home)/(ged)/(contabilidade)/contabilidade' },
];

export default function Ged() {
    const [items, setItems] = useState([]);
    const [user, setUser] = useState<any | undefined>(undefined);
    const styles = sheet();
    const navigation = useNavigation();

    return (
        <ScrollView>
            <SafeAreaProvider style={{ flex: 1, padding: RFPercentage(1), marginTop: RFPercentage(3) }}>
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
    const itemWidth = (width - 40) / 3; // Adjust the width calculation to ensure 3 items per row

    return StyleSheet.create({
        container: {
            padding: RFPercentage(1),
            paddingBottom: RFPercentage(2.5),
            backgroundColor: '#fff',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between', // Distribute items evenly
        },
        item: {
            width: itemWidth - 10, // Subtract margin to fit 3 items per row
            marginBottom: 10,
        },
    });
};