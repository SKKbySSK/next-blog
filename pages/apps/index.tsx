import CommonLayout from "../../components/common-layout";
import UnderConstruction from "../../components/under-construction";
import React from "react";
import {useRouter} from "next/router";
import {NextPage} from "next";

const Apps: NextPage<{ readme: string }> = (props) => {
    let router = useRouter()

    return (
        <CommonLayout router={router}>
            <UnderConstruction/>
        </CommonLayout>
    )
}

export default Apps
