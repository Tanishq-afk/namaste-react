import UserClass from "./UserClass";

const About = () => {
  return (
    <div className="page-shell about-page">
      <section className="page-hero">
        <p className="page-eyebrow">About Mealio</p>
        <h1>We are Mealio&apos;s team.</h1>
        <p>
          Mealio is designed to make restaurant discovery feel cleaner, faster,
          and more enjoyable from the very first click.
        </p>
      </section>

      <section className="about-highlight">
        <h2>Built to keep the experience simple</h2>
        <p>
          We focus on a smoother browsing flow, clearer filters, and a calmer
          interface so the app feels better without changing how it works.
        </p>
      </section>

      <section className="team-showcase">
        <UserClass />
      </section>
    </div>
  );
};

export default About;
