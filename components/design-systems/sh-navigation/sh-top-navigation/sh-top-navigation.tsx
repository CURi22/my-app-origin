"use client";

import Image from "next/image";
import { ReactElement } from "react";

import chevronLeft from "public/icons/chevron-left.svg";
import chevronRight from "public/icons/chevron-right.svg";
import xIcon from "public/icons/x-icon.svg";

import "styles/components/design-systems/sh-navigation/sh-top-navigation/sh-top-navigation.scss";

interface LeftContainerParams {
  type: "arrow" | "cancle";
  onClick(): void;
}

interface RightContainerParams {
  type: "arrow" | "cancle" | "confirm";
  onClick(): void;
}

interface TitleContainerElementParams {
  position: "center" | "left" | "right";
  text: string;
}

interface SHTopNavigationParams {
  leftContainer?: LeftContainerParams;
  rightContainer?: RightContainerParams;
  titleContainer?: TitleContainerElementParams;
}

export function SHTopNavigation({
  leftContainer,
  rightContainer,
  titleContainer,
}: SHTopNavigationParams) {
  function leftElement({ type, onClick }: LeftContainerParams): ReactElement {
    return (
      <div className="left-btn" onClick={onClick} tabIndex={0}>
        {type === "arrow" ? (
          <Image
            className="icon"
            src={chevronLeft}
            width={32}
            height={32}
            alt="<"
          />
        ) : type === "cancle" ? (
          <p className="text">취소</p>
        ) : (
          <></>
        )}
      </div>
    );
  }

  function titleElement({
    position,
    text,
  }: TitleContainerElementParams): ReactElement {
    return (
      <div className={`title-container-${position}`}>
        <p className="text">{text}</p>
      </div>
    );
  }

  function rightElement({ type, onClick }: RightContainerParams): ReactElement {
    return (
      <div className="right-btn" onClick={onClick} tabIndex={1}>
        {type === "arrow" ? (
          <Image
            className="icon"
            src={chevronRight}
            width={32}
            height={32}
            alt=">"
          />
        ) : type === "cancle" ? (
          <Image className="icon" src={xIcon} width={32} height={32} alt="X" />
        ) : type === "confirm" ? (
          <p className="text">확인</p>
        ) : (
          <></>
        )}
      </div>
    );
  }

  return (
    <div className="sh-top-navigation-container">
      {leftContainer !== undefined && leftElement(leftContainer)}
      {titleContainer !== undefined && (
        <>
          {titleContainer.position === "center" &&
            leftContainer === undefined &&
            rightContainer !== undefined && <div className="block" />}
          {titleElement(titleContainer)}
          {titleContainer.position === "center" &&
            leftContainer !== undefined &&
            rightContainer === undefined && <div className="block" />}
        </>
      )}
      {rightContainer !== undefined && rightElement(rightContainer)}
    </div>
  );
}
