import styled from "styled-components";

export const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 380px;

    h2 {
        margin: 10px, 0;
    }

    @media screen and (max-width: 800px){
        width:300px;
    }
`

export const SignInButtons = styled.div`
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 800px){
        flex-direction: column;
        margin-bottom: 50px;
    }
`


