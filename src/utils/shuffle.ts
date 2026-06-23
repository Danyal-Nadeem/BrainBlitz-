import type { Question, ShuffledQuestion } from '../types'

// Generic Fisher-Yates shuffle
export function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Shuffle questions order + shuffle each question's options
// Correctly updates the answer index after option shuffle
export function shuffleQuestions(questions: Question[]): ShuffledQuestion[] {
  return shuffle(questions).map((q) => {
    const originalOption = q.options[q.answer]
    const shuffledOptions = shuffle([...q.options]) as [string,string,string,string]
    const newAnswerIndex = shuffledOptions.indexOf(originalOption) as 0|1|2|3
    return {
      ...q,
      options: shuffledOptions,
      answer: newAnswerIndex,
      originalAnswer: q.answer,
    }
  })
}
