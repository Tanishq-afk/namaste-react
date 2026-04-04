import { useState } from "react";

const User = ({ name, location, contact }) => {
    const [count] = useState(0);
    return (
        <div className="user-card">
            <p>Count: {count}</p>
            <h1>{ name }</h1>
            <h2>{ location }</h2>
            <h3>{ contact }</h3>
        </div>
    );
}
 
export default User;