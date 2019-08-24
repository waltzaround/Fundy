import styled from 'styled-components';

const Container = styled.div`
background: white;
margin: 0 0 0 0;
`


const Page = ({ children }) => (

    <Container>
        <style dangerouslySetInnerHTML={{__html: `
  body { margin: 0; }
`}} />
{ children }




    </Container>
);

export default Page;