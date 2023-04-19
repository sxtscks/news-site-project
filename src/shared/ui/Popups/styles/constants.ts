import { DropdownDirection } from '../../../types/ui';
import classes from './popup.module.scss';

export const mapDirectionClass: Record<DropdownDirection, string> = {
  bottomLeft: classes.optionBottomLeft,
  bottomRight: classes.optionBottomRight,
  topLeft: classes.optionTopLeft,
  topRight: classes.optionTopRight,
};
