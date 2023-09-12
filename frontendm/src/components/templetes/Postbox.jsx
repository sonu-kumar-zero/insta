import { useCallback, useEffect, useState } from "react";

const PostBox = (props) => {

    const {picturePath} = props;

    const [imgdata, setimgdata] = useState(null);

    const fetchimage = useCallback(async() => {
        try {
            const imgres = await fetch(`http://localhost:4000/upload/image/${picturePath}`);
            const imgresul = await imgres.json();
            console.log({ imgresul: imgresul });
            setimgdata(imgresul[0].image);
        } catch (error) {
            console.log(error);
        }
    }, [picturePath]);

    useEffect(()=>{
        fetchimage();
    },[fetchimage]);

    return (<>
        <div className="pro93" >
            <img src={`data:image/png;base64,${imgdata}`} alt="postimg" loading="lazy" />
        </div>
    </>)
}

export default PostBox;