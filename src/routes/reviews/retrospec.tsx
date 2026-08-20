import { createFileRoute } from '@tanstack/react-router'
import {
  ReviewDetail,
  buildReviewHead,
} from '#/components/reviews/ReviewDetail'
import { DETAIL } from '#/features/reviews/detail-retrospec'

export const Route = createFileRoute('/reviews/retrospec')({
  head: () => buildReviewHead(DETAIL, 'retrospec'),
  component: () => <ReviewDetail detail={DETAIL} />,
})
