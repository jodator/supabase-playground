import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'

const Container = styled.div`
  padding: 0 0.5rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  min-height: 100vh;
`
const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;
  text-decoration: none;

  a {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
    &:hover,
    :focus,
    :active {
      text-decoration: underline;
    }
  }
`

const Description = styled.p`
  text-align: center;
  line-height: 1.5;
  font-size: 1.5rem;
`
const CodeTag = styled.code`
  background: #fafafa;
  border-radius: 5px;
  margin: 0 0.75rem;
  padding: 0.75rem;
  font-size: 1.1rem;
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace;
`

export { Container, Main, Title, Description, CodeTag }
export const StyledImage = styled(Image)`
  border-radius: 20px;
`
export const StyledLink = styled(Link)`
  text-decoration: underline;
  font-weight: bold;
  color: #444;

  &:hover {
    color: #777;
  }
`
export const Table = styled.div`
  width: 600px
`
export const Row = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr 1fr 120px;
  border-bottom: 1px solid black;
  padding: 14px 0;
`
export const Cell = styled.div`
  display: flex;
  align-items: center;
`
export const HeadCell = styled(Cell)`
  font-weight: bold;
`
export const ListTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  margin: 20px 0;
`