# Rawasy - Construction Materials Marketplace 🏗️

A comprehensive B2B construction materials ecommerce platform designed specifically for the Middle East market. Rawasy (رواسي) connects contractors, suppliers, and construction professionals in a secure, multilingual marketplace.

## 🌟 Features

### 🔐 **Multi-User Authentication System**

- **Individual Buyers**: Homeowners and small contractors
- **Business Buyers**: Construction companies with bulk ordering
- **Suppliers**: Verified material suppliers with dashboards
- **Secure Registration**: Multi-step verification with document upload
- **Social Login**: Google, LinkedIn, and regional SSO options

### 🛍️ **Complete Shopping Experience**

- **Product Catalog**: 12+ categories including steel, cement, aggregates
- **Advanced Search**: Multilingual search with filters and sorting
- **Shopping Cart**: Persistent cart with bulk pricing calculations
- **Checkout**: Multi-step checkout with delivery preferences
- **Order Management**: Real-time tracking and status updates

### 📱 **Supplier Dashboard**

- **Product Management**: Add, edit, and manage inventory
- **Order Processing**: Accept, process, and fulfill orders
- **Analytics**: Sales reports and performance metrics
- **Customer Communication**: Direct messaging and support

### 💳 **Payment Integration**

- **Multiple Gateways**: mada, Visa/Mastercard, STC Pay, Apple Pay
- **Regional Support**: Saudi/GCC payment methods
- **Secure Processing**: PCI DSS compliant with SSL encryption
- **Payment Methods**: Cards, bank transfers, cash on delivery
- **Saved Payment**: Secure card and account storage

### 🌍 **Internationalization**

- **Arabic-First Design**: RTL layout with Arabic typography
- **Dual Language**: Arabic and English with seamless switching
- **Cultural Adaptation**: Regional preferences and formatting
- **Currency Support**: SAR with localized number formatting

### 📦 **Order Management**

- **Real-time Tracking**: GPS tracking and delivery updates
- **Status Management**: 9 different order states
- **Timeline View**: Detailed order progression
- **Invoice Generation**: Automated billing and receipts
- **Return/Exchange**: Comprehensive return management

## 🚀 **Technology Stack**

### **Frontend**

- **Next.js 14**: React framework with App Router
- **TypeScript**: Full type safety and better DX
- **Tailwind CSS**: Utility-first styling with custom components
- **Lucide React**: Beautiful icons and graphics

### **State Management**

- **Zustand**: Lightweight state management
- **Persistent Storage**: LocalStorage integration
- **Type-Safe Stores**: TypeScript interfaces for all stores

### **Internationalization**

- **next-intl**: Advanced i18n with message organization
- **RTL Support**: Complete right-to-left layout
- **Cultural Formatting**: Dates, numbers, and currency

### **UI Components**

- **Custom Components**: Reusable component library
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG compliant components

## 📁 **Project Structure**

```
rawasy/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Authentication routes
│   │   ├── login/
│   │   └── register/
│   ├── (shop)/                  # Shopping routes
│   │   ├── categories/
│   │   ├── cart/
│   │   └── checkout/
│   ├── orders/                  # Order management
│   ├── supplier/                # Supplier dashboard
│   │   ├── products/
│   │   └── orders/
│   ├── payment/                 # Payment methods
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                   # Reusable components
│   ├── ui/                      # Base UI components
│   ├── layout/                  # Layout components
│   └── home/                    # Homepage components
├── stores/                       # Zustand stores
│   ├── cartStore.ts
│   ├── orderStore.ts
│   ├── supplierStore.ts
│   └── paymentStore.ts
├── lib/                         # Utilities and configuration
│   ├── utils.ts
│   └── i18n.ts
├── messages/                    # Internationalization
│   ├── ar.json
│   └── en.json
└── middleware.ts                # Next.js middleware
```

## 🛠️ **Getting Started**

### **Prerequisites**

- Node.js 18+
- npm or yarn
- Modern browser with JavaScript enabled

### **Installation**

1. **Clone the repository**

```bash
git clone <repository-url>
cd rawasy
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### **Build for Production**

```bash
npm run build
npm start
```

## 🎯 **Core Functionality**

### **User Flows**

#### **Buyer Journey**

1. **Registration** → Account verification → Profile setup
2. **Browse Products** → Category selection → Product details
3. **Add to Cart** → Quantity selection → Cart review
4. **Checkout** → Shipping details → Payment → Order confirmation
5. **Order Tracking** → Real-time updates → Delivery confirmation

#### **Supplier Journey**

1. **Supplier Registration** → Document verification → Dashboard access
2. **Product Management** → Add products → Inventory management
3. **Order Processing** → Accept orders → Fulfillment → Delivery
4. **Analytics** → Sales reports → Performance metrics

### **Key Features**

#### **Shopping Cart**

- Persistent across sessions
- Bulk pricing calculations
- Minimum order enforcement
- Multiple suppliers support
- Promo code integration

#### **Payment Processing**

- Multiple payment gateways
- Secure card storage
- Regional payment methods
- Fee calculations
- Transaction tracking

#### **Order Management**

- Real-time status updates
- Customer notifications
- Supplier communication
- Return processing
- Invoice generation

## 🔧 **Configuration**

### **Environment Variables**

Create a `.env.local` file:

```env
# Database (when implemented)
DATABASE_URL=

