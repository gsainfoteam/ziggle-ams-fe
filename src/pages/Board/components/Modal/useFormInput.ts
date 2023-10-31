import React, { useEffect, useState } from "react";

function useFormInput(targetString: string) {
  const [formInput, setInput] = useState("");
  const [isValid, setIsValid] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (formInput === targetString) setIsValid(true);
    else setIsValid(false);
  }, [formInput, targetString]);

  return { onChange, isValid };
}

export default useFormInput;
