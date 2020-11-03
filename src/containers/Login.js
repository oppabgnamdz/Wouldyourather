import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchDataLogin, loginAction, fetchQuestion } from '../actions'
import { Link } from 'react-router-dom'
import { BarLoader } from 'react-spinners'

export const Login = (props) => {
    const [selectUser, setSelectUser] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        props.fetchDataLogin();
        props.fetchQuestion();
        setTimeout(() => {
            setLoading(true)
        }, 1000)


    }, [])
  

    // }
    const handleEvent = (e) => {
        setUserName(e.target.value)
        Object.keys(props.getAllUser).find(item => {
            if (item === e.target.value) {
                setSelectUser(props.getAllUser[item].avatarURL)
            }
        })
    }
    function _login(e) {
        try {
            props.loginAction(props.getAllUser[userName])
        } catch (Ex) {
            e.preventDefault();
            console.log(Ex)
        }

    }
    return (
        <div className='home'>
            {loading ? (<div>
                <div className="welcome">
                    <h4>Welcome to  the Would you rather App!</h4>
                    <p>Please sign in to coutinute</p>
                </div>
                <img style={{ width: 200, height: 200 }} src="https://equimper.gallerycdn.vsassets.io/extensions/equimper/react-native-react-redux/2.0.6/1602247317454/Microsoft.VisualStudio.Services.Icons.Default" ></img>
                <div style={{ display: 'flex' }}>

                    {selectUser && <img style={{ width: 70, height: 70 }} src={selectUser}></img>}
                    <select defaultValue='default' onChange={handleEvent} style={{ display: 'block', width: "100%", padding: 20 }}>
                        <option value='default' disabled> Select account</option>
                        {Object.keys(props.getAllUser).map((item, index) => {
                            return (
                                <option value={item} key={index}>
                                    {props.getAllUser[item].name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                {localStorage.getItem('check') ? (
                    <Link onClick={_login} to={Object.keys(props.questions).indexOf(localStorage.getItem('check')) === -1 ? `/PageError` : '/Home'}>
                        <button style={{ background: 'lightgreen', width: "100%", height: 40, border: 'none' }}>Sign in</button>
                    </Link>
                ) : (
                        <Link onClick={_login} to={'/Home'}>
                            <button style={{ background: 'lightgreen', width: "100%", height: 40, border: 'none' }}>Sign in</button>
                        </Link>
                    )}
            </div>) : (<div>
                <BarLoader size={48} width="100%" color='red' />
            </div>)
            }

        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        getAllUser: state.GetAllUser ? state.GetAllUser : [],
        questions: state.GetAllQuestion
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDataLogin: () => {
            dispatch(fetchDataLogin())
        },
        loginAction: (user) => {
            dispatch(loginAction(user))
        }, fetchQuestion: () => {
            dispatch(fetchQuestion())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
