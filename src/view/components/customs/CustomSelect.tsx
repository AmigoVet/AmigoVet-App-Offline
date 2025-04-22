import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from 'react-native';
import { newColors } from '../../styles/colors';
import { constants } from '../../styles/constants';
import { GlobalStyles } from '../../styles/GlobalStyles';
import Icon from '@react-native-vector-icons/ionicons';

interface CustomSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  required?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value,
  options = [],
  onChange,
  required = false,
}) => {
  const { width } = Dimensions.get('window');
  const [isFocused, setIsFocused] = useState(false);
  const [inputText, setInputText] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isSelecting, setIsSelecting] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // Sync inputText with value prop
  useEffect(() => {
    setInputText(value);
    filterOptions(value);
  }, [value]);

  // Filter options based on input text
  const filterOptions = (text: string) => {
    if (!text) {
      setFilteredOptions(options);
    } else {
      const filtered = options
        .filter((option) => option.toLowerCase().includes(text.toLowerCase()))
        .sort((a, b) => {
          const aStartsWith = a.toLowerCase().startsWith(text.toLowerCase());
          const bStartsWith = b.toLowerCase().startsWith(text.toLowerCase());
          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;
          return a.localeCompare(b);
        });
      setFilteredOptions(filtered);
    }
  };

  // Handle text input changes
  const handleTextChange = (text: string) => {
    setInputText(text);
    filterOptions(text);
    setIsDropdownOpen(true);
    setIsValid(text === '' || options.some((option) => option.toLowerCase() === text.toLowerCase()));
    onChange(text);
  };

  // Handle option selection
  const handleSelectOption = (option: string) => {
    console.log('Option selected:', option); // Debug
    setIsSelecting(true);
    setInputText(option);
    setIsDropdownOpen(false);
    setIsValid(true);
    onChange(option);
    inputRef.current?.focus();
    setIsSelecting(false);
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsFocused(!isDropdownOpen);
    if (!isDropdownOpen) {
      filterOptions(inputText);
    }
  };

  // Handle blur event
  const handleBlur = () => {
    if (isSelecting) return;
    setIsFocused(false);
    setIsDropdownOpen(false);
    const valid =
      inputText === '' ||
      options.some((option) => option.toLowerCase() === inputText.toLowerCase());
    setIsValid(valid);
  };

  const styles = StyleSheet.create({
    container: {
      marginVertical: 5,
      width: '100%',
      zIndex: isDropdownOpen ? 10000 : 1, // Increased zIndex
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: !isValid
        ? newColors.rojo
        : isFocused
        ? newColors.verde
        : newColors.fondo_secundario,
      borderRadius: constants.borderRadius / 1.5,
      height: 50,
      paddingHorizontal: 10,
    },
    input: {
      flex: 1,
      fontSize: 14,
      fontWeight: '400',
      fontFamily: constants.FontText,
      color: !isValid ? newColors.rojo : newColors.fondo_secundario,
    },
    icon: {
      marginLeft: 10,
      color: !isValid ? newColors.rojo : newColors.fondo_secundario,
    },
    dropdown: {
      position: 'absolute',
      top: 80,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: newColors.fondo_secundario,
      borderRadius: constants.borderRadius / 1.5,
      maxHeight: 150,
      zIndex: 10001, // Increased zIndex
      elevation: Platform.OS === 'android' ? 10 : 0,
    },
    option: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    optionText: {
      fontSize: 14,
      fontWeight: '400',
      fontFamily: constants.FontText,
      color: newColors.fondo_secundario,
    },
    errorText: {
      color: newColors.rojo,
      fontSize: 12,
      marginTop: 3,
      fontFamily: constants.FontText,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={GlobalStyles.subtitle}>
        {label} {required && <Text style={{ color: newColors.rojo }}>*</Text>}
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={inputText}
          onChangeText={handleTextChange}
          placeholder={`Seleccione ${label.toLowerCase()}`}
          placeholderTextColor={newColors.fondo_secundario}
          onFocus={() => {
            setIsFocused(true);
            setIsDropdownOpen(true);
          }}
          onBlur={handleBlur}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableWithoutFeedback onPress={toggleDropdown}>
          <Icon
            name={isDropdownOpen ? 'chevron-up-outline' : 'chevron-down-outline'}
            size={20}
            style={styles.icon}
          />
        </TouchableWithoutFeedback>
      </View>

      {!isValid && (
        <Text style={styles.errorText}>Seleccione una opción válida</Text>
      )}

      {isDropdownOpen && filteredOptions.length > 0 && (
        <ScrollView style={styles.dropdown} keyboardShouldPersistTaps="handled">
          {filteredOptions.map((option, index) => (
            <TouchableWithoutFeedback
              key={`${option}-${index}`}
              onPress={() => handleSelectOption(option)}
            >
              <View style={styles.option}>
                <Text style={styles.optionText}>{option}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default CustomSelect;