import React from "react"
import BgVideo from "../Assets/bgVideo.mp4"


const Main = () => {
    return (
        <div className="main">
            <video src={BgVideo} autoPlay loop muted/>
        </div>
    )
}


export default Main