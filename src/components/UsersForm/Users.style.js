import styled from 'styled-components';
import WithDirection from '../../settings/withDirection';

const SignUpStyleWrapper = styled.div`
 

span.tag{
 
    border: 1px solid #7c7; 
    border-radius: 7px; 
    background-color: #efe;     
    color: #7c7;     
    padding: 5px;           
    
}

.ion-android-delete{
  background-color: white;
  color: black;
  border: 2px solid #E73A3A;
  border-radius: 10px; 
  border: 2px;
  margin: 10px
  position:relative;
  padding: 5px

}

.ion-android-delete:hover {
  background-color: #E73A3A; 
  color: white;
}
.ion-edit{ 
  background-color: white;
  color: black;
  border: 2px solid #E73A3A;
  border-radius: 10px; 
  border: 2px;
  margin: 10px
  position:relative;
  padding: 5px
  
}
.ion-edit:hover {
  background-color: green; 
  color: white;
}
table {
  border-collapse: collapse;
  width: 100%;
}

t#table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#table td, #table th {
  
  padding: 8px;
}

#table tr:nth-child(even){background-color: #ddd;}

#table tr:hover {background-color: #a6a6a6;}

#table tr.disable{
  opacity: 0.5;
  margin-bottom: -200px;
}

#table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #666666;
  color: white;
}
Button {
  position:relative;
  align: right;
  margin: 30px;
  
}

`;

export default WithDirection(SignUpStyleWrapper);
