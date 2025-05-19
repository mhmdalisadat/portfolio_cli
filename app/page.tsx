import Blog from "./components/blog";
import ContactForm from "./components/contact";
import Landing from "./components/landing";
import Works from "./components/works";

const Home = () => {
  return (
    <div>
      <Landing />
      <Blog />
      <Works />
      <ContactForm />
    </div>
  );
};

export default Home;
