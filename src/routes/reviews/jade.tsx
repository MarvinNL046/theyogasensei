import { createFileRoute } from '@tanstack/react-router'
import { ReviewDetail, buildReviewHead } from '#/components/reviews/ReviewDetail'
import { DETAIL } from '#/features/reviews/detail-jade'

export const Route = createFileRoute('/reviews/jade')({
  head: () => buildReviewHead(DETAIL, 'jade'),
  component: () => <ReviewDetail detail={DETAIL} />,
})
