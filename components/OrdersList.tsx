import { OrderListRow } from 'types'
import { StyledImage, StyledLink } from 'components/sharedstyles'
import styled from 'styled-components'
import { Owner } from 'components/Owner'

export const OrderList = (props: OrderListRow) => {
  return <OrderListWrap>
    <StyledLink href={`/lists/${props.id}`}>{props.title}</StyledLink> - {props.date}
    <Owner who={props.createdBy} />
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