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
  Box,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { shuffleArray } from "../utils";
import invalidAnim from "../assets/lottie/invalid.json";
import validAnim from "../assets/lottie/valid.json";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { Timer } from "./Timer";

interface Props {
  questions: QuizItem[];
  onFinished: (history: boolean[]) => void;
}
export function QuizPlay(p: Props) {
  const [history, setHistory] = useState<boolean[]>([]);
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
    switch (questionStatus) {
      case "valid":
        setCurrentAnim(validAnim);
        break;
      case "invalid":
        setCurrentAnim(invalidAnim);
        break;
      case "unanswered":
        setCurrentAnim(undefined);
        break;
    }
  }, [questionStatus]);

  useEffect(() => {
    if (answer) {
      const isValid = isValidAnswer(answer);
      setHistory([...history, isValid]);
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

  function outOftime() {
    setHistory([...history, false]);
    setQuestionStatus("invalid");
  }
  const isValidAnswer = (answer: string): boolean => {
    return answer === currentQuizItem.correct_answer;
  };

  const progressBar = () => {
    return (
      <HStack mt={50}>
        {p.questions.map((_, i) => {
          return (
            <Box
              key={i}
              h={5}
              backgroundColor={
                i >= currentQuizItemIndex
                  ? "gray.200"
                  : history[i] === true
                  ? "green.300"
                  : "red.300"
              }
              w={50}
            />
          );
        })}
      </HStack>
    );
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
        {progressBar()}
        <Box position={"absolute"} top={50} right={50}>
          {questionStatus === "unanswered" && (
            <Timer durationSec={10} onFinished={() => outOftime()} />
          )}
        </Box>
        <Heading
          as="h1"
          fontSize={"3xl"}
          mt={100}
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
              if (currentQuizItemIndex < p.questions.length - 1) {
                nextQuestion();
              } else {
                p.onFinished(history);
              }
            }}
          />
        )}
      </Flex>
    </>
  );
}
