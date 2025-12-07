import type { PageLoad } from './$types';

interface PostMetadata {
	title: string;
    description: string;
	date: string;
	layout?: string;
	tags?: string;
    visibleTags?: string;
	thumbnail?: string;
}

interface Post {
	slug: string;
	metadata: PostMetadata;
}

export const prerender = true;

export const load: PageLoad = async () => {
	const postModules = import.meta.glob<{ metadata: PostMetadata }>('../../lib/blog/posts/*.svx', { eager: true });

	const posts: Post[] = Object.entries(postModules)
		.map(([path, module]) => {
			const slug = path.split('/').pop()?.replace('.svx', '') ?? '';
			return {
				slug,
				metadata: module.metadata
			};
		})
		.sort((a, b) => {
			return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
		});

	return {
		posts
	};
};
