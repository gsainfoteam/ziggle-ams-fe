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
      isValid: inputSetting.required === false ? true : false,
    })),
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((inputs) => {
      const targetInputIndex = inputs.findIndex(
        (input) => input.name === e.target.name,
      );
      return inputs
        .filter((input) => input.name !== e.target.name) // TODO:
        .concat({
          ...inputs[targetInputIndex],
          value: e.target.value,
          isValid: inputs[targetInputIndex].regex.test(e.target.value),
        });
    });
  };

  return { inputs, onChange };
}

export default useTextInputs;
