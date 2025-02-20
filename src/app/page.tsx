import Link from 'next/link';
import Navbar from '@/components/Navbar';
import GameController3D from '@/components/GameController3D';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Background Layer with 3D Controller */}
      <div className="fixed inset-0 w-full h-full">
        {/* Base dark overlay */}
        <div className="absolute inset-0 bg-digital-black/75" />
        
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-digital-black/40 to-digital-black/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-digital-black/60 via-transparent to-digital-black/80" />
        
        {/* Controller background */}
        <div className="absolute inset-0 opacity-90">
          <GameController3D />
        </div>

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
      </div>

      {/* Content Layer */}
      <div className="relative z-20">
        <Navbar />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-64 h-64 rounded-full bg-victory-gold/10 -top-20 -left-20 animate-float blur-2xl" />
            <div className="absolute w-96 h-96 rounded-full bg-trust-blue/5 -bottom-32 -right-32 animate-float-delayed blur-2xl" />
          </div>

          <div className="container mx-auto px-6 pt-20 ">
            <div className="flex flex-col items-center">
              <div className="w-full md:w-2/3 text-pure-white animate-fade-in glass-effect bg-digital-black/10 p-8 rounded-2xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
                  Level Up Your
                  <span className="text-victory-gold"> Gaming </span>
                  Experience
                </h1>
                <p className="text-xl mb-8 text-cloud-white text-center">
                  Get instant access to game vouchers, in-game currencies, and add-ons.
                  Pay easily with local payment methods.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link 
                    href="/auth/signup" 
                    className="w-full sm:w-auto btn-primary px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 text-center shadow-lg hover:shadow-energy-orange/20"
                  >
                    Get Started
                  </Link>
                  <Link 
                    href="/browse" 
                    className="w-full sm:w-auto btn-secondary px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 text-center shadow-lg hover:shadow-trust-blue/20"
                  >
                    Browse Games
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-digital-black/50 to-digital-black" />
          <div className="container mx-auto px-6 relative">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-pure-white mb-16">
              Why Choose <span className="text-energy-orange">1More</span><span className="text-victory-gold">Game</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Instant Delivery */}
              <div className="glass-effect p-8 rounded-2xl animate-fade-in hover:scale-105 transition-transform duration-300 shadow-xl hover:shadow-energy-orange/20">
                <div className="text-energy-orange text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-pure-white mb-4">Instant Delivery</h3>
                <p className="text-cloud-white">Get your gaming vouchers and currencies delivered instantly to your account.</p>
              </div>

              {/* Local Payments */}
              <div className="glass-effect p-8 rounded-2xl animate-fade-in hover:scale-105 transition-transform duration-300 shadow-xl hover:shadow-victory-gold/20" style={{animationDelay: '0.2s'}}>
                <div className="text-victory-gold text-4xl mb-4">💳</div>
                <h3 className="text-xl font-bold text-pure-white mb-4">Local Payments</h3>
                <p className="text-cloud-white">Pay easily with M-Pesa, USSD, mobile banking, and more local options.</p>
              </div>

              {/* Rewards Program */}
              <div className="glass-effect p-8 rounded-2xl animate-fade-in hover:scale-105 transition-transform duration-300 shadow-xl hover:shadow-trust-blue/20" style={{animationDelay: '0.4s'}}>
                <div className="text-trust-blue text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-pure-white mb-4">Earn Rewards</h3>
                <p className="text-cloud-white">Get points for every purchase and unlock exclusive gaming rewards.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
