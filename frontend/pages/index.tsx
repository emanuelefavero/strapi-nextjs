import { GetServerSideProps, GetStaticProps, GetStaticPaths } from 'next'
import { useState, useEffect } from 'react'
import { server } from '@/config/server'

type Post = {
  id: string
  attributes: {
    title: string
    content: string
    publishedAt: string
  }
}

export default function Home({ posts }: { posts: Post[] }) {
  // const [posts, setPosts] = useState<Post[]>([])
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await fetch(`${server}/posts`)
  //       const { data } = await response.json()
  //       setPosts(data)
  //       setLoading(false)
  //       console.log(data)
  //     } catch (error) {
  //       console.error('Error fetching posts: ', error)
  //       setLoading(false)
  //     }
  //   }

  //   fetchPosts()
  // }, [])

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

// fetch posts data with serverSideProps
// export const getServerSideProps: GetServerSideProps = async () => {
//   const response = await fetch(`${server}/posts`)
//   const { data } = await response.json()

//   return {
//     props: {
//       posts: data,
//     },
//   }
// }

// fetch posts data with staticProps
export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${server}/posts`)
  const { data } = await response.json()

  return {
    props: {
      posts: data,
    },
  }
}
