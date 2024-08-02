import "./styles.css";
import PostListItem from "./components/PostListItem";
import React, { useState } from "react";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");

  React.useEffect(function () {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=3")
      .then((response) => {
        // todo: !response.ok (error)

        return response.json();
      })
      .then((posts) => {
        setPosts(posts);
      });
  }, []);

  function onSubmit(event) {
    event.preventDefault();

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: "",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((createdPost) => {
        setPosts([createdPost, ...posts]);
      });
  }

  return (
    <div>
      <h1>Blog Posts</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <input type="submit" value="Create Post" />
        </div>
      </form>

      <div className="post-list">
        {posts.map((post) => {
          return <PostListItem key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
}
