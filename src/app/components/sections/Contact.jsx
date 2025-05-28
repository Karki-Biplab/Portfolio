"use client";
import { useState, useEffect } from 'react';
import { Mail, Send, User, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState({
    message: '',
    isSuccess: false,
    isError: false,
    isSubmitting: false
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({
      message: 'Sending...',
      isSubmitting: true,
      isSuccess: false,
      isError: false
    });

    const formData = new FormData();
    formData.append("access_key", "cc94ff1f-52db-458c-b009-a7e7a281b48e");
    formData.append("from_name", "Website Contact Form");
    formData.append("to_email", "Biplabkarki13@gmail.com");
    formData.append("subject", "New Contact Form Submission");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus({
          message: "Message sent successfully!",
          isSuccess: true,
          isSubmitting: false,
          isError: false
        });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setFormStatus({
          message: data.message || "Something went wrong. Please try again.",
          isSuccess: false,
          isSubmitting: false,
          isError: true
        });
      }
    } catch (error) {
      setFormStatus({
        message: "An error occurred. Please try again later.",
        isSuccess: false,
        isSubmitting: false,
        isError: true
      });
    }

    setTimeout(() => {
      setFormStatus({
        message: '',
        isSuccess: false,
        isSubmitting: false,
        isError: false
      });
    }, 5000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-blue-900 text-white border-t-100 border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header - Compact on mobile */}
        <div className={`text-center mb-10 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 relative">
            Contact
            <div className="w-20 md:w-24 h-1 bg-blue-500 mx-auto mt-3 md:mt-4"></div>
          </h2>
          <p className="text-sm md:text-lg text-gray-300 max-w-3xl mx-auto">
            Interested in collaborating or have an opportunity?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto">
          {/* Left Column - Simplified on mobile */}
          <div className={`flex flex-col justify-center text-center md:text-left space-y-4 md:space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-base md:text-xl leading-relaxed">
              Feel free to get in touch!
            </p>
            
            <div className="text-blue-200 space-y-2 md:space-y-3">
              <p className="text-sm md:text-base">Based in Kathmandu, Nepal</p>
              <p className="text-sm md:text-base">Available for remote opportunities worldwide</p>
            </div>
            
            <p className="text-lg md:text-xl font-semibold text-white mt-4 md:mt-8">
              Let's build something amazing together!
            </p>
            
            <div className="mt-4 md:mt-8 flex justify-center md:justify-start">
              <a 
                href="mailto:Biplabkarki13@gmail.com" 
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-medium hover:from-blue-700 hover:to-purple-700 transition-all hover:shadow-lg"
              >
                <Mail className="mr-2" size={18} />Email Me Directly
              </a>
            </div>
          </div>
          
          {/* Right Column - Form (same structure but more compact on mobile) */}
          <div className={`bg-gray-800 bg-opacity-50 p-5 md:p-8 rounded-xl shadow-lg transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 md:mb-6">
                <label htmlFor="name" className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-gray-700 text-white w-full pl-10 pr-3 py-2 md:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                    placeholder="Your name"
                  />
                </div>
              </div>
              
              <div className="mb-4 md:mb-6">
                <label htmlFor="email" className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-700 text-white w-full pl-10 pr-3 py-2 md:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                    placeholder="Your email"
                  />
                </div>
              </div>
              
              <div className="mb-4 md:mb-6">
                <label htmlFor="message" className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Message</label>
                <div className="relative">
                  <div className="absolute top-2 md:top-3 left-3 pointer-events-none">
                    <MessageSquare size={16} className="text-gray-400" />
                  </div>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows="4"
                    className="bg-gray-700 text-white w-full pl-10 pr-3 py-2 md:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                    placeholder="Your message"
                  ></textarea>
                </div>
              </div>
              
             <button
                type="submit"
                disabled={formStatus.isSubmitting}
                className={`w-full flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-medium transition-all
                  ${formStatus.isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:scale-105'}`}
              >

                {formStatus.isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
              
              {formStatus.message && (
                <div className={`mt-3 p-2 md:p-3 rounded-lg text-center text-sm md:text-base ${
                  formStatus.isSuccess ? 'bg-green-600 bg-opacity-25 text-green-100' : 
                  formStatus.isError ? 'bg-red-600 bg-opacity-25 text-red-100' : 
                  'bg-blue-600 bg-opacity-25 text-blue-100'
                }`}>
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}