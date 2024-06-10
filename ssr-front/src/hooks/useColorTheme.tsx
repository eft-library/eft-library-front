import { useColorMode } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

export const ColorMode = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <Button size="sm" onClick={toggleColorMode}>
      Toggle Mode
    </Button>
  );
};
