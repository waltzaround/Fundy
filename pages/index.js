import React from 'react'
import styled from 'styled-components'
import Page from '../components/Page'
import Card from '../components/Card'

const Container = styled.div`
  width: 80rem;
  margin: 0 auto;
`

const CardGrid = styled.div`
display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
`

const HeroContainer = styled.div`
margin: 5rem 0;
width: 80rem;
height: 35rem;
background: #FFDBDB;
border-radius: 24px;
`

const HeroH1 = styled.h1`
font-family: Averta-Bold;
font-size: 96px;
color: #131415;
letter-spacing: -2.36px;
`

const HeroContent = styled.div`

`

const HeroImage = styled.div`

`

const Index = () => (
  <Page>
    <Container>
    <HeroContainer>
        <HeroContent>
          <HeroH1>Do good.</HeroH1>
        </HeroContent>
        <HeroImage></HeroImage>
      </HeroContainer>

      <CardGrid>
        <Card />
        <Card />
        <Card />
      </CardGrid>
    </Container>
  </Page>
)

export default Index
