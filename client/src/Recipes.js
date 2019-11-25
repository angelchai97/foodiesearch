import React from 'react';

import { Link } from "react-router-dom";

// Show searched API result which is the food recipe with title and "View Recipe" button to link to Detail Recipe page in EachRecipe.js
const Recipes = props => (
    <div>
        <div className="container" id="error-message" style={{"display":"none"}}>
                {<p className="noResult_message">Sorry! No results found :(</p> }
        </div>
        <div className="container">
            <div className="row">
                {props.recipes.map((recipe,index)=>{
                    return( 
                        <div key={recipe.recipe.label} className="col-md-4" style={{ marginBottom:"2rem" }}>
                            <div className="recipes__box">
                                <div key={index}>
                                    <img 
                                    className="recipe__box-img"
                                    src={recipe.recipe.image}
                                    alt={recipe.recipe.label}/>
                                    
                                    
                                    <div className="recipe__text">
                                        <h5 className="recipes__title">
                                            {recipe.recipe.label.length < 20 ? `${recipe.recipe.label}`: `
                                            ${recipe.recipe.label.substring(0,25)}...`}
                                        </h5>
                                    </div>

                                    <div className="recipe__text">
                                    <button className="form__button">
                                        <Link style={{"color":"#e74c3c"}} to=
                                            {{pathname: `/eachrecipe/${recipe.recipe.label}`,
                                            state:{eachrecipe: recipe.recipe}

                                            }}>View Recipe</Link>
                                    </button>
                                    </div>
                                    
                                </div>
                             </div>
                        </div>);
              
            })}
            </div>
        </div>
    </div>

);

export default Recipes;