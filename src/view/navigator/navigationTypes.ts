import { Animal } from '../../lib/interfaces/Animal';
import Busqueda from '../screens/home/busqueda/Busqueda';
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
};