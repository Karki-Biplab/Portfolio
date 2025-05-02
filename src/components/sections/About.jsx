export default function About() {
    return (
      <section id="about" className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 relative">
            About Me
            <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="mb-10 flex justify-center">
              <img src="/profile.png" alt="Biplab Karki" className="w-48 h-48 rounded-full shadow-xl object-cover transform hover:scale-105 transition-transform" />
            </div>
            <div className="text-lg leading-relaxed space-y-6 dark:text-gray-300">
              <p>
                I am a passionate and self-motivated developer who thrives on learning through hands-on experience.
                I enjoy solving real-world problems, collaborating with like-minded individuals, and refining my
                skills through continuous learning.
              </p>
              <p>
                I'm currently pursuing a BSc (Hons) in Computer Science at Herald College Kathmandu. My academic
                foundation is complemented by several practical projects, ranging from mobile app development using
                Flutter & Firebase, to data science, machine learning, and IoT innovations.
              </p>
              <p>
                My goal is to create technological solutions that make a positive impact on people's lives
                while continuously expanding my technical expertise across various domains.
              </p>
            </div>
            <div className="mt-10 text-center">
              <a 
                href="/Biplab_Karki_Resume.pdf" 
                download 
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all hover:shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }