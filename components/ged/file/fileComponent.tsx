import * as React from 'react';
import { View, Text, Pressable, StyleSheet, Image, ActivityIndicator, Alert, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';
import * as IntentLauncher from 'expo-intent-launcher';
import { RFPercentage } from 'react-native-responsive-fontsize';

interface PdfProps {
    title: string;
    path: string;
}

const fileComponent: React.FC<PdfProps> = ({ title, path }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const formattedPath = path ? path.replace('pleno/', '') : '';
    const downloadUrl = `${apiUrl}/api/file/${formattedPath}`;

    const saveFile = async (uri: string, filename: string, mimetype: string) => {
        if (Platform.OS === "android") {
            let directoryUri = await SecureStore.getItemAsync('directoryUri');

            if (!directoryUri) {
                const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

                if (permissions.granted) {
                    directoryUri = permissions.directoryUri;
                    await SecureStore.setItemAsync('directoryUri', directoryUri);
                }
            }

            if (directoryUri) {
                const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

                // Provide a default MIME type when mimetype is null
                const mimeType = mimetype || 'application/pdf';

                await FileSystem.StorageAccessFramework.createFileAsync(directoryUri, filename, mimeType)
                    .then(async (uri) => {
                        await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });

                        // Open the file using IntentLauncher
                        IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                            data: uri,
                            flags: 1,
                            type: mimeType,
                        });
                    })
                    .catch(e => Alert.alert("Error", e));
            } else {
                IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                    data: uri,
                    flags: 1,
                    type: 'application/pdf',
                });
            }
        }
    };

    const downloadFile = async () => {
        setIsLoading(true);
        const token = await SecureStore.getItemAsync('token');
        let filename = title;

        // Check if the filename already ends with .pdf
        if (!filename.toLowerCase().endsWith('.pdf')) {
            filename += '.pdf';
        }

        const fileUri = FileSystem.documentDirectory + filename;

        // Download the file
        const result = await FileSystem.downloadAsync(downloadUrl, fileUri, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (result && result.status === 200) {
            // Save the downloaded file
            saveFile(result.uri, filename, result.headers['Content-Type']);
        } else {
            // Handle error
            alert('Error downloading file');
        }
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => [
                    styles.pressable,
                    pressed ? styles.pressablePressed : null,
                ]}
                onPress={downloadFile}
            >
                <Image source={require('@/assets/images/icons/pdf.png')} style={styles.icon} />
                <Text style={styles.title}>{title}</Text>
                {isLoading && <ActivityIndicator size="small" color="#000000" />}
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

export default fileComponent;