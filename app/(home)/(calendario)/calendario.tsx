import * as React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useState, useEffect } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';

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
    const [markedDates, setMarkedDates] = useState<{ [key: string]: { selected: boolean, marked: boolean, selectedColor: string, message: string } }>({});

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const newMarkedDates: { [key: string]: { selected: boolean, marked: boolean, selectedColor: string, message: string } } = {};

        // Example of marking multiple dates with custom messages
        const datesToMark = [
            { date: new Date(year, month, 20), message: "Data de Vencimento - DAS" },
            { date: new Date(year, month, 14), message: "Valentine's Day" },
            { date: new Date(year, month, 17), message: "St. Patrick's Day" },
            { date: new Date(year, month, 22), message: "Earth Day" },
            { date: new Date(year, month, 5), message: "Cinco de Mayo" },
        ];

        datesToMark.forEach(({ date, message }) => {
            const dateString = date.toISOString().split('T')[0];
            newMarkedDates[dateString] = { selected: true, marked: true, selectedColor: 'blue', message };
        });

        setMarkedDates(newMarkedDates);
    }, []);

    const handleDayPress = (day: { dateString: string }) => {
        if (markedDates[day.dateString]) {
            Alert.alert("Alerta", markedDates[day.dateString].message);
        }
    };

    return (
        <ScrollView>
            <SafeAreaProvider style={{ flex: 1, padding: 10, marginTop: RFPercentage(3) }}>
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
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </ScrollView >
    );
}

const Styles = () => {
    return StyleSheet.create({
        container: {
            padding: 10,
            paddingBottom: 25, // Add padding to the bottom
            backgroundColor: '#fff',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
    });
}