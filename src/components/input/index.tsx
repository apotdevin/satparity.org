import React from 'react';
import styled, { css } from 'styled-components';
import { ThemeSet } from 'styled-theming';

interface InputProps {
  color?: string;
  backgroundColor?: ThemeSet | string;
  withMargin?: string;
  mobileMargin?: string;
  fullWidth?: boolean;
  mobileFullWidth?: boolean;
  maxWidth?: string;
}

export const StyledInput = styled.input<InputProps>`
  font-size: 14px;
  padding: 5px;
  height: 38px;
  margin: 8px 0;
  border: 1px solid black;
  background: none;
  border-radius: 5px;
  color: black;
  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${maxWidth};
    `}
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  margin: ${({ withMargin }) => (withMargin ? withMargin : '0')};

  @media (max-width: 700px) {
    ${({ withMargin, mobileMargin }) =>
      mobileMargin
        ? css`
            margin: ${mobileMargin};
          `
        : withMargin
        ? css`
            margin: ${withMargin};
          `
        : ''};
    ${({ fullWidth, mobileFullWidth }) =>
      mobileFullWidth
        ? css`
            width: 100%;
          `
        : fullWidth
        ? css`
            width: 100%;
          `
        : ''};
  }

  &:hover {
    border: 1px solid orange;
  }

  &:focus {
    outline: none;
    border: 1px solid orange;
  }
`;

interface InputCompProps {
  type?: string;
  value?: number | string;
  placeholder?: string;
  color?: string;
  backgroundColor?: ThemeSet | string;
  withMargin?: string;
  mobileMargin?: string;
  fullWidth?: boolean;
  mobileFullWidth?: boolean;
  maxWidth?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
}

export const Input = ({
  type,
  value,
  placeholder,
  color,
  backgroundColor,
  withMargin,
  mobileMargin,
  mobileFullWidth,
  fullWidth = true,
  maxWidth,
  onChange,
  onKeyDown,
  onEnter,
}: InputCompProps) => {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      color={color}
      backgroundColor={backgroundColor}
      withMargin={withMargin}
      mobileMargin={mobileMargin}
      onChange={onChange}
      fullWidth={fullWidth}
      mobileFullWidth={mobileFullWidth}
      maxWidth={maxWidth}
      onKeyDown={e => {
        if (onEnter && e.key === 'Enter') {
          onEnter();
        } else {
          onKeyDown && onKeyDown(e);
        }
      }}
    />
  );
};
