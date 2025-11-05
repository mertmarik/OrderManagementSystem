# Order Management System (OMS)

A comprehensive business automation platform for order processing, customer management, supplier integration, and business intelligence.

## 🚀 Features

### Core Functionality

- **Order Processing**: Sales orders, purchase orders, invoicing, production tracking
- **Customer Management**: CRM integration with HubSpot, customer portals, order tracking
- **Supplier Management**: Integration with ESP, SAGE, Distributor Central
- **Invoicing & Payments**: Automated billing with Stripe and QuickBooks integration
- **Real-time Analytics**: Custom dashboards and business intelligence reports
- **Automation**: Workflow automation for confirmations, approvals, and notifications
- **AI Knowledge Base**: Intelligent business insights and recommendations

### Integrations

- **CRM**: HubSpot, ZoomInfo, Apollo
- **Payment Processing**: Stripe, QuickBooks
- **Communication**: Slack notifications and team alerts
- **Supplier APIs**: ESP, SAGE, Distributor Central
- **Real-time Updates**: WebSocket-based live notifications

### Security & Access Control

- Role-based access control (RBAC)
- JWT authentication
- Encrypted data storage
- Audit logging

## 🏗️ Technology Stack

### Frontend

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI, Heroicons
- **State Management**: Zustand
- **Forms**: React Hook Form
- **Charts**: Recharts

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT
- **Real-time**: Socket.io
- **Background Jobs**: Bull Queue with Redis
- **File Upload**: Multer
- **Email**: Nodemailer

### Infrastructure

- **Database**: PostgreSQL 15
- **Cache/Queue**: Redis 7
- **Containerization**: Docker & Docker Compose
- **Reverse Proxy**: Nginx (optional)
- **Environment**: Cross-platform (Windows, macOS, Linux)

## 📦 Project Structure

```
oms-app/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   └── types/           # TypeScript type definitions
│   ├── public/              # Static assets
│   └── package.json
├── backend/                  # Express.js API server
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── middleware/      # Express middleware
│   │   ├── services/        # Business logic services
│   │   ├── utils/           # Utility functions
│   │   └── types/           # TypeScript interfaces
│   ├── prisma/              # Database schema and migrations
│   │   ├── schema.prisma    # Prisma schema definition
│   │   └── migrations/      # Database migrations
│   └── package.json
├── shared/                   # Shared types and utilities
│   ├── src/
│   │   ├── types.ts         # Common TypeScript types
│   │   └── index.ts         # Shared utilities
│   └── package.json
├── docker/                   # Docker configurations
│   ├── backend/
│   ├── frontend/
│   └── nginx/
├── docs/                     # Documentation
├── docker-compose.yml        # Multi-container Docker setup
├── package.json             # Root package.json for workspace
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- npm or yarn

### Option 1: Docker Setup (Recommended)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd oms-app
   ```

2. **Start with Docker Compose**

   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/health

### Option 2: Manual Setup

1. **Clone and install dependencies**

   ```bash
   git clone <repository-url>
   cd oms-app
   npm install
   ```

2. **Database Setup**

   ```bash
   # Start PostgreSQL and Redis
   # Update backend/.env with your database credentials
   cd backend
   cp .env.example .env
   # Edit .env file with your settings

   # Run database migrations
   npm run db:migrate
   npm run db:seed
   ```

3. **Start the development servers**

   ```bash
   # From the root directory
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📊 Database Schema

The application uses PostgreSQL with Prisma ORM. Key entities include:

- **Users**: Authentication and role management
- **Customers**: Customer information and relationships
- **Suppliers**: Supplier management and integrations
- **Products**: Product catalog and inventory
- **Orders**: Order processing and tracking
- **Invoices**: Billing and payment processing
- **Notifications**: Real-time alerts and communications
- **Audit Logs**: Activity tracking and compliance

## 🔧 Configuration

### Environment Variables

#### Backend (.env)

```env
DATABASE_URL=postgresql://username:password@localhost:5432/oms_db
JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=sk_test_...
HUBSPOT_API_KEY=your-hubspot-key
SLACK_BOT_TOKEN=xoxb-your-token
# See backend/.env.example for full list
```

#### Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

## 🔗 API Documentation

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Orders

- `GET /api/orders` - List orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

### Customers

- `GET /api/customers` - List customers
- `POST /api/customers` - Create customer
- `GET /api/customers/:id` - Get customer details
- `PUT /api/customers/:id` - Update customer

### Real-time Events

The application uses WebSocket connections for real-time updates:

- Order status changes
- New order notifications
- Payment confirmations
- Stock level alerts

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test

# Run all tests
npm run test
```

## 🚢 Deployment

### Production Build

```bash
npm run build
npm start
```

### Docker Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation in the `/docs` folder

## 🗺️ Roadmap

- [ ] Mobile application (React Native)
- [ ] Advanced AI features and machine learning
- [ ] Additional payment gateway integrations
- [ ] Enhanced reporting and analytics
- [ ] Multi-language support
- [ ] Advanced workflow automation
- [ ] API rate limiting and advanced security features
