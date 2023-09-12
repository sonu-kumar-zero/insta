import { useEffect } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useCallback } from 'react';
import { useContext } from 'react';
import Usercontext from 'context/Usercontext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FriendTabSkelton from './skeleton/FriendTab';

const Profiletab = (props) => {
  const { friendbar, id } = props;
  const [frienddata, setfrienddata] = useState(null);
  const [friendimg, setfriendimg] = useState(null);
  const { token, user, setuserfriend, socket } = useContext(Usercontext);
  const navigate = useNavigate();

  const friendinfo = useCallback(
    async () => {
      try {
        const response = await fetch(`http://localhost:4000/user/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            // Other headers as needed
          }
        });
        const result = await response.json();
        setfrienddata(result);

        const imgres = await fetch(`http://localhost:4000/upload/image/${result.picturePath}`);

        const imgresul = await imgres.json();
        // console.log(imgresul);
        setfriendimg(imgresul[0].image);

      } catch (error) {
        console.log(error);
      }
    },
    [id, token]
  );

  useEffect(() => {
    friendinfo();
  }, [friendinfo]);

  const addorremovefriend = useCallback(async () => {
    try {

      if (user._id !== frienddata._id) {
        const response = await fetch(`http://localhost:4000/user/${user._id}/${frienddata._id}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json();
        if (response.status === 200) {
          socket.emit("friendadd", { friendId: frienddata._id });
          setuserfriend(result);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [frienddata, token, user, setuserfriend, socket]);

  const navigatetoprofilepage = () => {
    navigate(`/profile/${frienddata.username}/${id}`);
  };

  return (<>
    {
      (frienddata === null || friendimg === null) && (
        <FriendTabSkelton />
      )
    }
    {
      frienddata !== null && friendimg !== null && (
        <div className={`ps54 ${friendbar === true ? "friendhover" : ""}`}>
          {/* top bar */}
          <div className="ps55" style={{ cursor: "pointer" }} onClick={navigatetoprofilepage}>
            {/* left */}
            <div className="ps56">
              {/* img */}{
                friendimg !== null && (
                  <img src={`data:image/png;base64,${friendimg}`} alt="friendicon" />
                )
              }
            </div>
            <div className="ps57">
              <div className="ps58">
                {/* {frienddata.firstname + " " + frienddata.lastname} */}
                {frienddata.username}
              </div>
              <div className="ps59">
                {/* location */}
                {frienddata.location}
              </div>
            </div>
          </div>
          <div className="ps60" onClick={addorremovefriend}>
            {/* add icon */}
            <AiOutlineUserAdd />
          </div>
        </div>
      )
    }
  </>)
};

export default Profiletab;