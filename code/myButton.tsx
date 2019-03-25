import * as React from "react";
import {
  PropertyControls,
  ControlType,
  Data,
  animate,
  Animatable,
  Frame
} from "framer";

interface Props {
  width: number;
  height: number;
  tintColor: string;
}

export class myButton extends React.Component<Props> {
  static defaultProps = {
    width: 300,
    height: 50,
    tintColor: "#007AFF"
  };

  static propertyControls: PropertyControls<Props> = {
    tintColor: { type: ControlType.Color, title: "Tint" }
  };

  data = Data({
    scale: Animatable(1),
    background: "rgba(34, 170, 153, 1)"
  });

  onMouseEnter = () => {
    this.data.scale.set(0.9);
    animate.spring(this.data.scale, 1);
    this.data.background = "rgba(34, 170, 153, .1)";
  };

  onMouseLeave = () => {
    this.data.background = "rgba(34, 170, 153, 1)";
  };

  render() {
    const { width, height, tintColor } = this.props;
    return (
      <Frame
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        scale={this.data.scale}
        width={width}
        height={height}
        background={tintColor}
      >
        {this.props.children}
      </Frame>
    );
  }
}
