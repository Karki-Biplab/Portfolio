import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './_styles/blog.css';

export default function BlogLayout({ children }) {
  return (
    <div className="dev-hub-layout bg-slate-900 min-h-screen text-gray-100">
     {/* // <Navbar showNavbar={true} activeSection="" /> */}

      <main className="pt-[80px]"> {/* Add padding if Navbar is fixed */}
        {children}
      </main>

      <Footer />
    </div>
  );
}
