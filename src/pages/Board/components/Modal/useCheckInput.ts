import React, { useState } from "react";

function useCheckInput(target: string) {
  const [isValid, setIsValid] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === target) setIsValid(true);
    else setIsValid(false);
  };

  return { onChange, isValid };
}

export default useCheckInput;
