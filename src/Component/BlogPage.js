import { useState } from 'react';
import '../Style/blog.css'

export default function BlogPage() {

    // const [title, setTitle] = useState('')
    // const [content, setContent]= useState('')
    const [formData,setFormData] = useState({title:"",content:""})
    const [blogs, setBlogs] = useState([]);



    function handleSubmit(e){
        e.preventDefault();
        
        const newBlog = { title:formData.title, content:formData.content };

        // Update the blogs state by adding the new blog to the beginning of the array
        setBlogs([newBlog, ...blogs]);
        setFormData({title:"",content:""});
        
    }

    return (
        <>
            <div className="main">
                <div className="container">
                    <h1>Write A Blog Here</h1>
                    <form onSubmit={handleSubmit} className="form">
                        <input className='title' type={'text'} placeholder="Title"
                                value={formData.title}
                                onChange={(e)=>setFormData({...formData, title:e.target.value})} />
                        <textarea className='desc' placeholder="Description"
                                    value={formData.content} 
                                    onChange={(e)=>setFormData({...formData, content:e.target.value})}/>
                        <button className='add-btn'>Add</button>
                    </form>

                    <div className='blog'>
                        <h2>Blogs</h2>
                        {blogs.map((blog,i)=>(
                            <div className='blog-list' key={i}>
                                <h3> {blog.title} </h3>
                                <p> {blog.content} </p>
                            </div>
                        ))}

                    </div>
                </div>


            </div>
        </>
    );
}