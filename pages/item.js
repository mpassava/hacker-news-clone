import Story from "../components/story.js";
import view from "../utils/view.js";

export default async function Item() {
    let story = null;
    let hasComments = false;
    let hasError = false;

    try {
        story = await getStory();
        hasComments = story.comments.length > 0;
        // console.log(story);
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
            ${hasComments ? story.comments.map(comment => JSON.stringify(comment)).join('') : 'No comments'}
        `
    }
}

async function getStory() {
    const storyID = window.location.hash.split('?id=')[1];
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json?print=pretty`);
    const data = await response.json();
    const commentsArr =  data.kids ? await getComments(data) : [];
    const story = await { ...data, comments: commentsArr };
    return story;
}

async function getComments(data) {
    const commentsArr = Promise.all(data.kids.map(async commentID => {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${commentID}.json?print=pretty`);
        const comment = await response.json();
        return comment;
    }));

    return commentsArr;
}
