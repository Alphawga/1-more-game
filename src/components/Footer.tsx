import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export default function Footer() {
  return (
    <footer className="relative z-50 bg-black text-white">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-digital-black/90 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 py-12 bg-black/90">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-victory-gold font-bold mb-4 text-lg">1More Game</h3>
              <p className="text-sm text-cloud-white/80">Your trusted gaming marketplace in Africa</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-cloud-white">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/browse" className="text-cloud-white/70 hover:text-energy-orange transition-colors">Browse Games</Link></li>
                <li><Link href="/pricing" className="text-cloud-white/70 hover:text-energy-orange transition-colors">Pricing</Link></li>
                <li><Link href="/support" className="text-cloud-white/70 hover:text-energy-orange transition-colors">Support</Link></li>
                <li><Link href="/community" className="text-cloud-white/70 hover:text-energy-orange transition-colors">Community</Link></li>
                <li><Link href="/rewards" className="text-cloud-white/70 hover:text-energy-orange transition-colors">Rewards</Link></li>
                <li><Link href="/support" className="text-cloud-white/70 hover:text-energy-orange transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-cloud-white">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-cloud-white/70 hover:text-energy-orange transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-cloud-white/70 hover:text-energy-orange transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-cloud-white">Connect</h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-cloud-white/70 hover:text-energy-orange transition-colors">Contact Us</Link></li>
                <li><a href="#" className="text-cloud-white/70 hover:text-energy-orange transition-colors">Twitter</a></li>
                <li><a href="#" className="text-cloud-white/70 hover:text-energy-orange transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-cloud-white/10">
            <div className="flex items-center justify-between">
              <p className="text-sm text-cloud-white/60">
                © {new Date().getFullYear()} 1More Game. All rights reserved.
              </p>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 