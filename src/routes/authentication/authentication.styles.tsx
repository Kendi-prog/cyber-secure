import styled from "styled-components";

export const AuthContainer = styled.div`
    display: flex;
    width: 900px;
    justify-content: space-between;
    margin: 30px auto;

    @media screen and (max-width: 800px){
        flex-direction: column;
        width: 300px;
        margin: 10px auto;
        padding: 0;

        
    }
`