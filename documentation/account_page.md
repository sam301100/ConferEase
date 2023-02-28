##When you click on the logged in person's name it should take you to the accounts page.

So, if we have the name it shouldn't go to login, it should go to accounts page. 

Hence do the following in Header.jsx

```js
<Link to={user?'/account':'/login'} className='...'>
```

Create account page. Write this basic code to check if the page is working. 

```js
export default function AccountPage(){
    return(
        <div>account</div>
    );
}
```

Then use it in App.jsx
```js
<Route path="/account" element={<AccountPage/>} />
```

In AccountPage.jsx
By using useContext we can fetch and add name on the page. 
Hence the page will now show 

"Account page for John"

```js
import { useContext } from "react";
import { UserContext } from "../UserContext.jsx";

export default function AccountPage(){
    const {user} = useContext(UserContext);
    return(
        <div>Account page for {user.name}</div>
    );
}
```

If we are not logged in then the account page should not be visible.

```js

    if(!user){
        return <Navigate to={'/login'} />
    }
```
Add setReady.
setReady is used in UserContext.jsx  because there is some lag in the function for logged in to execute because of which the user is logged out and returned to login page. 

