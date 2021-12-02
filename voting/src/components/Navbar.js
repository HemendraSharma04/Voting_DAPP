import React from 'react'

const Navbar = ({account,balance}) => {
    
    return (
        <div>
         <p>ACCOUNT:   {account} </p>
        <p> BALANCE : {balance} ETH </p>
        </div>
    )
}

export default Navbar
