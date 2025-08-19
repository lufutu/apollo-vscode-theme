// JavaScript/TypeScript Syntax Test File
// This file tests various syntax highlighting features

/* Multi-line comment
   Testing comment highlighting */

// Keywords and control flow
import { Component } from 'react';
export default class TestClass extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  // Function with various elements
  async handleClick() {
    const { count } = this.state;
    const newCount = count + 1;
    
    if (newCount > 10) {
      throw new Error('Count too high!');
    }
    
    try {
      await this.setState({ count: newCount });
      return true;
    } catch (error) {
      console.error('Error updating state:', error.message);
      return false;
    }
  }

  render() {
    const isEven = this.state.count % 2 === 0;
    const message = `Current count: ${this.state.count}`;
    
    return (
      <div className="test-component">
        <h1>{message}</h1>
        <button onClick={this.handleClick}>
          {isEven ? 'Even' : 'Odd'} - Click me!
        </button>
      </div>
    );
  }
}

// Various data types and operators
const numbers = [1, 2, 3.14, 0xFF, 0b1010, 0o777];
const booleans = [true, false, null, undefined];
const regex = /^[a-zA-Z0-9]+$/gi;
const template = `Hello ${name}, today is ${new Date().toDateString()}`;

// Object and array destructuring
const { prop1, prop2: renamed, ...rest } = someObject;
const [first, second, ...remaining] = someArray;

// Arrow functions and modern syntax
const add = (a, b) => a + b;
const multiply = (x, y) => {
  return x * y;
};

// Async/await and promises
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}