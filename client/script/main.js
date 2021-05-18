window.onload = function() {

    const API_URL="http://localhost:4000"
    const URL_POST = `${API_URL}/posts`
    const btn_submit_post = document.getElementById('submit_post_form');
    const template_post = document.getElementById("template_post")
    const container_posts = document.getElementById('area_posts')
    console.log(template_post.getElementsByClassName('post-title')[0].innerHTML)


    async function getPosts(){
        const posts = []
        fetch(URL_POST)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const container = document.createElement('div')
                container.className="column"
                for(d in data) {
                    const template_post_t = template_post.cloneNode(true);
                    const postData = data[d];
                    if(postData && postData.title){
                        template_post_t.childNodes[1].innerHTML = postData.title
                        template_post_t.id =`post_${postData.id}`
                        container.appendChild((template_post_t))
                    }

                }
                removeAllChildNodes(area_posts)
                area_posts.appendChild(container)
            });
    }
    getPosts()

    async function createPost(event){
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
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    btn_submit_post.addEventListener( 'click', createPost)
};