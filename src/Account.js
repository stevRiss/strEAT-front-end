import {useRef,  useState} from "react";

function Account({user}){
    const [ed, setEd] = useState(false)
    const usernameRef = useRef('');
    const emailRef = useRef('')
    const passwordRef = useRef('');

    const handleEd = () => {
        setEd(!ed)
    }
    const handleUp = (e) => {
        e.preventDefault();
        if(usernameRef.current.value === ''){
            usernameRef.current.value = user.username
            console.log(usernameRef.current.value)
        }else if(emailRef.current.value === ''){
            emailRef.current.value = user.email
        }else if(passwordRef.current.value === ''){
            passwordRef.current.value = user.password_digest
        }
        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameRef.current.value,
                email: emailRef.current.value,
                password_digest: parseInt(passwordRef.current.value)
            })
        }).then(r=> r.json()).then(newUse => setEd(false))
        

        // navigate('/newrating', { replace: true })
    }

    
    return(
        <div>
            {ed ? 
                <div id='forming'>
                    <form  onSubmit={e => handleUp(e)}>
                        <h3>edit username</h3>
                        <input className='inputs' placeholder={user.username}  ref={usernameRef}></input>
                        <h3>edit email</h3>
                        <input className='inputs' placeholder={user.email} ref={emailRef}></input>
                        <h3>edit password</h3>
                        <input className='inputs' placeholder='New Password' type='password' ref={passwordRef}></input>
                        <div></div>
                        <button className='edit-bttn' type='submit'>Submit</button>
                    </form>
                </div>
            
                : 
                <div className='details'>
                    <h1>Account Details</h1>
                    <h2>Username: {user.username}</h2>
                    <h2>E-mail: {user.email}</h2>
                </div>
                }

            
            <button onClick={handleEd}>Edit username or password</button>

        </div>

    )
}
export default Account