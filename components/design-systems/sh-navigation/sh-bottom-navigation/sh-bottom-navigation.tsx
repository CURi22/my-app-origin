"use client";

import Image from "next/image";

import menuSample from "public/icons/menu-sample.svg";
import ellipse from "public/icons/ellipse.svg";
import ellipseOff from "public/icons/ellipse-light.svg";

import "styles/components/design-systems/sh-navigation/sh-bottom-navigation.scss";

interface SHBottomNavigationParams {
  activated?: "menu1" | "menu2" | "menu3" | "menu4" | "menu5";
  disabled?: boolean;
  expanded?: boolean;
  dot?: number;
}

interface MenuAttrProps {
  title: string;
  icon: HTMLImageElement;
  boldIcon: HTMLImageElement;
  disabledIcon: HTMLImageElement;
  onClick(): void;
}

export default function SHBottomNavigation({
  activated,
  disabled,
  expanded,
  dot,
}: SHBottomNavigationParams) {
  function menu1Click(): void {}

  function menu2Click(): void {}

  function menu3Click(): void {}

  function menu4Click(): void {}

  function menu5Click(): void {}

  const menuAttr: MenuAttrProps[] = [
    {
      title: "menu1",
      icon: menuSample,
      boldIcon: menuSample,
      disabledIcon: menuSample,
      onClick: menu1Click,
    },
    {
      title: "menu2",
      icon: menuSample,
      boldIcon: menuSample,
      disabledIcon: menuSample,
      onClick: menu2Click,
    },
    {
      title: "",
      icon: ellipse,
      boldIcon: ellipse,
      disabledIcon: ellipseOff,
      onClick: menu3Click,
    },
    {
      title: "menu4",
      icon: menuSample,
      boldIcon: menuSample,
      disabledIcon: menuSample,
      onClick: menu4Click,
    },
    {
      title: "menu5",
      icon: menuSample,
      boldIcon: menuSample,
      disabledIcon: menuSample,
      onClick: menu5Click,
    },
  ];

  return (
    <div className="sh-bot-nav-container">
      {menuAttr.map((ele: MenuAttrProps, idx: number) =>
        disabled ? (
          idx === 2 ? (
            expanded ? (
              <div className="btn">
                <Image
                  className="exp-ico"
                  src={ele.disabledIcon}
                  width={37}
                  height={37}
                  alt=""
                />
              </div>
            ) : (
              <></>
            )
          ) : (
            <div className="btn" key={ele.title}>
              <Image
                className="ico"
                src={ele.disabledIcon}
                width={20}
                height={20}
                alt=""
              />
              <p className="title-disabled">{ele.title}</p>
            </div>
          )
        ) : idx === 2 ? (
          expanded ? (
            <div className="btn" onClick={ele.onClick} tabIndex={idx}>
              <Image
                className="exp-ico"
                src={ele.icon}
                width={37}
                height={37}
                alt=""
              />
            </div>
          ) : (
            <></>
          )
        ) : ele.title === activated ? (
          <div
            className="btn"
            onClick={ele.onClick}
            tabIndex={idx}
            key={ele.title}
          >
            <Image
              className="ico"
              src={ele.boldIcon}
              width={20}
              height={20}
              alt=""
            />
            <p className="title-bold">{ele.title}</p>
          </div>
        ) : (
          <div
            className="btn"
            onClick={ele.onClick}
            tabIndex={idx}
            key={ele.title}
          >
            {idx === 4 && (
              <div className="menu-5-ico-container">
                {dot === 0 ? (
                  <div className="menu-5-dot" />
                ) : (
                  <div className="menu-5-num">
                    <p className="num">{dot}</p>
                  </div>
                )}
              </div>
            )}
            <Image
              className="ico"
              src={ele.icon}
              width={20}
              height={20}
              alt=""
            />
            <p className="title">{ele.title}</p>
          </div>
        )
      )}
    </div>
  );
}
