import styled from 'styled-components';
import { palette } from 'styled-theme';

const WidgetWrapper = styled.div`
  margin: 0 10px;

  @media only screen and (max-width: 767) {
    margin-right: 0 !important;
  }
`;

const WidgetBox = styled.div`
  width: 100%;
  height: ${props => (props.height ? `${props.height}px` : '100%')};
  padding: ${props => (props.padding ? props.padding : '30px')};
  background-color: #ffffff;
  border: 1px solid ${palette('border', 2)};

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;

const WidgetColumn = styled.div`
  align-content: flex-start;
`;

const StyleButton = styled.div`

@keyframes example {
  0% {left:1px; top:2px;}
  10% {left 2px; top: 4px}
}

div#box{
  margin:  auto;
  position: absolute;
  top: 0;
  left:  0;
  bottom: 0;
  right: 0;
  height: 300px;
  width: 300px; 
  background-color: #fff;
  box-shadow:  10px 10px 5px #aaaaaa;
 
  
}
div#box:hover{
  
  -webkit-animation-name: example;
  animation-name: example;
  animation-duration: 1s;
}

span{
padding: 10px;
position: absolute;
margin: auto
top: 10px;
font-family: Lato;
font-size: 18px;
}


button {
  margin:  auto;
  position: absolute;
  top: 0;
  left: 27%;
  bottom: 0;
  right: 0;
  height: 40px;
  background-color: #fff;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.65);
  border: 1px solid transparent;
  border-color: #d9d9d9;
  box-shadow:  1px 1px  #aaaaaa;
}

button:hover,
:focus {
  color: #40a9ff;
  background-color: #fff;
  border-color: #40a9ff;
 
}
`

export { WidgetWrapper, WidgetBox, WidgetColumn,StyleButton };
