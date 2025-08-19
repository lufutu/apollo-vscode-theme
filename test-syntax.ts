// TypeScript Syntax Test File
// Testing TypeScript-specific syntax highlighting features

import { Component, ReactNode } from 'react';
import * as fs from 'fs';
import { readFile } from 'fs/promises';

// Interface definitions
interface User {
  readonly id: number;
  name: string;
  email: string;
  age?: number;
  isActive: boolean;
  roles: Role[];
  metadata: Record<string, unknown>;
}

interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

// Type aliases
type Permission = 'read' | 'write' | 'delete' | 'admin';
type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended';
type EventHandler<T> = (event: T) => void;

// Union and intersection types
type StringOrNumber = string | number;
type UserWithTimestamps = User & {
  createdAt: Date;
  updatedAt: Date;
};

// Generic interfaces
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: Omit<T, 'id'>): Promise<T>;
  update(id: string, updates: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

interface ApiResponse<TData> {
  data: TData;
  status: number;
  message: string;
  errors?: string[];
}

// Enum definitions
enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
  GUEST = 'guest'
}

enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

// Class with generics and decorators
abstract class BaseService<T> {
  protected abstract repository: Repository<T>;

  async findById(id: string): Promise<T | null> {
    return await this.repository.findById(id);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.findAll();
  }
}

// Concrete class implementation
class UserService extends BaseService<User> {
  protected repository: Repository<User>;

  constructor(repository: Repository<User>) {
    super();
    this.repository = repository;
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const user = await this.repository.create(userData);
    this.notifyUserCreated(user);
    return user;
  }

  async updateUserStatus(id: string, status: UserStatus): Promise<User> {
    const updates: Partial<User> = { 
      isActive: status === 'active',
      metadata: { lastStatusChange: new Date().toISOString() }
    };
    return await this.repository.update(id, updates);
  }

  private notifyUserCreated(user: User): void {
    console.log(`User created: ${user.name} (${user.email})`);
  }
}

// Generic functions
function identity<T>(arg: T): T {
  return arg;
}

function mapArray<T, U>(array: T[], mapper: (item: T) => U): U[] {
  return array.map(mapper);
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  const data = await response.json();
  
  return {
    data,
    status: response.status,
    message: response.ok ? 'Success' : 'Error'
  };
}

// Conditional types
type NonNullable<T> = T extends null | undefined ? never : T;
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

// Mapped types
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Utility types usage
type PartialUser = Partial<User>;
type RequiredUser = Required<User>;
type UserEmail = Pick<User, 'email'>;
type UserWithoutId = Omit<User, 'id'>;

// Template literal types
type EventName = `on${Capitalize<string>}`;
type CSSProperty = `--${string}`;
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiEndpoint = `/api/${string}`;

// Namespace
namespace Utils {
  export function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  export class Logger {
    static log(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`);
    }
  }
}

// Module augmentation
declare global {
  interface Window {
    apolloTheme: {
      version: string;
      isDark: boolean;
    };
  }
}

// Decorators (experimental)
function log(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyName} with args:`, args);
    const result = method.apply(this, args);
    console.log(`${propertyName} returned:`, result);
    return result;
  };
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }

  @log
  multiply(a: number, b: number): number {
    return a * b;
  }
}

// Advanced type manipulation
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type Flatten<T> = T extends (infer U)[] ? U : T;

// Function overloads
function processValue(value: string): string;
function processValue(value: number): number;
function processValue(value: boolean): boolean;
function processValue(value: string | number | boolean): string | number | boolean {
  if (typeof value === 'string') {
    return value.toUpperCase();
  } else if (typeof value === 'number') {
    return value * 2;
  } else {
    return !value;
  }
}

// Async/await with proper typing
async function handleUserData(): Promise<void> {
  try {
    const users = await fetchData<User[]>('/api/users');
    
    if (users.status === HttpStatus.OK) {
      const activeUsers = users.data.filter(user => user.isActive);
      const userNames = mapArray(activeUsers, user => user.name);
      
      Utils.Logger.log(`Found ${activeUsers.length} active users: ${userNames.join(', ')}`);
    } else {
      throw new Error(`Failed to fetch users: ${users.message}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      Utils.Logger.log(error.message, 'error');
    } else {
      Utils.Logger.log('Unknown error occurred', 'error');
    }
  }
}

// Export statements
export {
  User,
  Role,
  Permission,
  UserService,
  BaseService,
  UserRole,
  HttpStatus,
  Utils
};

export type {
  UserStatus,
  EventHandler,
  StringOrNumber,
  UserWithTimestamps,
  Repository,
  ApiResponse
};

export default UserService;