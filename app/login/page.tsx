import type { Metadata } from 'next'
import ComingSoon from '@/components/ComingSoon'

export const metadata: Metadata = {
  title: 'Login — RelateEdge',
  description: 'Sign in to RelateEdge.',
}

export default function LoginPage() {
  return <ComingSoon title="Login" />
}
