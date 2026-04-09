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
        html_url: "",
      },
    };
  }

  async componentDidMount() {
    try {
      const data = await fetch("https://api.github.com/users/Tanishq-afk");
      const json = await data.json();

      this.setState({
        userInfo: json,
      });
    } catch {
      // Keep fallback UI when GitHub request fails.
    }
  }

  render() {
    const { name, location, html_url, avatar_url, bio } = this.state.userInfo;
    return (
      <div className="user-card">
        <img className="user-avatar" src={avatar_url} alt={name} />
        <div className="user-card-content">
          <h1>{name}</h1>
          <h2>{location}</h2>
          <p>Bio: {bio}</p>
          <a
            className="profile-link"
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Github Link
          </a>
        </div>
      </div>
    );
  }
}

export default UserClass;
