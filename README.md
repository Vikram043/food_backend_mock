# food_backend_mock

Food Delivery App (backend)
Welcome to My food delivery app. the tech stacks are used for building the app are NodeJS, ExpressJS, MongoDB.

The Dependencies used are :

"dotenv": "^16.0.3",
"express": "^4.18.2",
"jsonwebtoken": "^9.0.0",
"mongoose": "^7.0.3",
"mongoose-autopopulate": "^1.0.0"
The collection names and Schemas for each collection are as follows :
User Model : _id: ObjectId, name: String, email: String, password: String, address: { street: String, city: String, state: String, country: String, zip: String }
Restaurant Model : _id: ObjectId, name: String, address: { street: String, city: String, state: String, country: String, zip: String }, menu: [{ _id: ObjectId, name: String, description: String, price: Number, image: String }]
Menu Model : _id: ObjectId, name: String, description: String, price: Number, image: String
Order Model : _id: ObjectId, user : { type: ObjectId, ref: 'User' }, restaurant : { type: ObjectId, ref: 'Restaurant' }, items: [{ name: String, price: Number, quantity: Number }], totalPrice: Number, deliveryAddress: { street: String, city: String, state: String, country: String, zip: String }, status: { type : String, enum : ['placed','preparing','on the way','delivered'], default : 'placed' }
API endpoints:
1. Signup :
User can be able to signup for the server using this Endpoint.

POST /register

Body : { name : String, email : String, password : String, address : { street : String, city: String, state: String, country: String, zip: String } } Response : 201 "msg": "User Registred"

2. Login :
User can be able to Login in the server using this Endpoint.

POST /login

Body : { email : String, password : String } Response : 201 "msg": "Login Successfull", "token" : jwt token

3. Change Password :
User can be able change password using this Endpoint.

PATCH /user/:id/reset

Body : { oldPassword : String, newPassword : String } Response : 204

4. Restaurants Data :
User can be able to view all the available restaurants using this Endpoint.

GET /restaurants

Response : 200 "msg": "restaurant data fetched successfully", "data" : //Provides restaurant data

5. Restaurants Data by id :
User can be able to view restaurants by id using this Endpoint.

GET /restaurants/:id

Response : 200 "msg": "restaurant data fetched successfully", "data" : //Provides restaurant data

6. Restaurants Menu :
User can be able to view available menu of restaurants using this Endpoint.

GET /restaurants/:id/menu Response : 200 "msg": "restaurant menu fetched successfully", "data" : //Provides restaurant's menu

7. Add item to restaurants Menu :
User can be able to add item in menu of restaurants using this Endpoint.

POST /restaurants/:id/menu body : { name: String, description: String, price: Number, image: String } Response : 201 "msg": "Menu added successfully",

8. Delete item in restaurants Menu :
User can be able to delete item in menu of restaurants using this Endpoint.

DELETE /restaurants/:restId/menu/menuId Response : 202 "msg": "Menu deleted successfully",

9. Place order :
User can be able to order for particular restaurant using this Endpoint.

POST /orders Body : { "restaurant" : restaurantID, "items" : [ { "menuId" : menuID, "quantity" : 1 } ] } Response : 201 "msg": "Order Placed successfully",

10. Get order details :
User can be able to get placed order using this Endpoint.

POST /orders/:id

Response : 201 "msg": "Order data got successfully", "data" : //Order data

10. Get order details :
User can be able to gupdate order status using this Endpoint.

PATCH /orders/:id

Body : { status : enum : ['placed','preparing','on the way','delivered'], }

Response : 204
