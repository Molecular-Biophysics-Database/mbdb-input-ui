import React from "react";
import { _FormContextHandler } from "../../../context/handler";
import { DropdownProps } from "semantic-ui-react";
import {
    Dropdown as SDropdown,
} from 'semantic-ui-react';
import { Value } from "../../../schema/value";

export default function OriginatesFrom({
  value,
  isDisabled,
  isEmpty,
  onChange,
}: {
  value: Value,
  isDisabled: boolean,
  isEmpty: boolean,
  onChange: (event: React.SyntheticEvent, data: DropdownProps) => void,
}) {
  return (
    <>
      <SDropdown
        selection
        options={[
          {
            text: "Instrument software",
            value: "Instrument software",
          },
          {
            text: "User",
            value: "User",
          },
          {
            text: "MBDB",
            value: "MBDB",
          },
        ]}
        disabled={isDisabled || isEmpty}
        value={isEmpty ? "" : Value.toFile(value).metadata.originates_from}
        onChange={onChange}
      ></SDropdown>
    </>
  );
}
