import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from 'database.types'
import { useEffect, useState } from 'react'
import { StyledImage } from 'components/sharedstyles'

type UserInfo = { name: string, avatar_url: string }
export const Owner = (props: { who: string }) => {
  const supabaseClient = useSupabaseClient<Database>()
  const [user, setUser] = useState<UserInfo>()

  useEffect(() => {
    (async function () {
      const { data, error } = await supabaseClient
        .from('users')
        .select('raw_user_meta_data->name, raw_user_meta_data->avatar_url')
        .eq('id', props.who)

      if (!error) {
        setUser(data[0] as UserInfo)
      }
    })()
  }, [])

  if (!user) {
    return null
  }

  return (
    <>{user.name}&nbsp;<StyledImage src={user.avatar_url} alt="" width={20} height={20} /></>
  )
}