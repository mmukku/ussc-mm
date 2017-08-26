import React from "react"
import Link from 'gatsby-link'

import Container from '../components/container';

export default () => 
    <Container>
        <p>Main page content goes here</p>
        <br/>
        <Link to="/sentencing-calculator/">Sentencing Calculator</Link>
        <br/>
        <Link to="/appendix-a/">Statutory Index</Link>
    </Container>
