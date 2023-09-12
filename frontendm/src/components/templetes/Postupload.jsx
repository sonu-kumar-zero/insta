import { BiImageAdd } from 'react-icons/bi';
import { AiOutlinePaperClip, AiOutlineAudio } from 'react-icons/ai';
import { GoVideo } from 'react-icons/go';
import { useCallback, useContext, useState } from 'react';
import Usercontext from 'context/Usercontext';

const Postupload = () => {
    const { userimg, user, token,socket } = useContext(Usercontext);
    const [fileurl, setfileurl] = useState(null);
    const [file, setfile] = useState(null);
    const [mode, setmode] = useState(null);
    const [description, setdescription] = useState("");


    const handleimgfile = (e) => {
        setfile(null);
        setmode("image");
        const imgfile = e.target.files[0];
        setfile(imgfile);
        const url = URL.createObjectURL(imgfile);
        setfileurl(url);
        e.target.value = null;
    };

    const handlevidfile = (e) => {
        setfile(null);
        setmode("video");
        const vidfile = e.target.files[0];
        console.log(vidfile);
        setfile(vidfile);
        const url = URL.createObjectURL(vidfile);
        setfileurl(url);
        e.target.value = null;
    };

    const uploadpost = useCallback(async () => {
        try {
            const formdat = new FormData();
            formdat.append('image', file);
            const imagename = Date.now() + '-' + user.email;
            formdat.append('imageId', imagename);
            const imageres = await fetch("http://localhost:4000/upload/image", {
                method: "POST",
                body: formdat,
            });
            const imageresult = await imageres.json();
            console.log(imageresult);

            const obj = {
                userId: user._id,
                description: description,
                picturePath: imagename
            }

            const postres = await fetch('http://localhost:4000/posts', {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify(obj),
            });

            const postresu = await postres.json();
            console.log(postresu);
            socket.emit('new-post');   
            setfile(null);
            setdescription("");
            setfileurl(null);

        } catch (error) {
            console.log(error);
            setfile(null);
            setfileurl(null);
            setdescription("");
        }
    }, [description, file, token, user._id, user.email,socket]);


    return (<>
        <div className="po74">
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
                    <input type="text" placeholder='Type your thoughts...' value={description} onChange={(e) => {
                        setdescription(e.target.value);
                    }} />
                </div>
            </div>

            {
                fileurl !== null && mode === "image" && (<>
                    <div className="po84">
                        <img src={fileurl} alt="imag" />
                    </div>
                </>)
            }{
                fileurl !== null && mode === "video" && (<>
                    <div className="po84">
                        <video src={fileurl} autoPlay controls></video>
                    </div>
                </>)
            }

            <div className="po78">
                <input onChange={handleimgfile} type="file" accept='image/*' style={{ display: "none" }} id='imginp' />
                <label htmlFor="imginp" style={{
                    display: "flex"
                }}>
                    <div className="po79">
                        <div className="po80">
                            {/* icon */}
                            <BiImageAdd />
                        </div>
                        <div className="po81">
                            {/* icon name */}
                            Image
                        </div>
                    </div>
                </label>
                <input type="file" onChange={handlevidfile} id='videoin' accept='.mkv,video/*' style={{ display: "none" }} />
                <label style={{
                    display: "flex"
                }} htmlFor="videoin">
                    <div className="po79">
                        <div className="po80">
                            {/* icon */}
                            <GoVideo />
                        </div>
                        <div className="po81">
                            {/* icon name */}
                            Clip
                        </div>
                    </div>
                </label>
                <div className="po79">
                    <div className="po80">
                        {/* icon */}
                        <AiOutlinePaperClip />
                    </div>
                    <div className="po81">
                        {/* icon name */}
                        Attachment
                    </div>
                </div>
                <div className="po79">
                    <div className="po80">
                        {/* icon */}
                        <AiOutlineAudio />
                    </div>
                    <div className="po81">
                        {/* icon name */}
                        Audio
                    </div>
                </div>
                <div className="po82" onClick={uploadpost}>
                    POST
                </div>
            </div>
        </div>
    </>)
};

export default Postupload;