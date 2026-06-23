import { useQuiz } from './hooks/useQuiz'
import HomeScreen from './components/screens/HomeScreen'
import LoadingScreen from './components/screens/LoadingScreen'
import QuizScreen from './components/screens/QuizScreen'
import ResultScreen from './components/screens/ResultScreen'
import CanvasBackground from './components/ui/CanvasBackground'

export default function App() {
  const { state, screen, timerDuration, selectAnswer, startQuiz, retryQuiz, endQuizEarly, goHome } = useQuiz()

  return (
    <div className="min-h-screen relative text-[#e8eaf6]">
      {/* Fixed canvas background animation behind all screens */}
      <CanvasBackground />

      <div key={screen} className="relative z-10 animate-fadeUp">
        {screen === 'home' && (
          <HomeScreen onStart={startQuiz} />
        )}
        {screen === 'loading' && (
          <LoadingScreen topic={state.topic} />
        )}
        {screen === 'quiz' && (
          <QuizScreen
            state={state}
            timerDuration={timerDuration}
            onAnswer={selectAnswer}
            onExit={endQuizEarly}
          />
        )}
        {screen === 'result' && (
          <ResultScreen
            state={state}
            onRetry={retryQuiz}
            onHome={goHome}
          />
        )}
      </div>
    </div>
  )
}

