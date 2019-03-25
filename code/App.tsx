import { Data, animate, Override, Animatable } from "framer";

const data = Data({
  scale: Animatable(1),
  text: "",
  location: "",
  background: "rgba(34, 170, 153, 1)"
});

export const Scale: Override = () => {
  return {
    scale: data.scale,
    onTap() {
      data.scale.set(0.6);
      animate.spring(data.scale, 1);
    }
  };
};

export const getValue: Override = () => {
  return {
    onValueChange(value: string) {
      data.text = value;
    }
  };
};

export const setValue: Override = () => ({
  text: data.location
});

export const Submit: Override = () => {
  return {
    onTap() {
      data.location = data.text;
    },

    scale: data.scale,
    background: data.background,
    onMouseEnter() {
      data.scale.set(0.9);
      animate.spring(data.scale, 1);
      data.background = "rgba(34, 170, 153, .5)";
    },

    onMouseLeave() {
      data.background = "rgba(34, 170, 153, 1)";
    }
  };
};
