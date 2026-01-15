import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { Task } from '@/types';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

interface CalendarViewProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  tasks: Task[];
}

const CalendarView: React.FC<CalendarViewProps> = ({
  selectedDate,
  onSelectDate,
  tasks,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Get days of the current month view (including days from prev/next month to fill the grid)
  const getDaysForCalendar = (month: Date) => {
    const start = startOfWeek(startOfMonth(month));
    const end = endOfWeek(endOfMonth(month));
    return eachDayOfInterval({ start, end });
  };

  const days = getDaysForCalendar(currentMonth);
  
  // Navigate to previous/next month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Check if a date has tasks
  const hasTasksOnDate = (date: Date) => {
    return tasks.some(task => 
      isSameDay(new Date(task.date), date)
    );
  };
  
  // Week day headers
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={prevMonth}>
          <ChevronLeft size={24} color={COLORS.text} />
        </TouchableOpacity>
        
        <Text style={styles.monthText}>
          {format(currentMonth, 'MMMM yyyy')}
        </Text>
        
        <TouchableOpacity onPress={nextMonth}>
          <ChevronRight size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.weekDays}>
        {weekDays.map((day, index) => (
          <Text key={index} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>
      
      <View style={styles.daysContainer}>
        {days.map((day, index) => {
          const isToday = isSameDay(day, new Date());
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const hasTasks = hasTasksOnDate(day);
          
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.day,
                !isCurrentMonth && styles.dayOtherMonth,
                isToday && styles.today,
                isSelected && styles.selectedDay,
              ]}
              onPress={() => onSelectDate(day)}
            >
              <Text
                style={[
                  styles.dayText,
                  !isCurrentMonth && styles.dayTextOtherMonth,
                  isToday && styles.todayText,
                  isSelected && styles.selectedDayText,
                ]}
              >
                {format(day, 'd')}
              </Text>
              
              {hasTasks && (
                <View 
                  style={[
                    styles.taskIndicator,
                    isSelected && styles.taskIndicatorSelected
                  ]} 
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    margin: SPACING.lg,
    padding: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.neutral[600],
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  day: {
    width: '14.28%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  dayOtherMonth: {
    opacity: 0.4,
  },
  today: {
    backgroundColor: COLORS.neutral[100],
    borderRadius: 20,
  },
  selectedDay: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
  },
  dayText: {
    fontSize: 14,
    color: COLORS.text,
  },
  dayTextOtherMonth: {
    color: COLORS.neutral[400],
  },
  todayText: {
    fontWeight: '700',
  },
  selectedDayText: {
    color: COLORS.white,
    fontWeight: '700',
  },
  taskIndicator: {
    position: 'absolute',
    bottom: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
  },
  taskIndicatorSelected: {
    backgroundColor: COLORS.white,
  },
});

export default CalendarView;