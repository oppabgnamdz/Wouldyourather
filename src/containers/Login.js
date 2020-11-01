import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchDataLogin, loginAction } from '../actions'
import { Link } from 'react-router-dom'
export const Login = (props) => {
    const [selectUser, setSelectUser] = useState('');
    const [userName, setUserName] = useState('');
    useEffect(() => {
        props.fetchDataLogin();
    }, [])
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
                            <option key={index}>
                                {item}
                            </option>
                        )
                    })}
                </select>
            </div>
            <Link onClick={_login} to='/Home'>
                <button style={{ background: 'lightgreen', width: "100%", height: 40, border: 'none' }}>Sign in</button>
            </Link>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        getAllUser: state.GetAllUser ? state.GetAllUser : []
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDataLogin: () => {
            dispatch(fetchDataLogin())
        },
        loginAction: (user) => {
            dispatch(loginAction(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
