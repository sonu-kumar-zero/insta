import ChatBar from "components/chat/Chatbar";
import { useCallback, useEffect, useRef } from "react";



const MessageBox = ({ chats }) => {

    const divref = useRef(null);

    const scrollToBottom = useCallback(()=>{
        if(divref.current){
            const div = divref.current;
            div.scrollTop = div.scrollHeight + 500;
        }
    },[]);

    useEffect(()=>{
        scrollToBottom();
    },[chats,scrollToBottom]);
    return (
        <div className="cha34" ref={divref}>
            {
                chats && chats.length > 0 && (
                    chats.map((chat, key) => {
                        return <ChatBar key={key} chat={chat} />
                    })
                )
            }
        </div>
    )
};

export default MessageBox;