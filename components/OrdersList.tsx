import { OrderListRow } from 'types'
import { Cell, Row, StyledLink } from 'components/sharedstyles'
import { Owner } from 'components/Owner'

export function OrderList(props: OrderListRow) {
  return <Row>
    <Cell>
      <StyledLink href={`/lists/${props.id}`}>{props.title}</StyledLink>&nbsp;-&nbsp;{props.date}
    </Cell>
    <Cell>
      <Owner who={props.createdBy} />
    </Cell>
  </Row>
}
