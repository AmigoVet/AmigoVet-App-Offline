import RNFS from 'react-native-fs';

export const saveImagePermanently = async (sourceUri: string): Promise<string | null> => {
    try {
        // Ensure we're working with a clean path
        const cleanSourceUri = sourceUri.replace('file://', '');
        const uniqueId = Math.random().toString(36).substr(2, 9);
        const destPath = `${RNFS.DocumentDirectoryPath}/${uniqueId}.jpg`;

        console.log('Source URI:', sourceUri);
        console.log('Clean Source URI:', cleanSourceUri);
        console.log('Destination Path:', destPath);

        // Verificar si el archivo fuente existe
        const exists = await RNFS.exists(cleanSourceUri);
        console.log('Source file exists:', exists);

        if (!exists) {
            console.error('Source file does not exist:', cleanSourceUri);
            return null;
        }

        // Copiar el archivo
        await RNFS.copyFile(cleanSourceUri, destPath);
        console.log('File copied successfully');

        // Verificar si el archivo de destino existe
        const destExists = await RNFS.exists(destPath);
        console.log('Destination file exists:', destExists);

        if (!destExists) {
            console.error('Destination file was not created:', destPath);
            return null;
        }

        return `file://${destPath}`;
    } catch (error) {
        console.error('Error in saveImagePermanently:', error);
        return null;
    }
};