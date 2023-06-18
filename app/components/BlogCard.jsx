import Link from "next/link"

export default function BlogCard({ title, author, datePublish, coverImg, slug }) {
    return (

        <div className="flex flex-row md:flex-col">
            <div className="card rounded border w-[25rem] bg-white my-3 mx-auto">
                <Link href={"/posts/" + slug}>
                    <div className="title ">
                        <h4 className="text-black px-2 py-4 " >{title}</h4>
                    </div>
                    <div className="">
                        <img className="rounded aspect-video w-[25rem]" src={coverImg.url} alt="" />
                    </div>
                </Link>
                <div className="flex flex-row justify-between"  >
                    <div className="author flex flex-row gap-1 px-4 py-3">
                        <img className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden " src={author.avatar.url} alt="" />
                        <h3 className="text-black flex items-center justify-center " >{author.name}</h3>
                    </div>
                    <div className="date text-black text-sm  py-3 pr-4">
                        <h3>{datePublish}</h3>
                    </div>
                </div>
            </div>
        </div>


    )
}