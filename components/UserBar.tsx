import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useCallback, useEffect } from 'react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import styled from 'styled-components'
import { StyledImage } from 'components/sharedstyles'
import { Button } from 'components/Button'

export function UserBar() {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const userData = JSON.stringify(user)

  useEffect(() => console.log(user), [userData])
  const onSignOut = useCallback(() => supabaseClient.auth.signOut(), [supabaseClient])

  if (!user) {
    return <Welcome>
      <Greet>Hello, stranger! Please Login:</Greet>
      <Auth
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabaseClient}
        providers={['github']}
        socialLayout="vertical"
        onlyThirdPartyProviders
      />
    </Welcome>
  }

  return <Welcome>
    <Greet>Hello, {user.user_metadata.name}!</Greet>
    <StyledImage src={user.user_metadata.avatar_url} alt="" width={40} height={40} />
    <Button onClick={onSignOut}>Log out</Button>
  </Welcome>
}

const Greet = styled.span`
  display: flex;
  align-items: center;
`

const Welcome = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto auto;
  gap: 10px;
  margin-bottom: 20px;
`