import React, {
  FunctionComponent,
  ReactType,
  HTMLAttributes,
  forwardRef,
} from "react";
import cn from "classnames";
import { WithForwardedRef } from "@react-md/utils";

export type AppBarPosition = "top" | "bottom";
export type AppBarTheme = "clear" | "primary" | "secondary" | "default";

export interface AppBarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The component for the `AppBar` to render as. This should normally either just be the default
   * `"header"` or a `"div"` component.
   *
   * It is generally recommended to not provide other React components for this prop even though
   * it is possible since it leads to bad practice and props might not get passed as one would
   * expect.
   */
  component?: ReactType;

  /**
   * Boolean if the `AppBar` should be fixed to the top or bottom of the page.
   */
  fixed?: boolean;

  /**
   * The position within the page to "fix" the `AppBar` when the `fixed` prop is enabled.
   */
  fixedPosition?: AppBarPosition;

  /**
   * Boolean if the fixed `AppBar` should gain elevation. This is recommended to stay enabled unless
   * you manually apply a border to help separate the `AppBar` from other content.
   */
  fixedElevation?: boolean;

  /**
   * Boolean if the `AppBar` should use the `dense` spec. This prop can be used along with the
   * `prominent` prop to create a prominent and dense `AppBar`.
   */
  dense?: boolean;

  /**
   * Boolean if the `AppBar` should use the `prominent` spec. This prop can be used along with
   * the `dense` prop to create a prominent and dense `AppBar`.
   */
  prominent?: boolean;

  /**
   * The theme to apply to the `AppBar`.
   */
  theme?: AppBarTheme;

  /**
   * Boolean if the `AppBarNav`, `AppBarTitle`, and `AppBarActions` should inherit the color that
   * for the provided `theme`. If this value is `undefined`, the color will only be inherited when
   * the theme is set to `primary` or `secondary`. However if this value is a boolean, it will be
   * used instead. So if you set this to `false` and set the `theme` to `"primary"`, the defined
   * primary text clor will not be inherited.
   */
  inheritColor?: boolean;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<
  Pick<
    AppBarProps,
    | "component"
    | "fixed"
    | "fixedPosition"
    | "fixedElevation"
    | "dense"
    | "prominent"
    | "theme"
  >
>;
type WithDefaultProps = AppBarProps & DefaultProps & WithRef;

/**
 * This component is used to create a top-level app bar in your application that can be used to contain
 * a navigation menu toggle button, the app's logo and/or title, as well as any top-level actions that
 * will be reused throughout your app. When using this component with the `fixed` prop, it is recommended
 * to also use one of the "offset class names" so that your content will not be convered by the app bar.
 * You can also use any of the exposed mixins to add these offsets as well.
 *
 * TODO: Add links to offset class names and mixins once I figure out how to generate my documentation
 * site from Typedoc.
 */
const AppBar: FunctionComponent<AppBarProps & WithRef> = providedProps => {
  const {
    component: Component,
    className,
    forwardedRef,
    children,
    dense,
    prominent,
    fixed,
    fixedPosition,
    fixedElevation,
    theme,
    inheritColor,
    ...props
  } = providedProps as WithDefaultProps;

  const inherit =
    typeof inheritColor === "boolean"
      ? inheritColor
      : theme !== "clear" && theme !== "default";

  return (
    <Component
      {...props}
      className={cn(
        "rmd-app-bar",
        {
          "rmd-app-bar--child-inherit": inherit,
          "rmd-app-bar--dense": dense && !prominent,
          "rmd-app-bar--prominent": prominent,
          "rmd-app-bar--prominent-dense": dense && prominent,
          "rmd-app-bar--fixed": fixed,
          "rmd-app-bar--fixed-elevation": fixed && fixedElevation,
          [`rmd-app-bar--${theme}`]: theme !== "clear",
          [`rmd-app-bar--${fixedPosition}`]: fixed,
        },
        className
      )}
      ref={forwardedRef}
    >
      {children}
    </Component>
  );
};

const defaultProps: DefaultProps = {
  component: "header",
  fixed: false,
  fixedPosition: "top",
  fixedElevation: true,
  dense: false,
  prominent: false,
  theme: "primary",
};

AppBar.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  AppBar.displayName = "AppBar";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    AppBar.propTypes = {
      className: PropTypes.string,
      component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
      ]),
      children: PropTypes.node,
      dense: PropTypes.bool,
      prominent: PropTypes.bool,
      fixed: PropTypes.bool,
      fixedPosition: PropTypes.oneOf(["top", "bottom"]),
      fixedElevation: PropTypes.bool,
      inheritColor: PropTypes.bool,
      theme: PropTypes.oneOf(["primary", "secondary", "default", "clear"]),
    };
  }
}

export default forwardRef<HTMLDivElement, AppBarProps>((props, ref) => (
  <AppBar {...props} forwardedRef={ref} />
));