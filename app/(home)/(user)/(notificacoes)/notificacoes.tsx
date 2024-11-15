import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const NotificationsScreen = () => {
    const [clickedNotifications, setClickedNotifications] = useState(new Set());

    const notifications = [
        { id: '1', message: 'DAS SIMPLES NACIONAL - Não se esqueça da data de vencimento do seu DAS!', date: '10/24' },
        { id: '2', message: 'DAS SIMPLES NACIONAL - Não se esqueça da data de vencimento do seu DAS!', date: '11/24' },
        { id: '3', message: 'DAS SIMPLES NACIONAL - Não se esqueça da data de vencimento do seu DAS!', date: '12/24' },
    ];

    const handleNotificationClick = (id) => {
        setClickedNotifications((prev) => new Set(prev).add(id));
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleNotificationClick(item.id)}>
            <View style={styles.notificationCard}>
                <Text style={styles.notificationText}>{item.message}</Text>
                <View style={styles.notificationFooter}>
                    <Text style={styles.notificationDate}>{item.date}</Text>
                    {!clickedNotifications.has(item.id) && <View style={styles.notificationDot} />}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: RFPercentage(1),
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    backButton: {
        marginRight: RFPercentage(1),
    },
    headerTitle: {
        fontSize: RFPercentage(2.5),
        fontWeight: 'bold',
    },
    listContent: {
        padding: 10
    },
    notificationCard: {
        backgroundColor: '#00008B',
        borderRadius: RFPercentage(1.5),
        padding: RFPercentage(1),
        marginBottom: RFPercentage(2),
        position: 'relative',
    },
    notificationText: {
        color: '#fff',
        fontSize: RFPercentage(2),
        lineHeight: RFPercentage(2.75),
    },
    notificationFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: RFPercentage(1.5),
    },
    notificationDate: {
        color: '#000',
        fontSize: RFPercentage(1.75),
        backgroundColor: '#fff',
        paddingHorizontal: RFPercentage(1),
        paddingVertical: RFPercentage(0.25),
        borderRadius: RFPercentage(0.75),
    },
    notificationDot: {
        width: RFPercentage(1.25),
        height: RFPercentage(1.25),
        backgroundColor: 'red',
        borderRadius: RFPercentage(0.75),
    },
});

export default NotificationsScreen;