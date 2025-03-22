import styled from "styled-components";

export const CheckoutItemContainer = styled.div`
    width: 100%; 
    display: flex; 
    min-height: 100px; 
    border-bottom: 1px solid darkgrey; 
    padding: 15px 0; 
    font-size: 20px; 
    align-items: center;
    justify-content: space-between;
    
    @media screen and (max-width: 800px) {
        font-size:10px;
        padding: 10px 1px;
    }

    @media screen and (max-width: 400px) {
        font-size: 12px;
        padding: 5px 0;
    }
`

export const ImageContainer = styled.div`
    width: 23%; 
    padding-right: 15px;

     @media screen and (max-width: 800px) {
        width: 20%
    }

     @media screen and (max-width: 400px) {
        width: 30%
    }

`

export const Image = styled.img`
    width: 100%; 
    height: 100%;

  
 
`

export const Name = styled.span`
    width: 23%;

    @media screen and (max-width: 800px) {
        width: 30%;
        
    }
`

export const Quantity = styled.span`
    width: 23%;
    display: flex;

     @media screen and (max-width: 800px) {
        width: 30%;
       

`
export const Price = styled.span`
    width: 23%;

     @media screen and (max-width: 800px) {
       width: 30%;
    ;
    }

`

export const Arrow = styled.div`
    cursor: pointer;
`

export const Value = styled.span`
    margin: 0 10px;
`

export const RemoveButton = styled.div`
    padding-left: 12px; 
    cursor: pointer; 

     @media screen and (max-width: 800px) {
        width: 10%;
        text-align: center;
    }

`

   
  
 