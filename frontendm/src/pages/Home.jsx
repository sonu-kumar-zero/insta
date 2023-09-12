import Navbar from "components/Navbar";
import { AiFillLinkedin, AiOutlineUserAdd, AiOutlineTwitter } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import { IoBagOutline } from 'react-icons/io5';
import { BsPencil } from 'react-icons/bs';
import Postupload from "components/templetes/Postupload";
import { useContext } from "react";
import Usercontext from "context/Usercontext";
import { useNavigate } from "react-router-dom";
import PostPage from "./Post";
import Userfriendlist from "./Userfriend";

const HomePage = () => {

    const { user, userimg, userfriend } = useContext(Usercontext);
    const navigate = useNavigate();
    let firstname, lastname, impressions, location, occupation, viewedProfile;

    if (user !== null) {
        firstname = user.firstname;
        lastname = user.lastname;
        impressions = user.impressions;
        location = user.location;
        occupation = user.occupation;
        viewedProfile = user.viewedProfile;
    };

    return (<>
        <Navbar />
        {
            user !== null && (
                <div className="hom24">
                    <div className="hom25">
                        {/* user profile */}
                        <div className="hom28">
                            <div className="hom29">
                                <div className="hom30" style={{
                                    cursor: 'pointer'
                                }} onClick={()=>{
                                    navigate(`/profile/${user.username}/${user._id}`);
                                }}>
                                    <div className="hom31">
                                        {/* image */}
                                        {
                                            userimg !== null && (
                                                <img src={`data:image/png;base64,${userimg}`} alt="icon" />
                                            )
                                        }
                                    </div>
                                    <div className="hom32">
                                        <div className="hom33">
                                            {/* name */}
                                            {user.username}
                                        </div>
                                        <div className="" style={{fontSize:"10px"}}>
                                        </div>
                                        <div className="hom34">
                                            {firstname + " " + lastname+" "}
                                            {/* friends count */}
                                            {userfriend.length} friends
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
                                        {location}
                                    </div>
                                </div>
                                <div className="hom37">
                                    <div className="hom38">
                                        {/* occupation icon */}
                                        <IoBagOutline />
                                    </div>
                                    <div className="hom39">
                                        {/* occupation name */}
                                        {occupation}
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
                                        {viewedProfile}
                                    </div>
                                </div>
                                <div className="hom41">
                                    <div className="hom42">
                                        {/* number of post imperesions text */}
                                        impression of your post
                                    </div>
                                    <div className="hom43">
                                        {/* number of post imperesions count */}
                                        {impressions}
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
                    <div className="hom26">
                        {/* chats section */}
                        <div className="po83">
                            <Postupload />
                        </div>
                        <PostPage/>
                    </div>
                    <div className="hom27">
                        {/* friend list */}
                        <div className="hom71" >
                            <div className="hom72">
                                Friend List
                            </div>
                            <div className="hom73">
                                <Userfriendlist/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    </>)
};

export default HomePage;