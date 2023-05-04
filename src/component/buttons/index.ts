import FilledButtonComponent from "@/component/buttons/filledButton";
import { ButtonProps } from "antd";
import OutlinedButtonComponent from "./outlinedButton";
import RadioButtonComponent from "./radioButton";

export type IButton = ButtonProps;

export const FilledButton = FilledButtonComponent;
export const OutlinedButton = OutlinedButtonComponent;
export const RadioButton = RadioButtonComponent;
