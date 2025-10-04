# Monty Hall Problem Simulator

[简体中文](./README.zh-CN.md) | **English**

> 🎯 **Live Demo**: [https://tradermoney.github.io/monty-hall-problem/](https://tradermoney.github.io/monty-hall-problem/)

An interactive Monty Hall problem simulator supporting manual game mode, automatic simulation, statistical analysis, data export, and more features.

## 🌟 Features

### 🎮 Manual Game Mode
- Interactive three-door problem game
- Real-time game results display
- Strategy switching support
- Game history recording

### 🤖 Automatic Simulation Mode
- Batch simulation runs
- Configurable parameters (number of doors, simulation count, batch size, etc.)
- Multiple host models (Classic, Ignorant, Biased, Sometimes Silent)
- Multiple player strategies (Never Switch, Always Switch, Random Switch)
- Progress bar display
- Real-time statistics updates

### 📊 Statistical Analysis
- Win rate comparison charts
- Win/loss distribution pie charts
- Detailed statistics tables
- Batch win rate trend charts
- Confidence interval calculations
- Standard error analysis

### ⚙️ Parameter Configuration
- Total run count settings
- Number of doors configuration
- Batch size adjustment
- Host model selection
- Player strategy selection
- Random seed settings
- Quick preset configuration application

### 🌐 Internationalization Support
- Chinese interface
- English interface
- Real-time language switching

### 🎨 Theme Switching
- Light theme
- Dark theme
- Auto theme (follows system)
- High contrast support

### ♿ Accessibility Support
- Keyboard navigation
- Screen reader support
- ARIA labels
- High contrast mode
- Reduced motion options

### 📁 Data Management
- Export statistical data (JSON)
- Export complete data (JSON)
- Export statistical data (CSV)
- Import data
- Generate sample data

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **State Management**: Zustand
- **Routing**: React Router
- **Internationalization**: react-i18next
- **Charts**: Recharts
- **Styling**: CSS variables + Modular CSS
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library
- **Types**: TypeScript

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Run Tests
```bash
npm test
```

### Run Tests (Watch Mode)
```bash
npm run test:watch
```

### Code Linting
```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── components/          # React Components
│   ├── AutoSimulation/  # Automatic Simulation Component
│   ├── DataManager/     # Data Management Component
│   ├── LanguageSwitcher/# Language Switcher
│   ├── ManualGame/     # Manual Game Component
│   ├── ParameterPanel/ # Parameter Configuration Panel
│   ├── Settings/       # Settings Page
│   ├── StatisticsCharts/ # Statistics Charts Component
│   └── ThemeSwitcher/  # Theme Switcher
├── stores/             # State Management
│   ├── gameStore.ts    # Game State
│   ├── simulationStore.ts # Simulation State
│   └── themeStore.ts   # Theme State
├── utils/              # Utility Functions
│   ├── accessibility.ts # Accessibility Features
│   ├── dataExportImport.ts # Data Export/Import
│   └── simulator.ts    # Monty Hall Simulator
├── i18n/               # Internationalization
│   └── index.ts        # i18n Configuration
├── types/              # TypeScript Type Definitions
└── __tests__/          # Test Files

```

## 📖 Usage Guide

### Manual Game Mode
1. Click "Start Game" button
2. Choose a door
3. Host will open another door
4. Choose whether to switch doors
5. View game results

### Automatic Simulation Mode
1. Set simulation parameters (number of doors, simulation count, etc.)
2. Select host model and player strategy
3. Click "Start Simulation" button
4. View real-time progress and statistical results

### Data Analysis
- View win rate comparison charts
- Analyze win/loss distribution
- Observe batch win rate trends
- View detailed statistics tables

### Data Export
- Export statistical data for further analysis
- Export complete data including all simulation records
- Export CSV format for Excel analysis
- Import previously exported data

## 🎭 Host Models Explanation

### Classic Model
- Host knows which door has the prize
- Host always opens a door with a goat
- Host never opens the player's chosen door

### Ignorant Model
- Host doesn't know which door has the prize
- Host randomly selects a door to open
- May accidentally open the prize door

### Biased Model
- Host knows the prize location
- Host preferentially selects which door to open
- Preference level controlled by bias parameter

### Sometimes Silent Model
- Host sometimes chooses not to open any door
- Silence probability controlled by silentProbability parameter
- Increases game complexity

## 🎯 Player Strategies Explanation

### Never Switch
- Player always sticks with initial choice
- Win rate = 1/number of doors

### Always Switch
- Player always switches to remaining unopened door
- Classic three-door problem win rate is 2/3

### Random Switch
- Player randomly decides whether to switch
- Win rate between never switch and always switch

## 🔢 Mathematical Principles

The Monty Hall problem is a classic probability problem. In the classic three-door problem:

- Probability of initial correct choice: 1/3
- Probability of initial incorrect choice: 2/3
- If initial choice is correct, switching loses
- If initial choice is incorrect, switching wins

Therefore, the always switch strategy has a win rate of 2/3, while the never switch strategy has a win rate of 1/3.

## 🤝 Contributing Guidelines

Welcome to submit Issues and Pull Requests!

### Development Standards
- Use TypeScript for development
- Follow existing code style
- Write test cases for new features
- Update related documentation

### Submission Standards
- Use clear commit messages
- Link related Issues
- Ensure all tests pass

## 📄 License

MIT License

## 📧 Contact

For questions or suggestions, please contact:
- Submit GitHub Issue
- Email project maintainer

---

**Enjoy exploring the Monty Hall problem!** 🎲✨