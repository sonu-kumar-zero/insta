import Usercontext from "context/Usercontext";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AiOutlineSend } from "react-icons/ai";
import MessageBox from "./MessageBox";

const Mainchat = () => {
    const { selectedchat, selectedchatimg, user, token, socket } = useContext(Usercontext);
    const [userAndFriendMessage, setuserAndFriendMessage] = useState(null);
    const [chatstring, setchatstring] = useState("");
    const [online, setonline] = useState(false);
    const [chatwrite, setchatwrite] = useState(false);

    const fetchUserAndFriendChat = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/chat/${user._id}/${selectedchat._id}/chats`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();
            console.log(result);
            const maindata = result.reverse();
            setuserAndFriendMessage(maindata);
        } catch (error) {
            console.log(error.message);
        }
    }, [token, user._id, selectedchat._id]);

    const sendChatToFriend = useCallback(async () => {
        try {
            if (chatstring !== "") {
                const message = chatstring.trim();
                const obj = {
                    message: message
                };

                const response = await fetch(`http://localhost:4000/chat/${user._id}/${selectedchat._id}/add`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                        // Other headers as needed
                    },
                    body: JSON.stringify(obj)
                });

                const result = await response.json();
                console.log(result);
                socket.emit('new-message', { friendId: selectedchat._id, userId: user._id });
                fetchUserAndFriendChat();
            }
            setchatstring("");
        } catch (error) {
            console.log(error.message);
        }
    }, [chatstring, selectedchat._id, token, user._id, socket, fetchUserAndFriendChat]);

    const handlenewmessage = useCallback((data) => {
        fetchUserAndFriendChat();
    }, [fetchUserAndFriendChat]);

    const handleuseronline = useCallback((data) => {
        setonline(data.online);
    }, []);

    const handlechatwrite = useCallback((data) => {
        setchatwrite(data.writing);

        const timer = setTimeout(() => {
            setchatwrite(false);
        }, 500);

        return () => {
            return clearInterval(timer);
        }
    }, []);

    useEffect(() => {
        fetchUserAndFriendChat();
    }, [fetchUserAndFriendChat]);

    useEffect(() => {
        socket.emit('user-online', { friendId: selectedchat._id });
    }, [socket, selectedchat]);

    useEffect(() => {
        const timer = setTimeout(() => {
            socket.emit('chat-write', { friendId: selectedchat._id, userId: user._id });
        }, 100);
        return () => {
            clearTimeout(timer);
        }
    }, [chatstring, selectedchat._id, socket, user._id]);

    useEffect(() => {
        socket.on('new-message', handlenewmessage);
        socket.on('user-online', handleuseronline);
        socket.on('chat-write', handlechatwrite);
        return () => {
            socket.off('new-message', handlenewmessage);
            socket.off('user-online', handleuseronline);
            socket.off('chat-write', handlechatwrite);
        }
    }, [socket, handlenewmessage, selectedchat, handleuseronline, handlechatwrite]);

    return (
        <>
            <div className="cha5">
                <div className="cha6">
                    {/* left */}
                    <div className="cha7">
                        <img src={`data:image/png;base64,${selectedchatimg}`} alt="profile" />
                    </div>
                    {/* right */}

                    <div className="cha8">
                        <div className="cha9">
                            <div className="cha10">
                                {selectedchat.firstname + ' ' + selectedchat.lastname}
                            </div>
                            {
                                chatwrite && (
                                    <div className="cha11" style={{
                                        color: "green"
                                    }}>
                                        Typing . . .
                                    </div>
                                )
                            }

                            {
                                !chatwrite && online &&
                                (
                                    <div className="cha11" style={{
                                        color: "#0033CC",
                                        opacity: "1"
                                    }}>
                                        Online . . .
                                    </div>
                                )
                            }{
                                !chatwrite && !online && (
                                    <div className="cha11">
                                        Offline . . .
                                    </div>
                                )
                            }
                        </div>

                        <div className="cha12">
                            icon
                        </div>
                    </div>
                </div>

                <div className="cha13">
                    {/* message box */}
                    <MessageBox chats={userAndFriendMessage} />
                </div>

                <div className="cha14">
                    {/* input box */}
                    <div className="cha15">
                        <input type="text" placeholder="Type Something..."
                            value={chatstring}
                            onChange={(e) => {
                                setchatstring(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendChatToFriend();
                                }
                            }} />
                    </div>
                    <div className="cha16">
                        <div className="cha17" onClick={sendChatToFriend}>
                            <AiOutlineSend style={{ display: "flex", fontSize: "20px" }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Mainchat;