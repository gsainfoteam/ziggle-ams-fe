import { useState } from "react";

export interface useTextInputProps {
  name: string;
  regex?: RegExp;
  required?: boolean;
}

function useTextInputs(inputfeildsSettings: useTextInputProps[]) {
  const [inputs, setInputs] = useState(
    inputfeildsSettings.map((inputSetting) => ({
      ...inputSetting,
      value: "",
      regex:
        inputSetting.regex ?? (inputSetting.required ?? true ? /^.+$/ : /.*/),
      isValid: inputSetting.required ?? true ? false : true,
    })),
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((inputs) => {
      const targetInputIndex = inputs.findIndex((input) => input.name === name);
      return inputs
        .filter((input) => input.name !== name)
        .concat({
          ...inputs[targetInputIndex],
          value: value,
          isValid: inputs[targetInputIndex].regex.test(value),
        });
    });
  };

  return { inputs, onChange };
}

export default useTextInputs;
