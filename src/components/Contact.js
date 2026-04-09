const Contact = () => {
  return (
    <div className="page-shell contact-page">
      <section className="page-hero">
        <p className="page-eyebrow">Contact Us</p>
        <h1>We&apos;d love to hear from you.</h1>
        <p>
          Whether you have feedback, support questions, or product ideas, we
          are always happy to connect.
        </p>
      </section>

      <div className="contact-grid">
        <article className="info-card">
          <h2>Email</h2>
          <p>hello@mealio.app</p>
          <span>Reach out for support, ideas, or collaboration.</span>
        </article>
        <article className="info-card">
          <h2>Availability</h2>
          <p>Mon to Sat</p>
          <span>We usually respond within one business day.</span>
        </article>
        <article className="info-card">
          <h2>Location</h2>
          <p>Remote first team</p>
          <span>Building a smoother food ordering experience from anywhere.</span>
        </article>
      </div>
    </div>
  );
};

export default Contact;
