import LabeledInputComponent from "@/component/input/labeledInput";
import { InputProps } from "antd";
import OptionsInputComponent from "./optionsInput";
import TextAreaComponents from "./textareaInput";

export type IInput = InputProps;

export const LabeledInput = LabeledInputComponent;
export const OptionsInput = OptionsInputComponent;
export const TextInput = TextAreaComponents;
