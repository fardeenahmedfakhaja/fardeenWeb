import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import logo from './im.jpg';
import logo1 from './im2.jpg';
import './../App.css';

class CardCom extends Component {

  render() {
    
    return (<div className='my-card'>
    
      
       
      <Card >
      <CardMedia>
        
        <image  src={URL.createObjectURL(this.props.files)} width="150" height="150"/>
      </CardMedia>
      <CardActions>
        <Button align="right" size="small" color="primary">
          Display
        </Button>
        <Button align="right" size="small" color="secondary">
          Remove
        </Button>
      </CardActions>
    </Card>
    
    
    </div>

     
    );
  }
}

export default CardCom;
