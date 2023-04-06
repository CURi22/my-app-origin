"use client";

import { SHTabBox } from "components/design-systems/sh-tab-box/sh-tab-box";
import { useState } from "react";

export default function HomeClient() {
  const [value, setValue] = useState<number>(-1);

  return (
    <>
      <SHTabBox
        category="tab"
        tabs={[
          "menu1",
          "menu2",
          "menu3",
          "menu4",
          "menu5",
          "menu6",
          "menu7",
          "menu8",
          "menu9",
        ]}
        onClick={() => {}}
      />
    </>
  );
}
