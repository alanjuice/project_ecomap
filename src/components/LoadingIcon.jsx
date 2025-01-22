import React from "react";
import { Mosaic } from "react-loading-indicators";

export default function LoadingIcon() {
    return (
        <div className="flex justify-center items-center h-screen mx-auto">
            <Mosaic color={["#33CCCC", "#33CC36", "#B8CC33", "#FCCA00"]} />
        </div>
    );
}
