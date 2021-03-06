import * as React from "react";
import { PropertyControls, ControlType } from "framer";
import styled from "styled-components";

interface Props {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  backgroundColor: string;
  textColor: string;
  focusColor: string;
  fontSize: number;
  width: number;
  height: number;
  radius: number;
  padding: number;
  paddingPerSide: boolean;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  border: string;
  borderWidth: number;
  multiLine: boolean;
  password: boolean;
  number: boolean;
}

interface State {
  value: string;
  valueFromProps: string;
}

export class Input extends React.Component<Partial<Props>, State> {
  static defaultProps = {
    value: "",
    placeholder: "Type something…",
    width: 300,
    height: 50,
    backgroundColor: "#FFF",
    textColor: "#000",
    focusColor: "#09F",
    fontSize: 15,
    radius: 10,
    padding: 15,
    paddingPerSide: false,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    border: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    multiLine: false,
    password: false,
    number: false
  };

  static propertyControls: PropertyControls<Props> = {
    value: { type: ControlType.String, title: "Value" },
    placeholder: { type: ControlType.String, title: "Default" },
    textColor: { type: ControlType.Color, title: "Text" },
    backgroundColor: { type: ControlType.Color, title: "Fill" },
    border: { type: ControlType.Color, title: "Border" },
    borderWidth: {
      type: ControlType.Number,
      title: " ",
      min: 1,
      max: 5,
      displayStepper: true
    },

    focusColor: { type: ControlType.Color, title: "Focus" },
    padding: {
      type: ControlType.FusedNumber,
      toggleKey: "paddingPerSide",
      toggleTitles: ["All Sides", "Per Side"],
      valueKeys: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
      valueLabels: ["T", "R", "B", "L"],
      min: 0,
      title: "Padding"
    },
    radius: { type: ControlType.Number, title: "Radius" },
    fontSize: { type: ControlType.Number, title: "Font Size", min: 5, max: 25 },
    multiLine: { type: ControlType.Boolean, title: "Text Area" },
    password: { type: ControlType.Boolean, title: "Password" },
    number: { type: ControlType.Boolean, title: "Number" }
  };

  state = {
    value: Input.defaultProps.value,
    valueFromProps: Input.defaultProps.value
  };

  // Allow setting the Value from within the property panel.
  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.value !== state.valueFromProps) {
      return { value: props.value, valueFromProps: props.value };
    }
  }

  onChange = (event: React.ChangeEvent) => {
    const element = this.props.multiLine
      ? (event.nativeEvent.target as HTMLTextAreaElement)
      : (event.nativeEvent.target as HTMLInputElement);

    const value = element.value;

    this.setState({ value });

    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  };

  StyledInput = this.props.multiLine
    ? styled.textarea`
        &:focus {
          box-shadow: inset 0 0 0 ${this.props.borderWidth}px
            ${this.props.focusColor} !important;
        }
      `
    : styled.input`
        &:focus {
          box-shadow: inset 0 0 0 ${this.props.borderWidth}px
            ${this.props.focusColor} !important;
        }
      `;

  render() {
    const {
      placeholder,
      backgroundColor,
      textColor,
      fontSize,
      radius,
      paddingPerSide,
      padding,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      border,
      borderWidth,
      password,
      number
    } = this.props;

    const { value } = this.state;

    const paddingValue = paddingPerSide
      ? `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`
      : padding;

    return (
      <this.StyledInput
        onChange={this.onChange}
        value={value}
        placeholder={placeholder}
        style={{
          ...style,
          backgroundColor,
          color: textColor,
          fontSize: fontSize,
          borderRadius: radius,
          padding: paddingValue,
          boxShadow: `inset 0 0 0 ${borderWidth}px ${border}`
        }}
        type={password ? "password" : number ? "number" : "text"}
        min="1"
        step="any"
      />
    );
  }
}

const style: React.CSSProperties = {
  border: "none",
  paddingLeft: 12,
  paddingRight: 12,
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  outline: "none",
  resize: "none"
};
