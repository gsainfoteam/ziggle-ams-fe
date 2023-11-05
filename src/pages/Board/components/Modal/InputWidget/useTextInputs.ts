import { useState } from "react";

export interface useTextInputProps {
  name: string;
  regex?: RegExp;
  required?: boolean;
}

function useTextInputs(inputFieldsSettings: useTextInputProps[]) {
  const [inputs, setInputs] = useState(
    inputFieldsSettings.map((inputSetting) => ({
      ...inputSetting,
      value: "",
      regex: inputSetting.regex ?? (!inputSetting.required ? /.*/ : /^.+$/),
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
