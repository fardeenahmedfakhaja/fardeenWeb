import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import firebase from "firebase";
import fire from '../utils/config.js';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import CardCom from './Card.js'
import './../App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';





class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {value:'',open: false,error:false,age:'',file:null,files:[],downloadURLs:[]};
    this.dic={};
    this.imgArray=[<CardCom imaa='/static/media/im.1437aeba.jpg'/>,<CardCom imaa='./im1.jpg'/>];
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.hadleFileChange=this.hadleFileChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    //this.uploadTaskFunction=this.uploadTaskFunction(this);
  }
  handleUpload(event){
    var uploadTask;
    // let lists=[];
    let a=this.state.files.length;
    let thisContext=this;
    this.state.files.map(value => (
      console.log('values of files are', value),
      //this.uploadTaskFunction(value)
      console.log(value),
    uploadTask=firebase.storage().ref('/product').child(value.name).put(value),
    uploadTask.on('state_changed', function(snapshot){
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
  }

}, function(error) {
  // Handle unsuccessful uploads
}, function() {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

    console.log("value is",value);
    //console.log('link',lists);
    console.log('File available at', downloadURL);

     let lists = thisContext.state.downloadURLs;
      lists.push(downloadURL);
      thisContext.setState({downloadURLs:lists});
      if(lists.length==a){
        console.log('final list is :',thisContext.state.downloadURLs)

    var ref = firebase.database().ref();
    ref.child('product/-LSzuVZIHUvkf62qcabe/images').set(thisContext.state.downloadURLs);
      }
    
    

  })
})


    ));
    console.log('enter');
    var ref = firebase.database().ref();
   // console.log('list is',lists);
//ref.child('product/-LSzuVZIHUvkf62qcabe/images').set(this.state.downloadURLs);
  }
  uploadTaskFunction(value){
    console.log(value);
    var uploadTask=firebase.storage().ref('/product').child(value.name).put(value);
    uploadTask.on('state_changed', function(snapshot){
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
  }

}, function(error) {
  // Handle unsuccessful uploads
}, function() {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log("value is",value);
    console.log('File available at', downloadURL);
    let lists = this.state.downloadURLs;
      lists.push(downloadURL);
    this.setState({downloadURLs:lists});
    

  });
});

  }
  hadleFileChange(event){
    let lists = this.state.files;
      lists.push(event.target.files[0]);
    this.setState({file:URL.createObjectURL(event.target.files[0]),files:lists})
    console.log('obj',event.target.files[0].name);
    console.log('files',this.state.files);
    console.log('target',event.target);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(name);
    console.log(value);

    this.setState({age:'3'})
    this.dic[name]=value;
  }
   handleSubmit(event) {
    console.log(document.getElementById("myFile").value);
    console.log('dic is : ',this.dic['title']);
    if(this.dic['title']===undefined){
      this.setState({ error: true });
      
  }else{
      console.log('dic undifines');
      this.setState({ error: false })
     var ref = firebase.database().ref();
    console.log(document.getElementById("myFile").value);
    
    ref.child('product').push(this.dic);
    console.log(this.dic)
    event.preventDefault();
  }

  }
   handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    return (
  <div className='ad_form' >
    <p>Publish ad</p>
    <br/><br/><br/>
 
 <TextField
 error={this.state.error}

          id="outlined-adornment-title"
          name='title'
          variant="outlined"
          label="Title"
         onChange={this.handleInputChange}
        />
       <br/><br/><br/>
 <TextField
          required
          multiline
          id="outlined-adornment-description"
          name='description'
          
          variant="outlined"
          label="Description"
         onChange={this.handleInputChange}
        />
       <br/><br/><br/>
  <TextField
          id="outlined-adornment-amount"
          name='pricePerDay'
          variant="outlined"
          label="Price per day"
         onChange={this.handleInputChange}
        />
       <br/><br/><br/>
        
  <Select
  open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.age}
            onChange={this.handleInputChange}
            inputProps={{
              name: 'age',
              id: 'demo-controlled-open-select',
            }}
          >
        <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
  </Select>
    <br/><br/><br/>
    
    <br/><br/><br/>
    <Grid container  className='root' spacing={40}>
          {this.state.files.map(value => (
              <Grid key={value.name} item>
                <CardCom key={value.name} files={value}/>
              </Grid>
            ))}
        </Grid>
        <br/><br/><br/>
        <input id="myFile"  type='file' onChange={this.hadleFileChange}/>
        
        <Button onClick={this.handleUpload}>Upload</Button>
                <br/><br/><br/>
  <input type="submit1" value="Submit" onClick={this.handleSubmit}/>
</div>
    );
  }
}

export default Form;