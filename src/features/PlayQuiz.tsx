import { useState } from "react";
import { QuizItem } from "../types/quiz-type";
import {
  Flex,
  Heading,
  RadioGroup,
  SimpleGrid,
  Radio,
  Text,
} from "@chakra-ui/react";

export function PlayQuiz(p: { quiz: QuizItem[] }) {
  const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);
  const currentQuizItem: QuizItem = p.quiz[currentQuizItemIndex];
  const availableAnswers = [
    currentQuizItem.correct_answer,
    ...currentQuizItem.incorrect_answers,
  ];

  const radioList = availableAnswers.map((answer: string, i: number) => {
    return (
      <Radio key={i} value={answer}>
        <Text dangerouslySetInnerHTML={{ __html: answer }} />
      </Radio>
    );
  });

  return (
    <Flex direction={"column"} alignItems={"center"} justify={"center"} px={5}>
      <Heading
        as="h1"
        fontSize={"3xl"}
        mt={100}
        mb={20}
        dangerouslySetInnerHTML={{ __html: currentQuizItem.question }}
      />

      <RadioGroup
        onChange={(answer) => setCurrentQuizItemIndex(currentQuizItemIndex + 1)}
        value={""}
      >
        <SimpleGrid columns={2} spacing={4}>
          {radioList}
        </SimpleGrid>
      </RadioGroup>
    </Flex>
  );
}
