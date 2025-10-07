# QuizMania - Interactive Quiz Application

A modern, responsive quiz application built with React, TypeScript, and Vite. Test your knowledge across multiple technology categories with timed questions and detailed scoring.

## 🚀 Features

- **Multiple Quiz Categories**: Choose from JavaScript Basics, Angular Basics, React.js Advanced, and Flutter
- **Timed Questions**: Each question has a 10-second timer with automatic progression
- **Interactive UI**: Clean, modern interface with progress tracking
- **Detailed Scoring**: Comprehensive results with percentage scores and performance feedback
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Progress**: Visual progress bar and question counter
- **Skip Functionality**: Option to skip questions and retake quizzes

## 🎯 Quiz Categories

1. **JavaScript Basics** - Fundamental JavaScript concepts and syntax
2. **Angular Basics** - Core Angular framework knowledge
3. **React.js Advanced** - Advanced React patterns and optimization techniques
4. **Flutter** - Mobile app development with Flutter framework

Each category contains 10 carefully crafted questions with multiple-choice answers.

## 🛠️ Tech Stack

- **Frontend**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.7
- **Styling**: SCSS with CSS Modules
- **Linting**: ESLint with TypeScript support
- **Development**: Hot Module Replacement (HMR)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quiz-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🚀 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🎮 How to Use

1. **Welcome Screen**: Enter your full name and select a quiz category
2. **Read Rules**: Click "Quiz Rules" to understand the quiz mechanics
3. **Start Quiz**: Click "Start Quiz" to begin your selected category
4. **Answer Questions**: 
   - Each question has 4 multiple-choice options
   - You have 10 seconds per question
   - Use the "Next" button to proceed or "Skip" to skip a question
5. **View Results**: See your score, correct/incorrect answers, and performance feedback
6. **Retake**: Click "Retake Quiz" to try again or select a different category

## 📊 Scoring System

- **Above 80%**: "CONGRATULATION" - Excellent performance!
- **60-80%**: "Well done!" - Good job, keep improving!
- **Below 60%**: "KEEP PRACTICING!" - More practice needed

## 🏗️ Project Structure

```
quiz-app/
├── public/
│   └── sadface.svg          # Result page icon
├── src/
│   ├── components/
│   │   ├── Header/          # Navigation header
│   │   ├── Modal/           # Rules modal component
│   │   ├── Quiz/            # Main quiz component
│   │   └── Result/          # Results display component
│   ├── home/
│   │   └── Home.tsx         # Welcome/home page
│   ├── hooks/
│   │   └── useCountdown.ts  # Timer hook
│   ├── styles/
│   │   ├── global.scss      # Global styles
│   │   └── _tokens.scss     # Design tokens
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── questions.json           # Quiz questions database
├── package.json
└── vite.config.ts
```

## 🎨 Styling

The application uses SCSS with CSS Modules for component-scoped styling:
- **Global styles**: Common utilities and design tokens
- **Component styles**: Scoped styles for each component
- **Responsive design**: Mobile-first approach with flexible layouts

## 🔧 Configuration

- **Vite**: Configured for React with TypeScript support
- **ESLint**: TypeScript-aware linting rules
- **TypeScript**: Strict type checking enabled

## 📝 Customization

### Adding New Quiz Categories

1. Edit `questions.json` to add new categories:
   ```json
   {
     "id": "new_category",
     "name": "New Category Name",
     "questions": [
       {
         "id": "q1",
         "question": "Your question here?",
         "options": ["Option A", "Option B", "Option C", "Option D"],
         "correctAnswer": "A",
         "timeLimit": 10
       }
     ]
   }
   ```

2. The application will automatically detect and display new categories

### Modifying Timer Duration

Change the `timeLimit` property in individual questions or modify the default in `Quiz.tsx`:
```typescript
const limit = q.timeLimit ?? 10; // Default 10 seconds
```

## 🚀 Deployment

Build the application for production:
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with modern React patterns and hooks
- Styled with SCSS for maintainable CSS
- Questions curated for educational purposes
- Icons and assets optimized for web performance

---

**Happy Quizzing! 🎉**