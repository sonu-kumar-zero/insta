import PostTabSkeleton from "components/skeleton/PostTab";
import Postcard from "components/templetes/PostHome";
import Usercontext from "context/Usercontext";
import { useState } from "react";
import { useContext } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

const PostPage = () => {

    const { token, userfriend, user, socket } = useContext(Usercontext);
    const [posts, setposts] = useState(null);

    const fetchrecentposts = useCallback(async () => {
        try {
            const postfetch = await fetch(`http://localhost:4000/post`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                    // Other headers as needed
                }
            });
            const postres = await postfetch.json();
            console.log(postres);
            setposts(postres);
        } catch (error) {
            console.log({ error: error });
        }
    }, [token]);

    useEffect(() => {
        fetchrecentposts();
    }, [fetchrecentposts]);

    const newpostadded = useCallback((data) => {
        console.log(data.message);
        fetchrecentposts();
    }, [fetchrecentposts]);

    useEffect(() => {
        socket.on('new-post', newpostadded);
        return () => {
            socket.off("new-post", newpostadded);
        }
    }, [newpostadded, socket]);

    return (<>
        {
            posts === null && (
                <>
                    <PostTabSkeleton />
                    <PostTabSkeleton />
                    <PostTabSkeleton />
                </>
            )
        }
        {
            posts !== null && posts.map((post, key) => {
                let isuserfri = false;
                if (userfriend.includes(post.userId) || post.userId === user._id) {
                    isuserfri = true;
                }
                return (
                    <Postcard post={post} key={key} isuserfri={isuserfri} />
                )
            })
        }
    </>)
};


export default PostPage;