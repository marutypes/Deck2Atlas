"use client"

import NextLink from "next/link";
import classNames from "classnames";
import type { ComponentProps } from "react";

export default function Link(props: ComponentProps<typeof NextLink>) {
  return (
    <NextLink
      className={classNames(
        "inline-block text-bold text-purple-200 hover:underline border-0",
        props.className,
      )}
      {...props}
    >{props.children}</NextLink>
  );
}
