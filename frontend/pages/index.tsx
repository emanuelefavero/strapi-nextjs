import { useState, useEffect } from 'react'
import { server } from '@/config/server'

export default function Home() {
  const [posts, setPosts] = useState<any>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${server}/posts`)
        const { data } = await response.json()
        setPosts(data)
        setLoading(false)
        console.log(data)
      } catch (error) {
        console.error('Error fetching posts: ', error)
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className='posts'>
      <h1>Posts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {posts.map((post: any) => (
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
      )}
    </div>
  )
}
