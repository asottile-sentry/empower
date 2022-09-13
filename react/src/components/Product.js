import React, { Component, useState, useEffect } from 'react';
import Context from '../utils/context';
import './product.css';
import * as Sentry from '@sentry/react';
import productOne from './products/1';
import productTwo from './products/2';
import productThree from './products/3';
import productFour from './products/4';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux'
import { addProduct } from '../actions'


function Product(props) {
  const [product, setProduct] = useState();
  const { id } = useParams();

  const fetchProduct = () => {
    let data
    if (id) {
      switch (id) {
        case "3":
          data = productOne
          break;
        case "4":
          data = productTwo
          break;
        case "5":
          data = productThree
          break;
        case "6":
          data = productFour
          break;
        default:
          console.log("Default")
      }
    }
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct()
  }, [product]);

  let averageRating
  if (product) {
    averageRating = (product.reviews.reduce((a,b) => a + (b["rating"] || 0),0) / 3).toFixed(1)
  }

  return product ? (
    <div className="product-layout">
      <div>
        <img src={product.imgCrop} alt="product" />
      </div>
      <div className="product-info">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>{product.descriptionFull}</p>
        <button
          className="add-cart-btn"
          onClick={() => props.addProduct(product)}
        >
          Add to cart — ${product.price}.00
        </button>
        <p>{averageRating} Rating</p>
      </div>
    </div>
  ) : (
    <p>Loading…</p>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cart,
    products: state.products
  }
}

export default connect(
  mapStateToProps,
  { addProduct }
  )(Sentry.withProfiler(Product, { name: "Product"}))
  

// OLD CODE - SMART COMPONENT
// class Product extends Component {
//   static contextType = Context;

//   constructor() {
//     super();
//     this.state = {
//       product: null,
//     };
//   }

//   async shouldComponentUpdate() {
//     console.log("> Product shouldComponentUpdate")
//   }

//   async componentDidMount() {
//     const { match } = this.props;
//     if (match.params.id) {
//       let data
//       switch (match.params.id) {
//         case "3":
//           data = productOne
//           break;
//         case "4":
//           data = productTwo
//           break;
//         case "5":
//           data = productThree
//           break;
//         case "6":
//           data = productFour
//           break;
//         default:
//           console.log("Default")
//       }
//       // const data = await import(`./products/${match.params.id}`);
//       // this.setState({ product: data.default });
//       this.setState({ product: data });
//     }
//   }
  
//   render() {
//     const { product } = this.state;
//     const { cart } = this.context;

//     let averageRating
//     if (product) {
//       averageRating = (product.reviews.reduce((a,b) => a + (b["rating"] || 0),0) / 3).toFixed(1)
//     }
//     return product ? (
//       <div className="product-layout">
//         {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}

//         <div>
//           <img src={product.imgCrop} alt="product" />
//         </div>
//         <div className="product-info">
//           <h1>{product.title}</h1>
//           <p>{product.description}</p>
//           <p>{product.descriptionFull}</p>
//           <button
//             className="add-cart-btn"
//             onClick={() => this.props.addProduct(product)}
//           >
//             Add to cart — ${product.price}.00
//           </button>
//           <p>{averageRating} Star Rating</p>
//         </div>
//       </div>
//     ) : (
//       <p>Loading…</p>
//     );
//   }
// }