# Payment Gateways
STRIPE_SECRET_KEY=
PAYTABS_SECRET_KEY=

# Email Service
SENDGRID_API_KEY=

# SMS Service
TWILIO_AUTH_TOKEN=
```

### **Customization**

#### **Styling**

- Modify `tailwind.config.js` for custom colors/fonts
- Update `app/globals.css` for global styles
- Customize components in `components/ui/`

#### **Localization**

- Add new languages in `messages/`
- Update `lib/i18n.ts` for locale configuration
- Modify `middleware.ts` for routing

## 📊 **Features in Detail**

### **Product Catalog**

- **Categories**: Steel, Cement, Aggregates, Masonry, Plumbing, Electrical
- **Specifications**: Detailed technical specifications
- **Bulk Pricing**: Automatic quantity discounts
- **Stock Management**: Real-time inventory tracking
- **Quality Badges**: Certification and compliance markers

### **Supplier Dashboard**

- **Order Management**: Accept, process, fulfill orders
- **Product Management**: Add, edit, manage inventory
- **Analytics**: Sales reports, top products, customer insights
- **Communication**: Direct customer messaging
- **Profile Management**: Company information and verification

### **Payment System**

- **Regional Gateways**: mada, STC Pay, local banks
- **Security**: PCI DSS compliant processing
- **Payment Methods**: Cards, bank transfers, COD
- **Multi-Currency**: SAR primary with international support
- **Saved Methods**: Secure storage for repeat purchases

### **Internationalization**

- **Arabic-First**: RTL design with Arabic typography
- **Language Switching**: Seamless Arabic/English toggle
- **Cultural Adaptation**: Date formats, number systems
- **Content Localization**: Translated UI and content

## 🎨 **Design System**

### **Colors**

- **Primary**: Rawasy Blue (#0ea5e9)
- **Secondary**: Gray scale for content
- **Success**: Green for confirmations
- **Warning**: Yellow for alerts
- **Error**: Red for errors

### **Typography**

- **Arabic**: Tajawal font family
- **English**: Inter font family
- **Hierarchy**: 6 heading levels + body text
- **Responsive**: Scales across devices

### **Components**

- **Buttons**: 4 variants, 4 sizes
- **Cards**: Flexible content containers
- **Forms**: Accessible input components
- **Navigation**: Responsive header/footer

## 📈 **Performance**

### **Optimization**

- **Server-Side Rendering**: Fast initial page loads
- **Code Splitting**: Optimized bundle sizes
- **Image Optimization**: Next.js Image component
- **Caching**: Browser and CDN caching strategies

### **Monitoring**

- **Core Web Vitals**: Performance tracking
- **Error Tracking**: Runtime error monitoring
- **Analytics**: User behavior insights
- **A/B Testing**: Feature experimentation

## 🔒 **Security**

### **Data Protection**

- **HTTPS**: Encrypted data transmission
- **Input Validation**: XSS/injection protection
- **Authentication**: Secure session management
- **Payment Security**: PCI DSS compliance

### **Privacy**

- **GDPR Compliance**: EU privacy regulations
- **Data Minimization**: Collect only necessary data
- **User Control**: Account and data management
- **Transparency**: Clear privacy policies

## 🚀 **Deployment**

### **Recommended Platforms**

- **Vercel**: Optimal for Next.js applications
- **Netlify**: Alternative deployment platform
- **AWS**: Enterprise-level infrastructure
- **Digital Ocean**: Cost-effective hosting

### **Environment Setup**

1. Configure environment variables
2. Set up database connections
3. Configure payment gateways
4. Set up monitoring and analytics
5. Configure CDN and caching

## 🧪 **Testing**

### **Test Coverage**

- **Unit Tests**: Component and utility testing
- **Integration Tests**: API and flow testing
- **E2E Tests**: Complete user journey testing
- **Performance Tests**: Load and stress testing

### **Quality Assurance**

- **Code Reviews**: Peer review process
- **Automated Testing**: CI/CD pipeline
- **Manual Testing**: User acceptance testing
- **Security Audits**: Regular security assessments

## 📞 **Support**

### **Documentation**

- **API Documentation**: Complete endpoint reference
- **Component Library**: Storybook documentation
- **User Guides**: End-user documentation
- **Developer Guides**: Technical documentation

### **Community**

- **GitHub Issues**: Bug reports and feature requests
- **Discussions**: Community Q&A
- **Contributing**: Contribution guidelines
- **Code of Conduct**: Community standards

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Next.js Team**: Amazing React framework
- **Tailwind CSS**: Excellent utility-first CSS
- **Lucide Icons**: Beautiful icon library
- **Middle East Construction Industry**: Inspiration and requirements

---

**Rawasy** - Building the future of construction materials commerce in the Middle East 🏗️🌍
