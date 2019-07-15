import React, { Component } from 'react';

import Input from '../../components/uielements/input';
import Button from '../../components/uielements/button';
import Image from '../../image/rob.png';

import FourZeroFourStyleWrapper from './404.style';

export default class extends Component {
  state = {
    email: '',
    disabled: true
  };
  render() {
    
    const { email, disabled } = this.state;
    const onChange = event => {
    
     
    };
    return (
      <FourZeroFourStyleWrapper className="iso404Page">
        <div className="iso404Content">
          <h1>Obrigado por acessar a Metas certas!</h1>
          <h3>
            A Página está passando por breves atualizações
          </h3>
          
          <h3>
            Por favor volte mais tarde!
          </h3>
          <p>
          Se tiver alguma reclamação por favor nos contate
          </p>
          <Input value={email} onChange={onChange} />
          <Button type="button" disabled={disabled}>
            SUBSCRIBE
          </Button>
        </div>

        <div className="iso404Artwork">
          <img alt="#" src={Image} />
        </div>
      </FourZeroFourStyleWrapper>
    );
  }
}
