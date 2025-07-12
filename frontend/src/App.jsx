import { Button } from "@chakra-ui/react";
import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button>
        Click Here.
      </Button>
    </>
  );
}

export default App;
