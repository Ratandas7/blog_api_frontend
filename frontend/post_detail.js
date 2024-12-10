const getQueryParams = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

const getPostDetail = () => {
    const postId = getQueryParams("id");
    // console.log(postId);
    fetch(`http://127.0.0.1:8000/api/posts/${postId}/`)
    .then((res) => res.json())
    .then((post) => {
        document.getElementById("post-title").innerText = post.title;
        document.getElementById("post-body").innerText = post.body;

        // set data into modal
        document.getElementById("title").value = post.title;
        document.getElementById("body").value = post.body;
    });

};

const updatePost = (event) => {
    event.preventDefault();
    const postId = getQueryParams("id");
    const form = document.getElementById("update-post");
    const formData = new FormData(form);
    const token = localStorage.getItem("authToken");
    // console.log(token);
    const updatePostData = {
        title: formData.get("title"),
        body: formData.get("body"),
    };
    // console.log(postData);
    fetch(`http://127.0.0.1:8000/api/posts/${postId}/`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify(updatePostData),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        
        $("#editModal").modal("hide");
    });
};

const deletePost = () => {
    const postId = getQueryParams("id");
    const token = localStorage.getItem("authToken");
    fetch(`http://127.0.0.1:8000/api/posts/${postId}/`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
    })
    .then((res) => (window.location.href = "./index.html"))
    .catch((err) => console.log(err));
};

document.getElementById("delete-btn").addEventListener("click", deletePost);

getPostDetail();