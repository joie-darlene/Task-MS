import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { useTasks } from '@/context/TaskContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TriangleAlert as AlertTriangle, Info, Moon, Trash2 } from 'lucide-react-native';

export default function SettingsScreen() {
  const { clearAllTasks } = useTasks();
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  const handleClearTasks = () => {
    Alert.alert(
      "Clear All Tasks",
      "Are you sure you want to delete all tasks? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete All", 
          onPress: () => clearAllTasks(),
          style: "destructive"
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Moon size={20} color={COLORS.text} />
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: COLORS.neutral[300], true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <AlertTriangle size={20} color={COLORS.text} />
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: COLORS.neutral[300], true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          
          <TouchableOpacity 
            style={[styles.settingItem, styles.dangerButton]}
            onPress={handleClearTasks}
          >
            <View style={styles.settingTextContainer}>
              <Trash2 size={20} color={COLORS.error} />
              <Text style={[styles.settingText, styles.dangerText]}>Clear All Tasks</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Info size={20} color={COLORS.text} />
              <Text style={styles.settingText}>Version 1.0.0</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: SPACING.md,
    color: COLORS.text,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral[200],
  },
  settingTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: SPACING.md,
    color: COLORS.text,
  },
  dangerButton: {
    borderBottomWidth: 0,
  },
  dangerText: {
    color: COLORS.error,
  },
});