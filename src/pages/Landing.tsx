import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Zap, Network, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Hero gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent"></div>
      </div>

      {/* Dynamic floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 p-6 backdrop-blur-sm">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-black text-lg font-bold">Z</span>
            </div>
            <span className="text-2xl font-light tracking-wide">Zendity</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/app">
              <Button
                variant="ghost"
                className="text-white/80 hover:text-white hover:bg-white/10 font-light"
              >
                Demo
              </Button>
            </Link>
            <Link to="/app">
              <Button className="bg-white text-black hover:bg-gray-100 font-medium px-6 py-2 rounded-full shadow-lg">
                Launch App
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-40 pt-20 pb-32">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-light">
                The Future of Digital Identity
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-extralight mb-6 leading-tight">
              Own Your
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent font-light">
                Digital Self
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 mb-4 max-w-3xl mx-auto font-light leading-relaxed">
              A universal, privacy-first identity protocol
            </p>
            <p className="text-lg text-white/50 mb-12 max-w-2xl mx-auto font-light">
              Prove who you are across any blockchain without revealing personal
              data
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/app">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-full shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                Create Identity
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/app">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-light rounded-full backdrop-blur-sm"
              >
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex justify-center items-center gap-8 text-sm text-white/40 font-light">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Zero Knowledge</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Self Sovereign</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Cross Chain</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-40 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extralight mb-6">
              Simply <span className="italic">powerful</span>
            </h2>
            <p className="text-xl text-white/70 font-light">
              Three pillars of digital freedom
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-b from-white/5 to-white/0 border-white/10 backdrop-blur-sm group hover:from-white/10 transition-all duration-500">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-light mb-4">Privacy First</h3>
                <p className="text-white/70 font-light leading-relaxed mb-6">
                  Prove anything without revealing everything. Zero-knowledge
                  proofs keep your data yours.
                </p>
                <Link to="/app">
                  <Button
                    variant="ghost"
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 font-light"
                  >
                    Learn more →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-white/5 to-white/0 border-white/10 backdrop-blur-sm group hover:from-white/10 transition-all duration-500">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Network className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-light mb-4">Universal</h3>
                <p className="text-white/70 font-light leading-relaxed mb-6">
                  One identity across all chains. Stop fragmenting your digital
                  reputation.
                </p>
                <Link to="/app">
                  <Button
                    variant="ghost"
                    className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 font-light"
                  >
                    Explore chains →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-white/5 to-white/0 border-white/10 backdrop-blur-sm group hover:from-white/10 transition-all duration-500">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-light mb-4">Rewarding</h3>
                <p className="text-white/70 font-light leading-relaxed mb-6">
                  Turn reputation into rewards. Unlock perks across the
                  ecosystem.
                </p>
                <Link to="/app">
                  <Button
                    variant="ghost"
                    className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 font-light"
                  >
                    Start earning →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-40 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-5xl font-extralight text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-200">
                15K+
              </div>
              <p className="text-white/50 font-light text-sm">Verified Users</p>
            </div>
            <div className="group">
              <div className="text-5xl font-extralight text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-200">
                8
              </div>
              <p className="text-white/50 font-light text-sm">Chains</p>
            </div>
            <div className="group">
              <div className="text-5xl font-extralight text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-200">
                99.9%
              </div>
              <p className="text-white/50 font-light text-sm">Uptime</p>
            </div>
            <div className="group">
              <div className="text-5xl font-extralight text-green-400 mb-2 group-hover:scale-110 transition-transform duration-200">
                &lt;2s
              </div>
              <p className="text-white/50 font-light text-sm">Verification</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-40 py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-12">
            <h2 className="text-5xl md:text-6xl font-extralight mb-6 leading-tight">
              Ready to be
              <br />
              <span className="italic">unstoppable?</span>
            </h2>
            <p className="text-xl text-white/70 font-light mb-12">
              Join thousands building the future of identity
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link to="/app">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 px-12 py-4 text-xl font-medium rounded-full shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                Get Started
              </Button>
            </Link>
            <Link to="/app">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-12 py-4 text-xl font-light rounded-full"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-40 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-white rounded-2xl flex items-center justify-center">
                <span className="text-black text-sm font-bold">Z</span>
              </div>
              <span className="text-xl font-light">Zendity</span>
            </div>
            <p className="text-white/40 font-light text-sm">
              © 2024 Building tomorrow's identity layer
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
