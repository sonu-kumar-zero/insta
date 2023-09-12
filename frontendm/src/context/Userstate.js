import React from "react";
import Usercontext from "./Usercontext";
import { useState } from "react";
import { useMemo } from "react";
import { io } from "socket.io-client";

const Userstate = (props) => {
  const name = "sonu";
  const [token, settoken] = useState(null);
  const [user, setuser] = useState(null);
  const [userfriend, setuserfriend] = useState(null);
  const [userimg, setuserimg] = useState(null);

  const socket = useMemo(()=>{
    return io("http://localhost:4001")
},[]);

// ---------------------------------------------------------
  const [selectedchat,setselectedchat] = useState(null);
  const [selectedchatimg,setselectedchatimg] = useState(null);


  // post details
  // comment: [];
  // createdAt: "2023-08-27T16:04:05.269Z";
  // description: "My first Post, I hope everyone will like it...";
  // firstname: "sonu";
  // lastname: "";
  // likes: {}
  // location: "india";
  // picturePath: "1693152245042-s@1.com";
  // updatedAt: "2023-08-27T16:04:05.269Z";
  // userId: "64eaec12cfde677d50c5dc34";
  // userPicturePath: "sonus@1.com";
  // username: "kumarsonus";
  // __v: 0;
  // _id: "64eb73f510e41c1fc77b6584";

  // user Details
  // createdAt: "2023-08-20T16:55:32.858Z";
  // email: "sonu@1.com";
  // firstname: "sonu";
  // friends: [];
  // impressions: 5154;
  // lastname: "kumar";
  // location: "india";
  // occupation: "student";
  // password: "$2b$10$2Ke.CiDWE0TTet87wXSPe.00QF8JgPs3cFLE4HsFz7FEE2zCYaWem";
  // picturePath: "sonusonu@1.comkumar";
  // updatedAt: "2023-08-20T16:55:32.858Z";
  // viewedProfile: 4078;
  // __v: 0;
  // _id: "64e24584514da3eaecac03c7";

  return (
    <Usercontext.Provider
      value={{ userfriend, setuserfriend,name, token, settoken, user, setuser, userimg, setuserimg,socket, selectedchat,setselectedchat,selectedchatimg,setselectedchatimg}}
    >
      {props.children}
    </Usercontext.Provider>
  );
};

export default Userstate;
