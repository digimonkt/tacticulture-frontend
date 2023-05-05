import LabeledInputComponent from "@/component/input/labeledInput";
import { InputProps } from "antd";
import OptionsInputComponent from "./optionsInput";
import TextAreaComponents from "./textareaInput";
import SwitchInputComponent from "./switchInput";
import SelectInputComponent from "./selectInput";

export type IInput = InputProps;

export const LabeledInput = LabeledInputComponent;
export const OptionsInput = OptionsInputComponent;
export const TextInput = TextAreaComponents;
export const SwitchInput = SwitchInputComponent;
export const SelectInput = SelectInputComponent;
