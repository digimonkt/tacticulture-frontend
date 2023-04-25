import FilledButtonComponent from "@/component/buttons/filledButton";
import { ButtonProps } from "antd";
import OutlinedButtonComponent from "./outlinedButton";

export interface IButton extends ButtonProps {}

export const FilledButton = FilledButtonComponent;
export const OutlinedButton = OutlinedButtonComponent;
