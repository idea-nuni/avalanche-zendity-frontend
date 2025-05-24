
import { useAccount } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, User, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { IdentityVerificationForm } from './IdentityVerificationForm'
import { SupportedBlockchains } from './SupportedBlockchains'

export function VerifyIdentitiesContent() {
  const { address, isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <ShieldCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Cross-Chain Identity Verification</h2>
        <p className="text-gray-600">Please connect your wallet to start the identity verification process</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Title Area */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cross-Chain Identity Verification</h1>
        <p className="text-gray-600 mt-2">Verify your identity on AVAX C-Chain and sync across multiple blockchains</p>
      </div>

      {/* Verification Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">3</div>
            <p className="text-xs text-muted-foreground">
              Awaiting review
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">12</div>
            <p className="text-xs text-muted-foreground">
              Successfully verified
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1</div>
            <p className="text-xs text-muted-foreground">
              Verification failed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Current User Identity Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Your Identity Status</span>
          </CardTitle>
          <CardDescription>
            Current verification status for the connected wallet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium">Wallet Address</p>
              <p className="font-mono text-sm text-gray-600">{address}</p>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                  Pending
                </Badge>
                <span className="text-sm text-gray-500">Identity verification in progress</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Identity Verification Form */}
      <IdentityVerificationForm />

      {/* Supported Blockchains */}
      <SupportedBlockchains />
    </div>
  )
}
