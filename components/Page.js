import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'
import Header from './Header'
import Meta from './Meta'
import theme from './styles/Theme'

const StyledPage = styled.div`
  background: #fff;
  color: ${props => props.theme.black};
`
const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`

class Page extends Component {
  render() {
    const { children } = this.props
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{children}</Inner>
        </StyledPage>
      </ThemeProvider>
    )
  }
}

Page.propTypes = {
  children: PropTypes.element,
}

export default Page
