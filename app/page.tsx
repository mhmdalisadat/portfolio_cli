import Blog from "./components/blog";
import ContactForm from "./components/contact";
import Landing from "./components/landing";
import Works from "./components/works";

const Home = () => {
  return (
    <div>
      <section id="home">
        <Landing />
      </section>
      <section id="about">
        <Blog />
      </section>
      <section id="work">
        <Works />
      </section>
      <section id="contact" className="mb-5">
        <ContactForm />
      </section>
    </div>
  );
};

export default Home;