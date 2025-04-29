import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { newColors } from '../../styles/colors';
import { constants } from '../../styles/constants';

interface CustomSwitchProps {
  option1: string;
  option2: string;
  onSwitch: (value: string) => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ option1, option2, onSwitch }) => {
  const [activeOption, setActiveOption] = useState(option1);

  const handleSwitch = (value: string) => {
    setActiveOption(value);
    onSwitch(value);
  };

  return (
    <View style={[styles.container, { borderColor: newColors.secundario }]}>
      <TouchableOpacity
        style={[
          styles.option,
          activeOption === option1 && [
            styles.activeOption,
            { borderColor: newColors.secundario },
          ],
        ]}
        onPress={() => handleSwitch(option1)}
      >
        <Text
          style={[
            styles.text,
            activeOption === option1 ? styles.activeText : styles.inactiveText,
          ]}
        >
          {option1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          activeOption === option2 && [
            styles.activeOption,
            { borderColor: newColors.secundario },
          ],
        ]}
        onPress={() => handleSwitch(option2)}
      >
        <Text
          style={[
            styles.text,
            activeOption === option2 ? styles.activeText : styles.inactiveText,
          ]}
        >
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: constants.borderRadius,
    overflow: 'hidden',
  },
  option: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  activeOption: {
    backgroundColor: newColors.verde, 
    borderRadius: constants.borderRadius,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  activeText: {
    color: newColors.fondo_principal, 
    fontFamily: constants.FontTitle,
  },
  inactiveText: {
    color: newColors.fondo_secundario, 
    fontFamily: constants.FontText,
  },
  inactiveOption: {
    backgroundColor: newColors.fondo_principal, 
  },
});

export default CustomSwitch;
