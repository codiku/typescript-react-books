/* @todo Add a description */

import { QuizItem } from "../types/quiz.type";
import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { shuffleArray } from "../utils";
import invalidAnim from "../assets/lottie/invalid.json";
import validAnim from "../assets/lottie/valid.json";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

interface Props {
  questions: QuizItem[];
  onFinished: () => void;
}
export function QuizPlay(p: Props) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [currentAnim, setCurrentAnim] = useState<object>();
  const [answer, setAnswer] = useState<string>();
  const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);
  const [questionStatus, setQuestionStatus] = useState<
    "valid" | "invalid" | "unanswered"
  >("unanswered");
  const [availableAnswers, setAvailableAnswers] = useState<string[]>([]);
  const currentQuizItem: QuizItem = p.questions[currentQuizItemIndex];

  useEffect(() => {
    if (questionStatus == "invalid") {
      setCurrentAnim(invalidAnim);
    } else if (questionStatus == "valid") {
      setCurrentAnim(validAnim);
    } else {
      setCurrentAnim(undefined);
    }
  }, [questionStatus]);

  useEffect(() => {
    if (answer) {
      const isValid = isValidAnswer(answer);
      setQuestionStatus(isValid ? "valid" : "invalid");
    }
  }, [answer]);

  useEffect(() => {
    const availableAnswerShuffled = shuffleArray([
      currentQuizItem.correct_answer,
      ...currentQuizItem.incorrect_answers,
    ]);
    setAvailableAnswers(availableAnswerShuffled);
  }, [currentQuizItemIndex]);

  function nextQuestion() {
    setQuestionStatus("unanswered");
    setCurrentQuizItemIndex((c) => c + 1);
  }
  const isValidAnswer = (answer: string): boolean => {
    return answer === currentQuizItem.correct_answer;
  };

  const radioList = availableAnswers.map((anwer_, i) => {
    return (
      <GridItem key={i}>
        <Radio value={anwer_}>
          <Text
            color={
              questionStatus !== "unanswered"
                ? isValidAnswer(anwer_)
                  ? "green.400"
                  : "red.400"
                : "black"
            }
            dangerouslySetInnerHTML={{ __html: anwer_ }}
          />
        </Radio>
      </GridItem>
    );
  });

  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Heading
          as="h1"
          fontSize={"3xl"}
          mt={200}
          mb={20}
          dangerouslySetInnerHTML={{ __html: currentQuizItem.question }}
        />

        <RadioGroup
          onChange={(answer) => {
            if (questionStatus == "unanswered") {
              setAnswer(answer);
            }
          }}
          value={answer}
        >
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            {radioList}
          </Grid>
        </RadioGroup>
        {currentAnim && (
          <Lottie
            style={{ marginTop: 100, height: 150 }}
            lottieRef={lottieRef}
            animationData={currentAnim}
            loop={false}
            onComplete={() => {
              nextQuestion();
            }}
          />
        )}
      </Flex>
    </>
  );
}
