import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TRPCError, initTRPC } from '@trpc/server';

const t = initTRPC.create();
const middleware = t.middleware;

const isAuthenticated = middleware(async (opts) => {
	const { getUser } = getKindeServerSession();
	const user = getUser();

	if (!user.id || !user.email) throw new TRPCError({ code: 'UNAUTHORIZED' });
	return opts.next({
		ctx: {
			userId: user.id,
			user: user,
		},
	});
});
export const router = t.router;
export const procedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuthenticated);
