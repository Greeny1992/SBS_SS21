window.onload = function() {

    const API_URL="http://localhost:4000"
    const URL_POST = `${API_URL}/posts`
    let URL_COMMENT = `http://localhost:4001/posts/{{POST_ID}}/comments`
    const btn_submit_post = document.getElementById('submit_post_form');
    const template_post = document.getElementById("template-post-item");
    const template_comment = document.getElementById("template-comment-item");
    console.log('template_post')
    console.log(template_post)
    const container_posts = document.getElementById('area_posts')

    const removePost=(event)=>{
        event.preventDefault();
        const postID= event.target.value;
        const url = `${URL_POST}/${postID}`
        deleteItem(url)
            .then(getPosts)
    }
    const removeComment=(event)=>{
        console.log("removeComment")
        event.preventDefault();
        const postID= event.target.value.split('#-#')[0];
        const commentID= event.target.value.split('#-#')[1];
        let url = URL_COMMENT.replace(/{{POST_ID}}/g,postID)
        url+= `/${commentID}`
        deleteItem(url).then(getPosts)
    }
    const addComment=(event)=>{
        event.preventDefault();
        const postID= event.target.value;
        const commentText = document.querySelector(`#comment_${postID}`).value
        document.querySelector(`#comment_${postID}`).value=''
        const url = URL_COMMENT.replace(/{{POST_ID}}/g,postID)
        const commentData = {content:commentText}
        postData(url, commentData).then((d)=>{
            getCommentsForPost(postID)
        });
    }
    const renderComments = (posts)=>{
        posts.forEach(post => getCommentsForPost(post.id))
        console.log("DELeTE")
        console.log(document.getElementsByName('delete-comment'));
        document.getElementsByName('delete-comment').forEach(item => {console.log(item);item.addEventListener('click',removeComment)})
        console.log(document.getElementsByName('delete-comment'));

    }
    const renderCommentsForPost=(comments,postID) =>{
        let commentHTML ='';
        let commentTemplate = template_comment.innerHTML;
        comments.forEach(comment=>{
            commentHTML+=commentTemplate.replace(/{{COMMENT}}/g, comment.content)
                .replace(/{{COMMENT_ID}}/g, comment.id)
                .replace(/{{POST_ID}}/g, postID)
        })
        document.getElementById(`comments-${postID}`).innerHTML =commentHTML
        document.getElementById(`comments-${postID}`).className=''
        document.getElementById(`comment-counter-${postID}`).innerText= comments.length
        comments.forEach(comment=>{
            document.getElementById(`delete-comment-${postID}-${comment.id}`).addEventListener('click',removeComment)})
    }
    const getCommentsForPost=(postID)=>{
        const url = URL_COMMENT.replace(/{{POST_ID}}/g,postID)
        fetch(url)
            .then(response => response.json())
            .then(data => renderCommentsForPost(data,postID))
            .catch(console.error);
    }
    /**
     *
     */
    const getPosts=()=>{
        fetch(URL_POST)
            .then(response => response.json())
            .then(renderPosts)
            .then(renderComments)
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
        const posts = []
        for(d in data) {
            posts.push(data[d])
            const templateFilled = renderPost(data[d]);
            if(templateFilled ){
                container.innerHTML +=templateFilled
            }
        }
        removeAllChildNodes(area_posts)
        area_posts.appendChild(container)
        document.getElementsByName('delete-post').forEach(item => item.addEventListener('click',removePost))
        document.getElementsByName('add-comment').forEach(item => item.addEventListener('click',addComment))
        console.log(posts)
        return posts
    }
    /**
     *
     * @param post
     * @returns {Node}
     */
    const renderPost = (post)=>{
        const templateHtml = template_post.innerHTML;
        const postData = post;
        let templateFilled ='';
        if(postData && postData.title) {
            templateFilled += templateHtml.replaceAll(/{{POST_ID}}/g, postData.id)
                                        .replaceAll(/{{POST_TITLE}}/g, postData.title)
        }else{
            templateFilled = undefined
        }
        return templateFilled
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
    //###############################################################################
    // Initial
    getPosts()
    btn_submit_post.addEventListener( 'click', createPost)
};