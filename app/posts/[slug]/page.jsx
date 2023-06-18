import { gql, GraphQLClient } from "graphql-request";

const graphcms = new GraphQLClient(
  "https://api-ap-south-1.hygraph.com/v2/cli0ci3p13fhf01up499771lv/master"
)

const QUERY = gql`
  query Post($slug: string!){
    post(where: {slug: $slug}){
      {
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
    }`;

const SLUGLIST = gql`
    {
      post{
        slug
      }
    }`;


export async function getstaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}

export default function Blogpost({ post }) {
  return (
    <main className="container">
      <img src={post.coverImg.url} alt="COVER IMG" />
      <div className="title">
        <img src={post.author.avatar.url} alt="AVATAR" />
        <div className="name">
          <h6>{post.author.name}</h6>
          <h6>{post.datePublish}</h6>
        </div>
      </div>
      {/* <h2>{post.title}</h2> */}
      <div dangerouslySetInnerHTML={{ __html: post.content.html }}></div>
    </main>
  )
}



