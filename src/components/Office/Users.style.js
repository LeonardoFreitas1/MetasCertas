import styled from 'styled-components';
import WithDirection from '../../settings/withDirection';

const CargosStyle = styled.div`
padding: 40px 20px;
display: flex;
flex-flow: row wrap;
overflow: hidden;

@media only screen and (max-width: 767px) {
  padding: 50px 20px;
}

@media (max-width: 580px) {
  padding: 15px;
}

img{
  width: 50px;
  height: 50px;
  
}

button{
  color: black; 
  border-color: #668cff;
  background-color: rgba(0,0,0,0);
  height: 25px;
  width: 25px;
  border-radius: 50%;
  border: 1px solid #f1f1;
  zIndex: 1;

 
}
button:hover{
  border-color: #668cff


}

.cargos {
     position:relative;
     width: 30%;
     height: 30%;
     background-color: #ffffff;
     margin: 0 0 30px;
     border-radius: 3%
     overflow: auto;
     float: left;
     word-wrap: break-word;
    }
`;

export default WithDirection(CargosStyle);
