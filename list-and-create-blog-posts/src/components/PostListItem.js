import React from "react";

function PostListItem(props) {
  return (
    <div className="post-list-item">
      <img src="https://picsum.photos/seed/picsum/800/450" width="200" />
      <div className="post-list-item-data">
        <div>{props.post.title}</div>
        <div>{props.post.body}</div>
      </div>
    </div>
  );
}

export default PostListItem;
