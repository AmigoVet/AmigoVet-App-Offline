import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { newColors } from '../styles/colors';

interface ModalSelectOptionsProps {
  isOpen: boolean;
  options: string[];
  onSelect: (value: string) => void;
  onClose: () => void;
}

const ModalSelectOptions: React.FC<ModalSelectOptionsProps> = ({
  isOpen,
  options,
  onSelect,
  onClose,
}) => {
  const modalizeRef = useRef<Modalize>(null);
  const fontSize = Dimensions.get('window').width * 0.04;

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isOpen) {
      timeout = setTimeout(() => modalizeRef.current?.open(), 0);
    } else {
      timeout = setTimeout(() => modalizeRef.current?.close(), 0);
    }
    return () => clearTimeout(timeout);
  }, [isOpen]);

  const styles = StyleSheet.create({
    modalContent: {
      backgroundColor: 'white',
      padding: 15,
    },
    modalOption: {
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    modalOptionText: {
      fontSize,
      color: newColors.fondo_secundario,
      textAlign: 'center',
    },
    modalCancel: {
      padding: 15,
      backgroundColor: newColors.rojo,
      borderRadius: 5,
      marginTop: 10,
      alignItems: 'center',
    },
    modalCancelText: {
      color: 'white',
      fontSize,
      fontWeight: 'bold',
    },
    modalScrollView: {
      maxHeight: Dimensions.get('window').height * 0.4,
    },
  });

  return (
    <Modalize
      ref={modalizeRef}
      modalStyle={{ backgroundColor: 'white' }}
      overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      withOverlay
      adjustToContentHeight={false}
      modalHeight={Dimensions.get('window').height * 0.5}
      onClose={onClose}
      useNativeDriver={true} // Enable native driver for smoother animations
    >
      <View style={styles.modalContent}>
        <ScrollView style={styles.modalScrollView}>
          {options.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.modalOption}
              onPress={() => {
                onSelect(item);
                onClose();
              }}
              accessibilityRole="button"
              accessibilityLabel={item}
            >
              <Text style={styles.modalOptionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.modalCancel}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Cancelar"
        >
          <Text style={styles.modalCancelText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
};

export default ModalSelectOptions;