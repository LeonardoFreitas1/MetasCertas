import React, { Component } from 'react';
import DatePicker from '../../components/uielements/datePicker';
import IntlMessages from '../../components/utility/intlMessages';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import Form from '../../components/uielements/form';
import ContentHolder from '../../components/utility/contentHolder';
import Button from '../../components/uielements/button'
import Input, { InputGroup } from '../../components/uielements/input';

import Select, { SelectOption } from '../../components/uielements/select';


const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';


export default class Metas extends Component {

    render(){
        const FormItem = Form.Item;
        const Option = SelectOption;
        function onChange(date, dateString) {
          alert(date, dateString);
        }
        function handleChange(value) {
          alert(value); // { key: "lucy", label: "Lucy (101)" }
        }
        return(
            <LayoutWrapper>
                <PageHeader>
                    <IntlMessages id="Nova Meta" />
                 </PageHeader>
         
                <Box
                title={<IntlMessages id="Adicionar Meta" />}
                
                >
                    <ContentHolder>
                        <InputGroup>
                    <FormItem
              
              label={
                <IntlMessages id="Nome da Meta" />
              }
            >
              <Input placeholder="Nome da Meta"  style={{ width: '50%' }}/>
              <DatePicker placeholder='Para o dia'/>
              

            </FormItem>

              <InputGroup compact style={{ marginBottom: '15px' }}>
                  <Select defaultValue="Tipo da Meta" onChange={handleChange}>
                    <Option value="Vendas">Vendas</Option>
                    <Option value="Financeiro">Financeiro</Option>
                  </Select>
                   <Select defaultValue="Setor">
                    <Option value='Option1'>Desenvolvimento</Option>
                    <Option value='Option2'>Suporte</Option>
                    <Button value='Option3'>Marketing</Button>
                  </Select>

              </InputGroup>    
                   <Button>Adicionar</Button>
                         
                         
                         
              </InputGroup>
                    </ContentHolder>

                </Box>

                <Box title={<IntlMessages id="Agendar Meta" />}>
                
                 <FormItem
              
              label={
                <IntlMessages id="Nome da Meta" />
              }
            
            >
              <Input placeholder="Nome da Meta"  style={{ width: '50%', }}/>
              </FormItem>
            

              <InputGroup compact style={{ marginBottom: '15px' }}>
              
            <RangePicker
                  onChange={onChange}
                 format={dateFormat}
                    />
              </InputGroup>

            <InputGroup compact style={{ marginBottom: '15px' }}>
                  <Select defaultValue="Tipo da Meta">
                    <Option value="Option1-1" id='ip'>Vendas</Option>
                    <Option value="Option1-2">Financeiro</Option>
                  </Select>
                   <Select defaultValue="Setor">
                    <Option value='Option1'>Desenvolvimento</Option>
                    <Option value='Option2'>Suporte</Option>
                    <Option value='Option3'>Marketing</Option>


                  </Select>
                </InputGroup>
                <Button>Adicionar</Button>
                </Box>
            
            </LayoutWrapper>
         
       
        )}

}