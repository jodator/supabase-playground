import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Database } from 'database.types'
import { useReducer } from 'react'
import { Cell, Row, StyledLink } from 'components/sharedstyles'
import { Button } from 'components/Button'
import styled from 'styled-components'

type FormAction = {
  action: 'food',
  data: string
} | {
  action: 'drink',
  data: string
} | {
  action: 'reset'
}

interface FormData {
  food: string | null
  drink: string | null
}

export function EntryForm({ listId }: { listId: string }) {
  const user = useUser()
  const supabaseClient = useSupabaseClient<Database>()

  const [data, dispatch] = useReducer((prevState: FormData, action: FormAction) => {
    if (action.action === 'food') {
      return { ...prevState, food: action.data }
    }

    if (action.action === 'drink') {
      return { ...prevState, drink: action.data }
    }

    if (action.action === 'reset') {
      return { food: null, drink: null }
    }
  }, { food: null, drink: null })

  const isAddDisabled = !data?.food || !data?.drink

  const submitData = async () => {
    try {
      await supabaseClient.from('OrderItem').insert({
        ...data,
        createdBy: user.id,
        listId,
      })
      console.log('done')
    } catch (e) {
      console.log(e)
    }

  }

  const onSubmit = event => {
    event.preventDefault()
    submitData().then(() => {
      dispatch({ action: 'reset' })
    })
  }

  return (<>
    {!user && <StyledLink href="/">Go Home to login</StyledLink>}
    {user &&
      <form onSubmit={onSubmit}>
        <Row>
          <Cell></Cell>
          <Cell>
            <Input
              value={data?.food ?? ''}
              onInput={({ currentTarget }) => dispatch({
                action: 'food',
                data: currentTarget.value,
              })}
            />
          </Cell>
          <Cell>
            <Input
              value={data?.drink ?? ''}
              onInput={({ currentTarget }) => dispatch({
                action: 'drink',
                data: currentTarget.value,
              })}
            />
          </Cell>
          <Cell>
            <Button type="submit" disabled={isAddDisabled}>Add</Button>
          </Cell>
        </Row>
      </form>}
  </>)
}

const Input = styled.input`
  font-size: 16px;
  padding: 10px;
  line-height: 16px;
  border: 1px solid #777;
  border-radius: 4px;
`
