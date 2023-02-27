import { GetStaticProps } from 'next'
import { server } from '@/config/server'

type Post = {
  id: string
  attributes: {
    title: string
    content: string
    publishedAt: string
  }
}

// * Home (Posts)
export default function Home({ posts }: { posts: Post[] }) {
  return (
    <div className='posts'>
      <h1>Posts</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.attributes.title}</h3>
            <p>{post.attributes.content}</p>

            {/* display and format publishedAt Date */}
            <span className='date'>
              {new Date(post.attributes.publishedAt).toLocaleDateString(
                'en-US',
                {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// * fetch posts data with staticProps
export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${server}/posts`)
  const { data } = await response.json()

  return {
    props: {
      posts: data,
    },
  }
}

// TIP: you can always use serverSideProps or useFetch hook to fetch data more dynamically
