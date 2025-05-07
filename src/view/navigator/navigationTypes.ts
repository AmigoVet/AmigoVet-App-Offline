import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';
import { Animal } from '../../lib/interfaces/Animal';
import { Chat } from '../../lib/interfaces/chats';

export type MainTabsParamList = {
  Home: undefined;
  Feed: undefined;
  New: undefined;
  Profile: undefined;
  Local: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

export type RootStackParamList = {
  MainApp: undefined;
  Auth: undefined;
  AnimalView: { animal: Animal };
  Busqueda: undefined;
  New: undefined;
  Update: { animal: Animal };
  Calendar: undefined;
  GptChat: { chatData: Chat };
  AllChats: undefined;

  CreateEventForm: {animalId: string; animalName: string};
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

