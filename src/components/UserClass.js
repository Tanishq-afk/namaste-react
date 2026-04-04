import React from "react";

class UserClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                avatar_url: "dummy image",
                name: "Dummy Name",
                location: "Dummy Location",
                bio: "Dummy Bio",
                html_url: ""
            },
        }
    }

    async componentDidMount() {
        const data = await fetch("https://api.github.com/users/Tanishq-afk");
        const json = await data.json();
        console.log(json);

        this.setState({
            userInfo: json
        });
    }

    render() {
        const { name, location, html_url, avatar_url, bio } = this.state.userInfo;
        return (
            <div className="user-card">
                <img className="user-avatar" src={avatar_url} alt={name} />
                <h1>{ name }</h1>
                <h2>{ location }</h2>
                <p>Bio: { bio }</p>
                <a href={html_url} target="_blank" rel="noopener noreferrer">Github Link</a>
                
            </div>
        );
    }
}

export default UserClass;