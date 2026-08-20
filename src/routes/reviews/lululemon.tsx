import { createFileRoute } from '@tanstack/react-router'
import {
  ReviewDetail,
  buildReviewHead,
} from '#/components/reviews/ReviewDetail'
import { DETAIL } from '#/features/reviews/detail-lululemon'

export const Route = createFileRoute('/reviews/lululemon')({
  head: () => buildReviewHead(DETAIL, 'lululemon'),
  component: () => <ReviewDetail detail={DETAIL} />,
})
