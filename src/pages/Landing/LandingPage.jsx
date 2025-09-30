import heroIllustration from "../../assets/hero-illustration.svg";
import avatar1 from "../../assets/avatar1.png";
import avatar2 from "../../assets/avatar2.png";
import icon from "../../assets/icon.png";

const LandingPage = () => {
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex flex-row justify-center items-center gap-2">
            <img src={icon} alt="Jobsy Logo" className="h-16 w-16" />
            <div className="text-5xl font-bold text-blue-600 pb-2">Jobsy</div>
          </div>
          <nav className="space-x-6">
            <a href="#features" className="text-gray-700 hover:text-blue-600">
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 hover:text-blue-600"
            >
              Testimonials
            </a>
            <a href="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </a>
            <a
              href="/register"
              className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Register
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-20 py-20">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Your Career, Our Mission
          </h1>
          <p className="text-lg md:text-xl text-gray-100">
            Connect with top companies and find opportunities that match your
            skills.
          </p>
          <div className="flex gap-4">
            <a
              href="/register"
              className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="border border-white px-6 py-3 rounded hover:bg-white hover:text-blue-600 transition"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="md:w-1/2 mb-10 md:mb-0">
          <img
            src={heroIllustration}
            alt="Hero Illustration"
            className="w-full h-96"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose JobPortal?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded shadow hover:shadow-lg transition text-center">
            <h3 className="text-xl font-semibold mb-2">Find Your Dream Job</h3>
            <p className="text-gray-600">
              Thousands of opportunities across top companies worldwide.
            </p>
          </div>
          <div className="p-6 border rounded shadow hover:shadow-lg transition text-center">
            <h3 className="text-xl font-semibold mb-2">
              Connect with Recruiters
            </h3>
            <p className="text-gray-600">
              Directly interact with companies and land interviews faster.
            </p>
          </div>
          <div className="p-6 border rounded shadow hover:shadow-lg transition text-center">
            <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
            <p className="text-gray-600">
              Access resources and guidance to enhance your skills and career
              path.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gray-100 py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Success Stories
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded shadow">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={avatar1}
                alt="User 1"
                className="w-12 h-12 rounded-full"
              />
              <h3 className="font-semibold">Aarav Patel</h3>
            </div>
            <p className="text-gray-600">
              "I found my dream job within 2 weeks using JobPortal. The platform
              is intuitive and recruiter-friendly!"
            </p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={avatar2}
                alt="User 2"
                className="w-12 h-12 rounded-full"
              />
              <h3 className="font-semibold">Sneha Kapoor</h3>
            </div>
            <p className="text-gray-600">
              "As a recruiter, I was able to quickly shortlist top candidates.
              The platform saves a lot of time!"
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white text-center py-20 px-4">
        <h2 className="text-3xl font-bold mb-6">
          Ready to kickstart your career?
        </h2>
        <a
          href="/register"
          className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100"
        >
          Join Now
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 Jobsy. All rights reserved.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">
              About
            </a>
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
