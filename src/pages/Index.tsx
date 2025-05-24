
import { Header } from '@/components/Header'
import { VerifyIdentitiesContent } from '@/components/VerifyIdentitiesContent'

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <VerifyIdentitiesContent />
      </div>
    </div>
  )
}

export default Index
