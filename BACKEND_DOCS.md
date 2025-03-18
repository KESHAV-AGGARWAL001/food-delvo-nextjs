# Food Delvo Backend Documentation

## Environment Variables

```env
# Required environment variables in .env file
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
PORT=3000
```

## API Endpoints

### Authentication Routes

1. **Sign Up**

   - Route: `/api/auth/signup`
   - Method: `POST`
   - Body:

     ```json
     {
       "name": "string",
       "email": "string",
       "password": "string"
     }
     ```

   - Response: Returns JWT token in cookie

2. **Login**

   - Route: `/api/auth/login`
   - Method: `POST`
   - Body:

     ```json
     {
       "email": "string",
       "password": "string"
     }
     ```

   - Response: Returns JWT token in cookie

### Food Routes

1. **Get Food List**

   - Route: `/api/food/list`
   - Method: `GET`
   - Response: Array of food items

2. **Add Food Item**

   - Route: `/api/food/add`
   - Method: `POST`
   - Authentication: Required (Admin only)
   - Body: FormData with:

   - ```json
     {
       "name": "string",
       "description": "string",
       "price": "number",
       "category": "string",
       "image": "file",
       "countInStock": "number"
     }
     ```

   - Response: Created food item

### Cart Routes

1. **Get Cart**

   - Route: `/api/cart/get`
   - Method: `GET`
   - Authentication: Required
   - Response: User's cart items

2. **Add to Cart**

   - Route: `/api/cart/add`
   - Method: `POST`
   - Authentication: Required
   - Body:

     ```json
     {
       "foodId": "string",
       "quantity": "number"
     }
     ```

   - Response: Updated cart

3. **Remove from Cart**

   - Route: `/api/cart/remove`
   - Method: `POST`
   - Authentication: Required
   - Body:

     ```json
     {
       "foodId": "string"
     }
     ```

   - Response: Updated cart

### Order Routes

1. **Place Order**

   - Route: `/api/order/place`
   - Method: `POST`
   - Authentication: Required
   - Body:

     ```json
     {
       "orderItems": [
         {
           "foodId": "string",
           "quantity": "number"
         }
       ],
       "shippingAddress": {
         "address": "string",
         "city": "string",
         "postalCode": "string",
         "country": "string"
       },
       "paymentMethod": "string",
       "itemsPrice": "number",
       "taxPrice": "number",
       "shippingPrice": "number",
       "totalPrice": "number"
     }
     ```

   - Response: Created order

2. **Get User Orders**

   - Route: `/api/order/user-orders`
   - Method: `GET`
   - Authentication: Required
   - Response: User's orders

3. **Get All Orders (Admin)**

   - Route: `/api/order/all`
   - Method: `GET`
   - Authentication: Required (Admin only)
   - Response: All orders

4. **Update Order Status**

   - Route: `/api/order/status`
   - Method: `PUT`
   - Authentication: Required (Admin only)
   - Body:

     ```json
     {
       "orderId": "string",
       "status": "delivered" | "paid"
     }
     ```

   - Response: Updated order

## Models

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, min: 6),
  role: String (enum: ["user", "admin"], default: "user")
}
```

### Food Model

```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  category: String (required),
  image: String (required),
  rating: Number (default: 0),
  numReviews: Number (default: 0),
  countInStock: Number (required, default: 0)
}
```

### Order Model

```javascript
{
  user: ObjectId (ref: "User"),
  orderItems: [{
    name: String,
    quantity: Number,
    image: String,
    price: Number,
    food: ObjectId (ref: "Food")
  }],
  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentMethod: String,
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  itemsPrice: Number,
  taxPrice: Number,
  shippingPrice: Number,
  totalPrice: Number,
  isPaid: Boolean (default: false),
  paidAt: Date,
  isDelivered: Boolean (default: false),
  deliveredAt: Date
}
```

## Authentication

- JWT-based authentication
- Tokens are stored in HTTP-only cookies
- Token expiration: 30 days
- Protected routes require valid JWT token
- Admin routes require user role to be "admin"

## File Upload

- Images are stored in `/public/uploads`
- Supported formats: All image formats
- Files are renamed using timestamp to avoid conflicts
- Access uploaded files via `/uploads/filename`

## Error Handling

Custom error handling utility that handles:

- Validation errors
- Authentication errors
- Duplicate entries
- JWT errors
- General server errors

## Security Features

1. Password hashing using bcrypt
2. HTTP-only cookies for tokens
3. CORS protection
4. Rate limiting (to be implemented)
5. Input validation
6. Secure headers

## Development Notes

1. Run in development:

   ```bash
   npm run dev
   ```

2. Build for production:

   ```bash
   npm run build
   ```

3. Start production server:

   ```bash
   npm start
   ```
