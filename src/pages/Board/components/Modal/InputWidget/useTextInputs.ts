import { useState } from "react";

export interface useTextInputProps {
  name: string;
  test?: (input: string) => boolean;
  required?: boolean;
  value?: string;
}

interface inputs {
  [key: string]: {
    value: string;
    test: (input: string) => boolean;
    isValid: boolean;
  };
}

function useTextInputs(inputFieldsSettings: useTextInputProps[]) {
  const nameArray = inputFieldsSettings.map(
    (inputFieldSetting) => inputFieldSetting.name,
  );
  if (Array.from(new Set(nameArray)).length !== nameArray.length) {
    throw new Error("Duplicate input field name!");
  }

  const [inputs, setInputs] = useState<inputs>(
    inputFieldsSettings.reduce(
      (acc, { name, test, required = true, value = "" }) => ({
        ...acc,
        [name]: {
          value: value,
          test:
            test ??
            (required
              ? (input) => /^.+$/.test(input)
              : (input) => /.*/.test(input)),
          isValid: !test && !required,
        },
      }),
      {},
    ),
  );

  const validate = (name: string, value: string) => {
    setInputs(({ [name]: input, ...inputs }) => ({
      ...inputs,
      [name]: {
        ...input,
        value: value,
        isValid: input.test(value),
      },
    }));
  };

  const initialCheck = () => {
    Object.keys(inputs).map((name) => validate(name, inputs[name].value));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validate(name, value);
  };

  return { inputs, onChange, initialCheck, setInputs };
}

export default useTextInputs;
