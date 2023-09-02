import Story from "../components/story.js";
import Comment from "../components/Comment.js";
import view from "../utils/view.js";
import baseUrl from "../utils/baseUrl.js";

export default async function Item() {
    let story = null;
    let hasComments = false;
    let hasError = false;

    try {
        story = await getStory();
        hasComments = story.comments.length > 0;
    } catch(error) {
        hasError = true;
        console.error(error)
    }

    if (hasError) {
        view.innerHTML = `<div class="error">Error fetching story</div>`
    } else if (story.type !== 'story') {
        view.innerHTML = `<div class="error">No story at this endpoint</div>`
    } else {
        view.innerHTML = `
            <div>
                ${Story(story)}
            </div>
            <hr/>
            ${hasComments ? story.comments.map(comment => Comment(comment)).join('') : 'No comments'}
        `
    }
}

async function getStory() {
    const storyID = window.location.hash.split('?id=')[1];
    const response = await fetch(`${baseUrl}/item/${storyID}.json?print=pretty`);
    const data = await response.json();
    const commentsArr =  data.kids ? await getComments(data.kids) : [];
    const story = await { ...data, comments: commentsArr };
    return story;
}

async function getComments(data) {
    let level = 0;

    async function recurse(data, level) {
        const commentsArr = Promise.all(data.map(async commentID => {
            const response = await fetch(`${baseUrl}/item/${commentID}.json?print=pretty`);
            const comment = { ...(await response.json()), level };
            if (comment.deleted) return { ...comment, by: 'deleted', text: 'comment deleted' };
            if (!comment.kids) return comment;
    
            const commentKidsArr = await recurse(comment.kids, level + 1);
            return { ...comment, comments: commentKidsArr };
        }));
        return commentsArr;
    }

    return await recurse(data, level);
}
