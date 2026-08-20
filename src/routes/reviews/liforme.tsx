import { createFileRoute } from '@tanstack/react-router'
import {
  ReviewDetail,
  buildReviewHead,
} from '#/components/reviews/ReviewDetail'
import { DETAIL } from '#/features/reviews/detail-liforme'

export const Route = createFileRoute('/reviews/liforme')({
  head: () => buildReviewHead(DETAIL, 'liforme'),
  component: () => <ReviewDetail detail={DETAIL} />,
})
