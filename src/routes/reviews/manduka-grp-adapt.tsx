import { createFileRoute } from '@tanstack/react-router'
import { ReviewDetail, buildReviewHead } from '#/components/reviews/ReviewDetail'
import { DETAIL } from '#/features/reviews/detail-manduka-grp-adapt'

export const Route = createFileRoute('/reviews/manduka-grp-adapt')({
  head: () => buildReviewHead(DETAIL, 'manduka-grp-adapt'),
  component: () => <ReviewDetail detail={DETAIL} />,
})
