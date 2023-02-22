import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { Container, Main } from 'components/sharedstyles'
import Head from 'next/head'
import styled from 'styled-components'
import { Database } from 'database.types'
import { OrderList } from 'pages/index'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default function Home({ uuid }: PageProps) {
  const supabaseClient = useSupabaseClient<Database>()

  const [order, setOrder] = useState<OrderList>()
  console.log(uuid, order)

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

  return (
    <Container>
      <Head>
        <title>View order</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Welcome>
          List: {order.title}
        </Welcome>
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

const Welcome = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto;
  gap: 10px;
`