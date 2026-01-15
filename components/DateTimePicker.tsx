import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import RNDateTimePicker from '@react-native-community/datetimepicker';

interface DateTimePickerProps {
  visible: boolean;
  mode: 'date' | 'time';
  value: Date;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  visible,
  mode,
  value,
  onConfirm,
  onCancel,
}) => {
  const [tempValue, setTempValue] = React.useState(value);

  React.useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleChange = (_: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      // On Android, the picker closes automatically after selection
      onCancel();
      if (selectedDate) {
        onConfirm(selectedDate);
      }
    } else {
      // On iOS, we update the temp value but don't confirm until user presses "Done"
      if (selectedDate) {
        setTempValue(selectedDate);
      }
    }
  };

  // Native datetime picker for iOS
  if (Platform.OS === 'ios') {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={onCancel}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onConfirm(tempValue)}>
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
            <RNDateTimePicker
              value={tempValue}
              mode={mode}
              display="spinner"
              onChange={handleChange}
              themeVariant="light"
              textColor={COLORS.text}
              accentColor={COLORS.primary}
            />
          </View>
        </View>
      </Modal>
    );
  }

  // For Android, we render the native picker directly
  if (visible && Platform.OS === 'android') {
    return (
      <RNDateTimePicker
        value={value}
        mode={mode}
        display="default"
        onChange={handleChange}
        themeVariant="light"
      />
    );
  }

  // Return null if not visible
  return null;
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral[200],
  },
  cancelText: {
    fontSize: 16,
    color: COLORS.error,
  },
  doneText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
});

export default DateTimePicker;