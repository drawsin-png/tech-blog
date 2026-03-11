import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');
const retrospectivesDirectory = path.join(process.cwd(), 'src/content/retrospectives');

export function getPostSlugs(type: 'posts' | 'retrospectives') {
    const dir = type === 'posts' ? postsDirectory : retrospectivesDirectory;
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir);
}

export function getPostBySlug(slug: string, fields: string[] = [], type: 'posts' | 'retrospectives') {
    const realSlug = slug.replace(/\.md$/, '');
    const dir = type === 'posts' ? postsDirectory : retrospectivesDirectory;
    const fullPath = path.join(dir, `${realSlug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    type Items = {
        [key: string]: string;
    };

    const items: Items = {};

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === 'slug') {
            items[field] = realSlug;
        }
        if (field === 'content') {
            items[field] = content;
        }

        if (typeof data[field] !== 'undefined') {
            items[field] = data[field];
        }
    });

    return items;
}

export function getAllPosts(fields: string[] = [], type: 'posts' | 'retrospectives') {
    const slugs = getPostSlugs(type);
    const posts = slugs
        .map((slug) => getPostBySlug(slug, fields, type))
        .filter((post): post is { [key: string]: string } => post !== null)
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}
