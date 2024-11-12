import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function solicitacoes() {
    const styles = Styles();
    return (
        <ScrollView style={{ flex: 1, padding: 10 }}>
            <SafeAreaView>
                <SafeAreaProvider>
                    <View>
                        <Text>Solicitações</Text>

                    </View>
                </SafeAreaProvider>
            </SafeAreaView>
        </ScrollView>
    );
}


const Styles = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        }
    });
}