import Profiletab from "components/ProfileTab";
import FriendTabSkelton from "components/skeleton/FriendTab";
import Usercontext from "context/Usercontext";
import { useCallback } from "react";
import { useEffect } from "react";
import { useContext } from "react";

const Userfriendlist = () => {
    const { userfriend, token, setuserfriend, socket, user } = useContext(Usercontext);

    const getuserfriendback = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/user/${user._id}/friend`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            console.log(result);
            setuserfriend(result);
        } catch (error) {
            console.log(error.message);
        }
    }, [setuserfriend, token, user._id]);

    useEffect(() => {
        socket.on('friendadd', getuserfriendback);
        return () => {
            socket.off('friendadd', getuserfriendback);
        }
    }, [userfriend, getuserfriendback, socket]);



    return (
        <>
            {
                userfriend === null && (
                    <>
                        <FriendTabSkelton/>
                        <FriendTabSkelton/>
                        <FriendTabSkelton/>
                        <FriendTabSkelton/>
                    </>
                )
            }
            {
                userfriend !== null && userfriend.length > 0 && userfriend.map((friendid, key) => (
                    <Profiletab key={key} id={friendid} friendbar={true} />
                ))
            }
        </>
    )
};

export default Userfriendlist;