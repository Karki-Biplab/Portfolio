import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './components/blog.css';

export default function BlogLayout({ children }) {
  return (
    <div className="dev-hub-layout bg-slate-900 min-h-screen text-gray-100">

      <main >
        {children}
      </main>

      <Footer />
    </div>
  );
}
