import React, {Component} from 'react';
import IntlMessages from '../../components/utility/intlMessages';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import {  Col } from 'antd';
import basicStyle from '../../settings/basicStyle';
import Button from '../../components/uielements/button'
import { rtl } from '../../settings/withDirection'; 

export default class Minhas_metas extends Component{

    AnimationForm(){
        const wrapper = document.getElementById('form');
        wrapper.classList.toggle('is_nav_open')
    }

    render(){
        const {colStyle} = basicStyle;
        const margin = {
            margin: rtl === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0'
          };
        
        return(
          <LayoutWrapper>
              <PageHeader>
                  <IntlMessages id='Minhas Metas'/>
              </PageHeader>

              <Col md={8} xs={24} style={colStyle}>
            <Box title={<IntlMessages id="Vender R$ 2000,00" />}>
            <div id='form' style={{display: 'flex', width: '100%', height: '100%', transition: 'margin .5s', margin: '0 0 0 -250px'}}>
            <Button
                  className='nav__icon'
                  type='menu-fold'
                  shape="circle"
                  icon="plus"
                  style={margin}
                  onClick={() => this.AnimationForm()}
                />
                </div>
            </Box>
            
          </Col>
         
          </LayoutWrapper>
        )
    }
}