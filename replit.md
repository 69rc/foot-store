# SoleStyle - E-commerce Shoe Store

## Overview

SoleStyle is a modern e-commerce web application built for selling shoes online. It features a full-stack architecture with user authentication, product management, shopping cart functionality, and order processing. The application uses React with TypeScript for the frontend, Express.js for the backend, and PostgreSQL with Drizzle ORM for data persistence.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Neon serverless configuration
- **ORM**: Drizzle ORM with migrations support
- **Authentication**: Replit OIDC authentication with session management
- **Session Storage**: PostgreSQL-based session store using connect-pg-simple

### Key Design Decisions
1. **Monorepo Structure**: Client, server, and shared code in one repository for simplified development
2. **TypeScript Throughout**: End-to-end type safety from database to frontend
3. **Server-Side Rendering**: Vite middleware for development with SSR capabilities
4. **Component-Based UI**: Modular design with reusable UI components
5. **Role-Based Access**: Admin and customer roles with different permissions

## Key Components

### Database Schema
- **users**: User profiles with role-based access (customer/admin)
- **products**: Product catalog with categories, sizes, and inventory
- **orders**: Order management with status tracking
- **orderItems**: Individual items within orders
- **cartItems**: Shopping cart functionality
- **sessions**: Session storage for authentication

### Authentication System
- **Provider**: Replit OIDC authentication
- **Session Management**: PostgreSQL-based session storage
- **Role Management**: Admin and customer roles with route protection
- **Security**: HTTP-only cookies with secure flags

### Product Management
- **Categories**: Men's, Women's, Kids', and Sports shoes
- **Inventory**: Stock tracking and size availability
- **Filtering**: Category, size, price range, and search functionality
- **Admin Panel**: Product CRUD operations for administrators

### Shopping Cart
- **Persistence**: Database-stored cart items
- **Real-time Updates**: Optimistic updates with React Query
- **Size Selection**: Required size selection for shoe purchases
- **Quantity Management**: Add, update, and remove items

### Order Processing
- **Checkout Flow**: Cart to order conversion
- **Order History**: Customer order tracking
- **Admin Dashboard**: Order management for administrators
- **Status Updates**: Order status progression

## Data Flow

1. **Authentication Flow**:
   - User initiates login via Replit OIDC
   - Session created and stored in PostgreSQL
   - User profile created/updated in database
   - Role-based route access enforced

2. **Product Browsing**:
   - Products fetched from database with optional filters
   - Client-side filtering and sorting
   - Product details displayed in modals

3. **Shopping Cart**:
   - Items added to database-backed cart
   - Real-time quantity updates
   - Cart persists across sessions

4. **Order Creation**:
   - Cart items converted to order
   - Inventory updated
   - Order confirmation provided

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless driver
- **drizzle-orm**: Type-safe ORM for PostgreSQL
- **@tanstack/react-query**: Server state management
- **@radix-ui/react-***: Accessible UI components
- **tailwindcss**: Utility-first CSS framework

### Authentication
- **openid-client**: OIDC client for Replit authentication
- **passport**: Authentication middleware
- **express-session**: Session management
- **connect-pg-simple**: PostgreSQL session store

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for Node.js

## Deployment Strategy

### Development Environment
- **Vite Dev Server**: Hot module replacement for frontend
- **TSX**: Direct TypeScript execution for backend
- **Database**: Neon PostgreSQL serverless instance

### Production Build
- **Frontend**: Vite build with static asset optimization
- **Backend**: esbuild compilation to ESM format
- **Database**: Drizzle migrations for schema deployment

### Environment Variables
- **DATABASE_URL**: PostgreSQL connection string
- **SESSION_SECRET**: Session encryption key
- **REPLIT_DOMAINS**: Allowed domains for OIDC
- **ISSUER_URL**: OIDC issuer URL (defaults to Replit)

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### January 10, 2025 - Major UI Improvements & Feature Additions
- ✅ **Enhanced Landing Page**: Redesigned with modern gradients, improved typography, and better visual hierarchy
- ✅ **Image Upload System**: Added drag-and-drop image upload component for product management
- ✅ **Admin Interface**: Enhanced product creation/editing with local image upload support
- ✅ **Product Cards**: Redesigned with hover effects, better badges, and improved information layout
- ✅ **Session Management**: Fixed session secret configuration for proper authentication
- ✅ **Database Export**: Created export functionality for local development and backup
- ✅ **ES Module Compatibility**: Resolved import/export issues for cleaner code structure

### Technical Improvements
- **Image Storage**: Products now support base64 image storage for local development
- **UI Components**: Enhanced with modern design patterns and micro-interactions
- **Color Scheme**: Updated with indigo/purple gradient theme for better brand consistency
- **Error Handling**: Improved image loading with fallback placeholders

## Changelog

- July 05, 2025: Initial setup
- January 10, 2025: Major UI overhaul, image upload functionality, and enhanced user experience