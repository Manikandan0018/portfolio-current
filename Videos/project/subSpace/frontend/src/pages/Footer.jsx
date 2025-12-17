export default function Footer() {
  return (
    <footer className=" border-2 border-gray-200 mt-24 px-6 md:px-16 py-16 text-sm text-gray-500">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
        <div>
          <div className="flex items-center gap-2 text-xl font-bold text-black mb-4">
            <div className="h-7 w-7 bg-gradient-to-br from-pink-500 to-purple-500 rounded" />
            Clueso
          </div>

          <div className="flex gap-4 mt-4 text-gray-400">
            <span>in</span>
            <span>X</span>
            <span>▶</span>
          </div>
        </div>

        
        <div>
          <h4 className="font-semibold text-black mb-3">Product</h4>
          <ul className="space-y-2">
            <li className="footer-link">Pricing</li>
            <li className="footer-link">Video</li>
            <li className="footer-link">Documentation</li>
            <li className="footer-link">Translate</li>
            <li className="footer-link">AI Voiceovers</li>
            <li className="footer-link">Slides to Video</li>
            <li className="footer-link">Changelog</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-black mb-3">Resources</h4>
          <ul className="space-y-2">
            <li className="footer-link">Blog</li>
            <li className="footer-link">Help Center</li>
            <li className="footer-link">Customers</li>
            <li className="footer-link">Tutorials</li>
            <li className="footer-link">Affiliate Program</li>
            <li className="flex footer-link items-center gap-2">
              Video glossary
              <span className="text-xs footer-link bg-pink-500 text-white px-2 py-0.5 rounded">
                New
              </span>
            </li>
            <li className="footer-link">FAQs</li>
            <li className="footer-link">Sitemap</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-black mb-3">Compare</h4>
          <ul className="space-y-2">
            <li className="footer-link">Clueso vs Camtasia</li>
            <li className="footer-link">Clueso vs Loom</li>
            <li className="footer-link">Clueso vs Synthesia</li>
            <li className="footer-link">Clueso vs Descript</li>
            <li className="footer-link">Clueso vs Scribe</li>
            <li className="footer-link">Clueso vs Guidde</li>
            <li className="footer-link">Clueso vs Vyond</li>
            <li className="footer-link">Clueso vs Tango</li>
            <li className="footer-link">Clueso vs HeyGen</li>
            <li className="footer-link">Clueso vs Veed</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold  text-black mb-3">Buyer’s Guide</h4>
          <ul className="space-y-2">
            <li className="footer-link">Best Screen Recording Software</li>
            <li className="footer-link">Best Screen Capture Software</li>
            <li className="footer-link">Best Documentation Software</li>
            <li className="footer-link">Best Product Walkthrough Software</li>
            <li className="footer-link">Best SOP Creation Software</li>
            <li className="footer-link">Best Training Video Software</li>
            <li className="footer-link">Best Onboarding Software</li>
            <li className="footer-link">Best Video Editing Software</li>
            <li className="footer-link">Best LMS</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
