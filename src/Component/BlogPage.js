import { useState, useRef, useEffect, useReducer } from 'react';
import '../Style/blog.css'
import { db } from "../firebaseInit"
import { collection, addDoc } from "firebase/firestore";



function blogsReducer(state, action) {
    switch (action.type) {
        case "ADD":
            console.log(action.blog);
            return [action.blog, ...state]

        case "REMOVE":
            return state.filter((blog, index) => index !== action.index)

        default:
            return [];
    }
}

export default function BlogPage() {

    // const [title, setTitle] = useState('')
    // const [content, setContent]= useState('')
    const [formData, setFormData] = useState({ title: "", content: "" })
    // const [blogs, setBlogs] = useState([]);
    const [blogs, dispatch] = useReducer(blogsReducer, []);

    const titleRef = useRef(null)
    // titleRef.current.focus();

    useEffect(() => {
        titleRef.current.focus();
    }, [])

    // Update the title to newest title when press add button
    useEffect(() => {
        if (blogs.length > 0) {
            if (blogs[0].title === "") {
                document.title = "No Blogs"
            } else {
                document.title = blogs[0].title
            }
        }
    }, [blogs])



    async function handleSubmit(e) {
        e.preventDefault();
        titleRef.current.focus();

        // Add a new document with a generated id.
       await addDoc(collection(db, "blogs"), {
            title: formData.title,
            content: formData.content,
            createdAt: new Date()
        });
        // console.log("Document written with ID: ", docRef.id);


        const newBlog = { title: formData.title, content: formData.content };

        // Update the blogs state by adding the new blog to the beginning of the array
        // setBlogs([newBlog, ...blogs]);
        dispatch({ type: "ADD", blog: newBlog })
        setFormData({ title: "", content: "" });


    }

    function removeBlog(i) {
        // setBlogs(blogs.filter((blog, index) => i !== index))
        dispatch({ type: "REMOVE", index: i })
        titleRef.current.focus();
    }

    return (
        <>
            <div className="main">
                <div className="container">
                    <h1>Write A Blog Here</h1>
                    <form onSubmit={handleSubmit} className="form">
                        <input className='title'
                            type={'text'}
                            placeholder="Title"
                            ref={titleRef}
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                        <textarea className='desc'
                            placeholder="Description"
                            value={formData.content}
                            required
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
                        <button className='add-btn'>Add</button>
                    </form>

                    <div className='blog'>
                        <h2>Blogs</h2>
                        {blogs.map((blog, i) => (
                            <div className='blog-list' key={i}>
                                <h3> {blog.title} </h3>
                                <div className='content'>
                                    <p> {blog.content} </p>

                                    <button className='del' onClick={() => removeBlog(i)}>Delete</button>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>


            </div>
        </>
    );
}