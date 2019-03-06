import React, { Component } from 'react'
import { recipe } from '../tempDetails';
export default class RecipeDetail extends Component {
  state = {
    recipe: recipe
  }

  async componentDidMount(){
    const id = this.props.id;
    const url = `https://www.food2fork.com/api/get?key=6a1e4917f685b1131e89f2b4628c5d0c&rId=${id}`;
    try {
          const data = await fetch(url);
          const jsonData = await data.json();
    
          this.setState((state, props)=>{
            return {recipe:jsonData.recipe}
          }, ()=>{})
        }
        catch (err) {
          console.log(err);
        }
  }

  render() {
    const {
      image_url,
      publisher,
      publisher_url,
      source_url,
      title,
      ingredients
    } = this.state.recipe;
    const {handleIndex} = this.props;
    return (
      <React.Fragment>
        <div className='container'>
          <div className='row'>
            <div className='col-10 mx-auto col-md-6 my-3'>
              <button type='button' className='btn btn-danger mb-5 text-capitalize'
                      onClick={()=>{handleIndex(1)}}
              >
                back to recipe list
                </button>
              <img src={image_url} className='d-block w-100' alt='recipe' />
            </div>
            {/* detail */}
            <div className='col-10 mx-auto col-md-6 my-3'>
              <h6 className='text-uppercase'>{title}</h6>
              <h6 className='text-warning text-capitalize text-slanted'>
                provided by {publisher}
              </h6>
              <a href={publisher_url} target='_blank'
                rel='nooperner' className='btn btn-primary mt-2 text-capitalize'
              >
                publisher webpage
                </a>
              <a href={source_url} target='_blank'
                rel='nooperner' className='btn btn-success mt-2 mx-3 text-capitalize'
              >
                recipe url
                </a>
              <ul className='list-group mt-4'>
                <h2 className='mt3 mb-4'>Ingerdients</h2>
                {
                  ingredients.map((item, index) => {
                    return (
                      <li key={index} className='list-group-item text-slanted'>
                        {item}
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
