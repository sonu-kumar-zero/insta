import FriendBox from "components/chat/FriendBox";
import Navbar from "components/Navbar";
import Mainchat from "./MainChat";
import { useContext } from "react";
import Usercontext from "context/Usercontext";

const Chatpage = () => {

    const { selectedchat } = useContext(Usercontext);

    return (
        <>
            <Navbar />
            <div className="ch95">
                <div className="ch96">
                    <FriendBox />
                </div>
                <div className="ch94">
                    {
                        selectedchat &&
                        <Mainchat />
                    }
                </div>
            </div>
        </>
    )
};

export default Chatpage;