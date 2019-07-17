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

Button {
  position:relative;
  align: right;
  margin: 30px;
  
}
}
`;

export default WithDirection(UserStyle);
