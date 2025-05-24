
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ShieldCheck, Zap, Network } from 'lucide-react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Zidentity</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/app">
              <Button variant="ghost" className="text-white hover:bg-gray-800 hidden sm:inline-flex">
                View Demo
              </Button>
            </Link>
            <Link to="/app">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                Launch App
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
              Zidentity
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Your Universal, Privacy-First Digital Identity for Web3
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Prove who you are and what you've achieved across any Avalanche chain, 
              without revealing personal data. Transform fragmented profiles into a unified, user-owned asset.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Link to="/app">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <ShieldCheck className="w-5 h-5 mr-2" />
                Create Your Universal Profile
              </Button>
            </Link>
            <Link to="/app">
              <Button variant="outline" size="lg" className="border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 px-8 py-4 text-lg font-semibold transition-all duration-300">
                <Zap className="w-5 h-5 mr-2" />
                See How It Works
              </Button>
            </Link>
          </div>

          <div className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Privacy-preserving • Zero personal data shared • Built on Avalanche</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Zidentity?</h2>
            <p className="text-xl text-gray-400">Solve Web3's identity fragmentation once and for all</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm group hover:border-blue-500/50 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Zero-Knowledge Privacy</h3>
                <p className="text-gray-400 mb-6">
                  Prove specific attributes without revealing sensitive data using cutting-edge ZK proofs. Your privacy is guaranteed.
                </p>
                <Link to="/app">
                  <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
                    Learn About ZK Proofs →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm group hover:border-purple-500/50 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Network className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Universal Cross-Chain Identity</h3>
                <p className="text-gray-400 mb-6">
                  One identity across all Avalanche subnets. Stop fragmenting your digital reputation and consolidate your Web3 value.
                </p>
                <Link to="/app">
                  <Button variant="ghost" className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10">
                    Explore Cross-Chain Features →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm group hover:border-green-500/50 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Reputation & Rewards</h3>
                <p className="text-gray-400 mb-6">
                  Transform on-chain activity into universal reputation points. Unlock personalized perks and targeted airdrops.
                </p>
                <Link to="/app">
                  <Button variant="ghost" className="text-green-400 hover:text-green-300 hover:bg-green-500/10">
                    Start Earning Reputation →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">15K+</div>
              <p className="text-gray-400">Verified Identities</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">8</div>
              <p className="text-gray-400">Supported Chains</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">99.9%</div>
              <p className="text-gray-400">Uptime</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">&lt; 2s</div>
              <p className="text-gray-400">Verification Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How Zidentity Works</h2>
            <p className="text-xl text-gray-400">Three simple steps to your universal Web3 identity</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Connect & Verify</h3>
              <p className="text-gray-400 mb-6">
                Connect your wallet and submit verifiable credentials. Our ZK-proof system validates your identity without exposing personal data.
              </p>
              <Link to="/app">
                <Button variant="outline" size="sm" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
                  Start Verification
                </Button>
              </Link>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Build Reputation</h3>
              <p className="text-gray-400 mb-6">
                Your verified activities across Avalanche subnets automatically contribute to your universal reputation score and integral points.
              </p>
              <Link to="/app">
                <Button variant="outline" size="sm" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                  View Reputation System
                </Button>
              </Link>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Unlock Benefits</h3>
              <p className="text-gray-400 mb-6">
                Access personalized perks, exclusive airdrops, and tailored experiences across the entire Avalanche ecosystem.
              </p>
              <Link to="/app">
                <Button variant="outline" size="sm" className="border-green-500 text-green-400 hover:bg-green-500/10">
                  Discover Perks
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Real Benefits for Real Users</h2>
            <p className="text-xl text-gray-400">See what your universal identity unlocks</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 p-6 text-center">
              <h4 className="font-semibold mb-2 text-blue-400">Travel Perks</h4>
              <p className="text-sm text-gray-400 mb-4">Flight discounts via Camino Network integration</p>
              <Button size="sm" variant="ghost" className="text-blue-400 hover:bg-blue-500/10">Explore →</Button>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-500/10 to-green-500/10 border-purple-500/20 p-6 text-center">
              <h4 className="font-semibold mb-2 text-purple-400">DeFi Benefits</h4>
              <p className="text-sm text-gray-400 mb-4">Lower fees and exclusive pools for verified users</p>
              <Button size="sm" variant="ghost" className="text-purple-400 hover:bg-purple-500/10">Learn More →</Button>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-500/10 to-yellow-500/10 border-green-500/20 p-6 text-center">
              <h4 className="font-semibold mb-2 text-green-400">Gaming Rewards</h4>
              <p className="text-sm text-gray-400 mb-4">Cross-game achievements and exclusive NFTs</p>
              <Button size="sm" variant="ghost" className="text-green-400 hover:bg-green-500/10">Play Now →</Button>
            </Card>
            
            <Card className="bg-gradient-to-br from-yellow-500/10 to-red-500/10 border-yellow-500/20 p-6 text-center">
              <h4 className="font-semibold mb-2 text-yellow-400">DAO Governance</h4>
              <p className="text-sm text-gray-400 mb-4">Enhanced voting power based on reputation</p>
              <Button size="sm" variant="ghost" className="text-yellow-400 hover:bg-yellow-500/10">Vote →</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-gray-700 backdrop-blur-sm overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
            <CardContent className="p-12 relative z-10">
              <h2 className="text-3xl font-bold mb-4">Ready to Own Your Digital Identity?</h2>
              <p className="text-xl text-gray-400 mb-8">
                Join the future of Web3 identity. No more fragmented profiles, no more privacy compromises.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <Link to="/app">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <ShieldCheck className="w-5 h-5 mr-2" />
                    Create Universal Profile
                  </Button>
                </Link>
                <Link to="/app">
                  <Button variant="outline" size="lg" className="border-2 border-gray-600 text-gray-300 hover:bg-white/10 hover:border-white/30 px-8 py-4 text-lg font-semibold">
                    View Live Demo
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>100% Privacy Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>No Personal Data Stored</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Self-Sovereign Control</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Zendity</span>
            </div>
            <p className="text-gray-400">© 2024 Zendity. Building the future of decentralized identity.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
