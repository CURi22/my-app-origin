"use client";

import Image from "next/image";
import { ReactElement } from "react";

import chevronLeft from "public/icons/chevron-left.svg";
import chevronRight from "public/icons/chevron-right.svg";
import xIcon from "public/icons/x-icon.svg";

import "styles/components/design-systems/sh-navigation/sh-top-navigation.scss";

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

export default function SHTopNavigation({
  leftContainer,
  rightContainer,
  titleContainer,
}: SHTopNavigationParams) {
  function leftElement(param: LeftContainerParams): ReactElement {
    return (
      <div className="left-btn" onClick={param.onClick} tabIndex={0}>
        {param.type === "arrow" ? (
          <Image
            className="ico"
            src={chevronLeft}
            width={32}
            height={32}
            alt="<"
          />
        ) : param.type === "cancle" ? (
          <p className="txt">취소</p>
        ) : (
          <></>
        )}
      </div>
    );
  }

  function titleElement(param: TitleContainerElementParams): ReactElement {
    return (
      <div className={`title-container-${param.position}`}>
        <p className="txt">{param.text}</p>
      </div>
    );
  }

  function rightElement(param: RightContainerParams): ReactElement {
    return (
      <div className="right-btn" onClick={param.onClick} tabIndex={1}>
        {param.type === "arrow" ? (
          <Image
            className="ico"
            src={chevronRight}
            width={32}
            height={32}
            alt=">"
          />
        ) : param.type === "cancle" ? (
          <Image className="ico" src={xIcon} width={32} height={32} alt="X" />
        ) : param.type === "confirm" ? (
          <p className="txt">확인</p>
        ) : (
          <></>
        )}
      </div>
    );
  }

  return (
    <div className="sh-top-nav-container">
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
