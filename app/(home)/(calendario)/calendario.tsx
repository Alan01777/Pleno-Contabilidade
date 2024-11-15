import * as React from 'react';
import { Text, View, StyleSheet, Alert, Modal, TextInput, TouchableOpacity, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useState, useEffect } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';

LocaleConfig.locales['br'] = {
    monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ],
    monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui', 'Sex.', 'Sáb.'],
    today: "Hoje"
};

LocaleConfig.defaultLocale = 'br';

export default function Calendario() {
    const styles = Styles();
    const [markedDates, setMarkedDates] = useState<{ [key: string]: { selected: boolean, marked: boolean, selectedColor: string, messages: string[] } }>({});
    const [modalVisible, setModalVisible] = useState(false);
    const [newEventDate, setNewEventDate] = useState(new Date());
    const [newEventMessage, setNewEventMessage] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const newMarkedDates: { [key: string]: { selected: boolean, marked: boolean, selectedColor: string, messages: string[] } } = {};

        // Example of marking multiple dates with custom messages
        const datesToMark = [
            { date: new Date(year, month, 20), message: "Data de Vencimento - DAS" },
            { date: new Date(year, month, 25), message: "Data de Vencimento - PIS/PASEP" },
            { date: new Date(year, month, 25), message: "Data de Vencimento - COFINS" },
            { date: new Date(year, month, 20), message: "Data de Vencimento - ICMS" },
            { date: new Date(year, 2, new Date(year, 2, 0).getDate()), message: "Data de Vencimento - IRPJ (1º Trimestre)" },
            { date: new Date(year, 5, new Date(year, 5, 0).getDate()), message: "Data de Vencimento - IRPJ (2º Trimestre)" },
            { date: new Date(year, 8, new Date(year, 8, 0).getDate()), message: "Data de Vencimento - IRPJ (3º Trimestre)" },
            { date: new Date(year, 11, new Date(year, 11, 0).getDate()), message: "Data de Vencimento - IRPJ (4º Trimestre)" },
            { date: new Date(year, 2, new Date(year, 2, 0).getDate()), message: "Data de Vencimento - CSLL (1º Trimestre)" },
            { date: new Date(year, 5, new Date(year, 5, 0).getDate()), message: "Data de Vencimento - CSLL (2º Trimestre)" },
            { date: new Date(year, 8, new Date(year, 8, 0).getDate()), message: "Data de Vencimento - CSLL (3º Trimestre)" },
            { date: new Date(year, 11, new Date(year, 11, 0).getDate()), message: "Data de Vencimento - CSLL (4º Trimestre)" },
        ];

        datesToMark.forEach(({ date, message }) => {
            const dateString = date.toISOString().split('T')[0];
            if (!newMarkedDates[dateString]) {
                newMarkedDates[dateString] = { selected: true, marked: true, selectedColor: 'blue', messages: [] };
            }
            newMarkedDates[dateString].messages.push(message);
        });

        setMarkedDates(newMarkedDates);
    }, []);

    useEffect(() => {
        const getPermissions = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        };
        getPermissions();
    }, []);

    const handleDayPress = (day: { dateString: string }) => {
        if (markedDates[day.dateString]) {
            Alert.alert("Alerta", markedDates[day.dateString].messages.join('\n'));
        }
    };

    const handleAddEvent = async () => {
        if (newEventDate && newEventMessage) {
            const formattedDate = newEventDate.toISOString().split('T')[0];
            const newMarkedDates = { ...markedDates };
            if (!newMarkedDates[formattedDate]) {
                newMarkedDates[formattedDate] = { selected: true, marked: true, selectedColor: 'blue', messages: [] };
            }
            newMarkedDates[formattedDate].messages.push(newEventMessage);
            setMarkedDates(newMarkedDates);
            setModalVisible(false);

            // Schedule notification
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Lembrete de Evento',
                    body: newEventMessage,
                },
                trigger: newEventDate,
            });

            setNewEventDate(new Date());
            setNewEventMessage('');
        } else {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
        }
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || newEventDate;
        setShowDatePicker(Platform.OS === 'ios');
        setNewEventDate(currentDate);
    };

    return (
        <ScrollView>
            <SafeAreaProvider style={{ flex: 1, padding: RFPercentage(1), marginTop: RFPercentage(3) }}>
                <SafeAreaView>
                    <View style={styles.container}>
                        <Calendar
                            onDayPress={handleDayPress}
                            markedDates={markedDates}
                            theme={{
                                backgroundColor: '#ffffff',
                                calendarBackground: '#ffffff',
                                textSectionTitleColor: '#b6c1cd',
                                selectedDayBackgroundColor: '#00adf5',
                                selectedDayTextColor: '#ffffff',
                                todayTextColor: '#00adf5',
                                dayTextColor: '#2d4150',
                                textDisabledColor: '#d9e1e8',
                                dotColor: 'red',
                                selectedDotColor: '#ffffff',
                                arrowColor: 'orange',
                                monthTextColor: 'blue',
                                indicatorColor: 'blue',
                                textDayFontWeight: '300',
                                textMonthFontWeight: 'bold',
                                textDayHeaderFontWeight: '300',
                                textDayFontSize: RFPercentage(1.5),
                                textMonthFontSize: RFPercentage(2),
                                textDayHeaderFontSize: RFPercentage(1.5),
                            }}
                        />
                        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                            <Text style={styles.buttonText}>Adicionar Evento</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Adicionar Novo Evento</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
                        <Text style={styles.datePickerButtonText}>
                            {newEventDate.toLocaleDateString('pt-BR')}
                        </Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={newEventDate}
                            mode="date"
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder="Mensagem"
                        value={newEventMessage}
                        onChangeText={setNewEventMessage}
                    />
                    <View style={{ padding: 10 }}>
                        <TouchableOpacity style={styles.button} onPress={handleAddEvent}>
                            <Text style={styles.buttonText}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ padding: 10 }}>
                        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const Styles = () => {
    return StyleSheet.create({
        container: {
            padding: RFPercentage(1),
            paddingBottom: RFPercentage(2.5), // Add padding to the bottom
            backgroundColor: '#fff',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        modalText: {
            marginBottom: 15,
            textAlign: 'center',
        },
        input: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            width: '100%',
            paddingHorizontal: 10,
        },
        button: {
            marginTop: RFPercentage(1),
            backgroundColor: '#06067A',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
        },
        buttonText: {
            color: '#fff',
            fontWeight: 'bold',
        },
        datePickerButton: {
            backgroundColor: '#ddd',
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
            alignItems: 'center',
            width: '100%',
        },
        datePickerButtonText: {
            color: '#000',
        },
    });
}