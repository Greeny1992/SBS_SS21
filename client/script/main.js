window.onload = function() {

    const API_URL="http://localhost:4000"
    const URL_POST = `${API_URL}/posts`
    const btn_submit_post = document.getElementById('submit_post_form');

    const template_post = document.getElementById("template_post")
    const container_posts = document.getElementById('area_posts')
    console.log(template_post.getElementsByClassName('post-title')[0].innerHTML)

    const removePost=(event, postID)=>{
        event.preventDefault();
        const url = `${URL_POST}/${postID}`
        deletePost(url)
            .then(getPosts)
    }
    /**
     *
     */
    const getPosts=()=>{
        const posts = []
        fetch(URL_POST)
            .then(response => response.json())
            .then(renderPosts)
            .catch(console.error);
    }

    /**
     *
     * @param event
     */
    const createPost = (event) =>{
        event.preventDefault()
        const titleField = document.getElementById("post_form").elements["title"];
        if(titleField.value!==''){
            const post = {title:titleField.value}
            titleField.value=""
            postData(URL_POST, post).then(()=>{
                getPosts()
            });
        } else{
            alert('Please enter a title')
        }


    }
    /**
     *
     * @param data
     */
    const renderPosts = (data)=>{
        const container = document.createElement('div')
        container.className="column"
        for(d in data) {
            const template = renderPost(data[d]);
            if(template ){
                container.appendChild((template))
            }
        }
        removeAllChildNodes(area_posts)
        area_posts.appendChild(container)
    }
    /**
     *
     * @param post
     * @returns {Node}
     */
    const renderPost = (post)=>{
        let template_post_t = template_post.cloneNode(true);
        const postData = post;
        if(postData && postData.title) {
            template_post_t.childNodes[1].innerHTML = postData.title
            template_post_t.id = `post_${postData.id}`
            console.log(template_post_t.childNodes)
            template_post_t.childNodes[3].addEventListener('click',()=>removePost(event, postData.id))
        }else{
            template_post_t = undefined
        }
        return template_post_t
    }
    /**
     *
     * @param parent
     */
    const removeAllChildNodes =(parent)=> {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    getPosts()

    btn_submit_post.addEventListener( 'click', createPost)
};