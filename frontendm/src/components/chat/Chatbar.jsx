import Usercontext from "context/Usercontext";
import { useCallback, useContext, useEffect, useState } from "react";
import { IoMdDoneAll } from 'react-icons/io'

const ChatBar = ({ chat }) => {
    const { selectedchat, user, selectedchatimg , token} = useContext(Usercontext);
    const [time, settime] = useState(null);

    // chat templates
    // createdAt:"2023-09-03T06:35:42.726Z"
    // isRead: false
    // message:"Hii Vinesh 😊"
    // receivedId:"64eb16370433be4f38bd15ec"
    // senderId:"64eaec12cfde677d50c5dc34"
    // updatedAt:"2023-09-03T06:35:42.726Z"
    // __v:0
    // _id:"64f4293e62c914f0e86af2a3"

    const getrealtime = useCallback(() => {
        const utcDate = new Date(chat.createdAt);
        // utcDate.setHours(utcDate.getHours() + 5); // Add 5 hours to UTC time
        // utcDate.setMinutes(utcDate.getMinutes() + 30); // Add 30 minutes to UTC time

        // Format the date and time in IST
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Kolkata', // Indian Standard Time
        };
        const istDateString = utcDate.toLocaleString('en-US', options);
        settime(istDateString);
    }, [chat.createdAt]);

    const messageReaded = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/chat/${chat._id}/seen`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                    // Other headers as needed
                },
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.log(error.message);
        }
    }, [chat._id, token]);

    useEffect(() => {
        getrealtime();
        if (!chat.isRead) {
            messageReaded();
        }
    }, [getrealtime, chat, messageReaded]);


    return (
        <>
            {
                selectedchat && user && chat && chat.senderId === user._id && chat.receivedId === selectedchat._id && (
                    <div className="cha20">
                        <div className="cha21">
                            <div className="cha22">
                                <div className="cha23">
                                    {/* message */}
                                    {chat.message}
                                </div>
                                <div className="cha24">
                                    {/* read icon */}
                                    {
                                        chat.isRead && (
                                            <IoMdDoneAll style={{
                                                display: "flex",
                                                color: "green"
                                            }} />
                                        )
                                    }{
                                        !chat.isRead && (
                                            <IoMdDoneAll style={{
                                                display: "flex"
                                            }} />
                                        )
                                    }
                                </div>
                            </div>
                            <div className="cha25">
                                {/* time */}
                                <div className="cha26">
                                    {time}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                selectedchat && selectedchatimg && user && chat && chat.senderId === selectedchat._id && chat.receivedId === user._id && (
                    <div className="cha27">
                        <div className="cha28">
                            <div className="cha29">
                                <div className="cha30">
                                    <img src={`data:image/png;base64,${selectedchatimg}`} alt="profile" />
                                </div>
                                <div className="cha31">
                                    {/* message */}
                                    {chat.message}
                                </div>
                            </div>
                            <div className="cha32">
                                <div className="cha33">
                                    {time}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
};

export default ChatBar;