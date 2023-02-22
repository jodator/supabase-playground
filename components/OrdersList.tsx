import { OrderListRow } from 'types'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from 'database.types'
import { useEffect, useState } from 'react'
import { StyledImage, StyledLink } from 'components/sharedstyles'
import styled from 'styled-components'

type UserInfo = { name: string, avatar_url: string }
export const OrderList = (props: OrderListRow) => {
  const supabaseClient = useSupabaseClient<Database>()
  const [user, setUser] = useState<UserInfo>()

  useEffect(() => {
    (async function () {
      const { data, error } = await supabaseClient
        .from('users')
        .select('raw_user_meta_data->name, raw_user_meta_data->avatar_url')
        .eq('id', props.createdBy)

      if (!error) {
        setUser(data[0] as UserInfo)
      }
    })()
  }, [])

  return <OrderListWrap>
    <StyledLink href={`/lists/${props.id}`}>{props.title}</StyledLink> - {props.date} {user && `| by: ${user.name}`}
    {user && <StyledImage src={user.avatar_url} alt="" width={20} height={20} />}
  </OrderListWrap>
}

const OrderListWrap = styled.div`
  margin: 0 0 20px;
  line-height: 30px;
  vertical-align: middle;

  ${StyledImage} {
    margin: 0 0 -2px 8px;
  }
`