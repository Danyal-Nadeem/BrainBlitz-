import { useState, useCallback } from 'react'
import type { Difficulty, QuizState, Screen, AnswerRecord, ShuffledQuestion } from '../types'
import { shuffleQuestions } from '../utils/shuffle';
import { retry } from '../utils/retry';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
  console.warn('API key is not set in environment variables.');
}

const DIFFICULTY_TIME: Record<Difficulty, number> = {
  easy: 15,
  medium: 10,
  hard: 7,
}

function makeInitialState(): QuizState {
  return {
    category: null,
    topic: '',
    difficulty: 'medium',
    questions: [],
    current: 0,
    score: 0,
    answers: [],
    answered: false,
    selectedIndex: null,
  }
}

export function useQuiz() {
  const [screen, setScreen] = useState<Screen>('home')
  const [state, setState] = useState<QuizState>(makeInitialState)

  const timerDuration = DIFFICULTY_TIME[state.difficulty]

  const startQuiz = useCallback(async (topic: string, difficulty: Difficulty, qcount: number) => {
    setScreen('loading')

    try {
      const prompt = `Generate exactly ${qcount} multiple choice quiz questions about "${topic}". Difficulty level: ${difficulty}.

RULES:
- Return ONLY a valid JSON array. No explanation, no markdown, no backticks.
- Each question must have exactly 4 options.
- The "answer" field is the 0-based index (0, 1, 2, or 3) of the correct answer.
- Vary which position holds the correct answer.
- Questions must be factually accurate.

OUTPUT FORMAT:
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": 2
  }
]`

      const result = await retry(async () => {
        const res = await fetch(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
              model: 'llama-3.3-70b-versatile',
              messages: [{ role: 'user', content: prompt }],
              temperature: 0.7,
            }),
          }
        );

        if (!res.ok) {
          const errJson = await res.json().catch(() => ({}));
          throw new Error(`API error ${res.status}: ${JSON.stringify(errJson)}`);
        }
        return res.json();
      }, 3, 800);

      console.log('RAW RESULT:', result);

      const text: string = result?.choices?.[0]?.message?.content ?? '';
      console.log('TEXT:', text);

      if (!text) throw new Error('Empty response');

      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

      let parsed;
      try {
        parsed = JSON.parse(cleanedText);
      } catch (e) {
        console.error('Failed to parse JSON:', cleanedText);
        throw new Error('Invalid JSON response format');
      }

      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('Invalid response structure');
      }

      const rawQuestions = parsed.map((item: any) => ({
        question: item.question || item.q || 'Question?',
        options: Array.isArray(item.options) && item.options.length === 4
          ? item.options
          : ['Option A', 'Option B', 'Option C', 'Option D'],
        answer: typeof item.answer === 'number' && item.answer >= 0 && item.answer <= 3
          ? item.answer
          : 0,
      }))

      const questions = shuffleQuestions(rawQuestions) as ShuffledQuestion[]

      setState({
        ...makeInitialState(),
        category: 'generated',
        topic,
        difficulty,
        questions,
      })
      setScreen('quiz')
    } catch (err) {
      console.error('AI generation failed:', err)
      setState({
        ...makeInitialState(),
        category: 'error',
        topic,
        difficulty,
        questions: [],
      })
      setScreen('quiz')
    }
  }, [])

  const selectAnswer = useCallback((index: number | null, timeLeft: number) => {
    setState((prev) => {
      if (!prev.questions || prev.questions.length === 0) return prev
      if (prev.answered) return prev

      const q = prev.questions[prev.current]
      const isCorrect = index !== null && index === q.answer
      const points = isCorrect ? Math.ceil((timeLeft / timerDuration) * 10) * 10 : 0

      const record: AnswerRecord = {
        question: q.question,
        options: q.options,
        selected: index,
        correct: q.answer,
        isCorrect,
        points,
      }

      return {
        ...prev,
        answered: true,
        selectedIndex: index,
        score: prev.score + points,
        answers: [...prev.answers, record],
      }
    })

    setTimeout(() => {
      setState((prev) => {
        const nextIndex = prev.current + 1
        if (nextIndex >= prev.questions.length) {
          setScreen('result')
          return prev
        }
        return {
          ...prev,
          current: nextIndex,
          answered: false,
          selectedIndex: null,
        }
      })
    }, 1800)
  }, [timerDuration])

  const retryQuiz = useCallback(() => {
    setState((prev) => {
      if (!prev.topic) return prev
      return {
        ...makeInitialState(),
        topic: prev.topic,
        difficulty: prev.difficulty,
        questions: prev.questions,
      }
    })
    setScreen('quiz')
  }, [])

  const endQuizEarly = useCallback(() => {
    setState((prev) => {
      const startIndex = prev.answered ? prev.current + 1 : prev.current
      const unanswered = prev.questions.slice(startIndex).map((q) => ({
        question: q.question,
        options: q.options,
        selected: null,
        correct: q.answer,
        isCorrect: false,
        points: 0,
      }))
      return {
        ...prev,
        answers: [...prev.answers, ...unanswered],
        answered: true,
      }
    })
    setScreen('result')
  }, [])

  const goHome = useCallback(() => {
    setState(makeInitialState())
    setScreen('home')
  }, [])

  return {
    state,
    screen,
    timerDuration,
    selectAnswer,
    startQuiz,
    retryQuiz,
    endQuizEarly,
    goHome,
  }
}