import {
  Box,
  Button,
  Flex,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface Props {
  onNext: (amount: number) => void;
}

const MIN = 5;
const MAX = 30;
const STEP = 5;

export function SetQuestionQty(p: Props) {
  const [amount, setAmount] = useState<number>(MIN);

  const renderMarks = () => {
    const marks = [];
    for (let i = MIN; i <= MAX; i += STEP) {
      marks.push(
        <SliderMark ml="-3" pt={4} key={i} value={i} fontSize={"xl"}>
          {i}
        </SliderMark>
      );
    }
    return marks;
  };

  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Heading as="h1" fontSize={"3xl"} mb={20}>
          How many questions?
        </Heading>
        <Box minW={400}>
          <Slider
            step={STEP}
            max={MAX}
            min={MIN}
            value={amount}
            onChange={setAmount}
            colorScheme="yellow"
            mb={"14"}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
            {renderMarks()}
          </Slider>
        </Box>
      </Flex>
      <Button
        right={150}
        position={"fixed"}
        top={"80%"}
        onClick={() => p.onNext(amount)}
        rightIcon={<ArrowForwardIcon />}
      >
        Set category
      </Button>
    </>
  );
}
