import CommonLayout from "../../components/common-layout";
import UnderConstruction from "../../components/under-construction";
import React from "react";
import { useRouter } from "next/router";

export default function About() {
    let router = useRouter()
    return (
        <CommonLayout router={router}>
            <UnderConstruction />
        </CommonLayout>
    )
}
