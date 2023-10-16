import { httpBatchLink } from '@trpc/client';

import { appRouter } from '@/server/routers/_app';

const URL = process.env.VERCEL_URL || 'http://localhost:3000';

export const serverClient = appRouter.createCaller({
	links: [
		httpBatchLink({
			url: `${URL}/api/trpc`,
		}),
	],
});
