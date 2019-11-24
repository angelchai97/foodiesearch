import React, { Component } from 'react';
import './App.css';
// import ReactTable from 'react-table';
// import 'react-table/react-table.css';
import axios from 'axios';
import Popup from 'react-popup';
import { Button } from 'reactstrap';
import './Popup.css';
import Recipes from "./Recipes";
import { Link } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      search: '',
      loading: false,
    };

    this.search = this.search.bind(this);
    this.onClick2 = this.onClick2.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.state.loading = true;
    this.search();
  }

  getAllRecipes = () => {
    axios
      .get('/getAllRecipes')
      .then(result => {
        this.setState({ recipes: result.data });
        console.log(this.state.recipes);
      })
      .catch(error => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getAllRecipes();
    this.search();
  }

  deleteRecord = value => {
    console.log('to delete: ', value);
    const query = `/deleterecipe?title=${value}`;
    axios
      .get(query)
      .then(result => {
        this.getAllRecipes();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  };
 
  
  search(a = null){
    
    if(this.state.loading === true){
      axios.get(`/getRecipe?search=${this.state.search}`).then(res=>{
        var arr = res.data.hits;
        var str = 'none'
        for(let i =0; i < arr.length; i++){
          delete arr[0].recipe.totalNutrients
          delete arr[0].recipe.totalDaily
        }
        if(a != null && this.state.search.trim() == '' || res.data.hits.length == 0){
          str = 'inline'
          this.state.recipes=[]
          this.setState({recipes:[]})
        }
        if(a == null){
          this.setState({recipes:arr})
        }
        else{
          this.setState({recipes:arr})
        }
        document.getElementById('error-message').style.display = str;
        
        this.state.loading = false
        this.setState({loading:false})
      }).catch(err=>{
        console.log(err)
      })
    }
    this.setState({text:'search'})
  }
  handleChange = (e)=>{
    this.setState({search:e.target.value})
  }
  async onClick2(e) {
      this.state.loading = true;
      await this.search('1');
  }
  
  keyPress(e){
    console.log(this)
    e.preventDefault();
    console.log(e.key)
    if(e.key === 'Enter'){
      this.onClick2();
       console.log('value', e.target.value);
    }
    else{}
 }
  render() {
    
    var data = this.state.recipes;
    const  IsLoading  = this.state.loading;

    return (
      <div className="App">

        <div className="jumbotron text-center header">
          <div className="row" >
              <Button className="manage_button" >
                <Link style={{"color":"white"}} to = {{pathname: `/history`}}>Manage</Link>
            </Button>
          </div>
          <h1>Foodie Recipe</h1>
          <p1>Discover the thousand ways of making delicious foods!</p1>
        </div>

        <div className="container search">
          <div className="col-sm-12" style={{"text-align":"center"}}>
            <p />
              <form style={{ marginBottom:"2rem" }} onSubmit={e => { this.keyPress(e); }}>
              <label>Enter food name:</label>
              <input 
                type="text"
                className="form-control"
                value={this.state.search}
                onChange={this.handleChange}
              />
            <p />
              <Button id='button12' className="form__button" onClick={this.onClick2} onKeyDown={(e)=>this.keyPress(e)}>{IsLoading ? 'Searching...' : 'Search'}</Button>
              {' '}
              </form>
            <p />
          </div>

          <div>
            <Popup />
          </div>

        </div>

        <Recipes recipes={this.state.recipes}/>
        
      </div>
    );
  }
}

export default App;
