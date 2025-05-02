import { Mail } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-900 to-blue-900 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 relative">
          Contact
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
        </h2>
        <div className="max-w-xl mx-auto text-center">
          <p className="text-lg mb-8">Interested in collaborating or have an opportunity? Feel free to get in touch!</p>
          <div className="flex justify-center space-x-6">
            <a 
              href="mailto:Biplabkarki13@gmail.com" 
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all hover:shadow-lg transform hover:scale-105"
            >
              <Mail className="mr-2" size={20} />Email Me
            </a>
          </div>
          <div className="text-blue-200 mt-10">
            <p>Based in Kathmandu, Nepal</p>
            <p className="mt-2">Available for remote opportunities worldwide</p>
            <p className="mt-4 font-medium">Let's build something amazing together!</p>
          </div>
        </div>
      </div>
    </section>
  );
}