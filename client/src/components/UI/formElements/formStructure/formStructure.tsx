import React from "react";

import Input from "../input/input";
import Button from "../button/button";
import FormTitle from "../formTitle/formTitle";
import styles from "./formStructure.module.scss";

interface Props {
  state: any;
  onChangeHandler: any;
  btnText: string;
  formTitle: string;
  submitted: any;
  children?: JSX.Element;
}

const formStructure = (props: Props) => {
  let key: keyof typeof props.state;
  let elements = [];
  for (key in props.state) {
    elements.push({
      id: key,
      config: props.state[key],
    });
  }

  const formElements = elements.map((input: any) => {
    return (
      <Input
        key={input.id}
        type={input.config.type}
        inputType={input.config.inputType}
        placeholder={input.config.placeholder}
        inputValue={input.config.val}
        onChangeInput={(e: { target: HTMLInputElement }) =>
          props.onChangeHandler(e, input.id)
        }
        label={input.config.label}
        validity={input.config.valid}
        touched={input.config.touched}
        stateMain={props.state}
      />
    );
  });

  return (
    <form onSubmit={(event) => props.submitted(event)} className={styles.form}>
      <FormTitle>{props.formTitle}</FormTitle>
      {formElements} {props.children}{" "}
      <Button disabled={!props.state.formValid}>{props.btnText}</Button>
    </form>
  );
};

export default formStructure;
