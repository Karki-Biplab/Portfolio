import { useState } from 'react';
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
        // Reset form fields
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
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-900 to-blue-900 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 relative">
          Contact
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
        </h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="flex flex-col justify-center">
            <div className="text-lg mb-8">
              <p className="mb-6">Interested in collaborating or have an opportunity? Feel free to get in touch!</p>
              <div className="text-blue-200 mt-8">
                <p>Based in Kathmandu, Nepal</p>
                <p className="mt-2">Available for remote opportunities worldwide</p>
                <p className="mt-4 font-medium">Let's build something amazing together!</p>
              </div>
              <div className="mt-10">
                <a 
                  href="mailto:Biplabkarki13@gmail.com" 
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all hover:shadow-lg transform hover:scale-105"
                >
                  <Mail className="mr-2" size={20} />Email Me Directly
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl shadow-2xl">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <div>
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-gray-700 text-white w-full pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-700 text-white w-full pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your email"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <MessageSquare size={18} className="text-gray-400" />
                  </div>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows="5"
                    className="bg-gray-700 text-white w-full pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your message"
                  ></textarea>
                </div>
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={formStatus.isSubmitting}
                className={`w-full flex justify-center items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all
                  ${formStatus.isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700 hover:shadow-lg transform hover:scale-105'}`}
              >
                {formStatus.isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
              
              {formStatus.message && (
                <div className={`mt-4 p-3 rounded-lg text-center ${
                  formStatus.isSuccess ? 'bg-green-600 bg-opacity-25 text-green-100' : 
                  formStatus.isError ? 'bg-red-600 bg-opacity-25 text-red-100' : 
                  'bg-blue-600 bg-opacity-25 text-blue-100'
                }`}>
                  {formStatus.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}