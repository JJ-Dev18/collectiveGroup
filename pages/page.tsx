import db from "fleed/modules/db"


export default async function Page(){

    const posts = await db.post.findMany() 
    console.log(posts)
    return(
        <div>
            
        </div>
    )
}