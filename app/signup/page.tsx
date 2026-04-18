import type { Metadata } from 'next'
import ComingSoon from '@/components/ComingSoon'

export const metadata: Metadata = {
  title: 'Sign up — RelateEdge',
  description: 'Create your RelateEdge account.',
}

export default function SignupPage() {
  return <ComingSoon title="Sign up" />
}
