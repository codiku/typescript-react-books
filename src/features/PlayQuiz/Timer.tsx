import { useEffect, useState } from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

interface Props {
  startFrom: number;
  onFinished: () => void;
}
let timer: NodeJS.Timer;
export const Timer = (p: Props) => {
  const [progress, setProgress] = useState<number>(p.startFrom);

  useEffect(() => {
    if (progress <= 0) {
      p.onFinished();
      clearInterval(timer);
    }
  }, [progress]);

  useEffect(() => {
    timer = setInterval(() => {
      setProgress((prevProgress) => prevProgress - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <CircularProgress
      max={p.startFrom}
      value={progress}
      borderRadius="0 4px 4px 0"
    >
      <CircularProgressLabel fontWeight={"bold"}>
        {progress}
        {"'"}
      </CircularProgressLabel>
    </CircularProgress>
  );
};
