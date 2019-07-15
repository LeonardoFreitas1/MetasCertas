import React, { Component } from 'react'
import IntlMessages from '../../components/utility/intlMessages';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import Progress from '../../components/uielements/progress';
import { rtl } from '../../settings/withDirection'; 
export default class Progresso extends Component {
    render(){const marginStyle = {
        margin: rtl === 'rtl' ? '0 0 10px 10px' : '0 10px 10px 0',
        paddingRight: '100px',
        paddingLeft: '10px'
      };
        return( 
            <LayoutWrapper>
                <PageHeader>
                    <IntlMessages id='Progresso'/>
                </PageHeader>
                <Box title={<IntlMessages id="Metas Semanais" />}>
                <div style={{padding: '20px'}}>
                  <IntlMessages id='Vender R$ 2000.00'/>
                  <span style={{paddingLeft: '80px'}} >Conseguir 15% de clientes a mais</span>
                  </div>
                  
                  <Progress type="circle" percent={11} style={marginStyle} />
              <Progress type="circle" percent={100} style={marginStyle} />
              </Box>

               <Box title={<IntlMessages id="Metas Mensais" />}>
                <div style={{padding: '12px'}}>
                  <IntlMessages id='Ter um lucro de 13%'/>
                  
                  </div>
                  <Progress type="circle" percent={0} style={marginStyle} />
              
              </Box>
              


            </LayoutWrapper>
        )
    }
}