import logo from '../../image/logo.png'

export default function Header() {
    return (
      <>
        <header className="flex z-20 bg-gray-100 w-screen border-b shadow border-b-gray-100 fixed top-0 items-center justify-between px-6 md:px-16 py-5">
          <div className="flex items-center gap-2 text-xl font-bold">
            <img className='w-10' src={logo} alt="" />
            Clueso
          </div>

          <nav className="hidden lg:flex gap-10 text-sm text-gray-600">
            <span>Product</span>
            <span>Resources</span>
            <span>Pricing</span>
            <span>Careers</span>
          </nav>

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-black text-white rounded-md text-sm">
              Start Free Trial
            </button>
          </div>
        </header>
        ;
      </>
    );
}