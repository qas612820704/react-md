import React, { FC, forwardRef } from "react";
import cn from "classnames";
import { Button, ButtonProps } from "@react-md/button";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

import { AppBarColorInherit, useInheritContext } from "./useInheritContext";

export interface AppBarNavProps extends ButtonProps, AppBarColorInherit {}

type WithRef = WithForwardedRef<HTMLButtonElement>;

const block = bem("rmd-app-bar");

/**
 * This component is really just a simple wrapper for the `Button` component that adds some
 * additional styles for adding spacing before and after this button so that it aligns to
 * the main "keyline" of your application's navigation. In simpler terms, it will make
 * the left side of the icon in this button aligns with all the other icons that appear in
 * `ListItem`s in your main navigation.
 *
 * This component is generally really only used when you want to have a temporary navigation
 * element like a hamburger menu.
 */
const AppBarNav: FC<AppBarNavProps & WithRef> = ({
  className,
  forwardedRef,
  children,
  inheritColor,
  ...props
}) => (
  <Button
    {...props}
    ref={forwardedRef}
    className={cn(
      block("nav", {
        inherit: useInheritContext(inheritColor),
      }),
      className
    )}
  >
    {children}
  </Button>
);

AppBarNav.defaultProps = {
  buttonType: "icon",
  theme: "clear",
};

if (process.env.NODE_ENV !== "production") {
  AppBarNav.displayName = "AppBarNav";
}

export default forwardRef<HTMLButtonElement, AppBarNavProps>((props, ref) => (
  <AppBarNav {...props} forwardedRef={ref} />
));