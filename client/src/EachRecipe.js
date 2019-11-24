import React from 'react';
import { Link } from "react-router-dom";

class EachRecipe extends React.Component {
    state = {
        activeRecipe: []
    }
    componentDidMount = async () => {
        this.state.activeRecipe = this.props.location.state.eachrecipe;
        console.log(this.state.activeRecipe)
        this.setState(this.state.activeRecipe)
    }

    renderIngredient(){
        try{
            var arr = this.state.activeRecipe.ingredientLines.length;
            if(arr !== 'undefined'){
                var str = '';
                for(let i =0; i < arr;i++){
                   str += `<ul key=${i}> ${this.state.activeRecipe.ingredientLines[i]}</ul>`
                } 
                document.getElementById('multiple').innerHTML= str;
            }
        }catch(error){
            console.log(error)
        }
    }

    render(){
        console.log.apply(this.props);
        return(
            
            <div class="eachrecipe__container">
                <div className="eachrecipe_row">

                    <div className="eachrecipe__column1">
                        <div className="eachrecipes__box"> 
                            <img className="active-recipe__img" src={this.state.activeRecipe.image}/>
                        </div>
                    </div>

                    <div className="eachrecipe__column2">

                        <h3 className="active-recipe__title">{this.state.activeRecipe.label}</h3>
                        <h3 className="active-recipe__subtitle">Ingredient:</h3>
                        <h4 id="multiple">{this.renderIngredient()}</h4>
                        
                        <div className="eachrecipe_button">
                        <a href={this.state.activeRecipe.url} target="_blank" > 
                        <button className="form__button">Publisher</button>
                        </a>
                            <button className="active-recipe__button">
                                <Link style={{"color":"#e74c3c"}} to= "/">Go Home</Link>
                            </button>
                        </div> 

                    </div>

                 </div>
            </div>
        );
    }
}

export default EachRecipe;