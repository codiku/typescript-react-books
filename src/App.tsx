import { useState } from "react";
import { FetchQuizParams, Steps } from "./types/quiz.type";
import { Box, Flex, Heading } from "@chakra-ui/react";

export default function App() {
  const [quizParams, setQuizParams] = useState<FetchQuizParams>();
  const [step, setStep] = useState<Steps>(Steps.SetQty);
  const header = (
    <Flex justify="center">
      <Heading size="2xl">Kooiz</Heading>
    </Flex>
  );

  const renderStep = () => {
    switch (step) {
      case Steps.SetQtyQuestions:
        break;
      case Steps.SetCategory:
        break;
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
