import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
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
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    backButton: {
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    listContent: {
        padding: 16,
    },
    notificationCard: {
        backgroundColor: '#00008B',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        position: 'relative',
    },
    notificationText: {
        color: '#fff',
        fontSize: 16,
        lineHeight: 22,
    },
    notificationFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    notificationDate: {
        color: '#000',
        fontSize: 14,
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 5,
    },
    notificationDot: {
        width: 10,
        height: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
});

export default NotificationsScreen;