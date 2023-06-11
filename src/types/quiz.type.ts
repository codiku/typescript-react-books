// Http requests
interface FetchQuizParams {
    amount: number
    category: number
    difficulty: QuizDifficulty
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
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

interface QuizCategory {
    id: number;
    name: string;
}

enum QuizDifficulty {
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
    QuizQuestions
}


export type { FetchQuizParams, FetchQuizResp, FetchQuizCatogiesResp, QuizItem, QuizDifficulty, QuizType }
export { Steps }