import React from 'react';
import CommonLayout from "../components/common-layout";
import {useRouter} from "next/router"
import {PostCardView} from "../components/post-card-view";
import {Post, PostCardStyle} from "../models/post";
import {CardColumns, CardDeck} from "react-bootstrap";
import {PostCardList} from "../components/post-card-list";
import UnderConstruction from "../components/under-construction";

export default function Home() {
    const router = useRouter()

    return (
        <CommonLayout router={router}>
            <UnderConstruction/>
        </CommonLayout>
    )
}
