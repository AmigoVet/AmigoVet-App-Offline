import RNFS from 'react-native-fs';

export const checkFileExists = async (filePath: string) => {
    const exists = await RNFS.exists(filePath);
    console.log(filePath, 'El archivo existe:', exists);
    return exists;
};
