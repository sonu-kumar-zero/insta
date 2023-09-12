import { useEffect, useState } from 'react';
import './toast.css'
import { BiCheckDouble } from 'react-icons/bi'
import { MdOutlineCancel } from 'react-icons/md'

const Snackbar = ({ message, color, type }) => {

    const [show, setshow] = useState(false);

    useEffect(() => {
        setshow(true);
        const timer = setTimeout(() => {
            setshow(false);
        }, 1500);

        return () => {
            clearTimeout(timer);
        }
    }, []);

    return (
        <>
            {
                show && (<>
                    <div className='sna1' >
                        <div className="sna2">
                            <div className="sna3">
                                {
                                    type === "success" && <BiCheckDouble style={{
                                        display: "flex", color: "green"
                                    }} />
                                }
                                {
                                    type === "error" && <MdOutlineCancel style={{
                                        display: "flex", color: "red"
                                    }} />
                                }
                            </div>
                            <div className="sna4">
                                {message}
                            </div>
                            <div className="sna5" onClick={() => {
                                setshow(false);
                            }}>
                                <MdOutlineCancel style={{ display: "flex", fontSize: "20px", cursor: "pointer" }} />
                            </div>
                        </div>
                        <div className="sna6">
                            <div className="sna7"
                                style={{
                                    backgroundColor: `${color}`
                                }}></div>
                        </div>
                    </div>
                </>)
            }

        </>
    )
}

export default Snackbar;