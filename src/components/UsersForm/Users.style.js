import styled from 'styled-components';
import WithDirection from '../../settings/withDirection';

const UserStyle = styled.div`
 

td.tag{
  color:blue;
  position: center;
  
}


.celulaEmEdicao {
  position: center;
}

.celulaEmEdicao input[type=text]{
  width:100%;
  border:0px;
  background-color:rgba(0,0,0,0);  
}


.disable{
  color:red;
}
.ion-android-delete{
  background-color: rgba(0,0,0,0);
  color: black;
  border: 2px solid #E73A3A;
  border-radius: 15px; 
  border: 2px;
  margin: 10px
  position:relative;
  padding: 5.5px
  zIndex: 5;

}

.ion-android-delete:hover {
  background-color: red
  color: white;
}
.ion-edit{ 
  background-color: rgba(0,0,0,0);
  color: black;
  border: 2px solid #E73A3A; 
  border-radius: 30px;
  border:2px;
  margin: 10px
  position:relative;
  padding: 5px

}
.ion-edit:hover {
  color: white; 
  background-color:green
}

Button{
  position:'fixed'


}

.botao{
  position:absolute;
   right: 70px;
   top: 630px
   bottom:10px;


}
button.round{
  color: #fff;
  position: fixed
  border-color:  #fff;
  background-color:  #1B2358;
  display:block;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 1px solid #f1f1;
  zIndex: 1;
  text-shadow: 0 0 0.2em #87F;
 
}


button.round:hover{
  color: white;
  background-color: green;
  box-shadow: 1px 1px black;
}
}
`;

export default WithDirection(UserStyle);
