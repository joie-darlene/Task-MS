import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Keyboard, Alert } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { useTasks } from '@/context/TaskContext';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Calendar as CalendarIcon, Clock, Trash2 } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@/components/DateTimePicker';
import PrioritySelector from '@/components/PrioritySelector';
import CategorySelector from '@/components/CategorySelector';
import { Task } from '@/types';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, updateTask, deleteTask, categories } = useTasks();
  
  const task = tasks.find(t => t.id === id);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      const taskDate = new Date(task.date);
      setDate(taskDate);
      setTime(taskDate);
      setPriority(task.priority || 'medium');
      setCategoryId(task.categoryId || null);
    } else {
      // If task not found, navigate back
      router.back();
    }
  }, [task]);

  const handleUpdateTask = () => {
    if (!title.trim() || !task) return;

    // Combine date and time
    const taskDateTime = new Date(date);
    taskDateTime.setHours(time.getHours());
    taskDateTime.setMinutes(time.getMinutes());

    updateTask({
      ...task,
      title,
      description,
      date: taskDateTime.toISOString(),
      priority,
      categoryId,
    });

    router.back();
  };

  const handleDeleteTask = () => {
    if (!task) return;

    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            deleteTask(task.id);
            router.back();
          },
          style: "destructive"
        }
      ]
    );
  };

  if (!task) return null;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color={COLORS.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Task</Text>
        <TouchableOpacity onPress={handleDeleteTask}>
          <Trash2 color={COLORS.error} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <TextInput
          style={styles.titleInput}
          placeholder="Task Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor={COLORS.neutral[400]}
        />

        <TextInput
          style={styles.descriptionInput}
          placeholder="Task Description"
          value={description}
          onChangeText={setDescription}
          multiline
          placeholderTextColor={COLORS.neutral[400]}
        />

        <Text style={styles.sectionTitle}>Date & Time</Text>

        <View style={styles.dateTimeContainer}>
          <TouchableOpacity 
            style={styles.dateTimeButton} 
            onPress={() => {
              Keyboard.dismiss();
              setShowDatePicker(true);
            }}
          >
            <CalendarIcon size={20} color={COLORS.primary} />
            <Text style={styles.dateTimeText}>
              {date.toLocaleDateString()}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.dateTimeButton} 
            onPress={() => {
              Keyboard.dismiss();
              setShowTimePicker(true);
            }}
          >
            <Clock size={20} color={COLORS.primary} />
            <Text style={styles.dateTimeText}>
              {time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Priority</Text>
        <PrioritySelector selectedPriority={priority} onSelectPriority={setPriority} />

        <Text style={styles.sectionTitle}>Category</Text>
        <CategorySelector 
          categories={categories}
          selectedCategory={categoryId}
          onSelectCategory={setCategoryId}
        />

        {/* Date and Time Pickers */}
        <DateTimePicker
          visible={showDatePicker}
          mode="date"
          value={date}
          onConfirm={(date) => {
            setShowDatePicker(false);
            setDate(date);
          }}
          onCancel={() => setShowDatePicker(false)}
        />

        <DateTimePicker
          visible={showTimePicker}
          mode="time"
          value={time}
          onConfirm={(time) => {
            setShowTimePicker(false);
            setTime(time);
          }}
          onCancel={() => setShowTimePicker(false)}
        />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.updateButton,
            !title.trim() && styles.updateButtonDisabled
          ]}
          onPress={handleUpdateTask}
          disabled={!title.trim()}
        >
          <Text style={styles.updateButtonText}>Update Task</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.lg,
    paddingBottom: 100, // Extra space at bottom
  },
  titleInput: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.neutral[200],
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  descriptionInput: {
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.neutral[200],
    borderRadius: 8,
    padding: SPACING.md,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: SPACING.sm,
    color: COLORS.text,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
  },
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.neutral[100],
    borderRadius: 8,
    marginRight: SPACING.md,
  },
  dateTimeText: {
    marginLeft: SPACING.sm,
    fontSize: 16,
    color: COLORS.text,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.neutral[200],
  },
  updateButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: 30,
    alignItems: 'center',
  },
  updateButtonDisabled: {
    backgroundColor: COLORS.neutral[300],
  },
  updateButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});