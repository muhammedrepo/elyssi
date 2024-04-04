This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev

#Elyssi development process
4. Create Website Layout
    1. create layout component
    2. add header
    3. add main section
    4. add footer
    5. add tailwind classes

5. List Products
    1. add data.js
    2. add images
    3. render products

6. Create Product Details
    1. create product page
    2. create 3 columns
    3. show 3 images in first column
    4. show big image in second column
    5. show product info and add to cart button in third column
    6. create tab displaying description, additional information and reviews

7. Handle Add To Cart
    1. define react context
    2. define cart items state
    3. create add to cart action
    4. add reducer
    5. create store provider
    6. handle add to cart button

8. Handle Changing Cart Items
    1. add increase and decrease cart for quantity
    2. handle quantity change

9. Save Cart Items
    1. install js-cookie
    2. save and retrieve cart items in cookies

10. Create Login Form
    1. install react hook form
    2. create input boxes
    3. add login button

11. Create Login API
    1. install next-auth
    2. create nextauth.js
    3. implement signin
    4. use signin in login form

12. Add User Menu
    1. check user authentication
    2. install headlessui
    3. show user menu
    4. implement logout user

13. Create Shipping Screen
    1. display address fields
    2. save address in context

14. Create Shipping Method Screen


15. Seed sample products
    1. insert sample products to mongodb
    2. load products from db in home and product screen
    3. check product count in stock and in add to cart

16. Load Products from MongoDB
    1. load products in home page from mongodb
    2. load products in product page from mongodb
    3. use product api to check count in stock in add to cart

17. Create Place Order Screen
    1. display shipping address
    2. display payment method
    3. display order items
    4. implement create order

18. Create Order Screen
    1. implement backend api for order details
    2. load order data from backend
    3. display order details

19. Pay Order by PayPal
    1. add paypal button
    2. handle payment
    3. create backend api
    4. update order state

20. Create Order History Screen
    1. create my order api
    2. create order history component
    3. fetch orders and display them

21. Create Admin Dashboard
    1. Create Admin Menu
    2. create dashboard screen
    3. Implement admin summary api

22. List Orders For Admin
    1. create orders page
    2. create orders api
    3. use api in page

23. Deliver Order For Admin
    1. create deliver api
    2. add deliver button
    3. implement click handler

24. List Products For Admin
    1. create products page
    2. create products api
    3. use api in page

25. Upload Product Image
    1. create cloudinary account
    2. get cloudinary keys
    3. create upload api
    4. upload files in edit page

26. Create And Delete Products
    1. add create product button
    2. build new product api
    3. add handler for delete
    4. implement delete api

27. List Users For Admin
    1. create users page
    2. create users api
    3. use api in page

28. Create Search Page
    1. create filters
    2. list products
    3. show filters

#Blog Section
1. List Blogs
    1. add blog data
    2. add images
    3. render blogs

2. Create Blog Details
    1. create blog page
    2. create featured post
    3. create 2 columns
    4. show blog detail and image in first column
    5. show aside in second column
    6. show related post

3. Load Posts MongoDB
    1. load posts in blog page from mongodb

4. List Blog for Admin
    1. create blog page
    2. create blogs api
    3. use api in page

5. Create Blog Edit Page
    1. create edit page
    2. create api for blog
    3. show blog data in form

6. Upload Blog Image
    1. use the cloudinary account
    2. create upload api
    4. upload files in edit page

7. Create and delete Blogs
    1. add create blog button
    2. build new blog api
    3. add handler for delete
    4. implement delete api
```

## Publish On Vercel

    1. create vercel account
    2. connect to github
    3. set next auth and mongodb db in env vars
    4. push code to github

## Add to cart explained

GitHub Copilot: The provided code is a snippet from a file called `Store.js` in a JavaScript project that uses npm and React. Let's break it down step by step:

1. The code begins with an import statement:

```javascript
import { createContext, useReducer } from 'react'
```

This line imports two functions, `createContext` and `useReducer`, from the 'react' package. These functions are commonly used in React applications for managing state.

2. The code then exports a constant called `Store`:

```javascript
export const Store = createContext()
```

This line exports a context object called `Store`. A context in React is used to share data between components without passing props manually through each level of the component tree. The `createContext()` function creates a new context object, and `Store` is set to that context object.

3. Next, there is a declaration of an `initialState` object:

```javascript
const initialState = {
  cart: { cartItems: [] },
}
```

This object represents the initial state of the application. It has a property called `cart` which is an object with a property `cartItems` set to an empty array. This suggests that the application has a shopping cart feature.

4. After that, there is a declaration of a `reducer` function:

```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      // ...
    }
    // ...
  }
}
```

The `reducer` function is a pure function that takes in the current state and an action, and returns a new state based on the action. In this case, it is used to manage the state related to the shopping cart. The function uses a `switch` statement to handle different types of actions. The only case shown in the code is `'CART_ADD_ITEM'`, which suggests that this reducer is responsible for adding items to the cart.

5. Inside the `'CART_ADD_ITEM'` case, there is some logic to update the state:

```javascript
const newItem = action.payload
const existItem = state.cart.cartItems.find(
  (item) => item.slug === newItem.slug
)
const cartItems = existItem
  ? state.cart.cartItems.map((item) =>
      item.name === existItem.name ? newItem : item
    )
  : [...state.cart.cartItems, newItem]
return { ...state, cart: { ...state.cart, cartItems } }
```

Here, the code extracts the `payload` property from the `action` object, which is expected to contain the new item to be added to the cart. It then checks if there is an existing item in the cart with the same `slug` as the new item. If an existing item is found, it updates that item in the `cartItems` array. If not, it adds the new item to the `cartItems` array.

Finally, the function returns a new state object by spreading the existing state and updating the `cart` property with the updated `cartItems` array.

That's the explanation of the provided code snippet.
