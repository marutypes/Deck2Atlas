import NextLink from "next/link";
import classNames from "classnames";
import type { ComponentProps } from "react";

export default function Link(props: ComponentProps<typeof NextLink>) {
  let isSelected = false;
  if (typeof window !== "undefined") {
    console.log("meep");
    isSelected = props.href == window.location.pathname;
  }
  return (
    <NextLink
      className={classNames(
        "inline-block text-bold text-purple-200 hover:underline border-0",
        {
          underline: isSelected,
        }
      )}
      {...props}
    >{props.children}</NextLink>
  );
}
