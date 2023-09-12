import Navbar from "components/Navbar";
// import img1 from '../images/1.jpg';
import { AiFillLinkedin, AiOutlineUserAdd, AiOutlineTwitter } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import { IoBagOutline } from 'react-icons/io5';
import { BsPencil } from 'react-icons/bs';
import { useParams } from "react-router-dom";
import { useContext } from "react";
import Usercontext from "context/Usercontext";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import PostBox from "components/templetes/Postbox";

const ProfilePage = () => {
    const [friendimg, setfriendimg] = useState(null);
    const [frienddata, setfrienddata] = useState(null);
    const [userpostimg, setuserpostimg] = useState([]);

    const { token } = useContext(Usercontext);
    const { id } = useParams();

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
                setfriendimg(imgresul[0].image);
            } catch (error) {
                console.log(error);
            }
        },
        [id, token]
    );

    const userposts = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/post/${id}/posts`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                    // Other headers as needed
                }
            });
            const result = await response.json();
            console.log(result);
            setuserpostimg(result);
        } catch (error) {
            console.log(error);
        }
    }, [id, token]);


    useEffect(() => {
        friendinfo();
        userposts();
    }, [friendinfo, userposts]);



    return (<>
        <Navbar />
        {
            frienddata !== null && (
                <div className="pro90">
                    <div className="hom25 pro91">
                        {/* user profile */}
                        <div className="hom28">
                            <div className="hom29">
                                <div className="hom30">
                                    <div className="hom31">
                                        {/* image */}
                                        {
                                            friendimg !== null && <img src={`data:image/png;base64,${friendimg}`} alt="icon" />
                                        }
                                    </div>
                                    <div className="hom32">
                                        <div className="hom33">
                                            {/* name */}
                                            {/* starksonu12 */}
                                            {frienddata.username}
                                        </div>
                                        <div className="" style={{ fontSize: "10px" }}>
                                        </div>
                                        <div className="hom34">
                                            {frienddata.firstname + " " + frienddata.lastname}
                                            {/* {firstname + " " + lastname + " "} */}
                                            {/* sonu kumar */}
                                            {
                                                " "
                                            }
                                            {/* friends count */}
                                            {/* {friends.length} friends */}
                                            {frienddata.friends.length} friends
                                        </div>
                                    </div>
                                </div>
                                <div className="hom35">
                                    {/* some icon */}
                                    <AiOutlineUserAdd />
                                </div>
                            </div>

                            <div className="hom36">
                                <div className="hom37">
                                    <div className="hom38">
                                        {/* location icon */}
                                        <GoLocation className="icons" />
                                    </div>
                                    <div className="hom39">
                                        {/* location name */}
                                        {frienddata.location}
                                        {/* India */}
                                    </div>
                                </div>
                                <div className="hom37">
                                    <div className="hom38">
                                        {/* occupation icon */}
                                        <IoBagOutline />
                                    </div>
                                    <div className="hom39">
                                        {/* occupation name */}
                                        {/* Student */}
                                        {frienddata.occupation}
                                    </div>
                                </div>
                            </div>

                            <div className="hom40">
                                <div className="hom41">
                                    <div className="hom42">
                                        {/* number of people views your profile text */}
                                        who's viewed your profile
                                    </div>
                                    <div className="hom43">
                                        {/* number of people */}
                                        {frienddata.viewedProfile}
                                        {/* 0 */}
                                    </div>
                                </div>
                                <div className="hom41">
                                    <div className="hom42">
                                        {/* number of post imperesions text */}
                                        impression of your post
                                    </div>
                                    <div className="hom43">
                                        {/* number of post imperesions count */}
                                        {frienddata.impressions}
                                        {/* 0 */}
                                    </div>
                                </div>
                            </div>

                            <div className="hom44">
                                <div className="hom45">
                                    Social profiles
                                </div>
                                <div className="hom46">
                                    <div className="hom47">
                                        <div className="hom48">
                                            {/* icon */}
                                            <AiOutlineTwitter />
                                        </div>
                                        <div className="hom49">
                                            <div className="hom50">
                                                Twitter
                                            </div>
                                            <div className="hom51">
                                                Social Network
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hom52">
                                        {/* pen icons */}
                                        <BsPencil />
                                    </div>
                                </div>
                                <div className="hom46">
                                    <div className="hom47">
                                        <div className="hom48">
                                            {/* icon */}
                                            <AiFillLinkedin />
                                        </div>
                                        <div className="hom49">
                                            <div className="hom50">
                                                LinkedIn
                                            </div>
                                            <div className="hom51">
                                                Social Network
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hom52">
                                        {/* pen icons */}
                                        <BsPencil />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pro92">
                        {
                            
                        }
                        {
                            userpostimg.length > 0 && userpostimg.map((data,key) => {
                                return (
                                    <PostBox key={key} picturePath={data.picturePath}/>
                                )
                            })
                        }
                        {/* <div className="pro93">
                            <img src={img1} alt="postimg" loading="lazy" />
                        </div>
                        <div className="pro93">
                            <img src={img1} alt="postimg" loading="lazy" />
                        </div>
                        <div className="pro93">
                            <img src={img1} alt="postimg" loading="lazy" />
                        </div>
                        <div className="pro93">
                            <img src={img1} alt="postimg" loading="lazy" />
                        </div>
                        <div className="pro93">
                            <img src={img1} alt="postimg" loading="lazy" />
                        </div>
                        <div className="pro93">
                            <img src={img1} alt="postimg" loading="lazy" />
                        </div>
                        <div className="pro93">
                            <img src={img1} alt="postimg" loading="lazy" />
                        </div> */}
                    </div>

                </div>
            )
        }

    </>)
};

export default ProfilePage;