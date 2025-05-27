/**
 * @format
 */
import './gesture-handler';
import 'react-native-url-polyfill/auto';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import {AppRegistry} from 'react-native';
import Amigovet from './Amigovet';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Amigovet);
