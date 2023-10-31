import React from "react"
import { Path } from "../../../schema/data";
import { _FormContextHandler } from '../../../context/handler';
import { OptionsInput } from "./options";

export default function OriginatesFrom({path, isDisabled, isRequired}:{path: Path, isDisabled:boolean, isRequired:boolean}) {

    const choices = [
        {
            title: "Instrument software",
            tag: "Instrument software",
        },
        {
            title: "User",
            tag: "User",
        },
        {
            title: "MBDB",
            tag: "MBDB",
        },
    ]
    
    return (

        <OptionsInput
            path={path}
            label= "Originates from"
            choices={choices}
            isDisabled={isDisabled}
            isRequired={isRequired}
        />
    )

}


