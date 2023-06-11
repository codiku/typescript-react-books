import axios from "axios"
import { FetchQuizParams, FetchQuizResp, QuizItem } from "../types/quiz.type"

const BASE_URL = "https://opentdb.com/api.php"
export class QuizAPI {
    static async fetchQuiz(params: FetchQuizParams): Promise<QuizItem[]> {
        const { data } = await axios.get<FetchQuizResp>(`${BASE_URL}`, { params })
        return data.results
    }
}
