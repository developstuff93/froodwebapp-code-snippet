// @flow
import React from 'react';
import { Input, InputNumber } from 'antd';

type Props = {
  input: {
    value: number | string,
    onChange: Function
  },
  style?: Object,
  className?: string,
  autosize: false,
  type?: 'number' | 'text',
  formatter?: Function,
  parser?: Function,
  placeholder?: string,
  prefix?: React.Element<*>,
  disabled?: boolean,
  min?: number,
  max?: number
};

const FormInput = (
  { input: { value, onChange },
    style = {
      width: '100%'
    },
    type = 'text',
    className,
    formatter,
    parser,
    placeholder,
    disabled = false,
    prefix,
    min,
    max
  }: Props) => {
  if (type === 'number') {
    return (
      <InputNumber
        className={ className }
        placeholder={ placeholder }
        value={ value }
        onChange={ onChange }
        disabled={ disabled }
        style={ style }
        min={ min }
        max={ max }
        formatter={ formatter }
        parser={ parser }
      />
    );
  }
  if (type === 'textarea') {
    return (
      <Input
        className={ className }
        style={ style }
        placeholder={ placeholder }
        prefix={ prefix }
        type={ type }
        value={ value }
        onChange={ onChange }
        disabled={ disabled }
        autosize
      />
    );
  }
  return (
    <Input
      className={ className }
      style={ style }
      placeholder={ placeholder }
      prefix={ prefix }
      type={ type }
      value={ value }
      onChange={ onChange }
      disabled={ disabled }
    />
  );
};

export default FormInput;
