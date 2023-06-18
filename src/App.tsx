import { Box, Flex, Image } from "@chakra-ui/react";
import logoImg from "./assets/logo.png";
import bubbleImg from "./assets/bubble.png";
import "../global.css";
export function App() {
  const header = (
    <Flex justify="center">
      <Image h={"24"} src={logoImg} />
    </Flex>
  );

  return (
    <Box py={"10"} h="100%">
      {header}
      <Image
        src={bubbleImg}
        zIndex={-1}
        position="absolute"
        right={-120}
        top={100}
      />
      <Box mt={100}>Todo</Box>
    </Box>
  );
}
