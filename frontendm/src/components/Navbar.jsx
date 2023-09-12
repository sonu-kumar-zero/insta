import Usercontext from 'context/Usercontext';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { AiOutlineSearch, AiOutlineMessage, AiOutlineBell, AiOutlineInfoCircle } from 'react-icons/ai'
import { FiMoon } from 'react-icons/fi';
import { WiDaySunny } from 'react-icons/wi';
import { useNavigate } from 'react-router-dom';
import Profiletab from './ProfileTab';
import  FriendTabSkelton  from 'components/skeleton/FriendTab';


const Navbar = () => {
    const { socket, user, setuser, settoken, setuserimg, token } = useContext(Usercontext);
    const [dark, setdark] = useState(true);
    const [selectedValue, setSelectedValue] = useState('');
    const navigate = useNavigate();
    const [searchvalue, setSearchValue] = useState("");
    const [fetcheddata, setFetchedData] = useState(null);
    const [loading,setloading] = useState(false);

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handletheme = useCallback(()=>{
        if(!dark){
            document.body.classList.add('dark-mode');
            setdark(prev => !prev);
        }else{
            document.body.classList.remove('dark-mode');
            setdark(prev => !prev);
        }
    },[dark]);


    const handlelogout = useCallback(() => {
        settoken(null);
        setuser(null);
        setuserimg(null);
        navigate("/");
        socket.emit('user-logout', { userId: user._id });
    }, [settoken, setuser, setuserimg, navigate, socket, user]);

    useEffect(() => {
        if (selectedValue === "log out") {
            handlelogout();
        };
    }, [selectedValue, handlelogout]);

    const fetchsearchuser = useCallback(async () => {
        setFetchedData(null);
        if (searchvalue === "" || searchvalue === " ") {
            return;
        }

        setloading(true);

        const response = await fetch(`http://localhost:4000/user/find/${searchvalue}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
                // Other headers as needed
            }
        });
        const result = await response.json();
        setFetchedData(result);
        setloading(false);
    }, [searchvalue, token]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchsearchuser();
        }, 1000);
        return () => {
            clearTimeout(timer);
        }
    }, [fetchsearchuser, searchvalue]);


    return (<>{
        user !== null && (
            <>
                <div className="nav13">
                    <div className="nav14">
                        <div className="nav16" style={{ cursor: "pointer" }} onClick={() => {
                            navigate("/home");
                        }}>
                            Instaxore
                        </div>
                        <div className="nav86">
                            <div className="nav17">
                                <div className="nav18">
                                    <input type="text" placeholder='Search..' value={searchvalue} onChange={(e) => {
                                        setSearchValue(e.target.value);
                                    }} />
                                </div>
                                <div className="nav19" style={{display:"none"}}>
                                    <AiOutlineSearch className='nav23' />
                                </div>
                            </div>
                            {
                                searchvalue !== " " && searchvalue !== "" && (
                                    <div className="nav85">
                                        {
                                            loading && fetcheddata === null && (
                                                <>
                                                    <FriendTabSkelton/>
                                                    <FriendTabSkelton/>
                                                </>
                                            )
                                        }
                                        {
                                            !loading && fetcheddata !== null && fetcheddata.length === 0 && (<>
                                                No User Found
                                            </>)
                                        }
                                        {
                                            searchvalue !== " " && searchvalue !== "" && fetcheddata !== null && (
                                                fetcheddata.map((friendid, key) => {
                                                    return (
                                                        <Profiletab key={key} id={friendid._id} />
                                                    )
                                                })
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="nav15">
                        <div className="nav20">
                            <div className="nav22" onClick={handletheme}>
                                {
                                    !dark ? (
                                        <WiDaySunny className='nav23' />
                                    ) : (
                                        <FiMoon className='nav23' />
                                    )
                                }
                            </div>
                            <div className="nav22">
                                <AiOutlineMessage className='nav23' onClick={()=>{
                                    navigate("/chat");
                                }}/>
                            </div>
                            <div className="nav22">
                                <AiOutlineBell className='nav23' />
                            </div>
                            <div className="nav22">
                                <AiOutlineInfoCircle className='nav23' />
                            </div>
                        </div>
                        <div className="nav21">
                            <select name="" id="" value={selectedValue} onChange={handleSelectChange}>
                                <option value="">
                                    {/* {user.firstname+" "+user.lastname} */}
                                    {user.username}
                                </option>
                                <option value="log out">Log Out</option>
                            </select>
                        </div>
                    </div>
                </div>

            </>
        )
    }
    </>)
}

export default Navbar;