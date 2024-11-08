import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import { Ionicons } from '@expo/vector-icons'; // Ou qualquer outra biblioteca de ícones

// Dados de exemplo das notificações
const notifications = [
    { id: '1', message: 'Dia 20 está chegando! Fique de olho no DAS e não se esqueça de realizar o pagamento caso esteja disponível!', date: '18/11' },
    { id: '2', message: 'Dia 20 está chegando! Fique de olho no DAS e não se esqueça de realizar o pagamento caso esteja disponível!', date: '18/10' },
    { id: '3', message: 'Dia 20 está chegando! Fique de olho no DAS e não se esqueça de realizar o pagamento caso esteja disponível!', date: '18/09' },
];

const NotificationsScreen = () => {
    // Renderiza cada item de notificação
    const renderItem = ({ item }) => (
        <View style={styles.notificationCard}>
            <Text style={styles.notificationText}>{item.message}</Text>
            <View style={styles.notificationFooter}>
                <Text style={styles.notificationDate}>{item.date}</Text>
                <View style={styles.notificationDot} />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Lista de notificações */}
            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

// Estilos

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: RFPercentage(2),
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
        padding: RFPercentage(2),
    },
    notificationCard: {
        backgroundColor: '#00008B',
        borderRadius: RFPercentage(1.5),
        padding: RFPercentage(2),
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