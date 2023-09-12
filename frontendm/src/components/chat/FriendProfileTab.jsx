import { useContext } from 'react';
// import icon from '../../images/qin shi.jpg'
import Usercontext from 'context/Usercontext';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import FriendTabSkelton from 'components/skeleton/FriendTab';

const FriendProfileTab = ({ friendId }) => {
    const { setselectedchat, token, setselectedchatimg } = useContext(Usercontext);
    const [frienddata, setfrienddata] = useState(null);
    const [friendprofileurl, setfriendprofileurl] = useState(null);

    const fetchfrienddata = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/user/${friendId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            setfrienddata(result);
            const imgres = await fetch(`http://localhost:4000/upload/image/${result.picturePath}`);
            const imgresul = await imgres.json();
            setfriendprofileurl(imgresul[0].image);
        } catch (error) {
            console.log(error.message);
        }
    }, [friendId, token]);

    useEffect(() => {
        fetchfrienddata();
    }, [fetchfrienddata]);

    return (
        <>
            {
                (frienddata === null || friendprofileurl === null) && (
                    <FriendTabSkelton/>
                )
            }
            {
                frienddata && friendprofileurl && (
                    <div className="ch99" onClick={() => {
                        setselectedchat(frienddata);
                        setselectedchatimg(friendprofileurl);
                    }}>
                        <div className="cha1">
                            <img src={`data:image/png;base64,${friendprofileurl}`} alt='profile icon' />
                        </div>
                        <div className="cha2">
                            <div className="cha3">
                                {frienddata.firstname + " " + frienddata.lastname}
                            </div>
                            <div className="cha4">
                                sent just now
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
};

export default FriendProfileTab;