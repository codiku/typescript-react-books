import axios from "axios"
import { FetchQuizCatogiesResp, FetchQuizParams, FetchQuizResp, QuizCategory, QuizItem } from "../types/quiz.type"

const BASE_URL = "https://opentdb.com"
export class QuizAPI {
    static async fetchQuiz(params: FetchQuizParams): Promise<QuizItem[]> {
        const { data } = await axios.get<FetchQuizResp>(`${BASE_URL}/api.php`, { params })
        return data.results
    }

    static async fetchQuizCategories(): Promise<QuizCategory[]> {
        const { data } = await axios.get<FetchQuizCatogiesResp>(`${BASE_URL}/api_category.php`)
        return data.trivia_categories
    }
}
