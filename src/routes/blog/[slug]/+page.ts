import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../../lib/blog/posts/${params.slug}.svx`);
		
		return {
			content: post.default,
			metadata: post.metadata
		};
	} catch (e) {
		console.error(e);
		throw error(404, `Post not found: ${params.slug}`);
	}
};

export async function entries() {
	const posts = import.meta.glob('../../../lib/blog/posts/*.svx');
	
	return Object.keys(posts)
		.map((path) => {
			const slug = path.split('/').pop()?.replace('.svx', '');
			return slug ? { slug } : null;
		})
		.filter((entry): entry is { slug: string } => entry !== null);
}
