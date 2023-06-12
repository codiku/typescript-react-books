// Http requests
interface FetchQuizParams {
    amount: number
    category: number | ""
    difficulty: QuizDifficulty | ""
    type: QuizType
}
interface FetchQuizResp {
    response_code: number;
    results: QuizItem[];
}
interface FetchQuizCatogiesResp {
    trivia_categories: QuizCategory[];
}
// Model
interface QuizItem {
    category: string;
    type: QuizType;
    difficulty: QuizDifficulty;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

interface QuizCategory {
    id: number;
    name: string;
}

enum QuizDifficulty {
    Mixed = "mixed",
    Easy = "easy",
    Medium = "medium",
    Hard = "hard"
}
enum QuizType {
    Mutiple = "mutliple",
    Boolean = "boolean"
}

enum Steps {
    SetQtyQuestions,
    SetCategory,
    SetDifficulty,
    Play
}


export type { FetchQuizParams, FetchQuizResp, FetchQuizCatogiesResp, QuizItem,QuizCategory  }
export { Steps, QuizType, QuizDifficulty }