import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Database } from 'database.types'
import { useEffect, useState } from 'react'
import { StyledImage } from 'components/sharedstyles'
import styled from 'styled-components'

interface UserPresence {
  name: string
  avatar: string
  presence_ref: string
}

export const OnlineUsers = ({ channelID }: { channelID: string }) => {
  const user = useUser()
  const supabaseClient = useSupabaseClient<Database>()

  const [online, setOnline] = useState<UserPresence[]>([])

  useEffect(() => {
    const channel = supabaseClient.channel(`users-${channelID}`)
    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState() as unknown as Record<string, UserPresence[]>
        const current = Object.values(state).map(([userPresence]) => ({ ...userPresence }))

        setOnline(current)
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('New join', key, newPresences)
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('New left', key, leftPresences)
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            name: user?.user_metadata?.name ?? 'Anon',
            avatar: user?.user_metadata?.avatar_url ?? `https://robohash.org/${(Math.random() * 100000).toFixed()}?set=set4&bgset=&size=40x40`,
          })
        }
      })

    return () => {
      void channel.unsubscribe()
    }
  }, [user?.id])

  return <OnlineWrap>
    Who's online:&nbsp;
    {online.map(({ avatar, name , presence_ref}) => {
      return <StyledImage key={presence_ref} src={avatar} alt={name} title={name} width={20} height={20} />
    })}
  </OnlineWrap>
}
const OnlineWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`