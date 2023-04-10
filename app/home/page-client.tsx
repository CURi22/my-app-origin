"use client";

import { useState } from "react";

import SHInput from "components/design-systems/sh-input/sh-input";
import SHButton from "components/design-systems/sh-button/sh-button";
import SHListbox from "components/design-systems/sh-listbox/sh-listbox";

import sample from "public/icons/sample.svg";
import SHBottomNavigation from "components/design-systems/sh-navigation/sh-bottom-navigation/sh-bottom-navigation";

export default function HomeClient() {
  const [value, setValue] = useState<any>("");

  return (
    <>
      {/* <SHButton
        category={{
          color: "primary",
          line: "fill",
          shape: "circle",
          size: "large",
          status: "enabled",
        }}
        text="btn"
      /> */}
      {/* <SHInput
        category="text-field"
        counter={99}
        eyeIcon
        helper="help"
        input={{
          type: "text",
          value,
          onChangeInput: (e: any) => {
            setValue(e.target.value);
          },
        }}
        status="enabled"
        label="label"
        onClickClear={() => {
          setValue("");
        }}
      /> */}
      {/* <SHListbox
        leftContainer={{ type: "ico", image: sample }}
        lineType={1}
        rightContainer={{ type: "checkbox" }}
        text={["title"]}
        onClick={() => {}}
      /> */}
      <SHBottomNavigation expanded dot={9} />
    </>
  );
}
