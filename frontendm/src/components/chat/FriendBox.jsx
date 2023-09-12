import { useContext } from "react";
import FriendProfileTab from "./FriendProfileTab";
import Usercontext from "context/Usercontext";

const FriendBox = ()=>{
    const {userfriend} = useContext(Usercontext);
    return (
        <>
            <div className="ch97">
                Friend List
            </div>

            <div className="ch98">
                {
                    userfriend !== null && userfriend.length > 0 && userfriend.map((friendid, key) => (
                        <FriendProfileTab key={key} friendId={friendid} friendbar={true} />
                    ))
                }                
            </div>
        </>
    )
};

export default FriendBox;