import { useEffect, useState } from "react";
import { QuizCategory } from "../types/quiz-type";
import { QuizAPI } from "../api/quiz-api";
import {
  Button,
  Flex,
  GridItem,
  Heading,
  Radio,
  RadioGroup,
  SimpleGrid,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export function SetQuestionCategory(p: {
  categories: QuizCategory[];
  onClickNext: (category: string) => void;
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    p.categories[0].id.toString()
  );
  const radioCardList = p.categories.map((category: QuizCategory) => {
    return (
      <GridItem key={category.id}>
        <Radio value={category.id.toString()}>{category.name}</Radio>
      </GridItem>
    );
  });

  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Heading as="h1" fontSize={"3xl"} mb={10}>
          Which topic?
        </Heading>
        <RadioGroup onChange={setSelectedCategoryId} value={selectedCategoryId}>
          <SimpleGrid columns={[1, 3, 4]} mt={"30"} spacing={"4"}>
            {radioCardList}
          </SimpleGrid>
        </RadioGroup>
      </Flex>
      <Button
        onClick={() => p.onClickNext(selectedCategoryId)}
        position={"absolute"}
        top={"80%"}
        right={"10%"}
        rightIcon={<ArrowForwardIcon />}
      >
        Set difficulty
      </Button>
    </>
  );
}
