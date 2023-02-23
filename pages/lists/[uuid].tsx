import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { Cell, Container, HeadCell, ListTitle, Main, Row, Table } from 'components/sharedstyles'
import Head from 'next/head'
import styled from 'styled-components'
import { Database } from 'database.types'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { OrderItemRow, OrderListRow } from 'types'
import { Owner } from 'components/Owner'
import { OnlineUsers } from 'components/OnlineUsers'
import { EntryForm } from 'components/EntryForm'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default function OrderList({ uuid }: PageProps) {
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
      }
    })()
  }, [])

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
              <HeadCell>Food</HeadCell>
              <HeadCell>Drink</HeadCell>
              <HeadCell>Who</HeadCell>
            </Row>
            {items.map((item, idx) =>
              <Row key={item.id}>
                <Cell>{idx + 1}</Cell>
                <Cell>{item.food}</Cell>
                <Cell>{item.drink}</Cell>
                <Cell><Owner who={item.createdBy} /></Cell>
              </Row>)}
            <EntryForm listId={uuid} />
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

const Wrap = styled.div``