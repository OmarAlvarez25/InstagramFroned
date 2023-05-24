/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

// React
import { useEffect } from 'react';

// Hooks
import { usePostsStore } from '@/hooks';

// // Local Components
import withAuth from '@/auth/withAuth';
import { Layout, Loader, PostCard } from '../components';

// Home Styles
import s from '../styles/Home.module.scss';

function Home() {
  const { posts, loading, startLoadingPosts } = usePostsStore();

  useEffect(() => {
    startLoadingPosts();
  }, []);

  return (
    <Layout pageTitle="Inicio">
      {loading ? (
        <Loader />
      ) : (
        <div className={s.home}>
          {posts?.length === 0 ? (
            <h1>Aún no hay posts</h1>
          ) : (
            posts?.map((post) => <PostCard key={post.postId} post={post} />)
          )}
        </div>
      )}
    </Layout>
  );
}

export default withAuth(Home);
