import React from 'react'
import Link from 'next/link'
import NavStyles from './styles/NavStyles'
import User from './User'
import SignOut from './SignOut'

const Nav = () => (
  <User>
    {({ data: { me } = {} }) => (
      <NavStyles>
        <Link href="/items">
          <a>Shop</a>
        </Link>
        {me && (
          <>
            <Link href="/sell">
              <a>Sell</a>
            </Link>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
            <Link href="/me">
              <a>Account</a>
            </Link>
            <SignOut />
          </>
        )}
        {!me && (
          <Link href="/signup">
            <a>SignIn</a>
          </Link>
        )}
      </NavStyles>
    )}
  </User>
)

export default Nav
