import * as React from "react";
import { ITextIconSpacingProps } from "@react-md/icon";
import { IWithForwardedRef } from "@react-md/utils";

import ButtonChildren from "./ButtonChildren";
import {
  IButtonThemeProps,
  ButtonTheme,
  ButtonThemeType,
  ButtonType,
} from "./types.d";
import theme from "./theme";

/**
 * This interface includes all the props that the `Button` component accepts so the main
 * usecase might be creating a functionality wrapper for the `Button` component, but passes
 * all props down as normal.
 */
export interface IButtonProps
  extends IButtonThemeProps,
    ITextIconSpacingProps,
    React.HTMLAttributes<HTMLButtonElement> {
  /**
   * The button's type attribute. This is set to "button" by default so that forms are not
   * accidentally submitted when this prop is omitted since buttons without a type attribute work
   * as submit by default.
   */
  type?: "button" | "reset" | "submit";

  /**
   * Any children to render within the button. This will normally just be text or an icon.
   *
   * Please note that it is considered invalid html to have a `<div>` as a descendant of a
   * `<button>`. You can fix this by enabling the `asDiv` prop.
   */
  children?: React.ReactNode;
}

/**
 * All the declared default props for the `Button` component. This probably won't be used in many
 * places.
 */
export interface IButtonDefaultProps {
  disabled: boolean;
  theme: ButtonTheme;
  themeType: ButtonThemeType;
  buttonType: ButtonType;
  iconAfter: boolean;
  disableColorFix: boolean;
}

export type ButtonWithDefaultProps = IButtonProps &
  IButtonDefaultProps &
  IWithForwardedRef<HTMLButtonElement>;

export type ButtonComponent = React.FunctionComponent<
  IButtonProps & IWithForwardedRef<HTMLButtonElement>
> & { theme: (props: IButtonThemeProps) => string };

const Button: ButtonComponent = providedProps => {
  const {
    theme,
    themeType,
    buttonType,
    children,
    forwardedRef,
    icon,
    iconAfter,
    beforeClassName,
    afterClassName,
    forceIconWrap,
    disableColorFix,
    ...props
  } = providedProps as ButtonWithDefaultProps;

  return (
    <button
      {...props}
      ref={forwardedRef}
      className={Button.theme(providedProps)}
    >
      <ButtonChildren
        icon={icon}
        iconAfter={iconAfter}
        beforeClassName={beforeClassName}
        afterClassName={afterClassName}
        forceIconWrap={forceIconWrap}
        disabled={disableColorFix}
      >
        {children}
      </ButtonChildren>
    </button>
  );
};

Button.theme = theme;

const defaultProps: IButtonDefaultProps = {
  disabled: false,
  theme: "primary",
  themeType: "flat",
  buttonType: "text",
  iconAfter: false,
  disableColorFix: false,
};

Button.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Button.propTypes = {
      className: PropTypes.string,
      theme: PropTypes.oneOf([
        "clear",
        "primary",
        "secondary",
        "warning",
        "error",
      ]),
      themeType: PropTypes.oneOf(["flat", "outline", "contained"]),
      buttonType: PropTypes.oneOf(["text", "icon"]),
      disabled: PropTypes.bool,
      children: PropTypes.node,
      icon: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
        PropTypes.object,
      ]),
      iconAfter: PropTypes.bool,
      forceIconWrap: PropTypes.bool,
      beforeClassName: PropTypes.string,
      afterClassName: PropTypes.string,
    };
  }
}

export default React.forwardRef<HTMLButtonElement, IButtonProps>(
  (props, ref) => <Button {...props} forwardedRef={ref} />
);