
import { Header } from '@/components/Header'
import { VerifyIdentitiesContent } from '@/components/VerifyIdentitiesContent'

const VerifyIdentities = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <VerifyIdentitiesContent />
      </div>
    </div>
  )
}

export default VerifyIdentities
