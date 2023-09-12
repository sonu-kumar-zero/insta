import { useRef, useState } from 'react';
import img from '../images/profileicon-removebg-preview.png';
import { useContext } from 'react';
import Usercontext from 'context/Usercontext';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import Circleloader from 'components/loaders/circleloader';
import Snackbar from 'components/toast/Toastbar';

const LoginPage = () => {
    const [signorlog, setsignorlog] = useState(false);
    const { setuser, settoken, setuserimg, socket, setuserfriend } = useContext(Usercontext);
    const [profilefile, setprofilefile] = useState(null);
    const [profileurl, setprofileurl] = useState(null);
    const [laodinganim, setloginanim] = useState(false);

    const [snackdata, setsnackdata] = useState({
        message: "",
        color: "",
        type: ""
    });

    const [snackbaractive, setsnackbaractive] = useState(true);

    const navigate = useNavigate();
    // true = sign and false = log



    const [formdata, setformdata] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        location: "",
        occupation: ""
    });

    const handleformchange = (e) => {
        const { name, value } = e.target;
        setformdata((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleimgfile = (e) => {
        const file = e.target.files[0];
        setprofilefile(file);
        const url = URL.createObjectURL(file);
        setprofileurl(url);
    };

    const handlesignup = useCallback(async () => {
        // alert("Signing up");
        try {
            // username
            console.log(formdata);
            const formdat = new FormData();
            formdat.append('image', profilefile);
            formdat.append('imageId', formdata.firstname + formdata.email + formdata.lastname);
            const imageres = await fetch("http://localhost:4000/upload/image", {
                method: "POST",
                body: formdat,
            });
            const imageresult = await imageres.json();
            console.log(imageresult);

            // const formdata1 = [...formdata,{picturePath:formdata.firstname+formdata.email+formdata.lastname}];

            const picturepath = formdata.firstname + formdata.email + formdata.lastname;

            const formdata1 = {
                username: formdata.username,
                firstname: formdata.firstname,
                lastname: formdata.lastname,
                occupation: formdata.occupation,
                location: formdata.location,
                email: formdata.email,
                password: formdata.password,
                picturePath: picturepath
            };

            const response = await fetch('http://localhost:4000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formdata1),
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }, [formdata, profilefile]);


    const handlelogin = useCallback(async () => {
        setloginanim(true);
        // alert("Login");
        try {

            const obj = { email: formdata.email, password: formdata.password };
            const response = await fetch('http://localhost:4000/auth/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
            const result = await response.json();

            if (result.token !== "" && result.token !== undefined) {
                setsnackdata({ message: "successfully login", color: "green", type: "success" });
                console.log("success", result.token);
                console.log(result.user);
                settoken(result.token);
                setuser(result.user);
                setuserfriend(result.user.friends);
                // console.log(result.user.picturePath);
                const response = await fetch(`http://localhost:4000/upload/image/${result.user.picturePath}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                console.log("image response", response);
                const resultimg = await response.json();
                setuserimg(resultimg[0].image);
                console.log("image data", resultimg);
                setsnackbaractive(true);
                navigate("/home");
                socket.emit('user-added', { userId: result.user._id });
            } else {
                setsnackdata({ message: result.msg, color: "yellow", type: "error" });
                console.log(result);
            }
        } catch (error) {
            setsnackdata({ message: error, color: "red", type: "error" });
            console.log({ error: error });
        }
        setloginanim(false);
    }, [formdata.email, formdata.password, navigate, settoken, setuser, setuserfriend, setuserimg, socket]);


    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);

    const handleKeyPress = (event, refToFocus) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (refToFocus.current) {
                refToFocus.current.focus();
            }
        }
    };


    return (<>
        {snackbaractive && <Snackbar message={snackdata.message} color={snackdata.color} type={snackdata.type} />}
        {laodinganim && <Circleloader />}
        <div className="login">
            <div className="login1">
                InstaXore
            </div>


            <div className="login2">
                {
                    signorlog && (
                        <>
                            <div className="login3">
                                {/* photo input */}
                                <label htmlFor="imageinput">
                                    {profileurl === null ? (<img src={img} alt="profile" />
                                    ) : (
                                        <img src={profileurl} alt="profile" />
                                    )}
                                </label>
                                <input onChange={handleimgfile} type="file" accept="image/*" id="imageinput" style={{ display: "none" }} />
                            </div>
                            <div className="login7">
                                <input required={true} type="text" name='username' placeholder="Username..." className='logintext' value={formdata.username} onChange={handleformchange} />
                            </div>
                            <div className="login4">
                                <div className="login5">
                                    <input required={true} type="text" name='firstname' placeholder="First Name" className='logintext' value={formdata.firstname} onChange={handleformchange} />
                                </div>
                                <div className="login6">
                                    <input required={true} type="text" name='lastname' placeholder="Last Name" className='logintext' value={formdata.lastname} onChange={handleformchange} />
                                </div>
                            </div>
                            <div className="login7">
                                <input required={true} type="text" name='location' placeholder="Location" className='logintext' value={formdata.location} onChange={handleformchange} />
                            </div>
                            <div className="login8">
                                <input required={true} type="text" name='occupation' placeholder="Occupation" className='logintext' value={formdata.occupation} onChange={handleformchange} />
                            </div>
                            <div className="login9">
                                <input required={true} type="text" name='email' placeholder="Email" className='logintext' value={formdata.email} onChange={handleformchange} />
                            </div>
                            <div className="login10">
                                <input required={true} type="password" name='password' placeholder="Password" className='logintext' value={formdata.password} onChange={handleformchange} />
                            </div>
                            <div className="login11" onClick={handlesignup}>
                                Sign Up
                            </div>
                            <div className="login12" onClick={() => {
                                setsignorlog(!signorlog)
                            }}>
                                Already Have an Account? Log In
                            </div>
                        </>
                    )
                }

                {
                    !signorlog && (
                        <>
                            <div className="login13" style={{ fontSize: "20px" }}>
                                Please Log In to Continue
                            </div>
                            <div className="login9">
                                <input ref={inputRef1} type="text" name='email' placeholder="Email" className='logintext' value={formdata.email} onChange={handleformchange} onKeyDown={(e) => handleKeyPress(e, inputRef2)} />
                            </div>
                            <div className="login10">
                                <input ref={inputRef2} type="password" name='password' placeholder="Password" className='logintext' value={formdata.password} onChange={handleformchange} onKeyDown={
                                    (e) => {
                                        if (e.key === "Enter") {
                                            handlelogin();
                                        }
                                    }
                                } />
                            </div>
                            <div className="login11" onClick={handlelogin}>
                                {
                                    signorlog === false ? "Log In" : ""
                                }
                            </div>
                            <div className="login12" onClick={() => {
                                setsignorlog(!signorlog);
                            }}>
                                {
                                    signorlog === false ? "Not Have an Account? Sign Up" : ""
                                }
                            </div>

                        </>
                    )
                }
            </div>
        </div>
    </>)
};

export default LoginPage;