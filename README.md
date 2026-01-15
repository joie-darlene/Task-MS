
# 📱 Task management system 


A modern, feature-rich todo application built with React Native, Expo Router, and TypeScript. This cross-platform mobile app helps users manage tasks efficiently with a clean, intuitive interface.

## ✨ Features

- ✅ **Task Management**: Create, read, update, and delete tasks
- 📅 **Date & Time Integration**: Schedule tasks with date/time pickers
- 🔔 **Notifications & Haptics**: Interactive feedback with haptic responses
- 🌓 **Modern UI**: Smooth animations with Reanimated and gesture handling
- 📱 **Cross-Platform**: Works on iOS, Android, and Web
- 🔐 **Local Storage**: Persistent data with Async Storage
- 📊 **Visual Feedback**: Icons, symbols, and blur effects
- 🔗 **Navigation**: Tab-based navigation with Expo Router
- 🔍 **Type Safety**: Full TypeScript support

## 🚀 Tech Stack

- **Framework**: React Native 0.79.1 + React 19
- **Development**: Expo 53 + Expo Router
- **Language**: TypeScript 5.8
- **Navigation**: React Navigation (Bottom Tabs + Native)
- **Animations**: React Native Reanimated
- **Storage**: Async Storage
- **UI Components**: Lucide Icons, Expo Symbols, Vector Icons
- **Utilities**: Axios, date-fns, Gesture Handler

## 📁 Project Structure
todo-app/
├── .expo/ # Expo development files
├── .vscode/ # VS Code settings
├── assets/ # Images, fonts, icons
├── components/ # Reusable UI components
├── constants/ # App constants and configs
├── context/ # React Context providers
├── hooks/ # Custom React hooks
├── node_modules/ # Dependencies
├── Services/ # API services, utilities
├── types/ # TypeScript type definitions
├── app/ # App entry and routing (Expo Router)
├── package.json # Dependencies and scripts
├── tsconfig.json # TypeScript configuration
├── app.json # Expo app configuration
└── .gitignore # Git ignore rules

text

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
Install dependencies

bash
npm install
# or
yarn install
Start the development server

bash
npm run dev
# or
yarn dev
Run on your device

iOS: Press i in the terminal or npm run ios

Android: Press a in the terminal or npm run android

Web: Press w in the terminal or npm run web

📱 Available Scripts
Command	Description
npm run dev	Start Expo development server
npm run build:web	Build for web deployment
npm run lint	Run ESLint for code quality
expo start	Alternative start command
🔧 Development
Prerequisites
Node.js 18+ and npm/yarn

Expo CLI (npm install -g expo-cli)

iOS Simulator (macOS) or Android Studio (Windows/Linux)

Key Dependencies
State Management: React Context (see /context folder)

Navigation: Expo Router with file-based routing

Storage: AsyncStorage for offline persistence

UI: Custom components in /components folder

API: Axios for HTTP requests in /Services

TypeScript Configuration
The project uses strict TypeScript with path aliases:

json
{
  "paths": {
    "@/*": ["./*"]
  }
}
Import example: import { Task } from '@/types/task'

📸 Screenshots
(Add your app screenshots here)

Home screen with task list

Task creation modal

Task details view

Settings/preferences

🚀 Building for Production
Android APK
bash
expo build:android
iOS IPA
bash
expo build:ios
Web Deployment
bash
npm run build:web
# Deploy the 'web-build' folder to hosting
🔍 Features in Detail
Task Management
Add tasks with titles, descriptions, and due dates

Mark tasks as complete/incomplete

Edit or delete existing tasks

Organize tasks with categories/tags

User Experience
Haptic feedback on interactions

Smooth animations and transitions

Offline capability with local storage

Responsive design for all screen sizes

Advanced Features
Camera integration for task attachments

Web browser for external links

System UI theming

Linear gradients and blur effects
