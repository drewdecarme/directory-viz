import type { Meta, StoryObj } from "@storybook/react";

import { Button, type ButtonProps } from "./Button";

const meta: Meta = {
  title: "Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ContainedPrimarySmall: Story = {
  args: {
    dxVariant: "contained",
    dxColor: "primary",
    dxSize: "sm",
    children: "Get Started",
  } as ButtonProps,
};

export const ContainedSecondarySmall: Story = {
  args: {
    dxVariant: "contained",
    dxColor: "secondary",
    dxSize: "sm",
    children: "Get Started",
  },
};

export const ContainedPrimaryMedium: Story = {
  args: {
    dxVariant: "contained",
    dxColor: "primary",
    dxSize: "md",
    children: "Get Started",
  },
};

export const ContainedPrimaryLarge: Story = {
  args: {
    dxVariant: "contained",
    dxColor: "primary",
    dxSize: "lg",
    children: "Get Started",
  },
};

export const IconSmall: Story = {
  args: {
    dxVariant: "icon",
    dxSize: "sm",
  },
};

export const IconMedium: Story = {
  args: {
    dxVariant: "icon",
    dxSize: "md",
  },
};

export const IconLarge: Story = {
  args: {
    dxVariant: "icon",
    dxSize: "lg",
  },
};
