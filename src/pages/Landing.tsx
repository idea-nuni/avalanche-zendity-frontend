
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
            <span className="text-xl font-bold">Zendity</span>
          </div>
          <Link to="/app">
            <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
              Launch App
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
              Zendity
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Cross-Chain Identity Verification for the Decentralized Future
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Verify your identity once on AVAX C-Chain and seamlessly sync across multiple blockchains. 
              Building trust in the Web3 ecosystem through secure, decentralized identity solutions.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/app">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg">
                Start Verification
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-gray-700 text-white hover:bg-gray-800 px-8 py-4 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Zendity?</h2>
            <p className="text-xl text-gray-400">The future of decentralized identity verification</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Secure Verification</h3>
                <p className="text-gray-400">
                  Advanced cryptographic protocols ensure your identity data remains secure and private while maintaining verifiability.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Network className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Cross-Chain Sync</h3>
                <p className="text-gray-400">
                  Verify once on AVAX C-Chain and automatically sync your verified status across multiple blockchain networks.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Lightning Fast</h3>
                <p className="text-gray-400">
                  Built on Avalanche's high-performance infrastructure for instant verification and minimal transaction costs.
                </p>
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
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">Simple steps to verify your identity</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Connect Wallet</h3>
              <p className="text-gray-400">
                Connect your Avalanche C-Chain compatible wallet to get started with the verification process.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Submit Documents</h3>
              <p className="text-gray-400">
                Securely upload your identity documents for verification using our encrypted, decentralized storage.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Verified</h3>
              <p className="text-gray-400">
                Receive your verified status and sync across multiple blockchain networks automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-gray-700 backdrop-blur-sm">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Verified?</h2>
              <p className="text-xl text-gray-400 mb-8">
                Join thousands of users who trust Zendity for their cross-chain identity verification needs.
              </p>
              <Link to="/app">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg">
                  Start Your Verification
                </Button>
              </Link>
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
