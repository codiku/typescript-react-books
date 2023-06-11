import { useState } from "react";
import { FetchQuizParams, Steps } from "./types/quiz.type";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { QuizSetQtyQuestions } from "./features/QuizSetQtyQuestions";
import { QuizSetCategory } from "./features/QuizSetCategory";
import { QuizQuestion } from "./features/QuizQuestion";

export default function App() {
  const [quizParams, setQuizParams] = useState<FetchQuizParams>();
  const [step, setStep] = useState<Steps>(Steps.SetQtyQuestions);

  const header = (
    <Flex justify="center">
      <Heading size="2xl">Kooiz</Heading>
    </Flex>
  );

  const renderStep = () => {
    switch (step) {
      case Steps.SetQtyQuestions:
        return <QuizSetQtyQuestions />;
      case Steps.SetCategory:
        return <QuizSetCategory />;
      case Steps.QuizQuestions:
        return <QuizQuestion />;
      default:
        return null;
    }
  };

  return (
    <Box p="10">
      {header}
      {renderStep()}
    </Box>
  );
}
