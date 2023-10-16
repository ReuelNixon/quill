import { httpBatchLink } from '@trpc/client';

import { appRouter } from '@/server/routers/_app';

export const serverClient = appRouter.createCaller({
	links: [
		httpBatchLink({
			url: `/api/trpc`,
		}),
	],
});
