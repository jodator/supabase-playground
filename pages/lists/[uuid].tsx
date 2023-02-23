import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useEffect, useReducer, useState } from 'react'
import { Container, Main, StyledLink } from 'components/sharedstyles'
import Head from 'next/head'
import styled from 'styled-components'
import { Database } from 'database.types'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { OrderItemRow, OrderListRow } from 'types'
import { Button } from 'components/Button'
import { Owner } from 'components/Owner'
import { OnlineUsers } from 'components/OnlineUsers'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

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

export default function Home({ uuid }: PageProps) {
  const user = useUser()
  const supabaseClient = useSupabaseClient<Database>()

  const [order, setOrder] = useState<OrderListRow>()
  const [items, setItems] = useState<OrderItemRow[]>([])

  useEffect(() => {
    (async function () {
      const { data, error } = await supabaseClient
        .from('OrderList')
        .select()
        .eq('id', uuid)

      if (!error) {
        setOrder(data[0])
      } else {
        console.log(error)
      }
    })()
  }, [])

  useEffect(() => {
    (async function () {
      const { data, error } = await supabaseClient
        .from('OrderItem')
        .select()
        .eq('listId', uuid)

      if (!error) {
        setItems(data)
      } else {
        console.log(error)
      }
    })()
  }, [])

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
        listId: uuid,
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

  return (
    <Container>
      <Head>
        <title>View order</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <ListTitle>
          List: "{order?.title}" on {order?.date}
        </ListTitle>
        <OnlineUsers channelID={uuid} />
        <Wrap>
          <Table>
            <Row>
              <HeadCell>Lp.</HeadCell>
              <HeadCell>Danie</HeadCell>
              <HeadCell>Napój</HeadCell>
              <HeadCell>Kto</HeadCell>
            </Row>
            {items.map((item, idx) =>
              <Row key={item.id}>
                <Cell>{idx + 1}</Cell>
                <Cell>{item.food}</Cell>
                <Cell>{item.drink}</Cell>
                <Cell><Owner who={item.createdBy} /></Cell>
              </Row>)}
            {!user && <StyledLink href="/">Go Home to login</StyledLink>}
            {user &&
              <form
                onSubmit={onSubmit}
              >
                <Row>
                  <Cell></Cell>
                  <Cell>
                    <input
                      value={data?.food ?? ''}
                      onInput={({ currentTarget }) => dispatch({
                        action: 'food',
                        data: currentTarget.value,
                      })}
                    />
                  </Cell>
                  <Cell>
                    <input
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
              </form>
            }
          </Table>
        </Wrap>
      </Main>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<{ uuid: string }> = async ({ query }) => {
  const uuid = query.uuid as string

  if (!uuid) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      uuid: uuid,
    },
  }
}

const ListTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  margin: 20px 0;
`

const Table = styled.div`

`

const Row = styled.div`
  display: grid;
  grid-template-columns: 30px 200px 200px 100px;
  border-bottom: 1px solid black;
  padding: 14px 0;
`

const Cell = styled.div`
  display: flex;
  align-items: center;
`

const HeadCell = styled(Cell)`
  font-weight: bold;
`

const Wrap = styled.div`

`