import React, { Component } from 'react'
import { connect } from 'react-redux'

export const LeaderBoard = (props) => {
    console.log('leaderboard')
    return (
        <div style={{ background: 'red' }}>
            <p>Leader</p>
        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard)
