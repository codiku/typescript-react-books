import { useEffect, useState } from "react";
import { QuizCategory } from "../types/quiz-type";
import { QuizAPI } from "../api/quiz-api";

export function SetQuestionCategory() {
  const [categories, setCategories] = useState<QuizCategory[]>([]);

  useEffect(() => {
    (async () => {
      setCategories(await QuizAPI.fetchCategories());
    })();
  }, []);

  console.log("***", categories);
  return <>SetQuestionCategory</>;
}
