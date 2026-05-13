import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/lib/blog/posts';

export function BlogCard({ post }: { post: typeof blogPosts[number] }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Badge
              variant="secondary"
              className="text-xs"
            >
              {post.category}
            </Badge>
            <span className="text-xs text-muted-foreground">{post.readTime}</span>
          </div>
          <h3 className="font-semibold text-base mb-2 group-hover:text-[#6aaa64] transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {post.description}
          </p>
          <div className="mt-3 text-xs text-muted-foreground">
            {new Date(post.datePublished).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
