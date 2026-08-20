import { createFileRoute } from '@tanstack/react-router'
import {
  ReviewDetail,
  buildReviewHead,
} from '#/components/reviews/ReviewDetail'
import { DETAIL } from '#/features/reviews/detail-gaiam'

export const Route = createFileRoute('/reviews/gaiam')({
  head: () => buildReviewHead(DETAIL, 'gaiam'),
  component: () => <ReviewDetail detail={DETAIL} />,
})
