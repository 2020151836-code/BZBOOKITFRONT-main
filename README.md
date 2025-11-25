# BZ Book It - Belizean Beauty Appointment Booking Platform

A comprehensive appointment booking platform designed specifically for beauty businesses in Belize. BZ Book It connects beauty professionals with clients through an easy-to-use booking system.

## 🌟 Features

### For Clients
- **Browse Businesses**: Discover beauty businesses across Belize
- **Easy Booking**: Book appointments with your preferred service and staff member
- **Appointment Management**: View, modify, and cancel appointments
- **Booking History**: Track all past and upcoming appointments
- **Feedback System**: Rate and review completed services
- **AI Chat Assistant**: Get instant help with booking questions
- **Notifications**: Receive booking confirmations and updates

### For Business Owners
- **Business Dashboard**: Comprehensive overview of your business metrics
- **Schedule Management**: View appointments by day, week, or month
- **Service Management**: Add, edit, and manage your service offerings
- **Staff Management**: Manage your team members and their profiles
- **Client Feedback**: View customer reviews and ratings
- **Appointment Control**: Update appointment statuses and manage bookings
- **Business Profile**: Customize your business information and branding

### For Administrators
- **Platform Oversight**: Monitor all businesses and appointments
- **User Management**: Manage user roles and permissions
- **System Notifications**: Send platform-wide announcements

## 🎨 Design

BZ Book It features a warm, welcoming design with:
- Amber and orange gradient color scheme
- Fully responsive layouts for mobile and desktop
- Intuitive navigation and user experience
- Professional, clean interface

## 🛠️ Technology Stack

- **Frontend**: React 19 + TypeScript + Tailwind CSS 4
- **Backend**: Node.js + Express + tRPC
- **Database**: MySQL/TiDB with Drizzle ORM
- **Authentication**: Manus OAuth with role-based access control
- **AI**: Integrated LLM for chatbot assistance
- **UI Components**: shadcn/ui

## 📋 Database Schema

The platform includes comprehensive database tables:
- **users**: Client and business owner accounts with role-based access
- **business_profiles**: Business information and branding
- **services**: Service offerings with pricing and duration
- **staff_members**: Team member profiles and specializations
- **appointments**: Booking records with status tracking
- **feedback_ratings**: Customer reviews and ratings
- **notifications**: System notifications and messages
- **payment_records**: Payment transaction history

## 🚀 Getting Started

### Prerequisites
- Node.js 22.x or higher
- MySQL database
- Manus account for OAuth

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables (automatically configured in Manus platform)

4. Push database schema:
   ```bash
   pnpm db:push
   ```

5. Start development server:
   ```bash
   pnpm dev
   ```

## 📱 User Roles

### Client Role
- Browse and search businesses
- Book appointments
- Manage personal bookings
- Submit feedback
- Access AI chat assistant

### Business Owner Role
- Create and manage business profile
- Add and manage services
- Add and manage staff members
- View and manage appointments
- Access business dashboard and analytics
- View customer feedback

### Admin Role
- All business owner permissions
- Platform-wide oversight
- User role management
- System administration

## 🔐 Security Features

- Role-based access control (RBAC)
- Secure authentication via Manus OAuth
- Protected API endpoints
- Input validation and sanitization
- SQL injection prevention via Drizzle ORM

## 💳 Payment Integration

BZ Book It is ready for Stripe payment integration. To enable payments:

1. Create a Stripe account at https://stripe.com
2. Obtain your API keys from the Stripe Dashboard
3. Navigate to Settings → Payment in the project management UI
4. Enter your Stripe Secret Key and Stripe Publishable Key

Once configured, the platform will support:
- Online payment processing
- Payment history tracking
- Refund management
- Payment receipts

## 📊 Key Pages

### Public Pages
- **Home** (`/`): Landing page with business listings
- **Book Appointment** (`/book/:businessId`): Service booking form
- **Booking Confirmation** (`/confirmation/:confirmationNumber`): Confirmation details

### Client Pages
- **My Appointments** (`/my-appointments`): Personal appointment management
- **Submit Feedback** (`/feedback/:appointmentId`): Review submission
- **Notifications** (`/notifications`): View all notifications

### Business Owner Pages
- **Dashboard** (`/dashboard`): Business metrics and overview
- **Business Settings** (`/business-settings`): Profile management
- **Manage Services** (`/manage-services`): Service CRUD operations
- **Manage Staff** (`/manage-staff`): Staff member management

## 🤖 AI Chat Assistant

The integrated AI chatbot helps users with:
- Finding suitable beauty services
- Understanding the booking process
- Answering common questions
- Providing business information
- Guiding through appointment management

## 📧 Notification System

Automated notifications for:
- Booking confirmations
- Appointment reminders (configurable)
- Cancellation notices
- Follow-up messages
- Promotional announcements

## 🎯 Future Enhancements

- Automated appointment reminder scheduling
- Advanced analytics and reporting
- Multi-language support
- SMS notifications
- Mobile app (iOS/Android)
- Loyalty program integration
- Gift card system

## 📞 Support

For questions or support, please contact the platform administrator or visit the BZ Book It support page.

## 📄 License

© 2025 BZ Book It. All rights reserved.

---

**Built with ❤️ for Belizean beauty businesses**
