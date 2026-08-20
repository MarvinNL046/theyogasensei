import { createFileRoute } from '@tanstack/react-router'
import {
  ReviewDetail,
  buildReviewHead,
} from '#/components/reviews/ReviewDetail'
import { DETAIL } from '#/features/reviews/detail-manduka-pro'

export const Route = createFileRoute('/reviews/manduka-pro')({
  head: () => buildReviewHead(DETAIL, 'manduka-pro'),
  component: () => <ReviewDetail detail={DETAIL} />,
})
