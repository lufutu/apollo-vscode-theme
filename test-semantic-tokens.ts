/**
 * Test file for semantic token highlighting in Apollo Dark theme
 * This file contains various TypeScript constructs to test semantic highlighting
 */

// Namespace declaration
namespace TestNamespace {
  // Interface declaration
  interface TestInterface {
    readonly id: number;
    name: string;
    optional?: boolean;
  }

  // Class declaration
  class TestClass implements TestInterface {
    readonly id: number;
    name: string;
    optional?: boolean;
    private static instanceCount = 0;

    constructor(id: number, name: string) {
      this.id = id;
      this.name = name;
      TestClass.instanceCount++;
    }

    // Method declaration
    public async processData(data: string[]): Promise<void> {
      for (const item of data) {
        await this.handleItem(item);
      }
    }

    // Private method
    private async handleItem(item: string): Promise<void> {
      console.log(`Processing: ${item}`);
    }

    // Static method
    static getInstanceCount(): number {
      return TestClass.instanceCount;
    }

    // Deprecated method
    /** @deprecated Use processData instead */
    oldMethod(): void {
      console.log("This method is deprecated");
    }
  }

  // Enum declaration
  enum Status {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed"
  }

  // Type alias declaration
  type ProcessorFunction<T> = (input: T) => Promise<T>;

  // Generic function declaration
  function processItems<T extends TestInterface>(
    items: T[],
    processor: ProcessorFunction<T>
  ): Promise<T[]> {
    return Promise.all(items.map(processor));
  }

  // Variable declarations
  const defaultConfig: TestInterface = {
    id: 1,
    name: "default",
    optional: true
  };

  let currentStatus: Status = Status.PENDING;
  var legacyVariable = "legacy"; // Using var for testing

  // Function with decorators (conceptual)
  function logExecution(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(`Executing ${propertyName}`);
      return method.apply(this, args);
    };
  }

  // Arrow function
  const arrowFunction = (param: string): string => {
    return param.toUpperCase();
  };

  // Regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Number literals
  const decimal = 42;
  const hex = 0xFF;
  const binary = 0b1010;
  const octal = 0o755;

  // String literals
  const singleQuote = 'single';
  const doubleQuote = "double";
  const templateLiteral = `template ${decimal}`;

  // Boolean and null values
  const isActive = true;
  const isInactive = false;
  const nullValue = null;
  const undefinedValue = undefined;

  // Using built-in types and functions
  const array: Array<string> = [];
  const map = new Map<string, number>();
  const set = new Set<TestInterface>();

  // Promise and async/await
  async function fetchData(): Promise<TestInterface[]> {
    try {
      const response = await fetch('/api/data');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch data:', error);
      throw error;
    }
  }

  // Event handling
  function handleClick(event: MouseEvent): void {
    event.preventDefault();
    console.log('Button clicked');
  }

  // Conditional and loop constructs
  function processConditionals(items: TestInterface[]): void {
    if (items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        
        switch (item.name) {
          case 'test':
            console.log('Test item found');
            break;
          default:
            console.log('Regular item');
        }
      }
    } else {
      console.log('No items to process');
    }
  }

  // Export declarations
  export { TestClass, TestInterface, Status, processItems };
}

// Import from other modules (conceptual)
import { Component } from 'react';
import * as fs from 'fs';
import { readFile } from 'fs/promises';

// Default export
export default TestNamespace;