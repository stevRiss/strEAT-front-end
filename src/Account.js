import {useRef,  useState} from "react";
import './Account.css';

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
                        <div className='edits'>Edit Username</div>
                        <input className='acct-inputs' placeholder={user.username}  ref={usernameRef}></input>
                        <div className='edits'>Edit E-mail</div>
                        <input className='acct-inputs' placeholder={user.email} ref={emailRef}></input>
                        <div className='edits'>Edit Password</div>
                        <input className='acct-inputs' placeholder='New Password' type='password' ref={passwordRef}></input>
                        {/* <div></div> */}
                        <button id='new-rate' type='submit'>Submit</button>
                    </form>
                </div>
            
                : 
                <div className='details'>
                    <h1 id='rate-heading'>Account Details</h1>
                    <div className='acct'>Username: <strong>{user.username}</strong></div>
                    <div className='acct'>E-mail: <strong>{user.email}</strong></div>
                    <button className='edit-bttn' onClick={handleEd}>Edit username or password</button>
                </div>
                }

            
            

        </div>

    )
}
export default Account