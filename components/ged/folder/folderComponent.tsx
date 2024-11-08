import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

interface FolderComponentProps {
    title: string;
    path: string;
}

const FolderComponent: React.FC<FolderComponentProps> = ({ title, path }) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        router.navigate(path);
    };

    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => [
                    styles.pressable,
                    pressed || isPressed ? styles.pressablePressed : null,
                ]}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                onPress={handlePress}
            >
                <Image source={require('@/assets/images/icons/folder.png')} style={styles.icon} />
                <Text style={styles.title}>{title}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        alignItems: 'center', // Center the content horizontally
    },
    pressable: {
        alignItems: 'center', // Center the content horizontally
        padding: 10,
        borderRadius: 5,
    },
    pressablePressed: {
        backgroundColor: '#d0d0d0', // Change background color when pressed
    },
    icon: {
        width: RFPercentage(5),
        height: RFPercentage(5),
        marginBottom: 5, // Add some space between the icon and the title
    },
    title: {
        fontSize: RFPercentage(2.1),
        color: '#000',
        textAlign: 'center', // Center the text horizontally
    },
});

export default FolderComponent;