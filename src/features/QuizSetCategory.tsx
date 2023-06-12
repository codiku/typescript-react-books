/* @todo Add a description */

import { QuizCategory } from "../types/quiz.type";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useState } from "react";
interface Props {
  categories: QuizCategory[];
  onNext: (categoryId: number) => void;
}
export function QuizSetCategory(p: Props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    p.categories[0].id.toString()
  );

  const radioCardList = p.categories.map((category) => {
    return (
      <GridItem key={category.id}>
        <Radio value={category.id.toString()}>{category.name}</Radio>
      </GridItem>
    );
  });

  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Heading as="h1" fontSize={"3xl"} mt={200} mb={20}>
          Which topic?
        </Heading>
        <RadioGroup
          onChange={(categoryId: string) => {
            setSelectedCategoryId(categoryId);
          }}
          value={selectedCategoryId}
        >
          <Grid mt={"30"} templateColumns="repeat(5, 1fr)" gap={4}>
            {radioCardList}
          </Grid>
        </RadioGroup>
      </Flex>

      <Flex mt={"60"} position={"fixed"} right={150} top={"60%"}>
        <Button
          onClick={() => p.onNext(Number.parseInt(selectedCategoryId))}
          rightIcon={<ArrowForwardIcon />}
        >
          Set difficulty
        </Button>
      </Flex>
    </>
  );
}
