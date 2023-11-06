import { useState } from "react";

export interface useTextInputProps {
  name: string;
  regex?: RegExp;
  required?: boolean;
}

function useTextInputs(inputFieldsSettings: useTextInputProps[]) {
  const nameArray = inputFieldsSettings.map(
    (inputFieldSetting) => inputFieldSetting.name,
  );
  if (Array.from(new Set(nameArray)).length !== nameArray.length) {
    throw new Error("Duplicate input field name!");
  }

  const [inputs, setInputs] = useState<{
    [key: string]: {
      value: string;
      regex: RegExp;
      isValid: boolean;
    };
  }>(
    inputFieldsSettings.reduce(
      (acc, { name, regex, required = true }) => ({
        ...acc,
        [name]: {
          value: "",
          regex: regex ?? (required ? /^.+$/ : /.*/),
          isValid: !regex && !required,
        },
      }),
      {},
    ),
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(({ [name]: input, ...inputs }) => ({
      ...inputs,
      [name]: {
        ...input,
        value: value,
        isValid: input.regex.test(value),
      },
    }));
  };

  return { inputs, onChange };
}

export default useTextInputs;
