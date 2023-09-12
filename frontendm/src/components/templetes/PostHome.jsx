import { useState } from 'react';
import { AiOutlineSend, AiOutlineUserAdd, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi';
import Postcomment from './Postcomment';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import Usercontext from 'context/Usercontext';
import PostTabSkeleton from 'components/skeleton/PostTab';

const Postcard = ({ post, isuserfri }) => {

    const { token, user, userimg, setuserfriend, socket } = useContext(Usercontext);
    const [liked, setliked] = useState(false);
    const [commentopen, setcommentopen] = useState(false);
    const [postuserimg, setpostuserimg] = useState(null);
    const [postimg, setpostimg] = useState(null);
    const [usercomment, setusercomment] = useState("");

    const handlefriendadd = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/user/${user._id}/${post.userId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            if (response.status === 200) {
                socket.emit("friendadd", { friendId: post.userId });
                setuserfriend(result);
            };


        } catch (error) {
            console.log(error.message);
        }
    }
        , [token, user._id, post.userId, setuserfriend, socket]);

    const handlepostlike = useCallback(async () => {
        try {
            const obj = { userId: user._id };
            const response = await fetch(`http://localhost:4000/post/${post._id}/like`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                    // Other headers as needed
                },
                body: JSON.stringify(obj)
            });

            const result = await response.json();
            console.log(result);
            setliked(prev => !prev);
        } catch (error) {
            console.log({ error: error.message, err: error });
        }
    }, [setliked, token, post._id, user._id]);

    const handlecommentpost = useCallback(async () => {
        const obj = { userId: user._id, comment: usercomment };
        console.log(obj);
        console.log(post._id);
        const response = await fetch(`http://localhost:4000/post/${post._id}/comment`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
                // Other headers as needed
            },
            body: JSON.stringify(obj)
        });
        const result = await response.json();
        console.log(result);
        setusercomment("");
    }, [user, post, token, usercomment]);

    const fetchimages = useCallback(async () => {
        try {
            const imgres = await fetch(`http://localhost:4000/upload/image/${post.userPicturePath}`);
            const imgresul = await imgres.json();
            setpostuserimg(imgresul[0].image);
            const postimgres = await fetch(`http://localhost:4000/upload/image/${post.picturePath}`);
            const postimgresul = await postimgres.json();
            setpostimg(postimgresul[0].image);
        } catch (error) {
            console.log({ error: error.message });
        }
    }, [post.picturePath, post.userPicturePath]);

    const setlikedpost = useCallback(() => {
        if (post.likes.hasOwnProperty(user._id)) {
            setliked(prev => !prev);
        }
    }, [post.likes, user._id, setliked]);

    useEffect(() => {
        fetchimages();
        setlikedpost();
    }, [fetchimages, setlikedpost, post]);


    return (<>
        {
            (post === null || postimg === null) && <PostTabSkeleton/>
        }
        {
            post !== null && postimg !== null && (
                <div className="ps53">
                    <div className="ps54">
                        {/* top bar */}
                        <div className="ps55">
                            {/* left */}
                            <div className="ps56">
                                {/* img */}
                                {
                                    postuserimg !== null && (
                                        <img src={`data:image/png;base64,${postuserimg}`} alt="profile" />
                                    )
                                }
                            </div>
                            <div className="ps57">
                                <div className="ps58">
                                    {/* name */}
                                    {/* sonustark12 */}
                                    {post.username}
                                </div>
                                <div className="ps59">
                                    {/* location */}
                                    {post.location}
                                    {/* Delhi,India */}
                                </div>
                            </div>
                        </div>
                        <div className="ps60" onClick={handlefriendadd} style={isuserfri ? { "backgroundColor": "red", "padding": "0px" } : { "backgroundColor": "green" }}>
                            {/* add icon */}

                            {
                                isuserfri ? "" :
                                    <AiOutlineUserAdd />
                            }
                        </div>
                    </div>

                    <div className="ps61">
                        {/* some description */}
                        {post.description}
                    </div>

                    <div className="ps62">
                        {/* img */}
                        {
                            postimg !== null && (
                                <img src={`data:image/png;base64,${postimg}`} alt="post img" />
                            )
                        }
                    </div>

                    <div className="ps63">
                        <div className="ps64" onClick={() => {
                            handlepostlike();
                        }}>
                            {/* like */}
                            {
                                !liked && (
                                    <AiOutlineHeart />
                                )
                            }{
                                liked && (
                                    <AiFillHeart style={{ color: "red" }} />
                                )
                            }
                        </div>
                        <div className="ps65" onClick={() => {
                            setcommentopen(!commentopen);
                        }}>
                            {/* comments */}
                            <BiComment />
                        </div>
                    </div>
                    {/* comment box */}
                    <div className="po75">
                        <div className="po76">
                            {/* image */}
                            {
                                userimg !== null && (
                                    <img src={`data:image/png;base64,${userimg}`} alt="icon" />
                                )
                            }
                        </div>
                        <div className="po77">
                            {/* input description */}
                            <input type="text" style={{ color: "green" }} placeholder='Comment..' value={usercomment} onChange={(e) => {
                                setusercomment(e.target.value);
                            }} />
                        </div>
                        <div className="" style={{
                            margin: "0px 10px", display: "flex", alignItems: "center", justifyContent: "center", padding: "5px", fontSize: "20px", backgroundColor: "green",
                            cursor: "pointer",
                            borderRadius: "50%"
                        }} onClick={handlecommentpost}>
                            <AiOutlineSend style={{ display: "flex", alignItems: "center" }} />
                        </div>
                    </div>

                    {
                        commentopen && (
                            < div className="ps66" onMouseLeave={() => {
                                setcommentopen(false);
                            }}>
                                <div className="ps69">
                                    comment box
                                </div>
                                <div className="ps68">
                                    {post.comment !== null && post.comment !== undefined && Object.keys(post.comment).map((key) => (
                                        <Postcomment key={key} comment={post.comment[key]} id={key} />
                                    ))}
                                </div>
                            </div >
                        )
                    }


                    <div className="ps67">
                        {/* time */}
                        post createdAt:{
                            " "
                        }
                        {post.createdAt}
                        {/* 23:48 | 23-08-2023 */}
                    </div>

                </div >
            )
        }

    </>)
};

export default Postcard;