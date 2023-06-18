'use client'
import { gql, GraphQLClient } from "graphql-request";
import BlogCard from "./components/BlogCard";
import { Fragment, useEffect, useState } from "react";


const Home = () => {

  const [post, setPost] = useState([]);


  useEffect(() => {
    const postfun = async () => {
      const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS);
      const query = gql`
 {
   posts{
     id,
     title,
     datePublish,
     slug,
     content{
       html
     }
     author{
       name,
       avatar{
         url
       }
     }
    coverImg{
         url
       }
   }
    }
 `;
  const tem = await graphcms.request(query);

  setPost(tem.posts)


  }
 
postfun()
}, [])


return (

  <div className="container">
  <main>
      { post.map((post) => (
        <Fragment key={post.id}>
        <BlogCard
          title={post.title}
          author={post.author}
          coverImg={post.coverImg}
          key={post.id}
          datePublish={post.datePublish}
          slug={post.slug}
        />
        </Fragment>
      ))}
    </main>
  </div>
)
}
export default Home