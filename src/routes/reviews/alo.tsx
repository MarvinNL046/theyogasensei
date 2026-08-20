import { createFileRoute } from '@tanstack/react-router'
import {
  ReviewDetail,
  buildReviewHead,
} from '#/components/reviews/ReviewDetail'
import { DETAIL } from '#/features/reviews/detail-alo'

export const Route = createFileRoute('/reviews/alo')({
  head: () => buildReviewHead(DETAIL, 'alo'),
  component: () => <ReviewDetail detail={DETAIL} />,
})
