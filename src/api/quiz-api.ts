import axios from "axios";
import { FetchQuizCatogiesResp, QuizCategory } from "../types/quiz-type";

const BASE_URL = "https://opentdb.com";
export class QuizAPI {
  static async fetchQuizCategories(): Promise<QuizCategory[]> {
    const { data } = await axios.get<FetchQuizCatogiesResp>(
      `${BASE_URL}/api_category.php`
    );
    return data.trivia_categories;
  }
}
