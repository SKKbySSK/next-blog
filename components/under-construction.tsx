import Lottie from "react-lottie";
import animation from "../resources/paper-boat.json"
import React from "react";

export default function UnderConstruction() {
    const options = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    return (
        <div>
            <Lottie options={options} style={{cursor: "default"}} height={200} width={200} isClickToPauseDisabled={true}/>
            <p className="text-center font-weight-bold text-3xl">Oops!</p>
            <p className="text-center text-xl md:text-3xl xl:text-3xl">Requested page is under construction.</p>
        </div>
    )
}